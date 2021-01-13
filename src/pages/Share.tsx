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
import { Camera, CameraResultType, CameraSource, PhotoOptions } from '@capacitor/camera';

const SharePage: React.FC = () => {
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

  const showSharingRemoteImage = async () => {
    try {
      let shareRet = await Share.share({
        url: 'https://ichef.bbci.co.uk/news/800/cpsprodpb/150EA/production/_107005268_gettyimages-611696954.jpg',
      });
      console.log('Share return', shareRet);
    } catch (err) {
      console.log('err', err);
    }
  };


  const showSharingLocalImage = async () => {
    try {
      const options: PhotoOptions = {
        quality: 50,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        saveToGallery: false,
        allowEditing: false
      };
      var photo = await Camera.getPhoto(options);
      let shareRet = await Share.share({
        url: photo.path,
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
        <IonButton expand="block" onClick={showSharing}>
          Show Sharing
        </IonButton>
        <IonButton expand="block" onClick={showSharingTextOnly}>
          Show Sharing (text only)
        </IonButton>
        <IonButton expand="block" onClick={showSharingUrlOnly}>
          Show Sharing (url only)
        </IonButton>
        <IonButton expand="block" onClick={showSharingRemoteImage}>
          Show Sharing (remote image)
        </IonButton>
        <IonButton expand="block" onClick={showSharingLocalImage}>
          Show Sharing (camera image)
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SharePage;
