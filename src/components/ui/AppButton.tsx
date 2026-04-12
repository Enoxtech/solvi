import { Pressable, Text } from 'react-native';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';

export function AppButton({
  label,
  onPress,
  variant = 'primary'
}: {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary';
}) {
  const backgroundColor = variant === 'primary' ? colors.primary : colors.surface;
  const textColor = variant === 'primary' ? '#FFFFFF' : colors.textPrimary;

  return (
    <Pressable
      onPress={onPress}
      style={{
        height: 56,
        borderRadius: radius.lg,
        backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: variant === 'secondary' ? 1 : 0,
        borderColor: colors.primary
      }}
    >
      <Text style={{ color: textColor, fontSize: 18, fontWeight: '600' }}>{label}</Text>
    </Pressable>
  );
}
