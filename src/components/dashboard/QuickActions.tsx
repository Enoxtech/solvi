import { View, Text, Pressable } from 'react-native';
import { AppCard } from '../ui/AppCard';
import { colors } from '../../theme/colors';

const actions = ['Send RMB', 'Convert', 'Airtime', 'More'];

export function QuickActions() {
  return (
    <AppCard>
      <Text style={{ fontSize: 18, fontWeight: '600', color: colors.textPrimary, marginBottom: 18 }}>Quick Actions</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {actions.map((action) => (
          <Pressable key={action} style={{ alignItems: 'center', width: '22%' }}>
            <View style={{ width: 56, height: 56, borderRadius: 16, backgroundColor: colors.mutedBlue, marginBottom: 10 }} />
            <Text style={{ fontSize: 13, textAlign: 'center', color: colors.textPrimary }}>{action}</Text>
          </Pressable>
        ))}
      </View>
    </AppCard>
  );
}
