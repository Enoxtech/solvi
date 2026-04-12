import { View } from 'react-native';
import { useAppTheme } from '../../theme/ThemeProvider';

export function GlassCard({ children, style }: any) {
  const { colors, isDark } = useAppTheme();
  return (
    <View
      style={[
        {
          backgroundColor: isDark ? 'rgba(12,22,38,0.82)' : 'rgba(255,255,255,0.82)',
          borderRadius: 28,
          padding: 18,
          marginBottom: 14,
          borderWidth: 1,
          borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.62)',
          backdropFilter: 'blur(20px)',
        },
        style
      ]}
    >
      {children}
    </View>
  );
}
