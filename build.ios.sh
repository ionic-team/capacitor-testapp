#!/bin/bash
# ionic capacitor sync
xcodebuild archive -workspace ios/App/App.xcworkspace -scheme App -sdk "iphonesimulator" -destination "generic/platform=iOS Simulator" -configuration Release -archivePath app/
zip -r app/App.zip app.xcarchive/Products/Applications/App.app