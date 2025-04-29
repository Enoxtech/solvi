import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface ResetPasswordEmailProps {
  username: string;
  resetLink: string;
}

export const ResetPasswordEmail = ({ username, resetLink }: ResetPasswordEmailProps) => (
  <Html>
    <Head />
    <Preview>Reset your Solvi password</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section>
          <Text style={text}>Hi {username},</Text>
          <Text style={text}>
            We received a request to reset your password for your Solvi account.
          </Text>
          <Text style={text}>
            Click the button below to reset your password:
          </Text>
          <Button style={button} href={resetLink}>
            Reset Password
          </Button>
          <Text style={text}>
            If you didn't request this password reset, you can safely ignore this email.
          </Text>
          <Text style={text}>
            This link will expire in 1 hour for security reasons.
          </Text>
          <Text style={text}>Best regards,</Text>
          <Text style={text}>The Solvi Team</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '580px',
};

const text = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#333333',
};

const button = {
  backgroundColor: '#2563eb',
  borderRadius: '4px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px',
  margin: '20px 0',
}; 