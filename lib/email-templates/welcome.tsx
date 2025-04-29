import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface WelcomeEmailProps {
  username: string;
}

export const WelcomeEmail = ({ username }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to Solvi!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section>
          <Text style={text}>Hi {username},</Text>
          <Text style={text}>
            Welcome to Solvi! We're excited to have you on board. Your account has been successfully created.
          </Text>
          <Text style={text}>
            You can now start using our platform to manage your currency exchange needs.
          </Text>
          <Text style={text}>
            If you have any questions, feel free to reach out to our support team.
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