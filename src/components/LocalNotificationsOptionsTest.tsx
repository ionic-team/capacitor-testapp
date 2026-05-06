import { LocalNotifications, LocalNotificationSchema } from '@capacitor/local-notifications';
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import { isPlatform } from '@ionic/react';
import React, { useState } from 'react';

import styles from './LocalNotificationsOptionsTest.module.css';

export default function LocalNotificationsOptionsTest() {
  const [relevanceScore, setRelevanceScore] = useState<number>(0.5);
  const [interruptionLevel, setInterruptionLevel] = useState<
    'active' | 'critical' | 'passive' | 'timeSensitive'
  >('active');

  const notSupported = !isPlatform('ios');

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

  const scheduleWithOptions = async () => {
    const notifications: LocalNotificationSchema[] = [
      {
        ...createNotification(),
        relevanceScore,
        interruptionLevel,
      },
    ];
    const result = await LocalNotifications.schedule({ notifications });
    console.log('schedule result:', result);
  };

  return (
    <div className={styles.container}>
      {notSupported && (
        <div className={styles.notSupported}>
          <h2>Not supported on Android</h2>
        </div>
      )}
      <IonList>
        <IonListHeader>Schedule with options (iOS 15+)</IonListHeader>
        <IonItem>
          <IonLabel position="stacked">Relevance Score (0.0 – 1.0)</IonLabel>
          <IonInput
            type="number"
            min="0"
            max="1"
            step="0.1"
            value={relevanceScore}
            onIonChange={e => setRelevanceScore(parseFloat(e.detail.value ?? '0.5'))}
          />
        </IonItem>
        <IonItem>
          <IonLabel>Interruption Level</IonLabel>
          <IonSelect
            value={interruptionLevel}
            onIonChange={e => setInterruptionLevel(e.detail.value)}
          >
            <IonSelectOption value="active">active</IonSelectOption>
            <IonSelectOption value="critical">critical</IonSelectOption>
            <IonSelectOption value="passive">passive</IonSelectOption>
            <IonSelectOption value="timeSensitive">timeSensitive</IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonList>
      <IonButton expand="block" onClick={scheduleWithOptions}>
        Schedule with options
      </IonButton>
    </div>
  );
}
