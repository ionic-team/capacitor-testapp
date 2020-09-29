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
import { Toast } from '@capacitor/toast';

const ToastPage: React.FC = () => {
  const show = async (position: 'top' | 'center' | 'bottom') => {
    Toast.show({ position, text: 'Hello!' });
  };

  const showTop = async () => {
    show('top');
  };

  const showCenter = async () => {
    show('center');
  };

  const showBottom = async () => {
    show('bottom');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Toast</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton expand="block" onClick={showTop}>
          Show (top)
        </IonButton>
        <IonButton expand="block" onClick={showCenter}>
          Show (center)
        </IonButton>
        <IonButton expand="block" onClick={showBottom}>
          Show (bottom)
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ToastPage;
