import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import InitializeScreen from './InitializeScreen';
import InspectionScreen from './InspectionScreen';
import { isSDKInitialized } from './ClearQuoteSDK';

export default function App() {
  const [screen, setScreen] = useState<'initialize' | 'inspection'>('initialize');

  useEffect(() => {
    try {
      if (isSDKInitialized()) {
        setScreen('inspection');
      }
    } catch {
      // Keep the initialize screen if native module is unavailable.
    }
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {screen === 'inspection' ? (
          <InspectionScreen onLogoutDone={() => setScreen('initialize')} />
        ) : (
          <InitializeScreen onInitSuccess={() => setScreen('inspection')} />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
