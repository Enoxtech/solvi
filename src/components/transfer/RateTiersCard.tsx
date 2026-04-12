import { View, Text } from 'react-native';
import { AppCard } from '../ui/AppCard';
import { colors } from '../../theme/colors';

const tiers = [
  { label: 'Personal Wallet (0 - 9999 RMB)', rate: '₦204.50' },
  { label: 'Personal Wallet (10000+ RMB)', rate: '₦205.50' }
];

export function RateTiersCard() {
  return (
    <AppCard>
      <Text style={{ fontSize: 16, fontWeight: '600', color: colors.textPrimary, marginBottom: 14 }}>Rate Tiers</Text>
      {tiers.map((tier) => (
        <View key={tier.label} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
          <Text style={{ color: colors.textSecondary }}>{tier.label}</Text>
          <Text style={{ color: colors.textPrimary, fontWeight: '600' }}>{tier.rate}</Text>
        </View>
      ))}
    </AppCard>
  );
}
