import { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '../../src/components/ui/Screen';
import { AppButton } from '../../src/components/ui/AppButton';
import { useAppTheme } from '../../src/theme/ThemeProvider';
import { useAuthStore } from '../../src/state/authStore';

const DEMO_EMAIL = 'enoch@solvi.app';
const DEMO_PASSWORD = 'Solvi2026!';

export default function LoginScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const setSession = useAuthStore((s) => s.setSession);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Missing fields', 'Please enter your email and password.');
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));

    // Mock login — accept demo credentials
    if (email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
      setSession({
        accessToken: 'mock-token-12345',
        user: { name: 'Enoch', email: DEMO_EMAIL }
      });
      router.replace('/(tabs)');
    } else {
      Alert.alert('Invalid credentials', 'Use enoch@solvi.app / Solvi2026! to access the demo.');
    }

    setLoading(false);
  };

  return (
    <Screen scroll={false}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={{ alignItems: 'center', marginBottom: 44 }}>
          <View
            style={{
              width: 72,
              height: 72,
              borderRadius: 24,
              backgroundColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 18
            }}
          >
            <Text style={{ color: '#fff', fontSize: 32, fontWeight: '900' }}>S</Text>
          </View>
          <Text style={{ fontSize: 30, fontWeight: '800', color: colors.textPrimary }}>
            Welcome back
          </Text>
          <Text style={{ color: colors.textSecondary, marginTop: 8 }}>Sign in to continue</Text>
        </View>

        <View style={{ gap: 16 }}>
          <View>
            <Text style={{ color: colors.textPrimary, marginBottom: 10, fontWeight: '500' }}>
              Email
            </Text>
            <TextInput
              placeholder="hello@example.com"
              placeholderTextColor={colors.textMuted}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              style={{
                height: 54,
                backgroundColor: colors.inputBg,
                borderRadius: 16,
                paddingHorizontal: 16,
                color: colors.textPrimary,
                fontSize: 16
              }}
            />
          </View>
          <View>
            <Text style={{ color: colors.textPrimary, marginBottom: 10, fontWeight: '500' }}>
              Password
            </Text>
            <TextInput
              placeholder="••••••••"
              placeholderTextColor={colors.textMuted}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={{
                height: 54,
                backgroundColor: colors.inputBg,
                borderRadius: 16,
                paddingHorizontal: 16,
                color: colors.textPrimary,
                fontSize: 16
              }}
            />
          </View>
          <Pressable onPress={() => router.push('/(auth)/forgot-password')}>
            <Text style={{ color: colors.primary, textAlign: 'right', fontWeight: '500' }}>
              Forgot Password?
            </Text>
          </Pressable>
        </View>

        <View style={{ marginTop: 30, gap: 14 }}>
          <AppButton
            label={loading ? 'Signing in...' : 'Sign In'}
            onPress={handleLogin}
          />

          {/* Demo hint */}
          <View
            style={{
              backgroundColor: colors.mutedBlue || '#EAF2FF',
              borderRadius: 12,
              padding: 14,
              marginTop: 4
            }}
          >
            <Text style={{ color: colors.textSecondary, fontSize: 13, textAlign: 'center' }}>
              Demo: enoch@solvi.app / Solvi2026!
            </Text>
          </View>

          <View
            style={{ flexDirection: 'row', justifyContent: 'center', gap: 8, marginTop: 4 }}
          >
            <Text style={{ color: colors.textSecondary }}>Don't have an account?</Text>
            <Pressable onPress={() => router.push('/(auth)/signup')}>
              <Text style={{ color: colors.primary, fontWeight: '600' }}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Screen>
  );
}
