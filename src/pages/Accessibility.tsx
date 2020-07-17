import { Plugins, PluginListenerHandle } from '@capacitor/core';
import { ScreenReader, ScreenReaderSpec } from '@capacitor/screen-reader';
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

const { Accessibility } = Plugins;

const AccessibilityPage: React.FC = () => {
  console.log('ScreenReader', ScreenReader, ScreenReaderSpec);
  let handler: PluginListenerHandle;
  const [sentence, setSentence] = useState('Hello World!');

  useIonViewDidEnter(() => {
    handler = Accessibility.addListener(
      'accessibilityScreenReaderStateChange',
      ({ value }) => alert(`State Change! Screen Reader on? ${value}`),
    );
  });

  useIonViewDidLeave(() => {
    handler.remove();
  });

  const isVoiceOverEnabled = async () => {
    const { value: enabled } = await Accessibility.isScreenReaderEnabled();

    alert(`Screen Reader on? ${enabled}`);
  };

  const speak = async () => {
    await Accessibility.speak({ value: sentence });
  };

  const handleSpeakInputChange = createEventTargetValueExtractor(setSentence);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Accessibility</IonTitle>
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

export default AccessibilityPage;
