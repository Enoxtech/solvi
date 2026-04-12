import { View, Text, FlatList } from 'react-native';
import { Screen } from '../../src/components/ui/Screen';
import { AppCard } from '../../src/components/ui/AppCard';
import { useAppTheme } from '../../src/theme/ThemeProvider';

const contacts = [
  { id: '1', name: 'Zhang Wei', label: 'Alipay', avatar: 'ZW' },
  { id: '2', name: 'Wei Trading Ltd', label: 'Business', avatar: 'WT' },
  { id: '3', name: 'Li Ming', label: 'WeChat', avatar: 'LM' },
];

export default function ContactsScreen() {
  const { colors } = useAppTheme();

  return (
    <Screen>
      <Text style={{ fontSize: 26, fontWeight: '800', color: colors.textPrimary, marginBottom: 24 }}>
        Contacts
      </Text>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AppCard style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
              <View style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#fff', fontWeight: '700' }}>{item.avatar}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: colors.textPrimary, fontWeight: '600', fontSize: 16 }}>{item.name}</Text>
                <Text style={{ color: colors.textMuted, fontSize: 13 }}>{item.label}</Text>
              </View>
            </View>
          </AppCard>
        )}
      />
    </Screen>
  );
}
