#!/bin/bash
# ionic capacitor sync
rm -rf app.xcarchive
mkdir app
# xcodebuild clean -workspace ios/App/App.xcworkspace -scheme App

# Build the Simulator .app
xcodebuild archive clean -workspace ios/App/App.xcworkspace -scheme App -sdk "iphonesimulator" -destination "generic/platform=iOS Simulator" -configuration Release -archivePath app/
zip -r app/App.zip app.xcarchive/Products/Applications/App.app

# Build the .ipa for native testing
xcodebuild -workspace ios/App/App.xcworkspace -scheme App -sdk "iphoneos" -archivePath app.xcarchive clean archive -configuration Release
xcodebuild -exportArchive -archivePath app.xcarchive -exportOptionsPlist ios/App/exportOptions.plist -exportPath App.ipa
