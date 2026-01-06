import { useState } from 'react';

import {
  View,
  Text,
  Button,
  TextInput,
  Alert,
  StyleSheet
} from 'react-native';

import {
  initSDK,
  startInspection,
  logout,
} from './ClearQuoteSDK';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {

  const [sdkKey, setSdkKey] = useState('');

  const initializeSDK = async () => {
    if (!sdkKey.trim()) {
      Alert.alert('Error', 'Please enter SDK Key');
      return;
    }

    try {
      const result = await initSDK(sdkKey);
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
      <Text style={styles.text}>ClearQuote SDK Key</Text>

      <TextInput
        style={styles.textInput}
        placeholder="Enter SDK Key"
        value={sdkKey}
        onChangeText={setSdkKey}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <View style={styles.button}>
        <Button title="Init SDK" onPress={initializeSDK} />
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
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  text: {
    borderWidth: 1,
    padding: 12,
    fontSize: 16,
    marginHorizontal: 16,
  }
});