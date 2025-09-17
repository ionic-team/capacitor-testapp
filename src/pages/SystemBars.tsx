import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from '@ionic/react';
import { SystemBars } from '@capacitor/core';

const SystemBarsPage: React.FC = () => {
  const onHideSystemBars = async () => {
    await SystemBars.setHidden({ hidden: true });
  };

  const onShowSystemBars = async () => {
    await SystemBars.setHidden({ hidden: false });
  };

  const onSetLightStyle = async () => {
    await SystemBars.setStyle({ style: 'LIGHT' });
  };

  const onSetDarkStyle = async () => {
    await SystemBars.setStyle({ style: 'DARK' });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>System Bars</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton expand="block" onClick={onShowSystemBars}>
          Show System Bars
        </IonButton>
        <IonButton expand="block" onClick={onHideSystemBars}>
          Hide System Bars
        </IonButton>
        <IonButton expand="block" onClick={onSetLightStyle}>
          Set Light Style
        </IonButton>
        <IonButton expand="block" onClick={onSetDarkStyle}>
          Set Dark Style
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SystemBarsPage;
