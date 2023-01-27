import React from 'react';

import ActionSheetPage from './pages/ActionSheet';
import AppPage from './pages/App';
import Browser from './pages/Browser';
import CameraPage from './pages/Camera';
import ClipboardPage from './pages/Clipboard';
import Console from './pages/Console';
import CookiesPage from './pages/Cookies';
import DevicePage from './pages/Device';
import DialogPage from './pages/Dialog';
import FilesystemPage from './pages/Filesystem';
import GeolocationPage from './pages/Geolocation';
import HapticsPage from './pages/Haptics';
import HttpPage from './pages/Http';
import KeyboardPage from './pages/Keyboard';
import LocalNotificationsPage from './pages/LocalNotifications';
import MotionPage from './pages/Motion';
import NetworkPage from './pages/Network';
import PushNotifications from './pages/PushNotifications';
import ScreenReader from './pages/ScreenReader';
import ScreenOrientation from './pages/ScreenOrientation';
import SharePage from './pages/Share';
import SplashScreenPage from './pages/SplashScreen';
import StatusBarPage from './pages/StatusBar';
import Preferences from './pages/Preferences';
import TextZoom from './pages/TextZoom';
import ToastPage from './pages/Toast';

interface Page {
  readonly url: string;
  readonly title: string;
  readonly icon: JSX.Element;
  readonly component: typeof React.Component | React.FC;
}

const routes: Page[] = [
  {
    title: 'Action Sheet',
    url: '/action-sheet',
    icon: (
      <span role="img" aria-label="bento box">
        🍱
      </span>
    ),
    component: ActionSheetPage,
  },
  {
    title: 'App',
    url: '/app',
    icon: (
      <span role="img" aria-label="mobile phone">
        📱
      </span>
    ),
    component: AppPage,
  },
  {
    title: 'Browser',
    url: '/browser',
    icon: (
      <span role="img" aria-label="surfer">
        🏄
      </span>
    ),
    component: Browser,
  },
  {
    title: 'Camera',
    url: '/camera',
    icon: (
      <span role="img" aria-label="camera with flash">
        📸
      </span>
    ),
    component: CameraPage,
  },
  {
    title: 'Clipboard',
    url: '/clipboard',
    icon: (
      <span role="img" aria-label="clipboard">
        📋
      </span>
    ),
    component: ClipboardPage,
  },
  {
    title: 'Cookies',
    url: '/cookies',
    icon: (
      <span role="img" aria-label="cookies">
        🍪
      </span>
    ),
    component: CookiesPage,
  },
  {
    title: 'Console',
    url: '/console',
    icon: (
      <span role="img" aria-label="receipt">
        🧾
      </span>
    ),
    component: Console,
  },
  {
    title: 'Device',
    url: '/device',
    icon: (
      <span role="img" aria-label="robot">
        🤖
      </span>
    ),
    component: DevicePage,
  },
  {
    title: 'Dialog',
    url: '/dialog',
    icon: (
      <span role="img" aria-label="bento box">
        🍱
      </span>
    ),
    component: DialogPage,
  },
  {
    title: 'Filesystem',
    url: '/filesystem',
    icon: (
      <span role="img" aria-label="file cabinet">
        🗄
      </span>
    ),
    component: FilesystemPage,
  },
  {
    title: 'Geolocation',
    url: '/geolocation',
    icon: (
      <span role="img" aria-label="globe showing Americas">
        🌎
      </span>
    ),
    component: GeolocationPage,
  },
  {
    title: 'Haptics',
    url: '/haptics',
    icon: (
      <span role="img" aria-label="boxing glove">
        🥊
      </span>
    ),
    component: HapticsPage,
  },
  {
    title: 'HTTP',
    url: '/http',
    icon: (
      <span role="img" aria-label="globe with meridians">
        🌐
      </span>
    ),
    component: HttpPage,
  },
  {
    title: 'Keyboard',
    url: '/keyboard',
    icon: (
      <span role="img" aria-label="musical keyboard">
        🎹
      </span>
    ),
    component: KeyboardPage,
  },
  {
    title: 'Local Notifications',
    url: '/local-notifications',
    icon: (
      <span role="img" aria-label="pager">
        📟
      </span>
    ),
    component: LocalNotificationsPage,
  },
  {
    title: 'Motion',
    url: '/motion',
    icon: (
      <span role="img" aria-label="runner">
        🏃
      </span>
    ),
    component: MotionPage,
  },
  {
    title: 'Network',
    url: '/network',
    icon: (
      <span role="img" aria-label="abacus">
        🧮
      </span>
    ),
    component: NetworkPage,
  },
  {
    title: 'Push Notifications',
    url: '/push-notifications',
    icon: (
      <span role="img" aria-label="comet">
        ☄️
      </span>
    ),
    component: PushNotifications,
  },
  {
    title: 'Screen Reader',
    url: '/screen-reader',
    icon: (
      <span role="img" aria-label="cheering megaphone">
        📣
      </span>
    ),
    component: ScreenReader,
  },
  {
    title: 'Screen Orientation',
    url: '/screen-orientation',
    icon: (
      <span role="img" aria-label="counterclockwise arrows">
        🔄
      </span>
    ),
    component: ScreenOrientation,
  },
  {
    title: 'Share',
    url: '/share',
    icon: (
      <span role="img" aria-label="eyes">
        👀
      </span>
    ),
    component: SharePage,
  },
  {
    title: 'Splash Screen',
    url: '/splash-screen',
    icon: (
      <span role="img" aria-label="wave">
        🌊
      </span>
    ),
    component: SplashScreenPage,
  },
  {
    title: 'Status Bar',
    url: '/status-bar',
    icon: (
      <span role="img" aria-label="vertical traffic light">
        🚦
      </span>
    ),
    component: StatusBarPage,
  },
  {
    title: 'Preferences',
    url: '/preferences',
    icon: (
      <span role="img" aria-label="wastebasket">
        🗑
      </span>
    ),
    component: Preferences,
  },
  {
    title: 'Text Zoom',
    url: '/text-zoom',
    icon: (
      <span role="img" aria-label="detective with magnifying glass">
        🕵️
      </span>
    ),
    component: TextZoom,
  },
  {
    title: 'Toast',
    url: '/toast',
    icon: (
      <span role="img" aria-label="bread">
        🍞
      </span>
    ),
    component: ToastPage,
  },
];

export default routes;
