import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
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
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '../../theme/ThemeProvider';
import { PressableScale } from '../ui/PressableScale';

const CARD_WIDTH = Dimensions.get('window').width - 40;
const particles = Array.from({ length: 16 });
const gridLines = Array.from({ length: 11 });

function Card({
  title,
  amount,
  currency,
  accent = '#fff'
}: {
  title: string;
  amount: string;
  currency: string;
  accent?: string;
}) {
  const { colors, isDark } = useAppTheme();

  const shineX = useSharedValue(0);
  React.useEffect(() => {
    shineX.value = withRepeat(
      withTiming(1, { duration: 2800, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const shineStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -80 + shineX.value * (CARD_WIDTH + 160) }],
    opacity: 0.28
  }));

  const y1 = useSharedValue(0);
  const y2 = useSharedValue(0);
  const y3 = useSharedValue(0);

  React.useEffect(() => {
    y1.value = withRepeat(
      withSequence(
        withTiming(-6, { duration: 1400, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1400, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    y2.value = withRepeat(
      withSequence(
        withTiming(5, { duration: 1800, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1800, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    y3.value = withRepeat(
      withSequence(
        withTiming(-4, { duration: 2200, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 2200, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  const s1 = useAnimatedStyle(() => ({ transform: [{ translateY: y1.value }] }));
  const s2 = useAnimatedStyle(() => ({ transform: [{ translateY: y2.value }] }));
  const s3 = useAnimatedStyle(() => ({ transform: [{ translateY: y3.value }] }));

  return (
    <View style={{ width: CARD_WIDTH, borderRadius: 28, overflow: 'hidden' }}>
      <LinearGradient
        colors={[colors.navy, accent] as any}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ borderRadius: 28, padding: 22, minHeight: 180 }}
      >
        {gridLines.map((_, i) => (
          <View
            key={`g-${i}`}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: i * 18,
              height: 1,
              backgroundColor: 'rgba(255,255,255,0.05)'
            }}
          />
        ))}

        {[
          { style: s1, left: '8%', top: '22%', size: 4, delay: 0 },
          { style: s2, left: '30%', top: '55%', size: 3, delay: 200 },
          { style: s3, left: '62%', top: '35%', size: 5, delay: 400 },
          { style: s1, left: '82%', top: '72%', size: 3, delay: 600 }
        ].map((p, i) => (
          <Animated.View key={`p-${i}`} style={[p.style, { position: 'absolute', left: p.left, top: p.top }]}>
            <View
              style={{
                width: p.size,
                height: p.size,
                borderRadius: p.size / 2,
                backgroundColor: 'rgba(255,255,255,0.22)'
              }}
            />
          </Animated.View>
        ))}

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14 }}>{title}</Text>
          <View style={{ backgroundColor: 'rgba(255,255,255,0.14)', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999 }}>
            <Text style={{ color: '#fff', fontWeight: '600', fontSize: 14 }}>{currency}</Text>
          </View>
        </View>

        <View style={{ marginTop: 18 }}>
          <Text style={{ color: '#fff', fontSize: 38, fontWeight: '800', letterSpacing: -1 }}>
            {amount}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 18, gap: 8 }}>
          <PressableScale>
            <View style={{ backgroundColor: 'rgba(255,255,255,0.12)', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 999 }}>
              <Text style={{ color: '#fff', fontWeight: '600', fontSize: 13 }}>Send</Text>
            </View>
          </PressableScale>
          <PressableScale>
            <View style={{ backgroundColor: 'rgba(255,255,255,0.08)', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 999 }}>
              <Text style={{ color: 'rgba(255,255,255,0.55)', fontWeight: '600', fontSize: 13 }}>Top Up</Text>
            </View>
          </PressableScale>
        </View>

        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 0,
              width: 70,
              height: '100%',
              backgroundColor: '#fff',
              borderRadius: 999
            },
            shineStyle
          ]}
        />
      </LinearGradient>
    </View>
  );
}

export function AnimatedBalanceCard() {
  return (
    <View style={{ marginBottom: 18 }}>
      <Card
        title="Naira Wallet"
        amount="₦ 103,418.00"
        currency="NGN"
        accent="#1D4ED8"
      />
    </View>
  );
}
