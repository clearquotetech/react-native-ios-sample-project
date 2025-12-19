//
//  ClearQuoteModule.swift
//  MyApp
//
//  Created by Abhishek on 08/12/25.
//

import Foundation
import ClearQuoteSDK
import UIKit
import React

@objc(ClearQuoteModule)
class ClearQuoteModule: NSObject {

  @objc(initSDK:resolver:rejecter:)
  func initSDK(
    _ key: String,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    DispatchQueue.main.async {
      guard let rootVC = UIApplication.shared.topMostViewController() else {
        reject("NO_VC", "No ViewController", nil)
        return
      }

      ClearQuote.shared.initSDK(
        baseVC: rootVC,
        key: key
      ) { isInitialized, code, message in
        resolve([
          "isInitialized": isInitialized,
          "code": code,
          "message": message
        ])
      }
    }
  }

  @objc(startInspection:rejecter:)
  func startInspection(
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    DispatchQueue.main.async {
      guard let rootVC = UIApplication.shared.topMostViewController() else {
        reject("NO_VC", "No ViewController", nil)
        return
      }

      ClearQuote.shared.startInspection(
        baseVC: rootVC,
        clearQuoteSdkDelegate: self
      ) { started, message, code in
        resolve([
          "started": started,
          "message": message,
          "code": code
        ])
      }
    }
  }

  @objc(logout)
  func logout() {
    ClearQuote.shared.logout()
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}

extension ClearQuoteModule: ClearQuoteSDKDelegate {
  func inspectionCompletionStatus(identifier: String, message: String, code: Int, isOffline: Bool, serverQuoteId: String?, serverInspectionId: String?) {
    
  }
}

extension UIApplication {
  func topMostViewController(
    base: UIViewController? = {
      if #available(iOS 13.0, *) {
        return UIApplication.shared
          .connectedScenes
          .compactMap { $0 as? UIWindowScene }
          .flatMap { $0.windows }
          .first { $0.isKeyWindow }?
          .rootViewController
      } else {
        return UIApplication.shared.keyWindow?.rootViewController
      }
    }()
  ) -> UIViewController? {

    if let nav = base as? UINavigationController {
      return topMostViewController(base: nav.visibleViewController)
    }

    if let tab = base as? UITabBarController {
      return topMostViewController(base: tab.selectedViewController)
    }

    if let presented = base?.presentedViewController {
      return topMostViewController(base: presented)
    }

    return base
  }
}
