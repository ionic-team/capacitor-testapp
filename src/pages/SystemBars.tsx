import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { SystemBars, SystemBarsStyle, SystemBarType } from '@capacitor/core';

const SystemBarsPage: React.FC = () => {
  const [log, setLog] = useState<string[]>([]);
  const [statusTapCount, setStatusTapCount] = useState(0);

  const addLog = (message: string) => {
    setLog(previous => [`${new Date().toISOString()} ${message}`, ...previous]);
  };

  useEffect(() => {
    const handle = SystemBars.addListener('statusTap', () => {
      setStatusTapCount(count => count + 1);
      addLog('statusTap (plugin listener)');
    });

    return () => {
      handle.then(h => h.remove());
    };
  }, []);

  const getStyle = async (bar: SystemBarType) => {
    try {
      const result = await SystemBars.getStyle({ bar });
      addLog(`getStyle(${bar}) -> ${result.style}`);
    } catch (e) {
      addLog(`getStyle(${bar}) failed: ${(e as Error).message}`);
    }
  };

  const removeAllListeners = async () => {
    await SystemBars.removeAllListeners();
    addLog('removeAllListeners() called');
  };

  const setSystemBarStyleDefault = async () => {
    SystemBars.setStyle({
      style: SystemBarsStyle.Default,
    });
  };

  const setStatusBarStyleDefault = async () => {
    await SystemBars.setStyle({
      style: SystemBarsStyle.Default,
      bar: SystemBarType.StatusBar,
    });
  };

  const setNavigationBarStyleDefault = async () => {
    await SystemBars.setStyle({
      style: SystemBarsStyle.Default,
      bar: SystemBarType.NavigationBar,
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
        <IonButton expand="block" onClick={setStatusBarStyleDefault}>
          Change Status Bar Style Default
        </IonButton>
        <IonButton expand="block" onClick={setNavigationBarStyleDefault}>
          Change Navigation Bar Style Default
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
        <IonButton
          expand="block"
          onClick={() => getStyle(SystemBarType.StatusBar)}
        >
          Get Style (StatusBar)
        </IonButton>
        <IonButton
          expand="block"
          onClick={() => getStyle(SystemBarType.NavigationBar)}
        >
          Get Style (NavigationBar)
        </IonButton>
        <IonButton expand="block" onClick={removeAllListeners}>
          Remove All Listeners
        </IonButton>
        <IonList>
          <IonListHeader>Status tap count: {statusTapCount}</IonListHeader>
          {log.map(entry => (
            <IonItem key={entry}>
              <IonLabel className="ion-text-wrap">{entry}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SystemBarsPage;
