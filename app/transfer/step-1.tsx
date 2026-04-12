import { useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '../../src/components/ui/Screen';
import { GlassCard } from '../../src/components/ui/GlassCard';
import { AppButton } from '../../src/components/ui/AppButton';
import { StepHeader } from '../../src/components/transfer/StepHeader';
import { RateTiersCard } from '../../src/components/transfer/RateTiersCard';
import { BeneficiaryStrip } from '../../src/components/transfer/BeneficiaryStrip';
import { useAppTheme } from '../../src/theme/ThemeProvider';

export default function TransferStep1() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const [amountRmb, setAmountRmb] = useState('');
  const [amountNgn, setAmountNgn] = useState('');
  const rate = 206.5;

  return (
    <Screen>
      <StepHeader step={1} />
      <GlassCard>
        <Text style={{ fontSize: 16, fontWeight: '600', color: colors.textPrimary, marginBottom: 14 }}>Enter Amount (RMB)</Text>
        <TextInput
          value={amountRmb}
          onChangeText={(v) => {
            setAmountRmb(v);
            const n = parseFloat(v) || 0;
            setAmountNgn((n * rate).toFixed(2));
          }}
          keyboardType="numeric"
          placeholder="0.00"
          placeholderTextColor={colors.textMuted}
          style={{
            fontSize: 36,
            fontWeight: '700',
            color: colors.textPrimary,
            textAlign: 'center',
            marginBottom: 8
          }}
        />
        <Text style={{ textAlign: 'center', color: colors.textSecondary, marginBottom: 18 }}>
          ≈ ₦{amountNgn || '0.00'}
        </Text>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          {['50', '100', '500', '1000'].map((v) => (
            <View
              key={v}
              style={{
                flex: 1,
                paddingVertical: 10,
                borderRadius: 12,
                backgroundColor: colors.inputBg,
                alignItems: 'center'
              }}
            >
              <Text style={{ color: colors.textPrimary, fontWeight: '600' }}>{v}</Text>
            </View>
          ))}
        </View>
      </GlassCard>
      <RateTiersCard />
      <BeneficiaryStrip />
      <AppButton label="Continue" onPress={() => router.push('/transfer/step-2')} />
    </Screen>
  );
}
