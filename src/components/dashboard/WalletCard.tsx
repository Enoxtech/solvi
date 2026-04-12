import { View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';

export function WalletCard({
  title,
  amount,
  currency
}: {
  title: string;
  amount: string;
  currency: 'NGN' | 'RMB';
}) {
  return (
    <LinearGradient
      colors={[colors.navy, '#114B8D']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ borderRadius: radius.xl, padding: 22, minHeight: 150, marginBottom: 16 }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16 }}>{title}</Text>
        <View style={{ backgroundColor: 'rgba(255,255,255,0.16)', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999 }}>
          <Text style={{ color: '#fff', fontWeight: '600' }}>{currency}</Text>
        </View>
      </View>
      <View style={{ marginTop: 26 }}>
        <Text style={{ color: '#fff', fontSize: 42, fontWeight: '700' }}>{amount}</Text>
      </View>
      <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
        <Pressable style={{ width: 28, height: 8, borderRadius: 999, backgroundColor: colors.primary }} />
        <Pressable style={{ width: 12, height: 8, borderRadius: 999, backgroundColor: '#CFCFD4' }} />
      </View>
    </LinearGradient>
  );
}
