#!/bin/bash
# ionic capacitor sync
xcodebuild archive -workspace ios/App/App.xcworkspace -scheme App -destination "platform=iOS Simulator,name=iPhone 12 Pro Max" -configuration Release -archivePath app/
zip -r app/App.zip app.xcarchive/Products/Applications/App.app