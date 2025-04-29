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

interface TransactionNotificationEmailProps {
  username: string;
  transactionId: string;
  amount: string;
  currency: string;
  status: string;
}

export const TransactionNotificationEmail = ({
  username,
  transactionId,
  amount,
  currency,
  status,
}: TransactionNotificationEmailProps) => (
  <Html>
    <Head />
    <Preview>Transaction Update - {status}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section>
          <Text style={text}>Hi {username},</Text>
          <Text style={text}>
            Your transaction #{transactionId} has been updated to: {status}
          </Text>
          <Text style={text}>
            Amount: {amount} {currency}
          </Text>
          <Text style={text}>
            You can view the details of this transaction in your account dashboard.
          </Text>
          <Text style={text}>
            If you have any questions about this transaction, please contact our support team.
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