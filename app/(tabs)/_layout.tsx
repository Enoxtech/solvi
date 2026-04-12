import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';
import { useAppTheme } from '../../src/theme/ThemeProvider';

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text
        style={{
          color: focused ? '#1D4ED8' : '#8A9BB0',
          fontSize: 11,
          fontWeight: focused ? '600' : '400'
        }}
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  const { colors } = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 70,
          paddingTop: 8,
          backgroundColor: colors.surface,
          borderTopWidth: 0,
          elevation: 0
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Home', tabBarIcon: ({ focused }) => <TabIcon label="Home" focused={focused} /> }}
      />
      <Tabs.Screen
        name="transactions"
        options={{ title: 'Transactions', tabBarIcon: ({ focused }) => <TabIcon label="Transactions" focused={focused} /> }}
      />
      <Tabs.Screen
        name="contacts"
        options={{ title: 'Contacts', tabBarIcon: ({ focused }) => <TabIcon label="Contacts" focused={focused} /> }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Profile', tabBarIcon: ({ focused }) => <TabIcon label="Profile" focused={focused} /> }}
      />
    </Tabs>
  );
}
