import { ExceptionCode } from '@capacitor/core';
import {
  LocalNotifications,
  LocalNotification,
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
import React, { useEffect } from 'react';

const LocalNotificationsPage: React.FC = () => {
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

  const registerListeners = async () => {
    try {
      await LocalNotifications.addListener(
        'localNotificationReceived',
        notification => {
          console.log('Notification: ', notification);
        },
      );

      await LocalNotifications.addListener(
        'localNotificationActionPerformed',
        notification => {
          console.log('Notification action performed', notification);
        },
      );
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    registerActions();
    registerListeners();
  }, []);

  const generateId = (): number => Math.floor(Math.random() * 10);

  const ensurePermissions = async () => {
    try {
      let { display } = await LocalNotifications.checkPermissions();
      console.log('LocalNotifications display permission:', display);

      if (display === 'prompt') {
        ({ display } = await LocalNotifications.requestPermissions());
      }

      if (display !== 'granted') {
        throw new Error('User denied permissions!');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const createNotification = (): LocalNotification => {
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

  const scheduleNow = async () => {
    const notifications: LocalNotification[] = [createNotification()];
    const result = await LocalNotifications.schedule({ notifications });

    console.log('schedule result:', result);
  };

  const scheduleOnce = async () => {
    const notifications: LocalNotification[] = [
      {
        ...createNotification(),
        schedule: { at: new Date(new Date().getTime() + 10000) },
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
    await ensurePermissions();
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
        <IonButton expand="block" onClick={scheduleNow}>
          Schedule Now
        </IonButton>
        <IonButton expand="block" onClick={scheduleOnce}>
          Send Notification in 10s
        </IonButton>
        <IonButton expand="block" onClick={cancelPending}>
          Cancel Pending Notifications
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default LocalNotificationsPage;
