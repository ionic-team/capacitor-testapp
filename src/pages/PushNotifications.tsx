import cx from 'classnames';
import { PushNotifications } from '@capacitor/push-notifications';
import { PushNotificationDeliveredList } from '@capacitor/push-notifications/dist/esm/definitions';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonButton,
  IonList,
  IonItem,
  IonItemSliding,
  IonLabel,
  IonPage,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
  IonItemOptions,
  IonItemOption,
  useIonViewWillLeave,
  IonListHeader,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import './PushNotifications.css';
import { PermissionState } from '@capacitor/core';

const PushNotificationsPage: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<PermissionState>('denied');

  const [
    notificationList,
    setNotificationList,
  ] = useState<PushNotificationDeliveredList | null>(null);

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

  const getDeliveredNotifications = async () => {
    try {
      const notificationList = await PushNotifications.getDeliveredNotifications();
      setNotificationList(notificationList);
      console.log(notificationList);
    } catch (e) {
      console.log('getDeliveredNotifications error');
      console.error(e);
    }
  };

  const removeDeliveredNotifications = async () => {
    try {
      await PushNotifications.removeAllDeliveredNotifications();
      await getDeliveredNotifications();
    } catch (e) {
      console.log('removeAllDeliveredNotifications error');
      console.error(e);
    }
  };

  const removeSingleDelieveredNotification = async (
    list: PushNotificationDeliveredList,
  ) => {
    try {
      await PushNotifications.removeDeliveredNotifications(list);
      await getDeliveredNotifications();
    } catch (e) {
      console.log('removeDeliveredNotifications error');
      console.error(e);
    }
  };

  useEffect(() => {
    PushNotifications.addListener('registration', token => {
      console.info('Registration token: ', token);
    });

    PushNotifications.addListener('registrationError', err => {
      console.error('Registration error: ', err);
    });

    PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Push notification received: ', notification);
    });

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      notification => {
        console.log(
          'Push notification action performed',
          notification.actionId,
          notification.inputValue,
        );
      },
    );
  }, []);

  useIonViewDidEnter(async () => {
    const hasPermission = await ensurePermissions();
    setHasPermission(hasPermission);
    await register();
  });

  useIonViewWillLeave(() => {
    PushNotifications.removeAllListeners();
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
        <section>
          <span
            className={cx({
              permissionStatus: true,
              prompt:
                hasPermission === 'prompt' ||
                hasPermission === 'prompt-with-rationale',
              denied: hasPermission === 'denied',
              granted: hasPermission === 'granted',
            })}>
            Push Notifications Permission{' '}
            {hasPermission.toString().toUpperCase()}
          </span>
          <IonButton onClick={getDeliveredNotifications} expand="block">
            Get Delivered Notifications
          </IonButton>
          <IonButton onClick={removeDeliveredNotifications} expand="block">
            Remove All Delivered Notifications
          </IonButton>
        </section>
        <br />
        {notificationList && (
          <IonList>
            <IonListHeader>Notifications (swipe to remove)</IonListHeader>
            {notificationList.notifications.map(notification => {
              return (
                <IonItemSliding>
                  <IonItem>
                    <IonLabel>
                      <h2>{notification.title}</h2>
                      <h3>{notification.subtitle}</h3>
                      <p>{notification.body}</p>
                    </IonLabel>
                  </IonItem>
                  <IonItemOptions side="end">
                    <IonItemOption
                      color="danger"
                      onClick={() => {
                        const newList: PushNotificationDeliveredList = {
                          notifications: [notification],
                        };
                        removeSingleDelieveredNotification(newList);
                      }}>
                      Remove
                    </IonItemOption>
                  </IonItemOptions>
                </IonItemSliding>
              );
            })}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default PushNotificationsPage;
