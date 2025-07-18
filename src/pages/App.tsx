import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
  useIonViewDidLeave,
  isPlatform,
} from '@ionic/react';
import React, { useState } from 'react';
import {
  Capacitor,
  ExceptionCode,
  PluginListenerHandle,
} from '@capacitor/core';
import { App, AppState } from '@capacitor/app';
import { AppLauncher } from '@capacitor/app-launcher';

const AppPage: React.FC = () => {
  const [appInfoJson, setAppInfoJson] = useState('');
  let stateChangeHandler: PluginListenerHandle;
  let pauseHandler: PluginListenerHandle;
  let resumeHandler: PluginListenerHandle;
  let urlOpenHandler: PluginListenerHandle;
  let restoredResultHandler: PluginListenerHandle;

  useIonViewDidEnter(() => {
    setListeners();

    getLaunchUrl();
  });

  const setListeners = async () => {
    stateChangeHandler = await App.addListener(
      'appStateChange',
      (state: AppState) => {
        console.log('App state changed', state);
      },
    );

    pauseHandler = await App.addListener('pause', async () => {
      console.log('App paused');
    });

    resumeHandler = await App.addListener('resume', () => {
      console.log('App resumed');
    });

    urlOpenHandler = await App.addListener('appUrlOpen', (data: any) => {
      alert('APP URL OPEN: ' + data.url);
    });

    restoredResultHandler = await App.addListener(
      'appRestoredResult',
      (data: any) => {
        alert('Got restored result');
        console.log('Restored result:', data);
      },
    );
  };

  const getLaunchUrl = async () => {
    const ret = await App.getLaunchUrl();
    if (ret && ret.url) {
      alert('App opened with URL: ' + ret.url);
    }
    console.log('Launch url: ', ret);
  };

  const getInfo = async () => {
    const info = await App.getInfo();
    console.log('Got device info', info);
    setAppInfoJson(JSON.stringify(info, null, 2));
  };

  const getState = async () => {
    const info = await App.getState();
    console.log('Got device state', info);
    setAppInfoJson(JSON.stringify(info, null, 2));
  };

  const exitApp = async () => {
    App.exitApp();
  };

  const minimizeApp = async () => {
    try {
      await App.minimizeApp();
    } catch (e: any) {
      if (e.code === ExceptionCode.Unimplemented) {
        console.warn(
          'minimizeApp is not implemented for',
          Capacitor.getPlatform(),
        );
      } else {
        console.error(e);
      }
    }
  };

  const canOpenUrl = async () => {
    const ret = await AppLauncher.canOpenUrl({ url: 'mailto:name@email.com' });
    console.log('Can open url: ', ret.value);
  };

  const openUrl = async () => {
    const ret = await AppLauncher.openUrl({
      url: 'mailto:name@email.com',
    });
    console.log('Open url response: ', ret);
  };

  const failCall = async () => {
    await AppLauncher.openUrl({ url: '' });
  };

  useIonViewDidLeave(() => {
    stateChangeHandler.remove();
    urlOpenHandler.remove();
    restoredResultHandler.remove();
    pauseHandler.remove();
    resumeHandler.remove();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton expand="block" onClick={getInfo}>
          Get Info
        </IonButton>
        <IonButton expand="block" onClick={getState}>
          Get Status
        </IonButton>
        {isPlatform('android') ? (
          <IonButton expand="block" onClick={exitApp}>
            Exit app
          </IonButton>
        ) : null}
        <IonButton expand="block" onClick={minimizeApp}>
          Minimize app
        </IonButton>
        <IonButton expand="block" onClick={canOpenUrl}>
          Can Open Url
        </IonButton>
        <IonButton expand="block" onClick={openUrl}>
          Open Url
        </IonButton>
        <IonButton expand="block" onClick={failCall}>
          Test Failing Call
        </IonButton>
        <IonButton expand="block" href="https://flems.io/#0=N4IgzgpgNhDGAuEAmIBcIB0ALeBbKIANCAGYCWMYaA2qAHYCGuEamO+RIsA9nYn6wA8WAIwA+ADp1BDAARYAThBIBeCSDJ8IfVAHpdWbswDEASS18A3GFhYIzFT1wZYDAA4NYZeNwUArMAx3NwxEMHhgyw9YAGsGAHMIRyMXd09vXwCgtxCwiJzLT3gyXhUGOiQFbjIkDE1+eCCEEroMADVTAFEAdUttJEt1STpZWQAVCHDUWQB5N21ZAEEABWWpQV0GYY3RMU5IGGbeKnQAJlQRADYQAF9CeiYWdAwAzh4LeCE5RWU1LhTXNEMv5AsFQpN8m49AYjBAAPwkKq4FRICAQNxQTQxIZjToAZTGGy2+2gcGKx1YAAZUJcAOy3e4gRjMVguMBUYjvBqsW4AXRuQA">
        {/* If the link above ever expires, this is the HTML to test opening an intent for this app.
        <h1>
        <a href="intent://home#Intent;scheme=com.capacitorjs.app.testapp;package=com.capacitorjs.app.testapp;action=android.intent.action.VIEW;end;">
          Test: Open APP
        </a>
        </h1> */}
          Test Intents
        </IonButton>
        <p>
          <a href="tel:212-549-2543">Telephone Test</a>
          <a href="mailto:name@email.com">Email Test</a>
          <a
            href="https://capacitorjs.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more
          </a>
        </p>
        <div>
          <pre>{appInfoJson}</pre>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AppPage;
