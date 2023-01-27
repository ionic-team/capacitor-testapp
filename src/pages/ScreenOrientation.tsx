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
import React from 'react';
import { ScreenOrientation } from '@capacitor/screen-orientation'

const ScreenOrientationPage: React.FC = () => {
  
  const lockLandscapeOrientation = async () => {
    await ScreenOrientation.lock({orientation: 'landscape-primary'});
    console.log("orientation:");
    console.log(await ScreenOrientation.orientation());
  }

  const unlockOrientation = async () => {
    await ScreenOrientation.unlock();
  }

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
        <IonButton expand="block" onClick={lockLandscapeOrientation}>
          Lock landscape
        </IonButton>
        <IonButton expand="block" onClick={unlockOrientation}>
          Unlock
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ScreenOrientationPage;
