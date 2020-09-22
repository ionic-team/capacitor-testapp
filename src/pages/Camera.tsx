import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonCardContent,
  IonCard,
  IonButton,
} from '@ionic/react';
import React from 'react';
import { Camera, CameraOptions, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

interface CameraPageState {
  filePath: string | null;
}

class CameraPage extends React.Component<{}, CameraPageState> {
  constructor(props: {}) {
    super(props);
    this.state = { filePath: null };
  }
  addPhoto = async (source: CameraSource) => {
    const options: CameraOptions = {
      quality: 100,
      resultType: 'uri',
      source: source,
    };
    var photo = await Camera.getPhoto(options);
    this.setState({ filePath: photo.path ?? null });
  };
  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Camera</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {this.state.filePath != null ? (
            <IonCard>
              <IonCardContent>
                <img
                  src={Capacitor.convertFileSrc(this.state.filePath)}
                  alt="Last Photo"
                />
              </IonCardContent>
            </IonCard>
          ) : (
            <div></div>
          )}
          <IonCard>
            <IonCardContent>
              <IonButton expand="block" onClick={() => this.addPhoto('camera')}>
                Use Camera
              </IonButton>
              <IonButton expand="block" onClick={() => this.addPhoto('photos')}>
                Choose Picture
              </IonButton>
              <IonButton expand="block" onClick={() => this.addPhoto('prompt')}>
                Prompt
              </IonButton>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    );
  }
}

export default CameraPage;
