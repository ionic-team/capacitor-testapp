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
import { capInvoke } from '../utils/call';

const PushNotificationsPage: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<PermissionState>('denied');

  const ensurePermissions = async (): Promise<PermissionState> => {
    try {
      let { receive } = await capInvoke(() =>
        PushNotifications.checkPermissions(),
      );
      console.log('PushNotifications receive permission:', receive);

      if (receive === 'prompt') {
        ({ receive } = await capInvoke(() =>
          PushNotifications.requestPermissions(),
        ));
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
      await capInvoke(() => PushNotifications.register());
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
        <NotificationChannelsTest notificationType="push" />
      </IonContent>
    </IonPage>
  );
};

export default PushNotificationsPage;
