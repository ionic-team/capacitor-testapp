import { PluginListenerHandle } from '@capacitor/core';
import { Motion } from '@capacitor/motion';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from '@ionic/react';
import React, { useState } from 'react';
import { Capacitor } from '@capacitor/core';

// https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent
//  DeviceOrientationEvent and DeviceMotionEvent will be set as any to avoid typescript errors 
// when accessing requestPermission

const MotionPage: React.FC = () => {
  let accelHandler: PluginListenerHandle;
  let orientationHandler: PluginListenerHandle;
  const [showPermButton, setShowPermButton] = useState(false);
  const [showButtons, setShowButtons] = useState(true);

  useIonViewDidEnter(() => {
    if (Capacitor.isPluginAvailable('Motion')) {
      if (
        DeviceOrientationEvent !== undefined &&
        typeof (DeviceOrientationEvent as any).requestPermission === 'function'
      ) {
        setShowPermButton(true);
      }
    } else {
      setShowButtons(false);
    }
  });

  const listenOrientation = async () => {
    orientationHandler = await Motion.addListener('orientation', event => {
      console.log('orientation', event);
    });
  };

  const listenAcceleration = async () => {
    accelHandler = await Motion.addListener('accel', event => {
      console.log('accel', event);
    });
  };

  const stopAcceleration = () => {
    if (accelHandler) {
      accelHandler.remove();
    }
  };

  const stopOrientation = () => {
    if (orientationHandler) {
      orientationHandler.remove();
    }
  };

  const requestPermission = async () => {
    try {
      const result = await (DeviceMotionEvent as any).requestPermission();
      if (result === 'granted') {
        setShowPermButton(false);
      } else {
        alert(`don't have permissions to listen`);
      }
    } catch (e) {
      alert('error requesting permssion');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Motion</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {showButtons ? (
            showPermButton ? (
              <IonItem>
                <IonLabel>iOS 13 Permission</IonLabel>
                <IonButton expand="block" onClick={requestPermission}>
                  Request Motion Permission
                </IonButton>
              </IonItem>
            ) : (
              [
                <IonItem>
                  <IonLabel>Orientation</IonLabel>
                  <IonButton expand="block" onClick={listenOrientation}>
                    Listen Orientation
                  </IonButton>
                  <IonButton expand="block" onClick={stopOrientation}>
                    Stop Orientation
                  </IonButton>
                </IonItem>,
                <IonItem>
                  <IonLabel>Acceleration</IonLabel>
                  <IonButton expand="block" onClick={listenAcceleration}>
                    Listen Acceleration
                  </IonButton>
                  <IonButton expand="block" onClick={stopAcceleration}>
                    Stop Acceleration
                  </IonButton>
                </IonItem>,
              ]
            )
          ) : (
            <IonItem>
              <IonLabel>
                Motion plugin not supported on {Capacitor.getPlatform()}
              </IonLabel>
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default MotionPage;
