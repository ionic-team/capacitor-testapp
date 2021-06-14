import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from '@ionic/react';
import React, { useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { capInvoke } from '../utils/call';

const StatusBarPage: React.FC = () => {
  const [statusbarInfoJson, setStatusbarInfoJson] = useState('');
  const [showButtons, setShowButtons] = useState(true);

  useIonViewDidEnter(() => {
    if (Capacitor.isPluginAvailable('StatusBar')) {
      window.addEventListener('statusTap', function () {
        console.log('statusbar tapped');
      });
    } else {
      setShowButtons(false);
    }
  });

  const changeStatusBar = async () => {
    capInvoke(() =>
      StatusBar.setStyle({
        style: Style.Default,
      }),
    );
  };

  const changeStatusBarLight = async () => {
    capInvoke(() =>
      StatusBar.setStyle({
        style: Style.Light,
      }),
    );
  };

  const changeStatusBarDark = async () => {
    capInvoke(() =>
      StatusBar.setStyle({
        style: Style.Dark,
      }),
    );
  };

  const showStatusBar = async () => {
    capInvoke(() => StatusBar.show());
  };

  const hideStatusBar = async () => {
    capInvoke(() => StatusBar.hide());
  };

  const overlayStatusbar = async () => {
    capInvoke(() => StatusBar.setOverlaysWebView({ overlay: true }));
  };

  const unOverlayStatusbar = async () => {
    capInvoke(() => StatusBar.setOverlaysWebView({ overlay: false }));
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
    capInvoke(() => StatusBar.setBackgroundColor({ color: `#${randomColor}` }));
  };

  const getInfo = async () => {
    const info = await capInvoke(() => StatusBar.getInfo());
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
        {showButtons ? (
          [
            <IonButton expand="block" onClick={changeStatusBar}>
              Change StatusBar Style Default
            </IonButton>,
            <IonButton expand="block" onClick={changeStatusBarLight}>
              Change StatusBar Style Light
            </IonButton>,
            <IonButton expand="block" onClick={changeStatusBarDark}>
              Change StatusBar Style Dark
            </IonButton>,
            <IonButton expand="block" onClick={showStatusBar}>
              Show
            </IonButton>,
            <IonButton expand="block" onClick={hideStatusBar}>
              Hide
            </IonButton>,
            <IonButton expand="block" onClick={overlayStatusbar}>
              overlay Statusbar
            </IonButton>,
            <IonButton expand="block" onClick={unOverlayStatusbar}>
              unoverlay Statusbar
            </IonButton>,
            <IonButton expand="block" onClick={setBackgroundColor}>
              Set Background Color
            </IonButton>,
            <IonButton expand="block" onClick={getInfo}>
              get Info
            </IonButton>,
            <div>
              <pre>{statusbarInfoJson}</pre>
            </div>,
          ]
        ) : (
          <IonLabel id="status">
            StatusBar plugin not supported on {Capacitor.getPlatform()}
          </IonLabel>
        )}
      </IonContent>
    </IonPage>
  );
};

export default StatusBarPage;
