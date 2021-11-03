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
import {
  Camera,
  ImageOptions,
  CameraSource,
  CameraResultType,
  CameraPluginPermissions,
} from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

interface CameraPageState {
  filePath: string | null;
  metadata: string | null;
}

class CameraPage extends React.Component<{}, CameraPageState> {
  constructor(props: {}) {
    super(props);
    this.state = { filePath: null, metadata: null };
  }

  addPhoto = async (source: CameraSource, save: boolean = false) => {
    try {
      const options: ImageOptions = {
        quality: 100,
        resultType: CameraResultType.Uri,
        source: source,
        saveToGallery: save,
        allowEditing: false,
        webUseInput: source === CameraSource.Photos,
      };
      var photo = await Camera.getPhoto(options);
      this.setState({
        filePath: photo.path ?? photo.webPath ?? null,
        metadata: JSON.stringify(photo.exif, null, 2),
      });
    } catch (e) {
      alert(`Failed to get picture with error:\n'${e}'`);
    }
  };

  checkPermissions = async () => {
    const permissionStates = await Camera.checkPermissions();
    alert(
      `Permissions are:\ncamera = ${permissionStates.camera}\nphotos = ${permissionStates.photos}`,
    );
  };

  requestPermissions = async (permissions?: CameraPluginPermissions) => {
    const permissionStates = await Camera.requestPermissions(permissions);
    alert(
      `Permissions are:\ncamera = ${permissionStates.camera}\nphotos = ${permissionStates.photos}`,
    );
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
          <IonCard>
            <IonCardContent>
              <IonButton expand="block" onClick={() => this.checkPermissions()}>
                Check Permissions
              </IonButton>
              <IonButton
                expand="block"
                onClick={() =>
                  this.requestPermissions({ permissions: ['camera'] })
                }
              >
                Request Camera Permissions
              </IonButton>
              <IonButton
                expand="block"
                onClick={() =>
                  this.requestPermissions({ permissions: ['photos'] })
                }
              >
                Request Photo Permissions
              </IonButton>
              <IonButton
                expand="block"
                onClick={() => this.requestPermissions()}
              >
                Request All Permissions
              </IonButton>
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardContent>
              <IonButton
                expand="block"
                onClick={() => this.addPhoto(CameraSource.Camera)}
              >
                Take Picture
              </IonButton>
              <IonButton
                expand="block"
                onClick={() => this.addPhoto(CameraSource.Camera, true)}
              >
                Take Picture and Save
              </IonButton>
              <IonButton
                expand="block"
                onClick={() => this.addPhoto(CameraSource.Photos)}
              >
                Choose Picture
              </IonButton>
              <IonButton
                expand="block"
                onClick={() => this.addPhoto(CameraSource.Prompt)}
              >
                Prompt
              </IonButton>
            </IonCardContent>
          </IonCard>
          {this.state.filePath != null ? (
            <IonCard>
              <IonCardContent>
                <div>
                  <img
                    src={Capacitor.convertFileSrc(this.state.filePath)}
                    alt="Most Recent"
                  />
                </div>
                <div>
                  <pre>{this.state.metadata}</pre>
                </div>
              </IonCardContent>
            </IonCard>
          ) : (
            <div></div>
          )}
        </IonContent>
      </IonPage>
    );
  }
}

export default CameraPage;
