import { View, Text } from 'react-native';
import { Screen } from '../../src/components/ui/Screen';
import { AppButton } from '../../src/components/ui/AppButton';
import { useAppTheme } from '../../src/theme/ThemeProvider';

export default function FundingScreen() {
  const { colors } = useAppTheme();

  return (
    <Screen>
      <Text style={{ fontSize: 26, fontWeight: '800', color: colors.textPrimary, marginBottom: 24 }}>
        Fund Wallet
      </Text>
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Text style={{ color: colors.textMuted, fontSize: 16, textAlign: 'center' }}>
          Payment integration coming soon.{'\n'}Use the demo to explore the app.
        </Text>
      </View>
    </Screen>
  );
}
