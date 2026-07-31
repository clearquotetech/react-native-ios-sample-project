import { NativeEventEmitter, NativeModules } from 'react-native';
import type { EmitterSubscription } from 'react-native';

const { ClearQuoteModule } = NativeModules;

function getClearQuoteEventEmitter(): NativeEventEmitter {
  if (ClearQuoteModule == null) {
    throw new Error('ClearQuoteModule is not available');
  }
  return new NativeEventEmitter(ClearQuoteModule);
}

/**
 * Initialize ClearQuote SDK
 */
export function initSDK(key: string): Promise<any> {
  return ClearQuoteModule.initSDK(key);
}

export type ClientAttrs = {
  userName?: string;
  dealer?: string;
  dealerIdentifier?: string;
  client_unique_id?: string;
  organisationId?: string;
};

export type CustomerDetails = {
  name?: string;
  email?: string;
  dialCode?: string;
  phoneNumber?: string;
};

export type VehicleDetails = {
  regNumber?: string;
  make?: string;
  model?: string;
  bodyStyle?: string;
  fuelType?: string;
  variant?: string;
};

export type QuoteData = {
  inspectionType?: string;
  fleetImageType?: string;
};

export type InputDetails = {
  customerDetails?: CustomerDetails;
  vehicleDetails?: VehicleDetails;
  quoteData?: QuoteData;
};

export type UserFlowParams = {
  isOffline?: boolean;
  skipInputPage?: boolean;
};

export type InspectionCompletionStatus = {
  identifier: string;
  message: string;
  code: number;
  isOffline: boolean;
  serverQuoteId: string | null;
  serverInspectionId: string | null;
};

/**
 * Start inspection flow
 */
export function startInspection(
  clientAttrs?: ClientAttrs,
  inputDetails?: InputDetails,
  userFlowParams?: UserFlowParams,
): Promise<any> {
  return ClearQuoteModule.startInspection(
    clientAttrs ?? null,
    inputDetails ?? null,
    userFlowParams ?? null,
  );
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
  return ClearQuoteModule.isSDKInitialized();
}

/**
 * Listen for inspection completion updates from the native SDK.
 */
export function addInspectionCompletionListener(
  listener: (status: InspectionCompletionStatus) => void,
): EmitterSubscription {
  return getClearQuoteEventEmitter().addListener(
    'inspectionCompletionStatus',
    listener,
  );
}
