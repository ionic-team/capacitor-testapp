import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import {
  IonButton,
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
import { capInvoke } from '../utils/call';

interface Props {
  permissions: PermissionState;
}

export default function NotificationTest({ permissions }: Props) {
  const [notificationList, setNotificationList] =
    useState<PushNotificationDeliveredList>({ notifications: [] });

  const getDeliveredNotifications = async () => {
    try {
      const notificationList = await capInvoke(() =>
        PushNotifications.getDeliveredNotifications(),
      );
      setNotificationList(notificationList);
    } catch (e) {
      console.log('getDeliveredNotifications error');
      console.error(e);
    }
  };

  const removeDeliveredNotifications = async () => {
    try {
      await capInvoke(() =>
        PushNotifications.removeAllDeliveredNotifications(),
      );
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
      await capInvoke(() =>
        PushNotifications.removeDeliveredNotifications(newList),
      );
      await getDeliveredNotifications();
    } catch (e) {
      console.log('removeDeliveredNotifications error');
      console.error(e);
    }
  };

  const unRegisterListeners = () => {
    try {
      capInvoke(() => PushNotifications.removeAllListeners());
    } catch (e) {
      console.log('removeAllListeners error');
      console.error(e);
    }
  };

  useEffect(() => {
    capInvoke(() =>
      PushNotifications.addListener('registration', token => {
        console.info('Registration token: ', token);
      }),
    );

    capInvoke(() =>
      PushNotifications.addListener('registrationError', err => {
        console.error('Registration error: ', err);
      }),
    );

    capInvoke(() =>
      PushNotifications.addListener(
        'pushNotificationReceived',
        notification => {
          console.log('Push notification received: ', notification);
        },
      ),
    );

    capInvoke(() =>
      PushNotifications.addListener(
        'pushNotificationActionPerformed',
        notification => {
          console.log(
            'Push notification action performed',
            notification.actionId,
            notification.inputValue,
          );
        },
      ),
    );

    if (permissions === 'granted') {
      getDeliveredNotifications();
    }
  }, [permissions]);

  useEffect(() => {
    return () => {
      unRegisterListeners();
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
