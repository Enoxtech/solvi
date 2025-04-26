import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { v4 as uuidv4 } from 'uuid'

const resend = new Resend(process.env.RESEND_API_KEY)

// In a real app, this would be a database
const users: any[] = []
const resetTokens: any[] = []

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Find user
    const user = users.find((u) => u.email === email)
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Generate reset token
    const resetToken = uuidv4()
    resetTokens.push({
      token: resetToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
    })

    // Send reset email
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`
    const { error: emailError } = await resend.emails.send({
      from: 'SOLVI <noreply@solvi.com>',
      to: email,
      subject: 'Reset Your SOLVI Password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #333;">Password Reset Request</h1>
          </div>
          
          <div style="margin-bottom: 20px;">
            <p>Dear ${user.firstName},</p>
            <p>We received a request to reset your password. Click the button below to create a new password:</p>
          </div>
          
          <div style="text-align: center; margin-bottom: 20px;">
            <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
          </div>
          
          <div style="margin-bottom: 20px;">
            <p>If you didn't request this password reset, you can safely ignore this email.</p>
          </div>
          
          <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #777; font-size: 12px;">
            <p>This link will expire in 1 hour.</p>
            <p>&copy; ${new Date().getFullYear()} SOLVI. All rights reserved.</p>
          </div>
        </div>
      `,
    })

    if (emailError) {
      console.error('Error sending reset email:', emailError)
      return NextResponse.json(
        { error: 'Failed to send reset email' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Password reset email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Password reset request error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 