import { View, Text } from 'react-native';
import { colors } from '../../theme/colors';

export function StepHeader({ step }: { step: 1 | 2 | 3 }) {
  const items = ['Amount', 'Recipient', 'Confirm'];

  return (
    <View style={{ backgroundColor: '#fff', borderRadius: 24, padding: 18, marginBottom: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
        {items.map((item) => (
          <Text key={item} style={{ fontSize: 16, color: colors.textPrimary }}>{item}</Text>
        ))}
      </View>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {[1, 2, 3].map((n) => (
          <View key={n} style={{ flex: 1, height: 4, borderRadius: 999, backgroundColor: n <= step ? colors.primary : colors.divider }} />
        ))}
      </View>
    </View>
  );
}
