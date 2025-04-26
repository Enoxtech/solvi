import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { v4 as uuidv4 } from 'uuid'
import { hash } from 'bcryptjs'

const resend = new Resend(process.env.RESEND_API_KEY)

// In a real app, this would be a database
const users: any[] = []
const verificationTokens: any[] = []

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password, phone, countryCode, referrer } = await request.json()

    // Validate input
    if (!email || !password || !firstName || !lastName || !phone || !countryCode) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user already exists
    if (users.some(user => user.email === email)) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Create user
    const user = {
      id: uuidv4(),
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      countryCode,
      referrer,
      isVerified: false,
      createdAt: new Date(),
    }

    // Generate verification token
    const verificationToken = uuidv4()
    verificationTokens.push({
      token: verificationToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    })

    // Store user
    users.push(user)

    // Send verification email
    const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${verificationToken}`
    const { error: emailError } = await resend.emails.send({
      from: 'SOLVI <noreply@solvi.com>',
      to: email,
      subject: 'Verify Your SOLVI Email',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #333;">Verify Your Email</h1>
          </div>
          
          <div style="margin-bottom: 20px;">
            <p>Dear ${firstName},</p>
            <p>Thank you for signing up with SOLVI. Please verify your email address by clicking the button below:</p>
          </div>
          
          <div style="text-align: center; margin-bottom: 20px;">
            <a href="${verificationLink}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
          </div>
          
          <div style="margin-bottom: 20px;">
            <p>If you didn't create an account with SOLVI, you can safely ignore this email.</p>
          </div>
          
          <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #777; font-size: 12px;">
            <p>This link will expire in 24 hours.</p>
            <p>&copy; ${new Date().getFullYear()} SOLVI. All rights reserved.</p>
          </div>
        </div>
      `,
    })

    if (emailError) {
      console.error('Error sending verification email:', emailError)
      return NextResponse.json(
        { error: 'Failed to send verification email' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Registration successful. Please check your email to verify your account.' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 