import React, { createContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

export type ThemeMode = 'light' | 'dark' | 'system';

export type ThemePalette = {
  background: string;
  surface: string;
  surfaceAlt: string;
  primary: string;
  primaryLight: string;
  accentGold: string;
  success: string;
  warning: string;
  error: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  borderLight: string;
  divider: string;
  card: string;
  overlay: string;
  inputBg: string;
  nav: string;
  navBorder: string;
  glowBlue: string;
  glowGold: string;
  orb1: string;
  orb2: string;
  orb3: string;
  navy: string;
};

const lightPalette: ThemePalette = {
  background: '#EDF2F7',
  surface: 'rgba(255,255,255,0.82)',
  surfaceAlt: 'rgba(255,255,255,0.62)',
  primary: '#1D4ED8',
  primaryLight: '#3B82F6',
  accentGold: '#E7C873',
  success: '#16A34A',
  warning: '#F59E0B',
  error: '#DC2626',
  textPrimary: '#081A33',
  textSecondary: '#4B5B6E',
  textMuted: '#8C9BB0',
  border: 'rgba(0,0,0,0.06)',
  borderLight: 'rgba(0,0,0,0.03)',
  divider: 'rgba(0,0,0,0.06)',
  card: 'rgba(255,255,255,0.78)',
  overlay: 'rgba(0,0,0,0.4)',
  inputBg: '#EFF2F6',
  nav: '#FFFFFF',
  navBorder: 'rgba(0,0,0,0.06)',
  glowBlue: '#7DD3FC',
  glowGold: '#FDE68A',
  orb1: 'rgba(125,211,252,0.22)',
  orb2: 'rgba(29,78,216,0.14)',
  orb3: 'rgba(231,200,115,0.14)',
  navy: '#081A33'
};

const darkPalette: ThemePalette = {
  background: '#07101D',
  surface: 'rgba(12,22,38,0.82)',
  surfaceAlt: 'rgba(12,22,38,0.62)',
  primary: '#3B82F6',
  primaryLight: '#60A5FA',
  accentGold: '#E7C873',
  success: '#16A34A',
  warning: '#F59E0B',
  error: '#DC2626',
  textPrimary: '#F0F4F8',
  textSecondary: '#8A9BB0',
  textMuted: '#4B5B6E',
  border: 'rgba(255,255,255,0.06)',
  borderLight: 'rgba(255,255,255,0.03)',
  divider: 'rgba(255,255,255,0.06)',
  card: 'rgba(12,22,38,0.78)',
  overlay: 'rgba(0,0,0,0.6)',
  inputBg: 'rgba(255,255,255,0.06)',
  nav: '#0D1B2A',
  navBorder: 'rgba(255,255,255,0.06)',
  glowBlue: '#7DD3FC',
  glowGold: '#FDE68A',
  orb1: 'rgba(29,78,216,0.3)',
  orb2: 'rgba(59,130,246,0.2)',
  orb3: 'rgba(231,200,115,0.1)',
  navy: '#081A33'
};

export type ThemeContextValue = {
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
  colors: ThemePalette;
  isDark: boolean;
};

export const ThemeContext = createContext<ThemeContextValue>({
  mode: 'system',
  setMode: () => {},
  colors: lightPalette,
  isDark: false
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const system = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>('system');

  const isDark =
    mode === 'dark' || (mode === 'system' && system === 'dark');

  const colors = isDark ? darkPalette : lightPalette;

  const value: ThemeContextValue = { mode, setMode, colors, isDark };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
