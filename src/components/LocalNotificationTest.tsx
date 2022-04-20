import {
  LocalNotifications,
  LocalNotificationSchema,
  PendingResult,
} from '@capacitor/local-notifications';
import {
  IonButton,
  IonItem,
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

  const scheduleNowWithLargeIcon = async () => {
    const notifications: LocalNotificationSchema[] = [
      {
        ...createNotification(),
        smallIcon: 'ic_stat_icon_sample',
        iconColor: '#00ff00',
        largeIcon: 'large_icon_sample.png',
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

  const scheduleAndroidBigTextStyle = async () => {
    const notifications: LocalNotificationSchema[] = [
      {
        ...{
          id: 223,
          title: 'Android Big Text Test',
          body: 'Testing, 1, 2, 3',
          summaryText: 'From Capacitor',
          largeBody:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elite. Morbi quis magna lobortis, dignissim tortor eu, congue lectus. Vestibulum in purus sagittis est blandit sodales.\n\nAliquam lacinia mi id erat eleifend, nec elementum ipsum fermentum. Duis cursus eget lorem sed posuere. Aliquam congue sed lacus eget suscipit. Curabitur vulputate sem quis sollicitudin sollicitudin. Sed sed semper ligula. \n\nIn arcu urna, pretium vel cursus vel, interdum quis massa.',
          sound: 'beep.aiff',
          attachments: [{ id: 'face', url: 'res:///assets/ionitron.png' }],
        },
      },
    ];

    const result = await LocalNotifications.schedule({ notifications });
    console.log('schedule result:', result);

    await getPendingNotifications();
  };

  const testAndroidInboxStyle = async () => {
    const notifications: LocalNotificationSchema[] = [
      {
        id: generateId(),
        title: '4 New mails from Capacitor',
        body: 'You have new messages',
        summaryText: '+3 more messages',
        largeIcon: 'large_icon_sample.png',
        inboxList: [
          'New direct message from John',
          'New direct message from Jane',
          "Don't miss our 50% off sale!",
          'Payment Confirmation',
        ],
      },
    ];

    const result = await LocalNotifications.schedule({ notifications });
    console.log('schedule result:', result);

    await getPendingNotifications();
  };

  const testAndroidGroupStyle = async () => {
    const notifications: LocalNotificationSchema[] = [
      {
        title: 'Noti1',
        body: 'Body1',
        id: 1,
        schedule: { at: new Date(Date.now() + 1000 * 5) },
        actionTypeId: '',
        extra: null,
        group: '1',
      },
      {
        title: 'Noti2',
        body: 'Body2',
        id: 2,
        schedule: { at: new Date(Date.now() + 1000 * 5) },
        actionTypeId: '',
        extra: null,
        group: '1',
      },
      {
        title: 'NotiGroup',
        body: 'NotiGroup',
        id: 3,
        schedule: { at: new Date(Date.now() + 1000 * 5) },
        actionTypeId: '',
        extra: null,
        group: '1',
        groupSummary: true,
        summaryText: 'Test Summary',
      },
    ];

    const result = await LocalNotifications.schedule({ notifications });
    console.log('schedule result:', result);

    await getPendingNotifications();
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
        <h4>Scheduling Tests</h4>
        <hr />
        <IonButton expand="block" onClick={scheduleOne}>
          Schedule just one
        </IonButton>
        <IonButton expand="block" onClick={cancelOne}>
          Cancel just one
        </IonButton>
        <IonButton expand="block" onClick={scheduleOnWithSeconds}>
          Schedule just one (with seconds)
        </IonButton>
        <IonButton expand="block" onClick={scheduleOnWithoutSeconds}>
          Schedule just one (without seconds)
        </IonButton>
        <IonButton expand="block" onClick={scheduleNow}>
          Schedule now
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
        <h4>Android Notification Style Tests</h4>
        <IonButton expand="block" onClick={scheduleNowWithIcon}>
          Custom Small Icon Test
        </IonButton>
        <IonButton expand="block" onClick={scheduleNowWithLargeIcon}>
          Custom Large Icon Test
        </IonButton>
        <IonButton expand="block" onClick={scheduleAndroidBigTextStyle}>
          Android Big Text Style
        </IonButton>
        <IonButton expand="block" onClick={testAndroidInboxStyle}>
          Android Inbox Style
        </IonButton>
        <IonButton expand="block" onClick={testAndroidGroupStyle}>
          Android Group Notification
        </IonButton>
      </section>
    </div>
  );
}
