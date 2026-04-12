import { View, Text } from 'react-native';
import { Screen } from '../../src/components/ui/Screen';
import { AppButton } from '../../src/components/ui/AppButton';
import { useAppTheme } from '../../src/theme/ThemeProvider';
import { useRouter } from 'expo-router';

export default function TransferSuccessScreen() {
  const { colors } = useAppTheme();
  const router = useRouter();

  return (
    <Screen>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: '#16A34A', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
          <Text style={{ color: '#fff', fontSize: 40 }}>✓</Text>
        </View>
        <Text style={{ fontSize: 26, fontWeight: '800', color: colors.textPrimary, marginBottom: 12 }}>
          Transfer Initiated!
        </Text>
        <Text style={{ color: colors.textMuted, textAlign: 'center', marginBottom: 32 }}>
          Your RMB transfer is being processed.{'\n'}You'll receive a confirmation shortly.
        </Text>
        <View style={{ width: '100%', gap: 12 }}>
          <AppButton label="Done" onPress={() => router.replace('/(tabs)')} />
          <AppButton label="View Receipt" variant="secondary" onPress={() => router.push('/receipt/TXN001')} />
        </View>
      </View>
    </Screen>
  );
}
