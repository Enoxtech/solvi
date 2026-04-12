import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function PressableScale({
  onPress,
  children,
  style
}: {
  onPress?: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => { scale.value = withSpring(0.94, { damping: 14, stiffness: 300 }); }}
      onPressOut={() => { scale.value = withSpring(1, { damping: 14, stiffness: 300 }); }}
      style={[animatedStyle, style]}
    >
      {children}
    </AnimatedPressable>
  );
}
