import { Resend } from 'resend';

const resend = new Resend('re_BubAzyWR_7MnZpbkqW489nhVbp4CcFhVS');

async function testEmailService() {
  try {
    console.log('Testing email service...');
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'delivered@resend.dev',
      subject: 'Test Email',
      html: `
        <h1>Test Email</h1>
        <p>This is a test email from Solvi.</p>
        <p>If you received this email, the email service is working correctly!</p>
      `,
    });

    if (error) {
      console.error('Error sending test email:', error);
      return;
    }

    console.log('Test email sent successfully!');
    console.log('Email ID:', data?.id);
  } catch (error) {
    console.error('Error testing email service:', error);
  }
}

testEmailService(); 