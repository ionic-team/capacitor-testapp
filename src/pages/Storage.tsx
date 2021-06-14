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
import { capInvoke } from '../utils/call';

const StoragePage: React.FC = () => {
  const [group, setGroup] = useState('CapacitorStorage');
  const [key, setKey] = useState('key1');
  const [value, setValue] = useState('');

  const handleGroupInputChange = createEventTargetValueExtractor(setGroup);
  const handleKeyInputChange = createEventTargetValueExtractor(setKey);
  const handleValueInputChange = createEventTargetValueExtractor(setValue);

  const handleSetGroupClicked = async () => {
    await Storage.configure({ group });
  };

  const handleGetClicked = async () => {
    const { value } = await capInvoke(() => Storage.get({ key }));
    // alert(`${key}: ${value}`);
  };

  const handleSetClicked = async () => {
    await capInvoke(() => Storage.set({ key, value }));
  };

  const handleRemoveClicked = async () => {
    await capInvoke(() => Storage.remove({ key }));
  };

  const handleRemoveAllClicked = async () => {
    await capInvoke(() => Storage.clear());
  };

  const handleGetAllClicked = async () => {
    const { keys } = await capInvoke(() => Storage.keys());
    // alert(`all keys: ${keys.join(', ')}`);
  };

  const handleMigrationTestClicked = async () => {
    // localStorage.setItem('_cap_key1', 'data1');
    // localStorage.setItem('_cap_key2', 'data2');
    const { migrated, existing } = await capInvoke(() => Storage.migrate());

    /*alert(
      `Done!\n${migrated.length} keys migrated, ${existing.length} not migrated.`,
    );*/
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
            <IonLabel position="stacked">Storage Group</IonLabel>
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
            <IonInput
              value={value}
              onInput={handleValueInputChange}
              id="storage-value"
            />
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

export default StoragePage;
