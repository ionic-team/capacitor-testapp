import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonInput,
  IonGrid,
  IonCol,
  IonRow,
} from '@ionic/react';
import React, { useState } from 'react';

import { TextZoom } from '@capacitor/text-zoom';
import { createEventTargetValueExtractor } from '../utils/dom';

const TextZoomPage: React.FC = () => {
  const [level, setLevel] = useState('1');

  useIonViewDidEnter(async () => {
    const { value: level } = await TextZoom.get();
    setLevel(level.toString());
  });

  const handleLevelInputChange = createEventTargetValueExtractor(setLevel);

  const getZoomLevel = async () => {
    const { value: level } = await TextZoom.get();
    alert(`Current zoom level: ${level}`);
  };

  const getPreferredZoomLevel = async () => {
    const { value: level } = await TextZoom.getPreferred();
    alert(`Preferred zoom level: ${level}`);
  };

  const setZoomLevel = async () => {
    await TextZoom.set({ value: Number.parseFloat(level) });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Text Zoom</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <p>The preferred zoom level can be set in the Settings app.</p>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton onClick={getZoomLevel} expand="block">
                Get Current Zoom
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton onClick={getPreferredZoomLevel} expand="block">
                Get Preferred Zoom
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Zoom Level</IonLabel>
            <IonInput value={level} onInput={handleLevelInputChange} />
            <IonButton onClick={setZoomLevel} slot="end">
              Set
            </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default TextZoomPage;
