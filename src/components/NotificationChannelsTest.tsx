import { PushNotifications } from '@capacitor/push-notifications';
import { Channel } from '@capacitor/push-notifications/dist/esm/definitions';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonItemDivider,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/react';

import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';

import styles from './NotificationChannelsTest.module.css';

type NewChannelForm = Omit<Channel, 'id'>;

export default function NotificationChannelsTest() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [channelsList, setChannelsList] = useState<Channel[]>([]);
  const [notSupported, setNotSupported] = useState<boolean>(false);

  const listNotificationChannels = async () => {
    try {
      const channels = await PushNotifications.listChannels();
      setChannelsList(channels.channels);
    } catch (e) {
      console.error('listChannels error', e);
      if (e.code === 'UNIMPLEMENTED') {
        setNotSupported(true);
      }
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

  useEffect(() => {
    listNotificationChannels();
  }, []);

  return (
    <div className={styles.container}>
      {notSupported && (
        <div className={styles.notSupported}>
          <h2>Not supported on iOS</h2>
        </div>
      )}
      <section>
        <IonButton onClick={listNotificationChannels} expand="block">
          Refresh Notification Channels
        </IonButton>
        <IonButton
          expand="block"
          onClick={e => {
            setShowModal(true);
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
        {channelsList.length === 0 && (
          <IonItem>
            <IonLabel>No channels.</IonLabel>
          </IonItem>
        )}
      </IonList>
      <NewChannelModal
        show={showModal}
        createChannel={createNotificationChannel}
        dismiss={() => {
          setShowModal(false);
        }}
      />
    </div>
  );
}

interface ModalProps {
  show: boolean;
  dismiss: () => void;
  createChannel: (channel: NewChannelForm) => Promise<void>;
}

function NewChannelModal({ show, dismiss, createChannel }: ModalProps) {
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
  return (
    <IonModal isOpen={show} onDidDismiss={dismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>New Channel</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Formik
          initialValues={initialChannelFormValues}
          onSubmit={(values: NewChannelForm) => {
            createChannel(values).then(() => {
              dismiss();
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
                  <IonLabel position="stacked">Channel Description</IonLabel>
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
                    onIonChange={e => setFieldValue('lights', e.detail.checked)}
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
                    dismiss();
                  }}>
                  Cancel
                </IonButton>
              </section>
            </form>
          )}
        </Formik>
      </IonContent>
    </IonModal>
  );
}
