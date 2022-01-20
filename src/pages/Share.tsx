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
import { Share } from '@capacitor/share';

const SharePage: React.FC = () => {
  const [showButtons, setShowButtons] = useState(true);

  useIonViewDidEnter(() => {
    checkSupported();
  });

  const checkSupported = async () => {
    const result = await Share.canShare();
    setShowButtons(result.value);
  };

  const showSharing = async () => {
    try {
      let shareRet = await Share.share({
        title: 'See cool stuff',
        text: 'Really awesome thing you need to see right meow',
        url: 'http://ionicframework.com/',
        dialogTitle: 'Share with buddies',
      });
      console.log('Share return', shareRet);
    } catch (err) {
      console.log('err', err);
    }
  };

  const showSharingTextOnly = async () => {
    try {
      let shareRet = await Share.share({
        text: 'Really awesome thing you need to see right meow',
      });
      console.log('Share return', shareRet);
    } catch (err) {
      console.log('err', err);
    }
  };

  const showSharingUrlOnly = async () => {
    try {
      let shareRet = await Share.share({
        url: 'http://ionicframework.com/',
      });
      console.log('Share return', shareRet);
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Share</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {showButtons ? (
          [
            <IonButton expand="block" onClick={showSharing}>
              Show Sharing
            </IonButton>,
            <IonButton expand="block" onClick={showSharingTextOnly}>
              Show Sharing (text only)
            </IonButton>,
            <IonButton expand="block" onClick={showSharingUrlOnly}>
              Show Sharing (url only)
            </IonButton>,
          ]
        ) : (
          <IonLabel>Sharing not supported</IonLabel>
        )}
      </IonContent>
    </IonPage>
  );
};

export default SharePage;
