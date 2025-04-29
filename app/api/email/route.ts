import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { WelcomeEmail } from '@/lib/email-templates/welcome';
import { ResetPasswordEmail } from '@/lib/email-templates/reset-password';
import { TransactionNotificationEmail } from '@/lib/email-templates/transaction-notification';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { type, data } = await request.json();

    switch (type) {
      case 'welcome':
        await resend.emails.send({
          from: 'SOLVI <noreply@solvi.com>',
          to: data.email,
          subject: 'Welcome to SOLVI!',
          react: WelcomeEmail({ username: data.username }),
        });
        break;

      case 'reset-password':
        await resend.emails.send({
          from: 'SOLVI <noreply@solvi.com>',
          to: data.email,
          subject: 'Reset Your Password',
          react: ResetPasswordEmail({ 
            username: data.username,
            resetLink: data.resetLink 
          }),
        });
        break;

      case 'transaction':
        await resend.emails.send({
          from: 'SOLVI <noreply@solvi.com>',
          to: data.email,
          subject: 'Transaction Update',
          react: TransactionNotificationEmail({
            username: data.username,
            transactionId: data.transactionId,
            amount: data.amount,
            currency: data.currency,
            status: data.status
          }),
        });
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid email type' },
          { status: 400 }
        );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 