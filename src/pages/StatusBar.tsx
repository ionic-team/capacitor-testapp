import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from '@ionic/react';
import React, { useState } from 'react';
import { StatusBar, Style } from '@capacitor/status-bar';

const StatusBarPage: React.FC = () => {
  const [statusbarInfoJson, setStatusbarInfoJson] = useState('');

  useIonViewDidEnter(() => {
    window.addEventListener('statusTap', function () {
      console.log('statusbar tapped');
    });
  });

  const changeStatusBar = async () => {
    StatusBar.setStyle({
      style: Style.Default,
    });
  };

  const changeStatusBarLight = async () => {
    StatusBar.setStyle({
      style: Style.Light,
    });
  };

  const changeStatusBarDark = async () => {
    StatusBar.setStyle({
      style: Style.Dark,
    });
  };

  const showStatusBar = async () => {
    StatusBar.show();
  };

  const hideStatusBar = async () => {
    StatusBar.hide();
  };

  const overlayStatusbar = async () => {
    StatusBar.setOverlaysWebView({ overlay: true });
  };

  const unOverlayStatusbar = async () => {
    StatusBar.setOverlaysWebView({ overlay: false });
  };

  const setBackgroundColor = async () => {
    const bits = [0, 0, 0];
    const randomColor = bits
      .map(b => {
        const v = Math.floor(Math.random() * 0xff).toString(16);
        if (v.length < 2) {
          return '0' + v;
        }
        return v;
      })
      .join('');
    console.log(`Random color: #${randomColor}`);
    StatusBar.setBackgroundColor({ color: `#${randomColor}` });
  };

  const getInfo = async () => {
    const info = await StatusBar.getInfo();
    console.log('Got statusbar info', info);
    setStatusbarInfoJson(JSON.stringify(info, null, 2));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Status Bar</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton expand="block" onClick={changeStatusBar}>
          Change StatusBar Style Default
        </IonButton>
        <IonButton expand="block" onClick={changeStatusBarLight}>
          Change StatusBar Style Light
        </IonButton>
        <IonButton expand="block" onClick={changeStatusBarDark}>
          Change StatusBar Style Dark
        </IonButton>
        <IonButton expand="block" onClick={showStatusBar}>
          Show
        </IonButton>
        <IonButton expand="block" onClick={hideStatusBar}>
          Hide
        </IonButton>
        <IonButton expand="block" onClick={overlayStatusbar}>
          overlay Statusbar
        </IonButton>
        <IonButton expand="block" onClick={unOverlayStatusbar}>
          unoverlay Statusbar
        </IonButton>
        <IonButton expand="block" onClick={setBackgroundColor}>
          Set Background Color
        </IonButton>

        <IonButton expand="block" onClick={getInfo}>
          get Info
        </IonButton>
        <div>
          <pre>{statusbarInfoJson}</pre>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default StatusBarPage;
