import { NativeModules } from 'react-native';

const { ClearQuoteModule } = NativeModules;

/**
 * Initialize ClearQuote SDK
 */
export function initSDK(key: string): Promise<any> {
  return ClearQuoteModule.initSDK(key);
}

/**
 * Start inspection flow
 */
export function startInspection(): Promise<any> {
  return ClearQuoteModule.startInspection();
}

/**
 * Logout SDK
 */
export function logout(): void {
  ClearQuoteModule.logout();
}
