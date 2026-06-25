import { useState } from 'react';

import {
  View,
  Text,
  Button,
  TextInput,
  Alert,
  StyleSheet,
} from 'react-native';
import { initSDK } from './ClearQuoteSDK';

type InitializeScreenProps = {
  onInitSuccess: () => void;
};

export default function InitializeScreen({ onInitSuccess }: Readonly<InitializeScreenProps>) {
  const [sdkKey, setSdkKey] = useState('');

  const initializeSDK = async () => {
    if (!sdkKey.trim()) {
      Alert.alert('Error', 'Please enter SDK Key');
      return;
    }

    try {
      const result = await initSDK(sdkKey);
      if (result.code === 200) {
        onInitSuccess();
      } else {
        Alert.alert('SDK Init Result', JSON.stringify(result, null, 2));
      }
    } catch (e: any) {
      Alert.alert('Init Failed', e.message || 'Unknown error');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
      <Text style={styles.title}>ClearQuoteSDK</Text>
      <Text style={styles.title}>React Native Demo App</Text>
      </View>

      <View style={styles.content}>
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
        <Button title="Initialize SDK" onPress={initializeSDK} />
      </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
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
    paddingVertical: 12,
    fontSize: 16,
    marginHorizontal: 16,
  },
  titleContainer: {
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
