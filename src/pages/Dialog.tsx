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

import { Dialog } from '@capacitor/dialog';

const DialogPage: React.FC = () => {
  const showAlert = async () => {
    let alertRet = await Dialog.alert({
      title: 'Stop',
      message: 'this is an error',
      buttonTitle: 'Okay!',
    });
    console.log('Alert ret', alertRet);
  };
  const showConfirm = async () => {
    let confirmRet = await Dialog.confirm({
      title: 'Confirm',
      message: "Are you sure you'd like to press the red button?",
      okButtonTitle: 'Ok?',
      cancelButtonTitle: 'Cancel?',
    });
    console.log('Confirm ret', confirmRet);
  };
  const showPrompt = async () => {
    let promptRet = await Dialog.prompt({
      title: 'Hello',
      message: "What's your name?",
    });
    console.log('Prompt ret', promptRet);
  };
  const nativeAlert = async () => {
    alert('This is a browser alert');
  };
  const nativeConfirm = async () => {
    var yes = window.confirm('Do it?');
    console.log('Confirm result', yes);
  };
  const nativePrompt = async () => {
    var val = prompt('Enter name');
    console.log('Val:', val);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Modals</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton expand="block" onClick={showAlert}>
          Alert
        </IonButton>
        <IonButton expand="block" onClick={showConfirm}>
          Confirm
        </IonButton>
        <IonButton expand="block" onClick={showPrompt}>
          Prompt
        </IonButton>
        <IonButton expand="block" onClick={nativeAlert}>
          Native Alert
        </IonButton>
        <IonButton expand="block" onClick={nativeConfirm}>
          Native Confirm
        </IonButton>
        <IonButton expand="block" onClick={nativePrompt}>
          Native Prompt
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default DialogPage;
