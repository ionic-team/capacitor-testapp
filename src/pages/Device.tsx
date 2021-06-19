import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useState } from 'react';
import { Device } from '@capacitor/device';
import { capInvoke } from '../utils/call';

const DevicePage: React.FC = () => {
  const [deviceInfoJson, setDeviceInfoJson] = useState('');

  const getDeviceInfo = async () => {
    const info = await capInvoke(() => Device.getInfo());
    console.log('Got device info', info);
    setDeviceInfoJson(JSON.stringify(info, null, 2));
  };

  const getDeviceId = async () => {
    const id = await capInvoke(() => Device.getId());
    console.log('Got device id', id);
    setDeviceInfoJson(JSON.stringify(id, null, 2));
  };

  const getDeviceBatteryInfo = async () => {
    const info = await capInvoke(() => Device.getBatteryInfo());
    console.log('Got device battery info', info);
    setDeviceInfoJson(JSON.stringify(info, null, 2));
  };

  const getDeviceLanguageCode = async () => {
    const code = await capInvoke(() => Device.getLanguageCode());
    console.log('Language: ' + code.value);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Device</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton expand="block" onClick={getDeviceInfo}>
          Device Info
        </IonButton>
        <IonButton expand="block" onClick={getDeviceId}>
          Device Id
        </IonButton>
        <IonButton expand="block" onClick={getDeviceBatteryInfo}>
          Device Battery Info
        </IonButton>
        <IonButton expand="block" onClick={getDeviceLanguageCode}>
          Language Code
        </IonButton>
        <div>
          <pre>{deviceInfoJson}</pre>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DevicePage;
