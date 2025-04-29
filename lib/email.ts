import { WelcomeEmail } from './email-templates/welcome';
import { ResetPasswordEmail } from './email-templates/reset-password';
import { TransactionNotificationEmail } from './email-templates/transaction-notification';

// Email templates
const templates = {
  welcome: (name: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #333;">Welcome to SOLVI!</h1>
      </div>
      
      <div style="margin-bottom: 20px;">
        <p>Dear ${name},</p>
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

  passwordReset: (name: string, resetLink: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #333;">Password Reset Request</h1>
      </div>
      
      <div style="margin-bottom: 20px;">
        <p>Dear ${name},</p>
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

  verification: (name: string, verificationLink: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #333;">Verify Your Email</h1>
      </div>
      
      <div style="margin-bottom: 20px;">
        <p>Dear ${name},</p>
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

  transaction: (name: string, transactionId: string, status: string, amount: number, description: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #333;">Transaction Update</h1>
      </div>
      
      <div style="margin-bottom: 20px;">
        <p>Dear ${name},</p>
        <p>Your transaction has been ${status.toLowerCase()}.</p>
      </div>
      
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
        <h2 style="margin-top: 0; color: #333; font-size: 18px;">Transaction Details</h2>
        <p><strong>Transaction ID:</strong> ${transactionId}</p>
        <p><strong>Amount:</strong> ₦${amount.toLocaleString()}</p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Status:</strong> <span style="color: ${status === "Successful" ? "green" : status === "Pending" ? "orange" : "red"};">${status}</span></p>
      </div>
      
      <div style="margin-bottom: 20px;">
        <p>If you have any questions or concerns, please contact our support team.</p>
      </div>
      
      <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #777; font-size: 12px;">
        <p>This is an automated message, please do not reply directly to this email.</p>
        <p>&copy; ${new Date().getFullYear()} SOLVI. All rights reserved.</p>
      </div>
    </div>
  `,
};

// Email service functions
export const sendWelcomeEmail = async (email: string, username: string) => {
  try {
    const response = await fetch('/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'welcome',
        data: { email, username }
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send welcome email');
    }
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
};

export const sendPasswordResetEmail = async (email: string, username: string, resetLink: string) => {
  try {
    const response = await fetch('/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'reset-password',
        data: { email, username, resetLink }
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send password reset email');
    }
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};

export const sendVerificationEmail = async (to: string, name: string, verificationLink: string) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'SOLVI <noreply@solvi.com>',
      to,
      subject: 'Verify Your SOLVI Email',
      html: templates.verification(name, verificationLink),
    });

    if (error) {
      console.error('Error sending verification email:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending verification email:', error);
    return false;
  }
};

export const sendTransactionNotification = async (
  email: string,
  username: string,
  transactionId: string,
  amount: string,
  currency: string,
  status: string
) => {
  try {
    const response = await fetch('/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'transaction',
        data: { email, username, transactionId, amount, currency, status }
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send transaction notification');
    }
  } catch (error) {
    console.error('Error sending transaction notification:', error);
    throw error;
  }
}; 