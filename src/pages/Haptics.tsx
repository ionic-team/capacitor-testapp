import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import {
  Haptics,
  HapticsImpactStyle,
  HapticsNotificationType,
} from '@capacitor/haptics';

import React from 'react';

const HapticsPage: React.FC = () => {
  const hapticsImpact = async (style = HapticsImpactStyle.Heavy) => {
    try {
      await Haptics.impact({
        style: style,
      });
    } catch (ex) {
      console.log('ex', ex);
    }
  };

  const hapticsNotif = async (type = HapticsNotificationType.Warning) => {
    try {
      await Haptics.notification({
        type: type,
      });
    } catch (ex) {
      console.log('ex', ex);
    }
  };

  const hapticsWarn = async () => {
    hapticsNotif();
  };

  const hapticsSuccess = async () => {
    hapticsNotif(HapticsNotificationType.Success);
  };

  const hapticsError = async () => {
    hapticsNotif(HapticsNotificationType.Error);
  };

  const hapticsImpactHeavy = async () => {
    hapticsImpact();
  };

  const hapticsImpactMedium = async () => {
    hapticsImpact(HapticsImpactStyle.Medium);
  };

  const hapticsImpactLight = async () => {
    hapticsImpact(HapticsImpactStyle.Light);
  };

  const hapticsVibrate = async () => {
    try {
      await Haptics.vibrate();
    } catch (ex) {
      console.log('ex', ex);
    }
  };

  const hapticsSelectionStart = async () => {
    await Haptics.selectionStart();
  };

  const hapticsSelectionChanged = async () => {
    try {
      await Haptics.selectionChanged();
    } catch (ex) {
      console.log('ex', ex);
    }
  };

  const hapticsSelectionEnd = async () => {
    await Haptics.selectionEnd();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Haptics</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>Impact</IonLabel>
            <IonButton expand="block" onClick={hapticsImpactHeavy}>
              Heavy
            </IonButton>
            <IonButton expand="block" onClick={hapticsImpactMedium}>
              Medium
            </IonButton>
            <IonButton expand="block" onClick={hapticsImpactLight}>
              Light
            </IonButton>
          </IonItem>
          <IonItem>
            <IonLabel>Notification</IonLabel>
            <IonButton expand="block" onClick={hapticsWarn}>
              Warn
            </IonButton>
            <IonButton expand="block" onClick={hapticsSuccess}>
              Success
            </IonButton>
            <IonButton expand="block" onClick={hapticsError}>
              Error
            </IonButton>
          </IonItem>
          <IonItem>
            <IonLabel>Vibration</IonLabel>
            <IonButton expand="block" onClick={hapticsVibrate}>
              Vibrate
            </IonButton>
          </IonItem>
          <IonItem>
            <IonLabel>Selection</IonLabel>
            <IonButton expand="block" onClick={hapticsSelectionStart}>
              Start
            </IonButton>
            <IonButton expand="block" onClick={hapticsSelectionChanged}>
              Changed
            </IonButton>
            <IonButton expand="block" onClick={hapticsSelectionEnd}>
              End
            </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default HapticsPage;
