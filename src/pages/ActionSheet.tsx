import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonToggle,
  IonItem,
  IonLabel,
} from '@ionic/react';
import React, { useState } from 'react';
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';

const ActionSheetPage: React.FC = () => {
  const [cancelable, setCancelable] = useState(true);

  const showActions = async () => {
    const result = await ActionSheet.showActions({
      title: 'Photo Options',
      message: 'Select an option to perform',
      options: [
        { title: 'Upload' },
        { title: 'Share' },
        {
          title: 'Remove',
          style: ActionSheetButtonStyle.Destructive,
        },
      ],
      cancelable: cancelable,
    });

    console.log('Normal sheet:', result);
    alert('Normal sheet: ' + JSON.stringify(result));
  };

  const showActionsWithCancel = async () => {
    const result = await ActionSheet.showActions({
      title: 'Photo Options',
      message: 'Select an option to perform',
      options: [
        { title: 'Upload' },
        { title: 'Share' },
        {
          title: 'Cancel',
          style: ActionSheetButtonStyle.Cancel,
        },
      ],
      cancelable: cancelable,
    });

    console.log('Cancel sheet:', result);
    alert('Cancel sheet: ' + JSON.stringify(result));
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
        <IonItem>
          <IonLabel>Cancelable</IonLabel>
          <IonToggle
            checked={cancelable}
            onIonChange={e => setCancelable(e.detail.checked)}
          />
        </IonItem>

        <IonButton expand="block" onClick={showActions}>
          Show Actions (Destructive)
        </IonButton>

        <IonButton expand="block" onClick={showActionsWithCancel}>
          Show Actions (With Cancel)
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ActionSheetPage;
