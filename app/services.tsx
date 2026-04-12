import { View, Text } from 'react-native';
import { Screen } from '../../src/components/ui/Screen';
import { useAppTheme } from '../../src/theme/ThemeProvider';

export default function ServicesScreen() {
  const { colors } = useAppTheme();

  return (
    <Screen>
      <Text style={{ fontSize: 26, fontWeight: '800', color: colors.textPrimary, marginBottom: 24 }}>
        Services
      </Text>
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Text style={{ color: colors.textMuted, fontSize: 16, textAlign: 'center' }}>
          More services coming soon.
        </Text>
      </View>
    </Screen>
  );
}
