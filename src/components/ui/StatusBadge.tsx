import { View, Text } from 'react-native';
import { colors } from '../../theme/colors';

export function StatusBadge({ status }: { status: string }) {
  const colorMap: Record<string, string> = {
    Completed: colors.success,
    Pending: colors.warning,
    Failed: colors.error
  };

  return (
    <View style={{ backgroundColor: colorMap[status] ?? colors.textSecondary, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 999 }}>
      <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>{status}</Text>
    </View>
  );
}
