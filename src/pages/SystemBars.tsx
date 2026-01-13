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
import { SystemBars, SystemBarsStyle, SystemBarType } from '@capacitor/core';

const SystemBarsPage: React.FC = () => {
  const setSystemBarStyleDefault = async () => {
    SystemBars.setStyle({
      style: SystemBarsStyle.Default,
    });
  };

  const setSystemBarStyleLight = async () => {
    await SystemBars.setStyle({ style: SystemBarsStyle.Light });
  };

  const setSystemBarStyleDark = async () => {
    await SystemBars.setStyle({ style: SystemBarsStyle.Dark });
  };

  const showSystemBars = async () => {
    await SystemBars.show();
  };

  const hideSystemBars = async () => {
    await SystemBars.hide();
  };

  const hideNavigationBar = async () => {
    await SystemBars.hide({
      bar: SystemBarType.NavigationBar,
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
        <IonButton expand="block" onClick={setSystemBarStyleDefault}>
          Change System Bars Style Default
        </IonButton>
        <IonButton expand="block" onClick={setSystemBarStyleLight}>
          Change System Bars Style Light
        </IonButton>
        <IonButton expand="block" onClick={setSystemBarStyleDark}>
          Change System Bars Style Dark
        </IonButton>
        <IonButton expand="block" onClick={showSystemBars}>
          Show System Bars
        </IonButton>
        <IonButton expand="block" onClick={hideSystemBars}>
          Hide System Bars
        </IonButton>
        <IonButton expand="block" onClick={hideNavigationBar}>
          Hide Navigation Bar
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SystemBarsPage;
