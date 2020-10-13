import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
  useIonViewDidLeave,
} from '@ionic/react';
import React from 'react';
import { Keyboard, KeyboardResize, KeyboardStyle } from '@capacitor/keyboard';
import { PluginListenerHandle } from '@capacitor/core';

const KeyboardPage: React.FC = () => {
  let hideHandler: PluginListenerHandle;
  let showHandler: PluginListenerHandle;

  let isBarShowing = true;
  let scrollEnabled = true;

  useIonViewDidEnter(() => {
    showHandler = Keyboard.addListener('keyboardWillShow', info => {
      console.log('keyboard show', info);
    });
    hideHandler = Keyboard.addListener('keyboardWillHide', () => {
      console.log('keyboard hide');
    });
  });

  useIonViewDidLeave(() => {
    hideHandler.remove();
    showHandler.remove();
  });

  const show = async () => {
    Keyboard.show();
  };

  const hide = async () => {
    Keyboard.hide();
  };

  const toggleAccessoryBar = async () => {
    isBarShowing = !isBarShowing;
    Keyboard.setAccessoryBarVisible({
      isVisible: isBarShowing,
    });
  };

  const toggleScroll = async () => {
    scrollEnabled = !scrollEnabled;
    Keyboard.setScroll({
      isDisabled: scrollEnabled,
    });
  };

  const setStyleLight = async () => {
    Keyboard.setStyle({ style: KeyboardStyle.Light });
  };

  const setStyleDark = async () => {
    Keyboard.setStyle({ style: KeyboardStyle.Dark });
  };

  const setResizeModeNone = async () => {
    Keyboard.setResizeMode({ mode: KeyboardResize.None });
  };

  const setResizeModeBody = async () => {
    Keyboard.setResizeMode({ mode: KeyboardResize.Body });
  };

  const setResizeModeNative = async () => {
    Keyboard.setResizeMode({ mode: KeyboardResize.Native });
  };

  const setResizeModeIonic = async () => {
    Keyboard.setResizeMode({ mode: KeyboardResize.Ionic });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Keyboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton expand="block" onClick={show}>
          Show
        </IonButton>
        <IonButton expand="block" onClick={hide}>
          Hide
        </IonButton>
        <IonButton expand="block" onClick={toggleAccessoryBar}>
          Toggle Accessory Bar
        </IonButton>
        <IonButton expand="block" onClick={toggleScroll}>
          Toggle Scroll
        </IonButton>
        <IonButton expand="block" onClick={setStyleLight}>
          set Style Light
        </IonButton>
        <IonButton expand="block" onClick={setStyleDark}>
          set Style Dark
        </IonButton>
        <IonButton expand="block" onClick={setResizeModeNone}>
          set Resize Mode None
        </IonButton>
        <IonButton expand="block" onClick={setResizeModeBody}>
          set Resize Mode Body
        </IonButton>
        <IonButton expand="block" onClick={setResizeModeNative}>
          set Resize Mode Native
        </IonButton>
        <IonButton expand="block" onClick={setResizeModeIonic}>
          set Resize Mode Ionic
        </IonButton>
        <IonInput placeholder="Enter Input"></IonInput>
      </IonContent>
    </IonPage>
  );
};

export default KeyboardPage;
