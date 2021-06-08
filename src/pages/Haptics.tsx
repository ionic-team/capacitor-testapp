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
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

import React from 'react';
import { capInvoke } from '../utils/call';

const HapticsPage: React.FC = () => {
  const hapticsImpact = async (style = ImpactStyle.Heavy) => {
    try {
      await capInvoke(() =>
        Haptics.impact({
          style: style,
        }),
      );
    } catch (ex) {
      console.log('ex', ex);
    }
  };

  const hapticsNotif = async (type = NotificationType.Warning) => {
    try {
      await capInvoke(() =>
        Haptics.notification({
          type: type,
        }),
      );
    } catch (ex) {
      console.log('ex', ex);
    }
  };

  const hapticsWarn = async () => {
    hapticsNotif();
  };

  const hapticsSuccess = async () => {
    hapticsNotif(NotificationType.Success);
  };

  const hapticsError = async () => {
    hapticsNotif(NotificationType.Error);
  };

  const hapticsImpactHeavy = async () => {
    hapticsImpact();
  };

  const hapticsImpactMedium = async () => {
    hapticsImpact(ImpactStyle.Medium);
  };

  const hapticsImpactLight = async () => {
    hapticsImpact(ImpactStyle.Light);
  };

  const hapticsVibrate = async () => {
    try {
      await capInvoke(() => Haptics.vibrate());
    } catch (ex) {
      console.log('ex', ex);
    }
  };

  const hapticsSelectionStart = async () => {
    await capInvoke(() => Haptics.selectionStart());
  };

  const hapticsSelectionChanged = async () => {
    try {
      await capInvoke(() => Haptics.selectionChanged());
    } catch (ex) {
      console.log('ex', ex);
    }
  };

  const hapticsSelectionEnd = async () => {
    await capInvoke(() => Haptics.selectionEnd());
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
