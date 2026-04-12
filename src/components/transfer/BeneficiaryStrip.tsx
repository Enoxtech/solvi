import { View, Text } from 'react-native';
import { AppCard } from '../ui/AppCard';
import { colors } from '../../theme/colors';

export function BeneficiaryStrip({ label, detail }: { label?: string; detail?: string }) {
  return (
    <AppCard>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View style={{ width: 48, height: 48, borderRadius: 999, backgroundColor: colors.mutedBlue }} />
        <View>
          <Text style={{ color: colors.textSecondary, fontSize: 13 }}>{label ?? 'Beneficiary'}</Text>
          <Text style={{ color: colors.textPrimary, fontWeight: '600', marginTop: 2 }}>{detail ?? '—'}</Text>
        </View>
      </View>
    </AppCard>
  );
}
