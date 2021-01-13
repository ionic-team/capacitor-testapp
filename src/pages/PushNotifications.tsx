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

import React, { useState } from 'react';

import './PushNotifications.css';
import { PermissionState } from '@capacitor/core';
import NotificationsTest from '../components/NotificationsTest';
import NotificationChannelsTest from '../components/NotificationChannelsTest';

const PushNotificationsPage: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<PermissionState>('denied');

  const ensurePermissions = async (): Promise<PermissionState> => {
    try {
      let { receive } = await PushNotifications.checkPermissions();
      console.log('PushNotifications receive permission:', receive);

      if (receive === 'prompt') {
        ({ receive } = await PushNotifications.requestPermissions());
      }

      if (receive !== 'granted') {
        throw new Error('User denied permissions!');
      }

      return receive;
    } catch (e) {
      console.log('permissions error');
      console.error(e);

      return 'denied';
    }
  };

  const register = async () => {
    try {
      await PushNotifications.register();
    } catch (e) {
      console.log('push notification registration error');
      console.error(e);
    }
  };

  useIonViewDidEnter(async () => {
    const hasPermission = await ensurePermissions();
    setHasPermission(hasPermission);
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
      <IonContent>
        <NotificationsTest permissions={hasPermission} />
        <br />
        <NotificationChannelsTest />
      </IonContent>
    </IonPage>
  );
};

export default PushNotificationsPage;
