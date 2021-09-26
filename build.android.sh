#!/bin/bash
export ANDROID_SDK_ROOT=~/Library/Android/sdk
./android/gradlew assembleDebug
cp android/app/build/outputs/apk/debug/app-debug.apk ./app