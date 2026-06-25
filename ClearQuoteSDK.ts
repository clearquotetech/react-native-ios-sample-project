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

/**
 * Get dealer code
 */
export function getDealerCode(): string | null {
  return ClearQuoteModule.getDealerCode();
}

/**
 * Check if SDK is initialized
 */
export function isSDKInitialized(): boolean {
  return ClearQuoteModule().isSDKInitialized();
}