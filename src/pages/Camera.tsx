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
  RecordVideoOptions,
  PlayVideoOptions,
  MediaResult,
  EditPhotoOptions,
  EditURIPhotoOptions,
  GalleryOptions,
  MediaType,
} from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

interface CameraPageState {
  filePath: string | null;
  metadata: string | null;
  photos: GalleryPhoto[] | null;
  isVideo?: boolean;
  photoBase64: string | null;
}

class CameraPage extends React.Component<{}, CameraPageState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      filePath: null,
      metadata: null,
      photos: null,
      photoBase64: null,
    };
  }

  addPhoto = async (
    source: CameraSource,
    save: boolean = false,
    editing: boolean = false,
  ) => {
    try {
      const options: ImageOptions = {
        quality: 100,
        resultType: CameraResultType.Uri,
        source: source,
        saveToGallery: save,
        allowEditing: editing,
        webUseInput: source === CameraSource.Photos,
      };
      var photo = await Camera.takePhoto(options);
      this.setState({
        filePath: photo.path ?? photo.webPath ?? null,
        metadata: JSON.stringify(photo.exif, null, 2),
        isVideo: false,
        photoBase64: null,
      });
    } catch (e) {
      let message = 'Unknown error';
      let code = '';

      if (typeof e === 'object' && e !== null) {
        const err = e as { message?: string; code?: string };

        if (err.message) {
          message = err.message;
        }

        if (err.code) {
          code = err.code;
        }
      }
      alert(
        `Failed to get picture with error:\n${
          code ? code + '\n' : ''
        }${message}`,
      );
    }
  };

  addPhotoLegacy = async (
    source: CameraSource,
    save: boolean = false,
    editing: boolean = false,
  ) => {
    try {
      const options: ImageOptions = {
        quality: 100,
        resultType: CameraResultType.Base64,
        source: source,
        saveToGallery: save,
        allowEditing: editing,
        webUseInput: source === CameraSource.Photos,
      };
      var photo = await Camera.getPhoto(options);
      this.setState({
        filePath: null,
        metadata: JSON.stringify(photo.exif, null, 2),
        isVideo: false,
        photoBase64: photo.base64String ?? null,
      });
    } catch (e) {
      alert(`Failed to get picture with error:\n'${e}'`);
    }
  };

  chooseFromGallery = async (
    mediaType: MediaType = MediaType.picture,
    allowMultipleSelection: boolean = true,
    includeMetadata: boolean = true,
    allowEdit: boolean = true,
  ) => {
    try {
      const options: GalleryOptions = {
        mediaType: mediaType,
        allowMultipleSelection: allowMultipleSelection,
        includeMetadata: includeMetadata,
        allowEdit: allowEdit,
      };
      var photosResult = await Camera.chooseFromGallery(options);
      console.log('photos result', photosResult.photos);
      this.setState({
        photos: photosResult.photos,
        isVideo: false,
      });
    } catch (e) {
      alert(`Failed to get picture with error:\n'${e}'`);
    }
  };

  pickPhotosLegacy = async (limit: number = 0) => {
    try {
      const options: GalleryImageOptions = {
        quality: 100,
        limit,
      };
      var photosResult = await Camera.pickImages(options);
      console.log('photos result', photosResult);
      this.setState({
        photos: photosResult.photos,
        isVideo: false,
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

  pickLimitedLibraryPhotos = async () => {
    const res = await Camera.pickLimitedLibraryPhotos();
    console.log('res', res);
  };

  getLimitedLibraryPhotos = async () => {
    const res = await Camera.getLimitedLibraryPhotos();
    console.log('res', res);
  };

  recordVideo = async (
    save: boolean = false,
    includeMetadata: boolean = false,
  ) => {
    try {
      const options: RecordVideoOptions = {
        saveToGallery: save,
        includeMetadata: includeMetadata,
      };

      const result: MediaResult = await Camera.recordVideo(options);
      this.setState({
        filePath: result.path,
        metadata: JSON.stringify(result, null, 2),
        isVideo: true,
      });
    } catch (e) {
      let message = 'Unknown error';
      let code = '';

      if (typeof e === 'object' && e !== null) {
        const err = e as { message?: string; code?: string };

        if (err.message) {
          message = err.message;
        }

        if (err.code) {
          code = err.code;
        }
      }
      alert(`Failed to record video:\n${code ? code + '\n' : ''}${message}`);
    }
  };

  playVideo = async () => {
    if (!this.state.filePath) return;

    try {
      const options: PlayVideoOptions = {
        videoURI: this.state.filePath
      };
      await Camera.playVideo(options);
    } catch (e) {
      let message = 'Unknown error';
      let code = '';

      if (typeof e === 'object' && e !== null) {
        const err = e as { message?: string; code?: string };

        if (err.message) {
          message = err.message;
        }

        if (err.code) {
          code = err.code;
        }
      }
      alert(`Failed to play video:\n${code ? code + '\n' : ''}${message}`);
    }
  };

  editPhoto = async () => {
    if (!this.state.photoBase64) {
      alert('No photo available to edit. Please take a photo first.');
      return;
    }

    try {
      const options: EditPhotoOptions = {
        base64: this.state.photoBase64,
      };
      const result = await Camera.editPhoto(options);
      this.setState({
        photoBase64: result.base64String ?? null,
        metadata: 'Edited photo (base64)',
      });
      alert('Photo edited successfully!');
    } catch (e) {
      let message = 'Unknown error';
      let code = '';

      if (typeof e === 'object' && e !== null) {
        const err = e as { message?: string; code?: string };

        if (err.message) {
          message = err.message;
        }

        if (err.code) {
          code = err.code;
        }
      }
      alert(`Failed to edit photo:\n${code ? code + '\n' : ''}${message}`);
    }
  };

  editURIPhoto = async () => {
    if (!this.state.filePath) {
      alert('No photo URI available to edit. Please take a photo first.');
      return;
    }

    try {
      const options: EditURIPhotoOptions = {
        uri: this.state.filePath,
        saveToGallery: false,
        includeMetadata: true,
      };
      const result: MediaResult = await Camera.editURIPhoto(options);
      this.setState({
        filePath: result.path,
        metadata: JSON.stringify(result, null, 2),
        isVideo: false,
      });
      alert('Photo edited successfully!');
    } catch (e) {
      let message = 'Unknown error';
      let code = '';

      if (typeof e === 'object' && e !== null) {
        const err = e as { message?: string; code?: string };

        if (err.message) {
          message = err.message;
        }

        if (err.code) {
          code = err.code;
        }
      }
      alert("Failed to edit photo:\n${code ? code + '\n' : ''}${message}");
    }
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
                }>
                Request Camera Permissions
              </IonButton>
              <IonButton
                expand="block"
                onClick={() =>
                  this.requestPermissions({ permissions: ['photos'] })
                }>
                Request Photo Permissions
              </IonButton>
              <IonButton
                expand="block"
                onClick={() => this.requestPermissions()}>
                Request All Permissions
              </IonButton>
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonHeader>
              <IonTitle>New API</IonTitle>
            </IonHeader>
            <IonCardContent>
              <IonButton
                expand="block"
                onClick={() => this.addPhoto(CameraSource.Camera)}>
                Take Photo
              </IonButton>
              <IonButton
                expand="block"
                onClick={() => this.addPhoto(CameraSource.Camera, true)}>
                Take Photo and Save
              </IonButton>
              <IonButton
                expand="block"
                onClick={() => this.addPhoto(CameraSource.Camera, false, true)}>
                Take Photo and Edit
              </IonButton>
              <IonButton
                expand="block"
                onClick={() => this.recordVideo(false, true)}>
                Record Video
              </IonButton>
              <IonButton
                expand="block"
                onClick={() => this.recordVideo(true, true)}>
                Record Video and Save
              </IonButton>
              {this.state.isVideo && this.state.filePath && (
                <IonButton expand="block" onClick={() => this.playVideo()}>
                  Play Video (Native)
                </IonButton>
              )}
              <IonButton
                expand="block"
                onClick={() => this.chooseFromGallery(MediaType.picture)}>
                Choose From Gallery (Pictures)
              </IonButton>
              <IonButton
                expand="block"
                onClick={() => this.chooseFromGallery(MediaType.all)}>
                Choose From Gallery (All Media)
              </IonButton>
              {!this.state.isVideo && this.state.photoBase64 && (
                <IonButton expand="block" onClick={() => this.editPhoto()}>
                  Edit Photo (Base64)
                </IonButton>
              )}
              {!this.state.isVideo && this.state.filePath && (
                <IonButton expand="block" onClick={() => this.editURIPhoto()}>
                  Edit Photo (URI)
                </IonButton>
              )}
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonHeader>
              <IonTitle>Legacy API</IonTitle>
            </IonHeader>
            <IonCardContent>
              <IonButton
                expand="block"
                onClick={() => this.addPhotoLegacy(CameraSource.Camera)}>
                Take Picture
              </IonButton>
              <IonButton
                expand="block"
                onClick={() => this.addPhotoLegacy(CameraSource.Camera, true)}>
                Take Picture and Save
              </IonButton>
              <IonButton
                expand="block"
                onClick={() =>
                  this.addPhotoLegacy(CameraSource.Camera, false, true)
                }>
                Take Picture and Edit
              </IonButton>
              <IonButton
                expand="block"
                onClick={() => this.addPhotoLegacy(CameraSource.Photos)}>
                Choose Picture
              </IonButton>
              <IonButton
                expand="block"
                onClick={() => this.addPhotoLegacy(CameraSource.Prompt)}>
                Prompt
              </IonButton>
              <IonButton expand="block" onClick={() => this.pickPhotosLegacy()}>
                Pick Photos
              </IonButton>
              <IonButton
                expand="block"
                onClick={() => this.pickPhotosLegacy(3)}>
                Pick 3 Photos
              </IonButton>
              <IonButton
                expand="block"
                onClick={() => this.pickLimitedLibraryPhotos()}>
                pickLimitedLibraryPhotos
              </IonButton>
              <IonButton
                expand="block"
                onClick={() => this.getLimitedLibraryPhotos()}>
                getLimitedLibraryPhotos
              </IonButton>
            </IonCardContent>
          </IonCard>
          <IonGrid>
            <IonRow>
              {photos?.map(photo => (
                <IonCol size="6" key={photo.webPath}>
                  {photo.format === 'jpg' ||
                  photo.format === 'jpeg' ||
                  photo.format === 'png' ? (
                    <IonImg src={photo.webPath}></IonImg>
                  ) : (
                    <video
                      src={photo.webPath}
                      controls
                      style={{ width: '100%' }}
                    />
                  )}
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
          {this.state.filePath || this.state.photoBase64 ? (
            <IonCard>
              <IonCardContent>
                <div>
                  {this.state.isVideo && this.state.filePath ? (
                    <video
                      controls
                      width="100%"
                      src={Capacitor.convertFileSrc(this.state.filePath)}
                    />
                  ) : this.state.photoBase64 ? (
                    <img
                      src={`data:image/jpeg;base64,${this.state.photoBase64}`}
                      alt="Most Recent"
                      style={{ width: '100%' }}
                    />
                  ) : this.state.filePath ? (
                    <img
                      src={Capacitor.convertFileSrc(this.state.filePath)}
                      alt="Most Recent"
                    />
                  ) : null}
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
