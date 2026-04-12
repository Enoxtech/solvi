import { View, Text, ScrollView } from 'react-native';
import { Screen } from '../../src/components/ui/Screen';
import { AppCard } from '../../src/components/ui/AppCard';
import { useAppTheme } from '../../src/theme/ThemeProvider';
import { useAuthStore } from '../../src/state/authStore';

const rates = [
  { label: 'Personal Wallet (0 - 9999 RMB)', rate: '₦204.50 / RMB' },
  { label: 'Personal Wallet (10000+ RMB)', rate: '₦205.50 / RMB' },
  { label: 'Business Wallet', rate: '₦206.00 / RMB' },
];

export default function HomeScreen() {
  const { colors } = useAppTheme();
  const user = useAuthStore((s) => s.user);

  return (
    <Screen>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <View>
          <Text style={{ fontSize: 26, fontWeight: '800', color: colors.textPrimary }}>
            Hi, {user?.name ?? 'there'}
          </Text>
          <Text style={{ color: colors.textSecondary, marginTop: 4 }}>Nice day, isn't it? 😎</Text>
        </View>
        <View style={{ width: 48, height: 48, borderRadius: 16, backgroundColor: colors.primary }} />
      </View>

      {/* NGN Wallet */}
      <AppCard>
        <Text style={{ color: colors.textSecondary, fontSize: 13, marginBottom: 6 }}>NGN Balance</Text>
        <Text style={{ color: colors.textPrimary, fontSize: 36, fontWeight: '800' }}>₦ 125,000.00</Text>
        <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
          <View style={{ backgroundColor: colors.primary, borderRadius: 10, paddingHorizontal: 16, paddingVertical: 8 }}>
            <Text style={{ color: '#fff', fontWeight: '600', fontSize: 13 }}>Send RMB</Text>
          </View>
          <View style={{ backgroundColor: colors.inputBg, borderRadius: 10, paddingHorizontal: 16, paddingVertical: 8 }}>
            <Text style={{ color: colors.textPrimary, fontWeight: '600', fontSize: 13 }}>Fund</Text>
          </View>
        </View>
      </AppCard>

      {/* Exchange Rates */}
      <AppCard>
        <Text style={{ fontSize: 16, fontWeight: '700', color: colors.textPrimary, marginBottom: 14 }}>
          Exchange Rates
        </Text>
        {rates.map((r, i) => (
          <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <Text style={{ color: colors.textSecondary, fontSize: 13 }}>{r.label}</Text>
            <Text style={{ color: colors.primary, fontWeight: '600', fontSize: 13 }}>{r.rate}</Text>
          </View>
        ))}
      </AppCard>

      {/* Quick Actions */}
      <AppCard>
        <Text style={{ fontSize: 16, fontWeight: '700', color: colors.textPrimary, marginBottom: 14 }}>
          Quick Actions
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          {['Send RMB', 'Fund', 'Withdraw', 'More'].map((action) => (
            <View key={action} style={{ alignItems: 'center' }}>
              <View style={{ width: 52, height: 52, borderRadius: 16, backgroundColor: colors.inputBg, marginBottom: 8 }} />
              <Text style={{ color: colors.textSecondary, fontSize: 12 }}>{action}</Text>
            </View>
          ))}
        </View>
      </AppCard>

      {/* Recent Transactions */}
      <AppCard>
        <Text style={{ fontSize: 16, fontWeight: '700', color: colors.textPrimary, marginBottom: 14 }}>
          Recent Transactions
        </Text>
        {[
          { desc: 'Sent to Zhang Wei', amount: '-RMB 5,000', type: 'debit' },
          { desc: 'Funded via Card ****4521', amount: '+₦50,000', type: 'credit' },
          { desc: 'Exchange conversion', amount: '-₦102,250', type: 'debit' },
        ].map((tx, i) => (
          <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
            <View>
              <Text style={{ color: colors.textPrimary, fontSize: 14 }}>{tx.desc}</Text>
              <Text style={{ color: colors.textMuted, fontSize: 12 }}>Today</Text>
            </View>
            <Text style={{ color: tx.type === 'credit' ? colors.success : colors.error, fontWeight: '600', fontSize: 14 }}>
              {tx.amount}
            </Text>
          </View>
        ))}
      </AppCard>
    </Screen>
  );
}
