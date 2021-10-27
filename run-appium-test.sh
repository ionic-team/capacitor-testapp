#!/bin/bash

set -o errexit
set -o nounset

if [ "$CI_PLATFORM" == "ios" ]; then
        echo "Running iOS Build"
        npm i -g appium@latest
        npm run build
        npx cap sync ios
        npm run e2e:build ios:simulator | xcpretty --color
        xcrun simctl list
        xcrun simctl boot "iPhone 12 Pro"
        npm run e2e:run ios:simulator
fi

if [ "$CI_PLATFORM" == "android" ]; then
        echo "Running Android Build"
fi

if [ "$CI_PLATFORM" == "web" ]; then
        echo "Running Web Build"
fi
