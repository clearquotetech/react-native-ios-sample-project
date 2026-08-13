import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import InitializeScreen from './src/screens/InitializeScreen';
import InspectionScreen from './src/screens/InspectionScreen';
import { ClearQuoteSDK } from './src/ClearQuoteSDK';
import type { RootStackParamList } from './src/types/navigationTypes';

const Stack = createNativeStackNavigator<RootStackParamList>();

function getInitialRouteName(): keyof RootStackParamList {
  try {
    return ClearQuoteSDK.isSDKInitialized() ? 'Inspection' : 'Initialize';
  } catch {
    return 'Initialize';
  }
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={getInitialRouteName()}
            screenOptions={{ headerShown: false, orientation: 'portrait' }}
          >
            <Stack.Screen name="Initialize" component={InitializeScreen} />
            <Stack.Screen name="Inspection" component={InspectionScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
