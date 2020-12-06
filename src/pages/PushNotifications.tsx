import { PushNotifications } from '@capacitor/push-notifications';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from '@ionic/react';
import React, { useEffect } from 'react';

const PushNotificationsPage: React.FC = () => {
  const ensurePermissions = async () => {
    try {
      let { receive } = await PushNotifications.checkPermissions();
      console.log('PushNotifications receive permission:', receive);

      if (receive === 'prompt') {
        ({ receive } = await PushNotifications.requestPermissions());
      }

      if (receive !== 'granted') {
        throw new Error('User denied permissions!');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const register = async () => {
    await PushNotifications.register();
  };

  useEffect(() => {
    PushNotifications.addListener('registration', token => {
      console.error('Registration token:', token);
    });

    PushNotifications.addListener('registrationError', err => {
      console.error('Registration error:', err);
    });
  }, []);

  useIonViewDidEnter(async () => {
    await ensurePermissions();
    await register();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Push Notifications</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent></IonContent>
    </IonPage>
  );
};

export default PushNotificationsPage;
