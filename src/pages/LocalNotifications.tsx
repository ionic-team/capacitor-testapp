import { ExceptionCode } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
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
import React, { useEffect, useState } from 'react';
import LocalNotificationTest from '../components/LocalNotificationTest';
import NotificationChannelsTest from '../components/NotificationChannelsTest';

import './LocalNotifications.css';

const LocalNotificationsPage: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<PermissionState>('denied');

  const ensurePermissions = async (): Promise<PermissionState> => {
    try {
      let { display } = await LocalNotifications.checkPermissions();
      console.log('LocalNotifications display permission:', display);

      if (display === 'prompt') {
        ({ display } = await LocalNotifications.requestPermissions());
      }

      if (display !== 'granted') {
        throw new Error('User denied permissions!');
      }

      return display;
    } catch (e) {
      console.log('permissions error');
      console.error(e);

      return 'denied';
    }
  };

  const registerActions = async () => {
    try {
      await LocalNotifications.registerActionTypes({
        types: [
          {
            id: 'OPEN_PRODUCT',
            actions: [
              {
                id: 'view',
                title: 'Product',
              },
              {
                id: 'remove',
                title: 'Remove',
                destructive: true,
              },
              {
                id: 'response',
                title: 'Response',
                input: true,
              },
            ],
          },
        ],
      });
    } catch (e: any) {
      if (e.code === ExceptionCode.Unavailable) {
        console.warn(
          'Action types are unsupported in the browser! Handling this in my own way...',
        );
      } else {
        console.error(e);
        /* throw e; */
      }
    }
  };

  const registerListeners = () => {
    try {
      LocalNotifications.addListener(
        'localNotificationReceived',
        notification => {
          console.log('Notification: ', notification);
        },
      );

      LocalNotifications.addListener(
        'localNotificationActionPerformed',
        notification => {
          console.log('Notification action performed', notification);
        },
      );
    } catch (e) {
      console.error(e);
    }
  };

  const unRegisterListeners = async () => {
    try {
      await LocalNotifications.removeAllListeners();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    registerActions();
    registerListeners();

    return () => {
      unRegisterListeners();
    };
  }, []);

  useIonViewDidEnter(async () => {
    const permissions = await ensurePermissions();
    setHasPermission(permissions);
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Local Notifications</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <LocalNotificationTest permissions={hasPermission} />
        <br />
        <NotificationChannelsTest notificationType="local" />
      </IonContent>
    </IonPage>
  );
};

export default LocalNotificationsPage;
