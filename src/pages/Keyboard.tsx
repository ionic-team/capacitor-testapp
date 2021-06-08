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
import { capInvoke } from '../utils/call';

const KeyboardPage: React.FC = () => {
  let hideHandler: PluginListenerHandle;
  let showHandler: PluginListenerHandle;

  let isBarShowing = true;
  let scrollEnabled = true;

  useIonViewDidEnter(async () => {
    showHandler = await capInvoke(() =>
      Keyboard.addListener('keyboardWillShow', info => {
        console.log('keyboard show', info);
      }),
    );
    hideHandler = await capInvoke(() =>
      Keyboard.addListener('keyboardWillHide', () => {
        console.log('keyboard hide');
      }),
    );
  });

  useIonViewDidLeave(() => {
    hideHandler.remove();
    showHandler.remove();
  });

  const show = async () => {
    capInvoke(() => Keyboard.show());
  };

  const hide = async () => {
    capInvoke(() => Keyboard.hide());
  };

  const toggleAccessoryBar = async () => {
    isBarShowing = !isBarShowing;
    capInvoke(() =>
      Keyboard.setAccessoryBarVisible({
        isVisible: isBarShowing,
      }),
    );
  };

  const toggleScroll = async () => {
    scrollEnabled = !scrollEnabled;
    capInvoke(() =>
      Keyboard.setScroll({
        isDisabled: scrollEnabled,
      }),
    );
  };

  const setStyleLight = async () => {
    capInvoke(() => Keyboard.setStyle({ style: KeyboardStyle.Light }));
  };

  const setStyleDark = async () => {
    capInvoke(() => Keyboard.setStyle({ style: KeyboardStyle.Dark }));
  };

  const setStyleDefault = async () => {
    capInvoke(() => Keyboard.setStyle({ style: KeyboardStyle.Default }));
  };

  const setResizeModeNone = async () => {
    capInvoke(() => Keyboard.setResizeMode({ mode: KeyboardResize.None }));
  };

  const setResizeModeBody = async () => {
    capInvoke(() => Keyboard.setResizeMode({ mode: KeyboardResize.Body }));
  };

  const setResizeModeNative = async () => {
    capInvoke(() => Keyboard.setResizeMode({ mode: KeyboardResize.Native }));
  };

  const setResizeModeIonic = async () => {
    capInvoke(() => Keyboard.setResizeMode({ mode: KeyboardResize.Ionic }));
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
        <IonButton expand="block" onClick={setStyleDefault}>
          set Style Default
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
