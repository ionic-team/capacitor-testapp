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
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
} from '@ionic/react';
import React from 'react';
import {
  Camera,
  ImageOptions,
  CameraSource,
  CameraResultType,
  CameraPluginPermissions,
  GalleryPhoto,
  GalleryImageOptions,
} from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

interface CameraPageState {
  filePath: string | null;
  metadata: string | null;
  photos: GalleryPhoto[] | null;
}

class CameraPage extends React.Component<{}, CameraPageState> {
  constructor(props: {}) {
    super(props);
    this.state = { filePath: null, metadata: null, photos: null };
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

  pickPhotos = async (limit: number = 0) => {
    try {
      const options: GalleryImageOptions = {
        quality: 100,
        limit,
      };
      var photosResult = await Camera.pickImages(options);
      console.log('photos result', photosResult);
      this.setState({
        photos: photosResult.photos,
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
    const photos = this.state.photos;
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
              <IonButton expand="block" onClick={() => this.pickPhotos()}>
                Pick Photos
              </IonButton>
              <IonButton expand="block" onClick={() => this.pickPhotos(3)}>
                Pick 3 Photos
              </IonButton>
            </IonCardContent>
          </IonCard>
          <IonGrid>
            <IonRow>
              {photos?.map(photo => (
                <IonCol size="6">
                  <IonImg src={photo.webPath}></IonImg>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
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
