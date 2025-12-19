#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ClearQuoteModule, NSObject)

RCT_EXTERN_METHOD(
  initSDK:(NSString *)key
  resolver:(RCTPromiseResolveBlock)resolve
  rejecter:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
  startInspection:(RCTPromiseResolveBlock)resolve
  rejecter:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(logout)

@end
