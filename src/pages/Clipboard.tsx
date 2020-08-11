import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
  IonButton,
} from '@ionic/react';
import React from 'react';
import { Clipboard } from '@capacitor/clipboard';

const ClipboardPage: React.FC = () => {
  useIonViewDidEnter(() => {
    Clipboard.write({ string: 'www.reddit.com' });
  });

  const getClipboardData = async () => {
    const data = await Clipboard.read();
    console.log(data);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Clipboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton onClick={getClipboardData} expand="block">
          Read Clipboard Data
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ClipboardPage;
