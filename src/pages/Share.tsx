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
import { Share } from '@capacitor/share';
import { capInvoke } from '../utils/call';

const SharePage: React.FC = () => {
  const showSharing = async () => {
    try {
      let shareRet = await capInvoke(() =>
        Share.share({
          title: 'See cool stuff',
          text: 'Really awesome thing you need to see right meow',
          url: 'http://ionicframework.com/',
          dialogTitle: 'Share with buddies',
        }),
      );
      console.log('Share return', shareRet);
    } catch (err) {
      console.log('err', err);
    }
  };

  const showSharingTextOnly = async () => {
    try {
      let shareRet = await capInvoke(() =>
        Share.share({
          text: 'Really awesome thing you need to see right meow',
        }),
      );
      console.log('Share return', shareRet);
    } catch (err) {
      console.log('err', err);
    }
  };

  const showSharingUrlOnly = async () => {
    try {
      let shareRet = await capInvoke(() =>
        Share.share({
          url: 'http://ionicframework.com/',
        }),
      );
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
        <IonButton expand="block" onClick={showSharing}>
          Show Sharing
        </IonButton>
        <IonButton expand="block" onClick={showSharingTextOnly}>
          Show Sharing (text only)
        </IonButton>
        <IonButton expand="block" onClick={showSharingUrlOnly}>
          Show Sharing (url only)
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SharePage;
