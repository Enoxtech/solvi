import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '../../src/components/ui/Screen';
import { GlassCard } from '../../src/components/ui/GlassCard';
import { AppButton } from '../../src/components/ui/AppButton';
import { StepHeader } from '../../src/components/transfer/StepHeader';
import { BeneficiaryStrip } from '../../src/components/transfer/BeneficiaryStrip';
import { useAppTheme } from '../../src/theme/ThemeProvider';

export default function TransferStep2() {
  const router = useRouter();
  const { colors } = useAppTheme();

  return (
    <Screen>
      <StepHeader step={2} />
      <Text style={{ fontSize: 18, fontWeight: '700', color: colors.textPrimary, marginBottom: 14 }}>Recipient</Text>
      <BeneficiaryStrip label="Abubakar Musa" detail="Personal Wallet · ALIPAY" />
      <GlassCard>
        <Text style={{ color: colors.textSecondary, marginBottom: 6 }}>Payment Method</Text>
        <Text style={{ color: colors.textPrimary, fontWeight: '700', fontSize: 17 }}>ALIPAY</Text>
      </GlassCard>
      <GlassCard>
        <Text style={{ color: colors.textSecondary, marginBottom: 6 }}>Recipient Will Receive</Text>
        <Text style={{ color: colors.textPrimary, fontWeight: '700', fontSize: 28 }}>RMB 500.00</Text>
      </GlassCard>
      <AppButton label="Confirm Transfer" onPress={() => router.push('/transfer/step-3')} />
    </Screen>
  );
}
