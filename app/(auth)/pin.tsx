import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '../../src/components/ui/Screen';
import { AppButton } from '../../src/components/ui/AppButton';
import { useAppTheme } from '../../src/theme/ThemeProvider';

export default function PinScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const [digits, setDigits] = useState(['', '', '', '']);

  return (
    <Screen scroll={false}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={{ alignItems: 'center', marginBottom: 44 }}>
          <Text style={{ fontSize: 28, fontWeight: '800', color: colors.textPrimary }}>Authorization PIN</Text>
          <Text style={{ color: colors.textSecondary, marginTop: 8, textAlign: 'center' }}>
            Enter the 4-digit PIN sent to your{'\n'}phone number and email
          </Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 16, marginBottom: 32 }}>
          {digits.map((d, i) => (
            <View
              key={i}
              style={{
                width: 58,
                height: 62,
                borderRadius: 16,
                borderWidth: 1.5,
                borderColor: d ? colors.primary : colors.border,
                backgroundColor: colors.inputBg,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={{ color: colors.textPrimary, fontSize: 22, fontWeight: '700' }}>{d}</Text>
            </View>
          ))}
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 16, marginBottom: 32 }}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'].map((key, i) => (
            <Pressable
              key={i}
              onPress={() => {
                if (key === '⌫') {
                  const next = [...digits];
                  const idx = next.findLastIndex((d) => d !== '');
                  if (idx >= 0) next[idx] = '';
                  setDigits(next);
                } else if (key !== '') {
                  const next = [...digits];
                  const idx = next.findIndex((d) => d === '');
                  if (idx >= 0) next[idx] = key;
                  setDigits(next);
                }
              }}
              style={{
                width: 72,
                height: 72,
                borderRadius: 999,
                backgroundColor: key === '' ? 'transparent' : colors.inputBg,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={{ color: colors.textPrimary, fontSize: 26, fontWeight: '600' }}>{key}</Text>
            </Pressable>
          ))}
        </View>

        <AppButton label="Confirm PIN" onPress={() => router.replace('/(tabs)')} />
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
          <Text style={{ color: colors.textSecondary }}>Didn't receive a code? </Text>
          <Pressable>
            <Text style={{ color: colors.primary, fontWeight: '600' }}>Resend</Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}
