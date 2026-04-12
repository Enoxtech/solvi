import { View, Text, FlatList } from 'react-native';
import { Screen } from '../../src/components/ui/Screen';
import { AppCard } from '../../src/components/ui/AppCard';
import { useAppTheme } from '../../src/theme/ThemeProvider';

const txData = [
  { id: '1', desc: 'Sent to Zhang Wei via Alipay', amount: '-RMB 5,000', date: 'Today', type: 'debit' },
  { id: '2', desc: 'Funded via Card ****4521', amount: '+₦50,000', date: 'Today', type: 'credit' },
  { id: '3', desc: 'Exchange conversion', amount: '-₦102,250', date: 'Yesterday', type: 'debit' },
  { id: '4', desc: 'Received from Wei Trading Ltd', amount: '+RMB 12,000', date: 'Yesterday', type: 'credit' },
  { id: '5', desc: 'Airtime purchase', amount: '-₦5,000', date: 'Apr 8', type: 'debit' },
];

export default function TransactionsScreen() {
  const { colors } = useAppTheme();

  return (
    <Screen>
      <Text style={{ fontSize: 26, fontWeight: '800', color: colors.textPrimary, marginBottom: 24 }}>
        Transactions
      </Text>
      <FlatList
        data={txData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AppCard style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: colors.textPrimary, fontWeight: '500' }}>{item.desc}</Text>
                <Text style={{ color: colors.textMuted, fontSize: 12, marginTop: 2 }}>{item.date}</Text>
              </View>
              <Text
                style={{
                  color: item.type === 'credit' ? colors.success : colors.error,
                  fontWeight: '700',
                  fontSize: 15
                }}
              >
                {item.amount}
              </Text>
            </View>
          </AppCard>
        )}
      />
    </Screen>
  );
}
