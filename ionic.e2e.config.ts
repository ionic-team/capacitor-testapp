const config = {
  // override wdio config values here
  connectionRetryTimeout: 900000,
  logLevel: 'error',

  // desired capabilities here
  'ios:simulator': {
    'appium:platformName': 'iOS',
    'appium:deviceName': 'iPhone 12 Pro',
    'appium:platformVersion': '15.0',
    'appium:app': './.ionic/App-ios-simulator.zip',
    'appium:isHeadless': true,
    'appium:wdaLaunchTimeout': 600000,
  },
  'ios:browser': {
    'appium:deviceName': 'iPhone 12 Pro Max',
    'appium:platformVersion': '14.5',
  },
  'android:emulator': {
    'appium:platformName': 'Android',
    'appium:appWaitActivity': 'com.capacitorjs.app.testapp.MainActivity',
    'appium:app': './android/app/build/outputs/apk/debug/app-debug.apk',
    'appium:autoGrantPermissions': true,
    // 'appium:app': process.env.DEVICEFARM_APP_PATH,
  },
  'android:device': {
    'appium:deviceName': process.env.DEVICEFARM_DEVICE_NAME,
    'appium:platformName': process.env.DEVICEFARM_DEVICE_PLATFORM_NAME,
    'appium:appWaitActivity': 'com.capacitorjs.app.testapp.MainActivity',
    'appium:app': './android/app/build/outputs/apk/debug/app-debug.apk',
    'appium:allowTestPackages': true,
    'appium:autoGrantPermissions': true,
    // 'appium:app': process.env.DEVICEFARM_APP_PATH,
    'appium:appPackage': 'com.capacitorjs.app.testapp',
    'appium:appActivity': 'com.capacitorjs.app.testapp.MainActivity',
    'appium:udid': process.env.DEVICEFARM_DEVICE_UDID,
    'appium:platformVersion': process.env.DEVICEFARM_DEVICE_OS_VERSION,
    'appium:chromedriverExecutable':
      process.env.DEVICEFARM_CHROMEDRIVER_EXECUTABLE,
  },
  'android:browser': {
    'appium:deviceName': 'Pixel_3_10.0',
    'appium:platformVersion': '10.0',
  },
};

export default config;
