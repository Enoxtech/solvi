import { ScrollView, View, Text } from 'react-native';
import { AppCard } from '../ui/AppCard';
import { colors } from '../../theme/colors';

const rates = [
  { label: 'Personal Wallet (0 - 9999)', rate: '₦204.50 / RMB' },
  { label: 'Personal Wallet (10000+)', rate: '₦205.50 / RMB' }
];

export function RateCarousel() {
  return (
    <View style={{ marginBottom: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', color: colors.textPrimary }}>Rates</Text>
        <Text style={{ color: colors.textPrimary }}>Alipay | WeChat</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {rates.map((item) => (
          <View key={item.label} style={{ width: 260, marginRight: 14 }}>
            <AppCard>
              <Text style={{ color: colors.textPrimary, marginBottom: 8 }}>{item.label}</Text>
              <Text style={{ color: colors.textPrimary, fontSize: 20, fontWeight: '700' }}>{item.rate}</Text>
            </AppCard>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
