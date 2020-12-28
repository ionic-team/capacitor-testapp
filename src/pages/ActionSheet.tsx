import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import { ActionSheet, ActionSheetSchemaStyle } from '@capacitor/action-sheet';

const ActionSheetPage: React.FC = () => {
  const showActions = async () => {
    let promptRet = await ActionSheet.showActions({
      title: 'Photo Options',
      message: 'Select an option to perform',
      options: [
        {
          title: 'Upload',
        },
        {
          title: 'Share',
        },
        {
          title: 'Remove',
          style: ActionSheetSchemaStyle.Destructive,
        },
      ],
    });
    console.log('You selected', promptRet);
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Action Sheet</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton expand="block" onClick={showActions}>
          Show Actions
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ActionSheetPage;
