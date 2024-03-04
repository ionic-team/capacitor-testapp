import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  useIonViewDidEnter,
  useIonViewDidLeave,
  isPlatform,
} from '@ionic/react';
import React from 'react';
import { PluginListenerHandle } from '@capacitor/core';
import { Browser } from '@capacitor/browser';

const BrowserPage: React.FC = () => {
  let finishedHandler: PluginListenerHandle | null = null;
  let loadedHandler: PluginListenerHandle | null = null;

  function timeout(delay: number) {
    return new Promise(res => setTimeout(res, delay));
  }

  const autoCloseAfterDelay = async () => {
    loadedHandler?.remove();
    loadedHandler = await Browser.addListener('browserPageLoaded', async () => {
      await timeout(1000);
      await Browser.close();
      await timeout(200);
      alert(`The window was closed for you`);
    });
  };

  useIonViewDidEnter(() => {
    setListeners();
  });
  const setListeners = async () => {
    finishedHandler = await Browser.addListener('browserFinished', async () => {
      await timeout(200);
      alert(`You closed the window`);
    });
  };
  useIonViewDidLeave(() => {
    finishedHandler?.remove();
    loadedHandler?.remove();
    finishedHandler = null;
    loadedHandler = null;
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Browser</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton
                expand="block"
                onClick={() => {
                  loadedHandler?.remove();
                  loadedHandler = null;
                  Browser.open({ url: 'https://capacitorjs.com' });
                }}
              >
                Open URL
              </IonButton>
            </IonCol>
          </IonRow>
          {isPlatform('ios') ? (
            <IonRow>
              <IonCol>
                <IonButton
                  expand="block"
                  onClick={() => {
                    autoCloseAfterDelay();
                    Browser.open({ url: 'https://capacitorjs.com' });
                  }}
                >
                  Open and then close URL
                </IonButton>
              </IonCol>
            </IonRow>
          ) : null}
          {isPlatform('desktop') || isPlatform('mobileweb') ? (
            <IonRow>
              <IonCol>
                <IonButton
                  expand="block"
                  onClick={() => {
                    Browser.close();
                  }}
                >
                  Close most recently opened
                </IonButton>
              </IonCol>
            </IonRow>
          ) : null}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default BrowserPage;
