import { Plugins } from '@capacitor/core';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonButton,
} from '@ionic/react';
import React from 'react';

const { Device } = Plugins;

const DevicePage: React.FC = () => {
  const getDeviceInfo = async () => {
    const info = await Device.getInfo();
    console.log(info);
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
        <IonButton onClick={getDeviceInfo}>Get Device Info</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default DevicePage;
