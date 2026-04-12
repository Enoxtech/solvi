import { View, Text, ScrollView } from 'react-native';
import { Screen } from '../../src/components/ui/Screen';
import { GlassCard } from '../../src/components/ui/GlassCard';
import { StatusBadge } from '../../src/components/ui/StatusBadge';
import { useAppTheme } from '../../src/theme/ThemeProvider';

function Row({ label, value }: { label: string; value: string }) {
  const { colors } = useAppTheme();
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 }}>
      <Text style={{ color: colors.textSecondary, fontSize: 15 }}>{label}</Text>
      <Text style={{ color: colors.textPrimary, fontWeight: '700', fontSize: 15, maxWidth: '55%', textAlign: 'right' }}>{value}</Text>
    </View>
  );
}

export default function TransferStep3() {
  const { colors } = useAppTheme();

  return (
    <Screen>
      <View style={{ alignItems: 'center', marginBottom: 24, marginTop: 20 }}>
        <StatusBadge status="Completed" />
      </View>

      <GlassCard>
        <View style={{ alignItems: 'center' }}>
          <View
            style={{
              width: 58,
              height: 58,
              borderRadius: 20,
              backgroundColor: colors.primary,
              marginBottom: 12,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text style={{ color: '#fff', fontWeight: '900', fontSize: 18 }}>¥</Text>
          </View>
          <Text style={{ color: colors.textPrimary, fontSize: 24, fontWeight: '800', marginBottom: 8 }}>Sent RMB</Text>
          <StatusBadge status="Completed" />
        </View>
      </GlassCard>

      <GlassCard>
        <Text style={{ textAlign: 'center', fontSize: 34, fontWeight: '900', color: colors.textPrimary }}>RMB 500.00</Text>
        <Text style={{ textAlign: 'center', color: colors.textSecondary, marginTop: 6, fontSize: 16 }}>₦103,250.00</Text>
      </GlassCard>

      <GlassCard>
        <Row label="Payment Method" value="ALIPAY" />
        <Row label="Recipient" value="Abubakar Musa" />
        <Row label="Recipient Type" value="Personal Wallet" />
        <Row label="Exchange Rate" value="₦206.50 / RMB" />
        <Row label="Fee" value="₦0.00" />
        <Row label="Sub Total" value="₦103,250.00" />
        <Row label="Total Paid" value="₦103,250.00" />
      </GlassCard>

      <GlassCard>
        <Row label="Reference ID" value="TXN-893742903" />
        <Row label="Date" value="Apr 02, 2026" />
        <Row label="Time" value="13:42 PM" />
        <Row label="Average Processing" value="5–30 minutes" />
      </GlassCard>

      <GlassCard>
        <Row label="Debited From" value="Naira Wallet" />
        <Row label="Balance Before" value="₦103,418.00" />
        <Row label="Balance After" value="₦168.00" />
      </GlassCard>
    </Screen>
  );
}
