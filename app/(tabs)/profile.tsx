import { View, Text, Pressable, Alert } from 'react-native';
import { Screen } from '../../src/components/ui/Screen';
import { AppCard } from '../../src/components/ui/AppCard';
import { AppButton } from '../../src/components/ui/AppButton';
import { useAppTheme } from '../../src/theme/ThemeProvider';
import { useAuthStore } from '../../src/state/authStore';

export default function ProfileScreen() {
  const { colors } = useAppTheme();
  const { user, clearSession } = useAuthStore();

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => {
          clearSession();
        }
      }
    ]);
  };

  return (
    <Screen>
      <Text style={{ fontSize: 26, fontWeight: '800', color: colors.textPrimary, marginBottom: 24 }}>
        Profile
      </Text>

      <AppCard>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <View style={{ width: 72, height: 72, borderRadius: 24, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
            <Text style={{ color: '#fff', fontSize: 28, fontWeight: '800' }}>E</Text>
          </View>
          <Text style={{ color: colors.textPrimary, fontWeight: '700', fontSize: 20 }}>{user?.name ?? 'Enoch'}</Text>
          <Text style={{ color: colors.textMuted, fontSize: 14 }}>{user?.email ?? 'enoch@solvi.app'}</Text>
        </View>
      </AppCard>

      <AppCard>
        {[
          'Edit Profile',
          'Change PIN',
          'Notifications',
          'Security',
          'Help & Support',
        ].map((item, i) => (
          <Pressable
            key={item}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 14,
              borderBottomWidth: i < 4 ? 1 : 0,
              borderBottomColor: colors.divider
            }}
          >
            <Text style={{ color: colors.textPrimary, fontSize: 15 }}>{item}</Text>
            <Text style={{ color: colors.textMuted }}>›</Text>
          </Pressable>
        ))}
      </AppCard>

      <View style={{ marginTop: 20 }}>
        <AppButton label="Sign Out" variant="secondary" onPress={handleLogout} />
      </View>
    </Screen>
  );
}
