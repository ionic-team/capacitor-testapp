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
import { Preferences } from '@capacitor/preferences';

import { createEventTargetValueExtractor } from '../utils/dom';

const PreferencesPage: React.FC = () => {
  const [group, setGroup] = useState('CapacitorStorage');
  const [key, setKey] = useState('key1');
  const [value, setValue] = useState('');

  const handleGroupInputChange = createEventTargetValueExtractor(setGroup);
  const handleKeyInputChange = createEventTargetValueExtractor(setKey);
  const handleValueInputChange = createEventTargetValueExtractor(setValue);

  const handleSetGroupClicked = async () => {
    await Preferences.configure({ group });
  };

  const handleGetClicked = async () => {
    const { value } = await Preferences.get({ key });
    alert(`${key}: ${value}`);
  };

  const handleSetClicked = async () => {
    await Preferences.set({ key, value });
  };

  const handleRemoveClicked = async () => {
    await Preferences.remove({ key });
  };

  const handleRemoveAllClicked = async () => {
    await Preferences.clear();
  };

  const handleGetAllClicked = async () => {
    const { keys } = await Preferences.keys();
    alert(`all keys: ${keys.join(', ')}`);
  };

  const handleMigrationTestClicked = async () => {
    // localStorage.setItem('_cap_key1', 'data1');
    // localStorage.setItem('_cap_key2', 'data2');
    const { migrated, existing } = await Preferences.migrate();

    alert(
      `Done!\n${migrated.length} keys migrated, ${existing.length} not migrated.`,
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Preferences</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Preferences Group</IonLabel>
            <IonInput value={group} onInput={handleGroupInputChange} />
            <IonButton onClick={handleSetGroupClicked} slot="end">
              Set
            </IonButton>
          </IonItem>
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
            Clear Preferences
          </IonButton>
          <IonButton onClick={handleGetAllClicked} expand="full">
            Get All Keys
          </IonButton>
        </IonList>
        <hr />
        <IonList>
          <IonButton onClick={handleMigrationTestClicked} expand="full">
            Migration Test
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default PreferencesPage;
