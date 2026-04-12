import { View, Text, TextInput } from 'react-native';
import { Screen } from '../../src/components/ui/Screen';
import { AppButton } from '../../src/components/ui/AppButton';
import { useAppTheme } from '../../src/theme/ThemeProvider';

export default function SignupScreen() {
  const { colors } = useAppTheme();

  return (
    <Screen>
      <Text style={{ fontSize: 26, fontWeight: '800', color: colors.textPrimary, marginBottom: 12 }}>
        Create Account
      </Text>
      <Text style={{ color: colors.textMuted, marginBottom: 28 }}>
        Join SOLVI and start sending money globally.
      </Text>
      {['Full Name', 'Email', 'Password', 'Confirm Password'].map((label) => (
        <View key={label} style={{ marginBottom: 16 }}>
          <Text style={{ color: colors.textPrimary, marginBottom: 8, fontWeight: '500' }}>{label}</Text>
          <TextInput
            placeholder={label}
            placeholderTextColor={colors.textMuted}
            secureTextEntry={label.includes('Password')}
            style={{
              height: 54,
              backgroundColor: colors.inputBg,
              borderRadius: 16,
              paddingHorizontal: 16,
              color: colors.textPrimary,
              fontSize: 16
            }}
          />
        </View>
      ))}
      <View style={{ marginTop: 8 }}>
        <AppButton label="Create Account" onPress={() => {}} />
      </View>
    </Screen>
  );
}
