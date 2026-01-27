/// <reference types="@capacitor/background-runner" />
/// <reference types="@capacitor/local-notifications" />
/// <reference types="@capacitor/push-notifications" />
/// <reference types="@capacitor/splash-screen" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.capacitorjs.app.testapp',
  appName: 'capacitor-testapp',
  webDir: 'dist',
  plugins: {
    BackgroundRunner: {
      label: "com.example.background.task",
      src: "background.js",
      event: "monitorLocation",
      repeat: true,
      interval: 2,
      autoStart: false,
    },
    CapacitorCookies: {
      enabled: true,
    },
    CapacitorHttp: {
      enabled: true,
    },
    SplashScreen: {
      launchAutoHide: false,
    },
    LocalNotifications: {
      smallIcon: 'ic_stat_icon_config_sample',
      iconColor: '#CE0B7C',
    },
    PushNotifications: {
      presentationOptions: ["alert", "sound"]
    }
  },
};

export default config;
