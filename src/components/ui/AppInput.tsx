import { Text, TextInput, View } from 'react-native';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';

export function AppInput({
  label,
  placeholder,
  value,
  onChangeText,
  multiline = false
}: {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (value: string) => void;
  multiline?: boolean;
}) {
  return (
    <View style={{ marginBottom: 16 }}>
      {label ? <Text style={{ marginBottom: 10, color: colors.textPrimary, fontSize: 16, fontWeight: '500' }}>{label}</Text> : null}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        style={{
          minHeight: multiline ? 140 : 56,
          backgroundColor: '#EFF2F6',
          borderRadius: radius.lg,
          paddingHorizontal: 16,
          paddingVertical: multiline ? 16 : 0,
          color: colors.textPrimary,
          fontSize: 16,
          textAlignVertical: 'top'
        }}
      />
    </View>
  );
}
