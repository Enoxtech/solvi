import { colors } from './colors';
import { spacing } from './spacing';
import { radius } from './radius';

export const tokens = {
  colors,
  spacing,
  radius,
  shadow: {
    card: {
      shadowColor: '#000',
      shadowOpacity: 0.04,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 4 },
      elevation: 2
    }
  }
} as const;
