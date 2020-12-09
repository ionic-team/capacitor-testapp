import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
} from '@ionic/react';
import React from 'react';
import {
  Geolocation,
  GeolocationPermissionStatus,
} from '@capacitor/geolocation';

interface PermissionPageState {
  permissions: GeolocationPermissionStatus | undefined;
}

class PermissionPage extends React.Component<{}, PermissionPageState> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      permissions: {
        location: 'prompt',
      },
    };
  }

  checkPermissions = async () => {
    try {
      const status = await Geolocation.checkPermissions();
      if (status['location'] === 'granted') {
      } else {
      }
      this.setState({
        permissions: status,
      });
    } catch (err) {
      console.log(err);
    }
  };

  requestPermissions = async () => {
    const status = await Geolocation.requestPermissions();
    this.setState({
      permissions: status,
    });
  };

  render() {
    const permissions = this.state.permissions;
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Permissions</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Options</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonButton expand="block" onClick={this.checkPermissions}>
                Check Permissions
              </IonButton>
              <IonButton expand="block" onClick={this.requestPermissions}>
                Request Permissions
              </IonButton>
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Permission State</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonText>{JSON.stringify(permissions)}</IonText>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    );
  }
}

export default PermissionPage;
