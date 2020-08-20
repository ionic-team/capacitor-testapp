import React from 'react';

import App from './pages/App';
import BackgroundTask from './pages/BackgroundTask';
import Browser from './pages/Browser';
import Camera from './pages/Camera';
import Clipboard from './pages/Clipboard';
import Console from './pages/Console';
import Device from './pages/Device';
import Filesystem from './pages/Filesystem';
import Geolocation from './pages/Geolocation';
import Haptics from './pages/Haptics';
import Keyboard from './pages/Keyboard';
import LocalNotifications from './pages/LocalNotifications';
import Modals from './pages/Modals';
import NetworkPage from './pages/Network';
import Permissions from './pages/Permissions';
import PushNotifications from './pages/PushNotifications';
import ScreenReader from './pages/ScreenReader';
import Share from './pages/Share';
import SplashScreen from './pages/SplashScreen';
import StatusBar from './pages/StatusBar';
import Storage from './pages/Storage';
import TextZoom from './pages/TextZoom';
import Toast from './pages/Toast';
import WebView from './pages/WebView';

interface AppPage {
  readonly url: string;
  readonly title: string;
  readonly icon: JSX.Element;
  readonly component: typeof React.Component | React.FC;
}

const routes: AppPage[] = [
  {
    title: 'App',
    url: '/app',
    icon: (
      <span role="img" aria-label="mobile phone">
        📱
      </span>
    ),
    component: App,
  },
  {
    title: 'Background Task',
    url: '/background-task',
    icon: (
      <span role="img" aria-label="hammer and wrench">
        🛠
      </span>
    ),
    component: BackgroundTask,
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
    component: Camera,
  },
  {
    title: 'Clipboard',
    url: '/clipboard',
    icon: (
      <span role="img" aria-label="clipboard">
        📋
      </span>
    ),
    component: Clipboard,
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
    component: Device,
  },
  {
    title: 'Filesystem',
    url: '/filesystem',
    icon: (
      <span role="img" aria-label="file cabinet">
        🗄
      </span>
    ),
    component: Filesystem,
  },
  {
    title: 'Geolocation',
    url: '/geolocation',
    icon: (
      <span role="img" aria-label="globe showing Americas">
        🌎
      </span>
    ),
    component: Geolocation,
  },
  {
    title: 'Haptics',
    url: '/haptics',
    icon: (
      <span role="img" aria-label="boxing glove">
        🥊
      </span>
    ),
    component: Haptics,
  },
  {
    title: 'Keyboard',
    url: '/keyboard',
    icon: (
      <span role="img" aria-label="musical keyboard">
        🎹
      </span>
    ),
    component: Keyboard,
  },
  {
    title: 'Local Notifications',
    url: '/local-notifications',
    icon: (
      <span role="img" aria-label="pager">
        📟
      </span>
    ),
    component: LocalNotifications,
  },
  {
    title: 'Modals',
    url: '/modals',
    icon: (
      <span role="img" aria-label="bento box">
        🍱
      </span>
    ),
    component: Modals,
  },
  {
    title: 'Motion',
    url: '/motion',
    icon: (
      <span role="img" aria-label="runner">
        🏃
      </span>
    ),
    component: Modals,
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
    title: 'Permissions',
    url: '/permissions',
    icon: (
      <span role="img" aria-label="permissions">
        🍿
      </span>
    ),
    component: Permissions,
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
    title: 'Share',
    url: '/share',
    icon: (
      <span role="img" aria-label="eyes">
        👀
      </span>
    ),
    component: Share,
  },
  {
    title: 'Splash Screen',
    url: '/splash-screen',
    icon: (
      <span role="img" aria-label="wave">
        🌊
      </span>
    ),
    component: SplashScreen,
  },
  {
    title: 'Status Bar',
    url: '/status-bar',
    icon: (
      <span role="img" aria-label="vertical traffic light">
        🚦
      </span>
    ),
    component: StatusBar,
  },
  {
    title: 'Storage',
    url: '/storage',
    icon: (
      <span role="img" aria-label="wastebasket">
        🗑
      </span>
    ),
    component: Storage,
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
    component: Toast,
  },
  {
    title: 'WebView',
    url: '/webview',
    icon: (
      <span role="img" aria-label="admission ticket">
        🎟
      </span>
    ),
    component: WebView,
  },
];

export default routes;
