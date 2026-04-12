import { useContext } from 'react';
import { ThemeContext } from '../theme/ThemeProvider';

export function useAppTheme() {
  return useContext(ThemeContext);
}
