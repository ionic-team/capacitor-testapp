/// <reference types="@capacitor/splash-screen" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.capacitorjs.testapp',
  appName: 'capacitor-testapp',
  webDir: 'build',
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
    },
  },
};

export = config;
