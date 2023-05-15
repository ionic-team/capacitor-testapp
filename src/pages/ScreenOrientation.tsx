import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonMenuButton,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useState } from 'react';
import {
  ScreenOrientation,
  ScreenOrientationResult,
} from '@capacitor/screen-orientation';
import { PluginListenerHandle } from '@capacitor/core';

const ScreenOrientationPage: React.FC = () => {
  const [deviceOrientation, setDeviceOrientation] = useState('');
  let orientationHandler: PluginListenerHandle | null = null;

  const lockOrientation = async (orientation: OrientationLockType) => {
    await ScreenOrientation.lock({ orientation });
    console.log('orientation:', await ScreenOrientation.orientation());
  };

  const unlockOrientation = async () => {
    await ScreenOrientation.unlock();
  };

  const getOrientation = async () => {
    const orietation = await ScreenOrientation.orientation();
    setDeviceOrientation(orietation.type);
  };

  const addListener = async () => {
    console.log('add listener');
    try {
      orientationHandler = await ScreenOrientation.addListener(
        'screenOrientationChange',
        (orientation: ScreenOrientationResult) => {
          console.log('orientation: ', orientation.type);
          setDeviceOrientation(orientation.type);
        },
      );
    } catch (e) {
      console.error(e);
    }
  };

  const removeListeners = async () => {
    console.log('remove listeners');
    try {
      await ScreenOrientation.removeAllListeners();
    } catch (e) {
      console.error(e);
    }
  };

  const removeListener = async () => {
    console.log('remove listener');
    orientationHandler?.remove();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Splash Screen</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton expand="block" onClick={() => lockOrientation('landscape')}>
          Lock landscape
        </IonButton>
        <IonButton
          expand="block"
          onClick={() => lockOrientation('landscape-primary')}
        >
          Lock landscape primary
        </IonButton>
        <IonButton
          expand="block"
          onClick={() => lockOrientation('landscape-secondary')}
        >
          Lock landscape secundary
        </IonButton>
        <IonButton expand="block" onClick={() => lockOrientation('portrait')}>
          Lock portrait
        </IonButton>
        <IonButton
          expand="block"
          onClick={() => lockOrientation('portrait-primary')}
        >
          Lock portrait primary
        </IonButton>
        <IonButton
          expand="block"
          onClick={() => lockOrientation('portrait-secondary')}
        >
          Lock portrait secundary
        </IonButton>
        <IonButton expand="block" onClick={unlockOrientation}>
          Unlock
        </IonButton>
        <IonButton expand="block" onClick={getOrientation}>
          Get Orientation
        </IonButton>
        <IonButton expand="block" onClick={addListener}>
          add listener
        </IonButton>
        <IonButton expand="block" onClick={removeListener}>
          remove listener
        </IonButton>
        <IonButton expand="block" onClick={removeListeners}>
          remove listeners
        </IonButton>
        {deviceOrientation ? (
          <IonText color="dark">
            <p>Orientation is {deviceOrientation}</p>
          </IonText>
        ) : null}
      </IonContent>
    </IonPage>
  );
};

export default ScreenOrientationPage;
