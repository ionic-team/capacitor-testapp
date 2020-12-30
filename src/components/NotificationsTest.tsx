import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import {
  IonButton,
  IonContent,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonListHeader,
} from '@ionic/react';
import { PushNotifications } from '@capacitor/push-notifications';
import {
  PushNotificationDeliveredList,
  PushNotificationSchema,
} from '@capacitor/push-notifications/dist/esm/definitions';
import { PermissionState } from '@capacitor/core';

interface Props {
  permissions: PermissionState;
}

export default function NotificationTest({ permissions }: Props) {
  const [
    notificationList,
    setNotificationList,
  ] = useState<PushNotificationDeliveredList>({ notifications: [] });

  const getDeliveredNotifications = async () => {
    try {
      const notificationList = await PushNotifications.getDeliveredNotifications();
      setNotificationList(notificationList);
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

  const removeDeliveredNotification = async (
    notification: PushNotificationSchema,
  ) => {
    try {
      const newList: PushNotificationDeliveredList = {
        notifications: [notification],
      };
      await PushNotifications.removeDeliveredNotifications(newList);
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

    if (permissions === 'granted') {
      getDeliveredNotifications();
    }

    return () => {
      PushNotifications.removeAllListeners();
    };
  }, []);

  return (
    <div>
      <section>
        <span
          className={cx({
            permissionStatus: true,
            prompt: permissions === 'prompt',
            denied: permissions === 'denied',
            granted: permissions === 'granted',
          })}>
          Push Notifications Permission {permissions.toString().toUpperCase()}
        </span>
        <IonButton onClick={getDeliveredNotifications} expand="block">
          Refresh Delivered Notifications
        </IonButton>
        <IonButton onClick={removeDeliveredNotifications} expand="block">
          Remove All Delivered Notifications
        </IonButton>
      </section>
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
                    removeDeliveredNotification(notification);
                  }}>
                  Remove
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          );
        })}
        {notificationList.notifications.length === 0 && (
          <IonItem>
            <IonLabel>No notifications.</IonLabel>
          </IonItem>
        )}
      </IonList>
    </div>
  );
}
