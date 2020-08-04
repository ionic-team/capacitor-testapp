import { ExceptionCodes, PluginListenerHandle } from '@capacitor/core';
import { ScreenReader } from '@capacitor/screen-reader';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonList,
  IonItem,
  IonLabel,
  useIonViewDidEnter,
  useIonViewDidLeave,
} from '@ionic/react';
import React, { useState } from 'react';
import { createEventTargetValueExtractor } from '../utils/dom';

const ScreenReaderPage: React.FC = () => {
  let handler: PluginListenerHandle;
  const [sentence, setSentence] = useState('Hello World?');

  useIonViewDidEnter(() => {
    handler = ScreenReader.addListener(
      'screenReaderStateChange',
      ({ value }: any) => alert(`State Change! Screen Reader on? ${value}`),
    );
  });

  useIonViewDidLeave(() => {
    handler.remove();
  });

  const isVoiceOverEnabled = async () => {
    try {
      const { value: enabled } = await ScreenReader.isEnabled();
      alert(`Screen Reader on? ${enabled}`);
    } catch (e) {
      if (e.code === ExceptionCodes.UNSUPPORTED_BROWSER) {
        console.warn(
          'Unsupported in the browser! Handling this in my own way...',
        );
      } else {
        throw e;
      }
    }
  };

  const speak = async () => {
    await ScreenReader.speak({ value: sentence });
  };

  const handleSpeakInputChange = createEventTargetValueExtractor(setSentence);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Screen Reader</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>Screen Reader</IonLabel>
            <IonButton expand="block" onClick={isVoiceOverEnabled}>
              TalkBack/VoiceOver Enabled?
            </IonButton>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Sentence</IonLabel>
            <IonInput value={sentence} onInput={handleSpeakInputChange} />
            <IonButton onClick={speak} slot="end">
              Speak
            </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ScreenReaderPage;
