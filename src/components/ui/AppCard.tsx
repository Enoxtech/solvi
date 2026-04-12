import { PropsWithChildren } from 'react';
import { View, ViewStyle } from 'react-native';
import { tokens } from '../../theme/tokens';

export function AppCard({ children, style }: PropsWithChildren<{ style?: ViewStyle }>) {
  return (
    <View
      style={{
        backgroundColor: tokens.colors.surface,
        borderRadius: tokens.radius.xl,
        padding: tokens.spacing.xl,
        marginBottom: tokens.spacing.xl,
        ...tokens.shadow.card,
        ...style
      }}
    >
      {children}
    </View>
  );
}
