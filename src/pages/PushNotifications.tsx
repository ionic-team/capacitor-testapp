import cx from 'classnames';
import { PushNotifications } from '@capacitor/push-notifications';
import {
  PushNotificationDeliveredList,
  Channel,
} from '@capacitor/push-notifications/dist/esm/definitions';
import {
  IonButtons,
  IonContent,
  IonModal,
  IonHeader,
  IonButton,
  IonList,
  IonItem,
  IonInput,
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
  IonItemDivider,
  IonSelect,
  IonSelectOption,
  IonToggle,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import './PushNotifications.css';
import { PermissionState } from '@capacitor/core';

type NewChannelForm = Omit<Channel, 'id'>;

const PushNotificationsPage: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<PermissionState>('denied');
  const [channelsList, setChannelsList] = useState<Channel[]>([]);
  const [showNewChannelModal, setShowNewChannelModal] = useState<boolean>(
    false,
  );
  const [
    notificationList,
    setNotificationList,
  ] = useState<PushNotificationDeliveredList>({ notifications: [] });

  const listNotificationChannels = async () => {
    try {
      const channels = await PushNotifications.listChannels();
      setChannelsList(channels.channels);
    } catch (e) {
      console.error('listChannels error', e);
    }
  };

  const createNotificationChannel = async (newChannel: NewChannelForm) => {
    try {
      const channel: Channel = {
        ...newChannel,
        id: newChannel.name,
      };

      console.log('new channel', channel);
      await PushNotifications.createChannel(channel);
      await listNotificationChannels();
    } catch (e) {
      console.log('createChannel error');
      console.error(e);
    }
  };

  const deleteNotificationChannel = async (channel: Channel) => {
    try {
      await PushNotifications.deleteChannel(channel);
      await listNotificationChannels();
    } catch (e) {
      console.log('createChannel error');
      console.error(e);
    }
  };

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

  const initialChannelFormValues: NewChannelForm = {
    name: '',
    description: '',
    importance: 3,
    vibration: undefined,
    visibility: undefined,
    lightColor: undefined,
    lights: undefined,
    sound: undefined,
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
          {notificationList.notifications.length === 0 ?? (
            <IonItem>
              <IonLabel>No notifications.</IonLabel>
            </IonItem>
          )}
        </IonList>
        <br />
        <br />
        <section>
          <IonButton onClick={listNotificationChannels} expand="block">
            List Notification Channels
          </IonButton>
          <IonButton
            expand="block"
            onClick={e => {
              setShowNewChannelModal(true);
            }}>
            Create Notification Channel
          </IonButton>
        </section>
        <IonList>
          <IonListHeader>Channels (swipe to remove)</IonListHeader>
          {channelsList.map(channel => {
            return (
              <IonItemSliding key={channel.id}>
                <IonItem>
                  <IonLabel>
                    <h2>{channel.name}</h2>
                    <p>{channel.description}</p>
                  </IonLabel>
                </IonItem>
                <IonItemOptions side="end">
                  <IonItemOption
                    color="danger"
                    onClick={() => {
                      deleteNotificationChannel(channel);
                    }}>
                    Delete
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            );
          })}
          {channelsList.length === 0 ?? (
            <IonItem>
              <IonLabel>No channels.</IonLabel>
            </IonItem>
          )}
        </IonList>
        <IonModal
          isOpen={showNewChannelModal}
          onDidDismiss={() => {
            setShowNewChannelModal(false);
          }}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>New Channel</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <Formik
              initialValues={initialChannelFormValues}
              onSubmit={(values: NewChannelForm, actions: any) => {
                createNotificationChannel(values).then(() => {
                  setShowNewChannelModal(false);
                });
              }}>
              {({ values, errors, isValid, handleSubmit, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
                  <IonList>
                    <IonItemDivider>Required</IonItemDivider>
                    <IonItem>
                      <IonLabel position="stacked">Channel Name</IonLabel>
                      <IonInput
                        value={values.name}
                        onIonChange={e =>
                          setFieldValue('name', e.detail.value ?? '')
                        }></IonInput>
                    </IonItem>
                    <IonItem>
                      <IonLabel position="stacked">
                        Channel Description
                      </IonLabel>
                      <IonInput
                        value={values.description}
                        onIonChange={e =>
                          setFieldValue('description', e.detail.value ?? '')
                        }></IonInput>
                    </IonItem>
                    <IonItem>
                      <IonLabel>Importance</IonLabel>
                      <IonSelect
                        value={values.importance}
                        onIonChange={e =>
                          setFieldValue('importance', e.detail.value ?? '3')
                        }>
                        <IonSelectOption value={1}>1</IonSelectOption>
                        <IonSelectOption value={2}>2</IonSelectOption>
                        <IonSelectOption value={3}>3</IonSelectOption>
                        <IonSelectOption value={4}>4</IonSelectOption>
                        <IonSelectOption value={5}>5</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                    <IonItemDivider>Optional</IonItemDivider>
                    <IonItem>
                      <IonLabel>Sound</IonLabel>
                      <IonInput
                        value={values.sound}
                        onIonChange={e =>
                          setFieldValue('sound', e.detail.value)
                        }></IonInput>
                    </IonItem>
                    <IonItem>
                      <IonLabel>Visibility</IonLabel>
                      <IonSelect
                        value={values.visibility}
                        onIonChange={e =>
                          setFieldValue('visibility', e.detail.value)
                        }>
                        <IonSelectOption value={-1}>-1</IonSelectOption>
                        <IonSelectOption value={0}>0</IonSelectOption>
                        <IonSelectOption value={1}>1</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                    <IonItem>
                      <IonLabel>Lights</IonLabel>
                      <IonToggle
                        value="lights"
                        checked={values.lights ?? false}
                        onIonChange={e =>
                          setFieldValue('lights', e.detail.checked)
                        }
                      />
                    </IonItem>
                    <IonItem>
                      <IonLabel>Light Color</IonLabel>
                      <IonInput
                        value={values.lightColor}
                        onIonChange={e =>
                          setFieldValue('lightColor', e.detail.value)
                        }></IonInput>
                    </IonItem>
                    <IonItem>
                      <IonLabel>Vibration</IonLabel>
                      <IonToggle
                        value="vibration"
                        checked={values.vibration ?? false}
                        onIonChange={e =>
                          setFieldValue('vibration', e.detail.checked)
                        }
                      />
                    </IonItem>
                  </IonList>
                  <section>
                    <IonButton
                      color="primary"
                      expand="block"
                      disabled={!isValid}
                      type="submit">
                      Create
                    </IonButton>
                    <br />
                    <IonButton
                      color="danger"
                      expand="block"
                      onClick={() => {
                        setShowNewChannelModal(false);
                      }}>
                      Cancel
                    </IonButton>
                  </section>
                </form>
              )}
            </Formik>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default PushNotificationsPage;
