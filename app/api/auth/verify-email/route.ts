import { NextResponse } from 'next/server'

// In a real app, this would be a database
const users: any[] = []
const verificationTokens: any[] = []

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { error: 'Missing verification token' },
        { status: 400 }
      )
    }

    // Find the verification token
    const verificationToken = verificationTokens.find(
      (vt) => vt.token === token && vt.expiresAt > new Date()
    )

    if (!verificationToken) {
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 400 }
      )
    }

    // Find and update the user
    const userIndex = users.findIndex((u) => u.id === verificationToken.userId)
    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Update user verification status
    users[userIndex] = {
      ...users[userIndex],
      isVerified: true,
    }

    // Remove the used verification token
    verificationTokens.splice(
      verificationTokens.findIndex((vt) => vt.token === token),
      1
    )

    return NextResponse.json(
      { message: 'Email verified successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 