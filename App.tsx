import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import {
  View,
  Text,
  Button,
  TextInput,
  Alert,
  NativeModules,
  NativeEventEmitter,
  StyleSheet,
} from 'react-native';

import {
  initSDK,
  startInspection,
  logout,
} from './ClearQuoteSDK';

export default function App() {

  const [sdkKey, setSdkKey] = useState('');

  const initSDK = async () => {
  if (!sdkKey.trim()) {
    Alert.alert('Error', 'Please enter SDK Key');
    return;
  }

  try {
    const result = await NativeModules.ClearQuoteModule.initSDK(sdkKey);
    Alert.alert('SDK Init Result', JSON.stringify(result, null, 2));
  } catch (e: any) {
    Alert.alert('Init Failed', e.message || 'Unknown error');
  }
  };

  const onStartInspection = async () => {
    try {
      await startInspection();
    } catch (e: any) {
      Alert.alert('Error', e?.message ?? 'Start failed');
    }
  };

  const onLogout = () => {
    logout();
    Alert.alert('Logout', 'Done');
  };

  return (
    <SafeAreaView style={styles.container}>
    <Text style={{
    borderWidth: 1,
    padding: 12,
    fontSize: 16,
    marginHorizontal: 16,
  }}>ClearQuote SDK Key</Text>

<TextInput
    style={{
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    marginHorizontal: 16,
  }}
  placeholder="Enter SDK Key"
  value={sdkKey}
  onChangeText={setSdkKey}
  autoCapitalize="none"
  autoCorrect={false}
/>
      <View style={styles.button}>
        <Button title="Init SDK" onPress={initSDK} />
      </View>

      <View style={styles.button}>
        <Button title="Start Inspection" onPress={onStartInspection} />
      </View>

      <View style={styles.button}>
        <Button title="Logout" onPress={onLogout} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  button: {
    marginVertical: 10,
  },
});