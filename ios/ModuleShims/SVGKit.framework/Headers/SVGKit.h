#import <Foundation/Foundation.h>

// Compile-time shim so ClearQuoteSDK's .swiftinterface can `import SVGKit`
// when SVGKit is linked statically via SPM (no real framework product).
// Runtime symbols still come from the SPM SVGKit target via ClearQuoteSDKDeps.
