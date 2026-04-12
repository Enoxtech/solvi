import { View, Text } from 'react-native';
import { AppCard } from '../ui/AppCard';
import { colors } from '../../theme/colors';

const items = [
  { title: 'Alipay', amount: 'RMB 155.00', time: '6 February 10:04 AM', status: 'Completed' },
  { title: 'Wallet Top-Up', amount: '₦32,900.00', time: '6 February 9:45 AM', status: 'Completed' }
];

export function RecentTransactions() {
  return (
    <AppCard>
      <Text style={{ fontSize: 18, fontWeight: '600', color: colors.textPrimary, marginBottom: 14 }}>
        Recent Transactions
      </Text>
      {items.map((item) => (
        <View key={`${item.title}-${item.time}`} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
          <View>
            <Text style={{ color: colors.textPrimary, fontWeight: '600', fontSize: 16 }}>{item.title}</Text>
            <Text style={{ color: colors.textSecondary, marginTop: 4 }}>{item.time}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ color: colors.textPrimary, fontWeight: '700' }}>{item.amount}</Text>
            <Text style={{ color: colors.success, marginTop: 4 }}>{item.status}</Text>
          </View>
        </View>
      ))}
    </AppCard>
  );
}
