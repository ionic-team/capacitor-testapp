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
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import { SystemBars } from '@capacitor/core';
import { SystemBarInsets } from '@capacitor/core/types/core-plugins';
import { useState } from 'react';

const SystemBarsPage: React.FC = () => {
  const [selectedInset, setSelectedInset] = useState<SystemBarInsets | null>(
    null,
  );

  const onselectedInsetChange = (e: any) => {
    setSelectedInset(e.detail.value ?? null);
    console.log(e.detail.value);
  };

  const onHideSystemBars = async () => {
    SystemBars.setHidden({
      hidden: true,
      inset: selectedInset ?? undefined,
    });
    await SystemBars.setHidden({
      hidden: true,
      inset: selectedInset ?? undefined,
    });
  };

  const onShowSystemBars = async () => {
    await SystemBars.setHidden({
      hidden: false,
      inset: selectedInset ?? undefined,
    });
  };

  const onSetLightStyle = async () => {
    await SystemBars.setStyle({
      style: 'LIGHT',
      inset: selectedInset ?? undefined,
    });
  };

  const onSetDarkStyle = async () => {
    await SystemBars.setStyle({
      style: 'DARK',
      inset: selectedInset ?? undefined,
    });
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
        <IonList>
          <IonItem>
            <IonSelect
              onIonChange={onselectedInsetChange}
              label="Insets"
              aria-label="inset">
              <IonSelectOption value="">All</IonSelectOption>
              <IonSelectOption value="top">Top</IonSelectOption>
              <IonSelectOption value="bottom">Bottom</IonSelectOption>
              <IonSelectOption value="left">Left</IonSelectOption>
              <IonSelectOption value="right">Right</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>
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
