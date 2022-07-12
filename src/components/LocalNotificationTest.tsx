import {
  DeliveredNotifications,
  LocalNotifications,
  LocalNotificationSchema,
  PendingResult,
} from '@capacitor/local-notifications';
import {
  IonButton,
  IonItem,
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
  IonLabel,
  IonList,
  IonListHeader,
} from '@ionic/react';
import cx from 'classnames';
import React, { useEffect, useState } from 'react';

interface Props {
  permissions: PermissionState;
}

export default function LocalNotificationTest({ permissions }: Props) {
  const [pendingNotifications, setPendingNotifications] =
    useState<PendingResult>({ notifications: [] });
  const [notificationList, setNotificationList] =
    useState<DeliveredNotifications>({ notifications: [] });

  const generateId = (): number => Math.floor(Math.random() * 10);

  const getPendingNotifications = async () => {
    const pending = await LocalNotifications.getPending();
    setPendingNotifications(pending);
  };

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

  const scheduleNow = async () => {
    const notifications: LocalNotificationSchema[] = [createNotification()];
    const result = await LocalNotifications.schedule({ notifications });

    getPendingNotifications();

    console.log('schedule result:', result);
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

    getPendingNotifications();

    console.log('schedule result:', result);
  };

  const scheduleOnce = async () => {
    const tenSecondsFromNow = new Date(new Date().getTime() + 10000);
    const notifications: LocalNotificationSchema[] = [
      {
        ...createNotification(),
        schedule: { at: tenSecondsFromNow },
      },
    ];

    const result = await LocalNotifications.schedule({ notifications });
    console.log('schedule result:', result);

    getPendingNotifications();
  };

  const scheduleOnceWhileIdle = async () => {
    const tenSecondsFromNow = new Date(new Date().getTime() + 10000);
    const notifications: LocalNotificationSchema[] = [
      {
        ...createNotification(),
        schedule: { at: tenSecondsFromNow, allowWhileIdle: true },
      },
    ];

    const result = await LocalNotifications.schedule({ notifications });
    console.log('schedule result:', result);

    getPendingNotifications();
  };

  const scheduleOnceWithExtras = async () => {
    const tenSecondsFromNow = new Date(new Date().getTime() + 10000);
    const notifications: LocalNotificationSchema[] = [
      {
        ...createNotification(),
        schedule: { at: tenSecondsFromNow },
        extra: {
          customData: 'hello',
          customData2: 99,
        },
      },
    ];

    const result = await LocalNotifications.schedule({ notifications });
    console.log('schedule result:', result);

    getPendingNotifications();
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

    getPendingNotifications();
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

    getPendingNotifications();
  };

  const scheduleEvery90SecondsWithExtras = async () => {
    const notifications: LocalNotificationSchema[] = [
      {
        ...createNotification(),
        schedule: { every: 'second', count: 90 },
        extra: {
          customData: 'hello',
          customData2: 99,
        },
      },
    ];

    const result = await LocalNotifications.schedule({ notifications });
    console.log('schedule result:', result);

    getPendingNotifications();
  };

  const cancelPending = async () => {
    await getPendingNotifications();
    await LocalNotifications.cancel({
      notifications: pendingNotifications.notifications.map(n => {
        return {
          id: n.id,
        };
      }),
    });
    await getPendingNotifications();
  };

  const scheduleOne = async () => {
    const tenSecondsFromNow = new Date(new Date().getTime() + 10000);
    const notifications: LocalNotificationSchema[] = [
      {
        ...{
          id: 222,
          title: 'Get 10% off!',
          body: 'Swipe now to learn more',
          sound: 'beep.aiff',
          attachments: [{ id: 'face', url: 'res:///assets/ionitron.png' }],
          actionTypeId: 'OPEN_PRODUCT',
          extra: {
            productId: 'PRODUCT-1',
          },
        },
        schedule: { at: tenSecondsFromNow },
      },
    ];

    const result = await LocalNotifications.schedule({ notifications });
    console.log('schedule result:', result);
  };

  const scheduleOnWithSeconds = async () => {
    const now = new Date();
    console.log(now.getHours(), now.getMinutes() + 1, 30);
    const notifications: LocalNotificationSchema[] = [
      {
        ...{
          id: 222,
          title: 'Get 10% off!',
          body: 'Swipe now to learn more',
          sound: 'beep.aiff',
          attachments: [{ id: 'face', url: 'res:///assets/ionitron.png' }],
          actionTypeId: 'OPEN_PRODUCT',
          extra: {
            productId: 'PRODUCT-1',
          },
        },
        schedule: {
          on: {
            hour: now.getHours(),
            minute: now.getMinutes() + 1,
            second: 26,
          },
        },
      },
    ];

    const result = await LocalNotifications.schedule({ notifications });
    console.log('schedule result:', result);

    getPendingNotifications();
  };

  const scheduleOnWithoutSeconds = async () => {
    const now = new Date();
    console.log(now.getHours(), now.getMinutes() + 1, 30);
    const notifications: LocalNotificationSchema[] = [
      {
        ...{
          id: 222,
          title: 'Get 10% off!',
          body: 'Swipe now to learn more',
          sound: 'beep.aiff',
          attachments: [{ id: 'face', url: 'res:///assets/ionitron.png' }],
          actionTypeId: 'OPEN_PRODUCT',
          extra: {
            productId: 'PRODUCT-1',
          },
        },
        schedule: {
          on: {
            hour: now.getHours(),
            minute: now.getMinutes() + 1,
          },
        },
      },
    ];

    const result = await LocalNotifications.schedule({ notifications });
    console.log('schedule result:', result);

    getPendingNotifications();
  };

  const cancelOne = async () => {
    await LocalNotifications.cancel({ notifications: [{ id: 222 }] });
  };

  const refreshPending = async () => {
    await getPendingNotifications();
  };

  const getDeliveredNotifications = async () => {
    try {
      const notificationList =
        await LocalNotifications.getDeliveredNotifications();
      setNotificationList(notificationList);
    } catch (e) {
      console.log('getDeliveredNotifications error');
      console.error(e);
    }
  };

  const removeDeliveredNotifications = async () => {
    try {
      await LocalNotifications.removeAllDeliveredNotifications();
      await getDeliveredNotifications();
    } catch (e) {
      console.log('removeAllDeliveredNotifications error');
      console.error(e);
    }
  };

  const removeDeliveredNotification = async (
    notification: LocalNotificationSchema,
  ) => {
    try {
      const newList: DeliveredNotifications = {
        notifications: [notification],
      };
      await LocalNotifications.removeDeliveredNotifications(newList);
      await getDeliveredNotifications();
    } catch (e) {
      console.log('removeDeliveredNotifications error');
      console.error(e);
    }
  };

  useEffect(() => {
    if (permissions === 'granted') {
      getPendingNotifications();
    }
  }, [permissions]);
  return (
    <div>
      <section>
        <span
          className={cx({
            permissionStatus: true,
            prompt: permissions === 'prompt',
            denied: permissions === 'denied',
            granted: permissions === 'granted',
          })}
        >
          Local Notifications Permission {permissions.toString().toUpperCase()}
        </span>
      </section>
      <IonList>
        <IonListHeader>Pending Notifications</IonListHeader>
        {pendingNotifications.notifications.map(notification => {
          return (
            <IonItem>
              <IonLabel>
                <h2>
                  (#{notification.id}) {notification.title}
                </h2>
                <div>
                  Repeats: {notification.schedule?.repeats ? 'Yes' : 'No'}
                </div>
                <div>Extras: {JSON.stringify(notification.extra)}</div>
                <div>Schedule: {JSON.stringify(notification.schedule)}</div>
              </IonLabel>
            </IonItem>
          );
        })}
        {pendingNotifications.notifications.length === 0 && (
          <IonItem>
            <IonLabel>No pending notifications.</IonLabel>
          </IonItem>
        )}
      </IonList>
      <br />
      <section>
        <IonButton expand="block" onClick={scheduleNow}>
          Schedule now
        </IonButton>
        <IonButton expand="block" onClick={scheduleNowWithIcon}>
          Schedule now (custom icon on Android)
        </IonButton>
        <IonButton expand="block" onClick={scheduleOnce}>
          Schedule in 10s
        </IonButton>
        <IonButton expand="block" onClick={scheduleOnceWhileIdle}>
          Schedule in 10s (even while idle)
        </IonButton>
        <IonButton expand="block" onClick={scheduleOnceWithExtras}>
          Schedule in 10s with Extras
        </IonButton>
        <IonButton expand="block" onClick={scheduleEveryMinute}>
          Schedule every minute
        </IonButton>
        <IonButton expand="block" onClick={scheduleEvery90Seconds}>
          Schedule every 90 seconds
        </IonButton>
        <IonButton expand="block" onClick={scheduleEvery90SecondsWithExtras}>
          Schedule every 90 seconds with Extras
        </IonButton>
        <IonButton expand="block" onClick={cancelPending}>
          Cancel Pending Notifications
        </IonButton>
        <IonButton expand="block" onClick={refreshPending}>
          Refresh Pending Notifications
        </IonButton>
        <IonButton expand="block" onClick={scheduleOne}>
          Schedule just one
        </IonButton>
        <IonButton expand="block" onClick={scheduleOnWithSeconds}>
          Schedule just one (with seconds)
        </IonButton>
        <IonButton expand="block" onClick={scheduleOnWithoutSeconds}>
          Schedule just one (without seconds)
        </IonButton>
        <IonButton expand="block" onClick={cancelOne}>
          Cancel just one
        </IonButton>
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
                  <p>{notification.body}</p>
                </IonLabel>
              </IonItem>
              <IonItemOptions side="end">
                <IonItemOption
                  color="danger"
                  onClick={() => {
                    removeDeliveredNotification(notification);
                  }}
                >
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
