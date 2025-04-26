import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'

// In a real app, this would be a database
const users: any[] = []
const resetTokens: any[] = []

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json()

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token and password are required' },
        { status: 400 }
      )
    }

    // Find the reset token
    const resetToken = resetTokens.find(
      (rt) => rt.token === token && rt.expiresAt > new Date()
    )

    if (!resetToken) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      )
    }

    // Find and update the user
    const userIndex = users.findIndex((u) => u.id === resetToken.userId)
    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Hash new password
    const hashedPassword = await hash(password, 10)

    // Update user password
    users[userIndex] = {
      ...users[userIndex],
      password: hashedPassword,
    }

    // Remove the used reset token
    resetTokens.splice(
      resetTokens.findIndex((rt) => rt.token === token),
      1
    )

    return NextResponse.json(
      { message: 'Password reset successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Password reset error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 