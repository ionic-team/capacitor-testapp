import { ExceptionCode } from '@capacitor/core';
import {
  LocalNotifications,
  LocalNotificationSchema,
} from '@capacitor/local-notifications';
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
import React, { useEffect, useState } from 'react';
import LocalNotificationTest from '../components/LocalNotificationTest';

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

      return display
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
    } catch (e) {
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
      LocalNotifications.addListener('received', notification => {
        console.log('Notification: ', notification);
      });

      LocalNotifications.addListener('actionPerformed', notification => {
        console.log('Notification action performed', notification);
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    registerActions();
    registerListeners();
  }, []);

  const generateId = (): number => Math.floor(Math.random() * 10);

  

  const createNotification = (): LocalNotificationSchema => {
    return {
      id: generateId(),
      title: 'Get 10% off!',
      body: 'Swipe now to learn more',
      sound: 'beep.aiff',
      attachments: [{ id: 'face', url: 'res:///assets/ionitron.png' }],
      actionTypeId: 'OPEN_PRODUCT',
      extra: {
        productId: 'PRODUCT-1',
      },
    };
  };

  

  const scheduleNowWithIcon = async () => {
    const notifications: LocalNotificationSchema[] = [
      {
        ...createNotification(),
        smallIcon: 'ic_stat_icon_sample',
        iconColor: '#00ff00',
      },
    ];
    const result = await LocalNotifications.schedule({ notifications });

    console.log('schedule result:', result);
  };

  const scheduleOnce = async () => {
    const notifications: LocalNotificationSchema[] = [
      {
        ...createNotification(),
        schedule: { at: new Date(new Date().getTime() + 10000) },
      },
    ];

    const result = await LocalNotifications.schedule({ notifications });
    console.log('schedule result:', result);
  };

  const scheduleEveryMinute = async () => {
    const notifications: LocalNotificationSchema[] = [
      {
        ...createNotification(),
        schedule: { every: 'minute' },
      },
    ];

    const result = await LocalNotifications.schedule({ notifications });
    console.log('schedule result:', result);
  };

  const scheduleEvery90Seconds = async () => {
    const notifications: LocalNotificationSchema[] = [
      {
        ...createNotification(),
        schedule: { every: 'second', count: 90 },
      },
    ];

    const result = await LocalNotifications.schedule({ notifications });
    console.log('schedule result:', result);
  };

  const cancelPending = async () => {
    const pending = await LocalNotifications.getPending();
    console.log('pending:', pending);
    await LocalNotifications.cancel(pending);
  };

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
        <LocalNotificationTest permissions={hasPermission}  />
      </IonContent>
    </IonPage>
  );
};

export default LocalNotificationsPage;
