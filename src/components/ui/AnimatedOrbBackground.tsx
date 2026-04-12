import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
  withSpring,
  Easing,
  interpolate
} from 'react-native-reanimated';
import { useAppTheme } from '../../theme/ThemeProvider';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');
const particles = Array.from({ length: 16 });
const gridLines = Array.from({ length: 11 });

export function AnimatedOrbBackground() {
  const { colors, isDark } = useAppTheme();

  const o1 = useSharedValue(0);
  const o2 = useSharedValue(0);
  const o3 = useSharedValue(0);

  React.useEffect(() => {
    o1.value = withRepeat(
      withTiming(1, { duration: 4800, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    o2.value = withRepeat(
      withTiming(1, { duration: 6200, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    o3.value = withRepeat(
      withTiming(1, { duration: 7400, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const orb1Style = useAnimatedStyle(() => {
    const scale = interpolate(o1.value, [0, 1], [0.85, 1.15]);
    const x = interpolate(o1.value, [0, 1], [-20, 20]);
    const y = interpolate(o1.value, [0, 1], [-15, 15]);
    return {
      transform: [{ scale }, { translateX: x }, { translateY: y }],
      opacity: isDark ? 0.7 : 0.55
    };
  });

  const orb2Style = useAnimatedStyle(() => {
    const scale = interpolate(o2.value, [0, 1], [0.9, 1.1]);
    const x = interpolate(o2.value, [0, 1], [15, -15]);
    const y = interpolate(o2.value, [0, 1], [10, -20]);
    return {
      transform: [{ scale }, { translateX: x }, { translateY: y }],
      opacity: isDark ? 0.5 : 0.4
    };
  });

  const orb3Style = useAnimatedStyle(() => {
    const scale = interpolate(o3.value, [0, 1], [0.8, 1.2]);
    const x = interpolate(o3.value, [0, 1], [-10, 25]);
    const y = interpolate(o3.value, [0, 1], [20, -10]);
    return {
      transform: [{ scale }, { translateX: x }, { translateY: y }],
      opacity: isDark ? 0.35 : 0.28
    };
  });

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: -SCREEN_H * 0.18,
            right: -SCREEN_W * 0.22,
            width: SCREEN_W * 0.72,
            height: SCREEN_W * 0.72,
            borderRadius: SCREEN_W * 0.72 / 2,
            backgroundColor: colors.orb1
          },
          orb1Style
        ]}
      />
      <Animated.View
        style={[
          {
            position: 'absolute',
            bottom: -SCREEN_H * 0.1,
            left: -SCREEN_W * 0.15,
            width: SCREEN_W * 0.55,
            height: SCREEN_W * 0.55,
            borderRadius: SCREEN_W * 0.55 / 2,
            backgroundColor: colors.orb2
          },
          orb2Style
        ]}
      />
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: SCREEN_H * 0.35,
            left: SCREEN_W * 0.6,
            width: SCREEN_W * 0.3,
            height: SCREEN_W * 0.3,
            borderRadius: SCREEN_W * 0.3 / 2,
            backgroundColor: colors.orb3
          },
          orb3Style
        ]}
      />
      {gridLines.map((_, i) => (
        <View
          key={`h-${i}`}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: i * (SCREEN_H / 11),
            height: 1,
            backgroundColor: colors.border
          }}
        />
      ))}
      {gridLines.map((_, i) => (
        <View
          key={`v-${i}`}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: i * (SCREEN_W / 11),
            width: 1,
            backgroundColor: colors.border
          }}
        />
      ))}
    </View>
  );
}
