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
import { SplashScreen } from '@capacitor/splash-screen';

const SplashScreenPage: React.FC = () => {
  const showSplashAutoHide = async () => {
    SplashScreen.show({
      autoHide: true,
    });
  };

  const showSplashAutoHide2s = async () => {
    SplashScreen.show({
      showDuration: 2000,
      autoHide: true,
    });
  };

  const showSplash6s = async () => {
    SplashScreen.show({
      autoHide: false,
    });
    setTimeout(() => {
      SplashScreen.hide();
    }, 6000);
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
        <IonButton expand="block" onClick={showSplashAutoHide}>
          Show Splash, auto-hide, default length
        </IonButton>
        <IonButton expand="block" onClick={showSplashAutoHide2s}>
          Show Splash, auto-hide, 2s
        </IonButton>
        <IonButton expand="block" onClick={showSplash6s}>
          Show Splash, 6s
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SplashScreenPage;
