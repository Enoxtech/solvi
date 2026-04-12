import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '../src/theme/ThemeProvider';
import { queryClient } from '../src/lib/queryClient';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <StatusBar style="auto" />
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="transfer/step-1" />
              <Stack.Screen name="transfer/step-2" />
              <Stack.Screen name="transfer/step-3" />
              <Stack.Screen name="transfer/success" />
              <Stack.Screen name="funding" />
              <Stack.Screen name="withdraw" />
              <Stack.Screen name="receipt/[id]" />
              <Stack.Screen name="services" />
              <Stack.Screen name="support/help-desk" />
            </Stack>
          </ThemeProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
