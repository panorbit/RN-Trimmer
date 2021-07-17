//
//  RNTrimmerModule.swift
//  RNTrimmerModule
//
//  Copyright © 2021 Shubham Nagar. All rights reserved.
//

import Foundation

@objc(RNTrimmerModule)
class RNTrimmerModule: NSObject {
  @objc
  func constantsToExport() -> [AnyHashable : Any]! {
    return ["count": 1]
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
