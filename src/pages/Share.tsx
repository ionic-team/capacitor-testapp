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
import {
  Camera,
  CameraResultType,
  CameraSource,
  ImageOptions,
} from '@capacitor/camera';

const SharePage: React.FC = () => {
  const [showButtons, setShowButtons] = useState(true);
  const [photos, setPhotos] = useState<string[]>([]);
  const [shareResult, setShareResult] = useState<string>('');

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
      setShareResult(`✅ Success! App chosen: ${shareRet.activityType || '(none)'}`);
    } catch (err) {
      console.log('err', err);
      setShareResult(`❌ Error: ${err}`);
    }
  };

  const showSharingTextOnly = async () => {
    try {
      let shareRet = await Share.share({
        text: 'Really awesome thing you need to see right meow',
      });
      console.log('Share return', shareRet);
      setShareResult(`✅ Success! App chosen: ${shareRet.activityType || '(none)'}`);
    } catch (err) {
      console.log('err', err);
      setShareResult(`❌ Error: ${err}`);
    }
  };

  const showSharingUrlOnly = async () => {
    try {
      let shareRet = await Share.share({
        url: 'http://ionicframework.com/',
      });
      console.log('Share return', shareRet);
      setShareResult(`✅ Success! App chosen: ${shareRet.activityType || '(none)'}`);
    } catch (err) {
      console.log('err', err);
      setShareResult(`❌ Error: ${err}`);
    }
  };

  const showSharingRemoteImage = async () => {
    try {
      let shareRet = await Share.share({
        url: 'https://ichef.bbci.co.uk/news/800/cpsprodpb/150EA/production/_107005268_gettyimages-611696954.jpg',
      });
      console.log('Share return', shareRet);
      setShareResult(`✅ Success! App chosen: ${shareRet.activityType || '(none)'}`);
    } catch (err) {
      console.log('err', err);
      setShareResult(`❌ Error: ${err}`);
    }
  };

  const showSharingLocalImage = async () => {
    try {
      const options: ImageOptions = {
        quality: 50,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        saveToGallery: false,
        allowEditing: false,
      };
      var photo = await Camera.getPhoto(options);
      const newPhotos = [photo.path!, ...photos];
      setPhotos(newPhotos);
      let shareRet = await Share.share({
        url: photo.path,
      });
      console.log('Share return', shareRet);
      setShareResult(`✅ Success! App chosen: ${shareRet.activityType || '(none)'}`);
    } catch (err) {
      console.log('err', err);
      setShareResult(`❌ Error: ${err}`);
    }
  };

  const showSharingLocalImages = async () => {
    try {
      let shareRet = await Share.share({
        files: photos,
      });
      console.log('Share return', shareRet);
      setShareResult(`✅ Success! App chosen: ${shareRet.activityType || '(none)'}`);
    } catch (err) {
      console.log('err', err);
      setShareResult(`❌ Error: ${err}`);
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
        {shareResult && (
          <div style={{
            padding: '16px',
            margin: '16px',
            backgroundColor: shareResult.includes('❌') ? '#ffebee' : '#e8f5e9',
            borderRadius: '8px',
            border: `2px solid ${shareResult.includes('❌') ? '#f44336' : '#4caf50'}`,
            color: shareResult.includes('❌') ? '#c62828' : '#2e7d32',
            fontSize: '16px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '24px'
          }}>
            {shareResult}
          </div>
        )}
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
            <IonButton expand="block" onClick={showSharingRemoteImage}>
              Show Sharing (remote image)
            </IonButton>,
            <IonButton expand="block" onClick={showSharingLocalImage}>
              Show Sharing (camera image)
            </IonButton>,
            <IonButton expand="block" onClick={showSharingLocalImages}>
              Show Sharing multiple (camera image)
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
