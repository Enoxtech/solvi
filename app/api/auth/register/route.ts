import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { Resend } from 'resend'

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY || 're_BubAzyWR_7MnZpbkqW489nhVbp4CcFhVS')

// In a real app, this would be a database
const users: any[] = []

export const runtime = 'edge'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, password, phone, countryCode, referrer } = body

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
      id: Date.now().toString(),
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      countryCode,
      referrer,
      isVerified: false,
      createdAt: new Date().toISOString(),
    }

    // Store user
    users.push(user)

    // Send welcome email
    try {
      const { data, error } = await resend.emails.send({
        from: 'SOLVI <noreply@solvi.com>',
        to: email,
        subject: 'Welcome to SOLVI!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h1 style="color: #333;">Welcome to SOLVI!</h1>
            </div>
            
            <div style="margin-bottom: 20px;">
              <p>Dear ${firstName},</p>
              <p>Thank you for joining SOLVI. We're excited to have you on board!</p>
            </div>
            
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
              <p>Your account has been successfully created. You can now:</p>
              <ul>
                <li>Access your dashboard</li>
                <li>Manage your wallet</li>
                <li>Make transactions</li>
                <li>And much more!</li>
              </ul>
            </div>
            
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #777; font-size: 12px;">
              <p>This is an automated message, please do not reply directly to this email.</p>
              <p>&copy; ${new Date().getFullYear()} SOLVI. All rights reserved.</p>
            </div>
          </div>
        `,
      })

      if (error) {
        console.error('Error sending welcome email:', error)
      }
    } catch (emailError) {
      console.error('Error sending welcome email:', emailError)
    }

    return NextResponse.json(
      { message: 'Registration successful. Please check your email for a welcome message.' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
} 