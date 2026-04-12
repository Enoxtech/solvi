import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSpring,
  withSequence,
  Easing
} from 'react-native-reanimated';
import { PressableScale } from '../ui/PressableScale';
import { useRouter, usePathname } from 'expo-router';
import { useAppTheme } from '../../theme/ThemeProvider';

const CARD_WIDTH = Dimensions.get('window').width - 40;
const particles = Array.from({ length: 16 });
const gridLines = Array.from({ length: 11 });

const tabs = [
  { key: '/(tabs)', label: 'Home', icon: '⌂' },
  { key: '/(tabs)/transactions', label: 'Transactions', icon: '☰' },
  { key: '/transfer/step-1', label: 'Send RMB', icon: '↑', center: true },
  { key: '/services', label: 'Services', icon: '⚡' },
  { key: '/(tabs)/profile', label: 'Profile', icon: '◉' }
];

function TabIcon({ icon, focused }: { icon: string; focused: boolean }) {
  return (
    <Text style={{ color: focused ? '#fff' : '#94A3B8', fontSize: 18 }}>
      {icon}
    </Text>
  );
}

export function AnimatedTabBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { colors, isDark } = useAppTheme();
  const shine = useSharedValue(0);

  React.useEffect(() => {
    shine.value = withRepeat(
      withTiming(1, { duration: 2200, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const shineStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -60 + shine.value * (CARD_WIDTH + 120) }],
    opacity: 0.18
  }));

  return (
    <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 20, paddingBottom: 16 }}>
      <View style={{ height: 80, backgroundColor: isDark ? '#0D1B2A' : '#FFFFFF', borderRadius: 26, overflow: 'hidden' }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8 }}>
          {tabs.map((tab) => {
            const isActive = pathname === tab.key || (pathname === '/' && tab.key === '/(tabs)');
            const isCenter = tab.center;

            return (
              <PressableScale
                key={tab.key}
                onPress={() => router.push(tab.key as any)}
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 12 }}
              >
                <View
                  style={[
                    isCenter
                      ? { width: 52, height: 52, borderRadius: 26, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginBottom: -4 }
                      : { alignItems: 'center', justifyContent: 'center' }
                  ]}
                >
                  <TabIcon icon={tab.icon} focused={isActive || isCenter} />
                  {!isCenter && (
                    <Text style={{ color: isActive ? colors.primary : '#94A3B8', fontSize: 10, marginTop: 4, fontWeight: '600' }}>
                      {tab.label}
                    </Text>
                  )}
                  {isCenter && (
                    <Text style={{ color: '#fff', fontSize: 10, marginTop: 2, fontWeight: '700' }}>{tab.label}</Text>
                  )}
                </View>
              </PressableScale>
            );
          })}
        </View>

        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 0,
              width: 60,
              height: '100%',
              backgroundColor: colors.primary,
              opacity: 0.14
            },
            shineStyle
          ]}
        />
      </View>
    </View>
  );
}
