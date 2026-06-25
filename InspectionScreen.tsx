import { useEffect, useState } from 'react';

import {
  View,
  Button,
  Alert,
  StyleSheet,
  Text,
} from 'react-native';
import { startInspection, logout, getDealerCode } from './ClearQuoteSDK';

type InspectionScreenProps = {
  onLogoutDone: () => void;
};

export default function InspectionScreen({ onLogoutDone }: Readonly<InspectionScreenProps>) {
  const [dealerCode, setDealerCode] = useState<string | null>(null);

  useEffect(() => {
    try {
      setDealerCode(getDealerCode());
    } catch {
      setDealerCode(null);
    }
  }, []);

  const onStartInspection = async () => {
    try {
      await startInspection();
    } catch (e: any) {
      Alert.alert('Error', e?.message ?? 'Start failed');
    }
  };

  const onLogout = () => {
    logout();
    onLogoutDone();
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Inspection</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.text}>Dealer Code: {dealerCode ?? '—'}</Text>

        <View style={styles.button}>
          <Button title="Start Inspection" onPress={onStartInspection} />
        </View>

        <View style={styles.button}>
          <Button title="Logout" color="red" onPress={onLogout} />
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
  titleContainer: {
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
  text: {
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: '500',
    marginHorizontal: 16,
  },
  button: {
    marginVertical: 10,
  },
});
