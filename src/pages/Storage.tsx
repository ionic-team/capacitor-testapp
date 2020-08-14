import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonInput,
} from '@ionic/react';
import React, { useState } from 'react';
import { Storage } from '@capacitor/storage';

import { createEventTargetValueExtractor } from '../utils/dom';

const StoragePage: React.FC = () => {
  const [key, setKey] = useState('key1');
  const [value, setValue] = useState('');

  const handleKeyInputChange = createEventTargetValueExtractor(setKey);
  const handleValueInputChange = createEventTargetValueExtractor(setValue);

  const handleGetClicked = async () => {
    const { value } = await Storage.get({ key });
    alert(`${key}: ${value}`);
  };

  const handleSetClicked = async () => {
    await Storage.set({ key, value });
  };

  const handleRemoveClicked = async () => {
    await Storage.remove({ key });
  };

  const handleRemoveAllClicked = async () => {
    await Storage.clear();
  };

  const handleGetAllClicked = async () => {
    const { keys } = await Storage.keys();
    alert(`all keys: ${keys.join(', ')}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Storage</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Key</IonLabel>
            <IonInput value={key} onInput={handleKeyInputChange} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Value</IonLabel>
            <IonInput value={value} onInput={handleValueInputChange} />
          </IonItem>
          <IonButton onClick={handleSetClicked} expand="full">
            Set {key}
          </IonButton>
          <IonButton onClick={handleGetClicked} expand="full">
            Get {key}
          </IonButton>
          <IonButton onClick={handleRemoveClicked} expand="full">
            Remove {key}
          </IonButton>
          <IonButton onClick={handleRemoveAllClicked} expand="full">
            Clear Storage
          </IonButton>
          <IonButton onClick={handleGetAllClicked} expand="full">
            Get All Keys
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default StoragePage;
