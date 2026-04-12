import { PropsWithChildren } from 'react';
import { SafeAreaView, ScrollView, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';

export function Screen({ children, scroll = true, style }: PropsWithChildren<{ scroll?: boolean; style?: ViewStyle }>) {
  if (scroll) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <ScrollView contentContainerStyle={[{ padding: 20, paddingBottom: 40 }, style]}>
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: colors.background, padding: 20 }, style]}>
      {children}
    </SafeAreaView>
  );
}
