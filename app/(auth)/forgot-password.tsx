import { View, Text, TextInput } from 'react-native';
import { Screen } from '../../src/components/ui/Screen';
import { AppButton } from '../../src/components/ui/AppButton';
import { useAppTheme } from '../../src/theme/ThemeProvider';

export default function ForgotPasswordScreen() {
  const { colors } = useAppTheme();

  return (
    <Screen>
      <Text style={{ fontSize: 26, fontWeight: '800', color: colors.textPrimary, marginBottom: 12 }}>
        Forgot Password
      </Text>
      <Text style={{ color: colors.textMuted, marginBottom: 28 }}>
        Enter your email and we'll send you a reset link.
      </Text>
      <TextInput
        placeholder="enoch@solvi.app"
        placeholderTextColor={colors.textMuted}
        keyboardType="email-address"
        style={{
          height: 54,
          backgroundColor: colors.inputBg,
          borderRadius: 16,
          paddingHorizontal: 16,
          color: colors.textPrimary,
          fontSize: 16,
          marginBottom: 20
        }}
      />
      <AppButton label="Send Reset Link" onPress={() => {}} />
    </Screen>
  );
}
