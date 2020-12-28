import {
  IonButtons,
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  withIonLifeCycle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/react';
import React from 'react';
import { Geolocation } from '@capacitor/geolocation';

interface LocationInterface {
  latitude?: number;
  longitude?: number;
  accuracy?: number;
  altitude?: number | null;
  altitudeAccuracy?: number | null;
  heading?: number | null;
  speed?: number | null;
  timestamp?: number;
}

interface GeolocationPageState {
  initialLocation: LocationInterface | null;
  currentLocation: LocationInterface | null;
}

class GeolocationPage extends React.Component<{}, GeolocationPageState> {
  watchId: string = '';

  constructor() {
    super({});
    this.state = {
      initialLocation: null,
      currentLocation: null,
    };
  }

  options = { enableHighAccuracy: true };

  async ionViewDidLeave() {
    await this.endWatch();
  }

  getLocation = async () => {
    try {
      const { coords, timestamp } = await Geolocation.getCurrentPosition(
        this.options,
      );
      this.setState({
        initialLocation: {
          timestamp,
          latitude: coords.latitude,
          longitude: coords.longitude,
          accuracy: coords.accuracy,
          altitude: coords.altitude,
          altitudeAccuracy: coords.altitudeAccuracy,
          heading: coords.heading,
          speed: coords.speed,
        },
      });
    } catch (error) {
      console.log('Error getting location', error);
    }
  };

  startWatch = async () => {
    this.watchId = Geolocation.watchPosition(this.options, (position, err) => {
      this.setState({
        currentLocation: {
          timestamp: position?.timestamp,
          latitude: position?.coords.latitude,
          longitude: position?.coords.longitude,
          accuracy: position?.coords.accuracy,
          altitude: position?.coords.altitude,
          altitudeAccuracy: position?.coords.altitudeAccuracy,
          heading: position?.coords.heading,
          speed: position?.coords.speed,
        },
      });
    });
  };

  endWatch = async () => {
    await Geolocation.clearWatch({ id: this.watchId });
    this.setState({ currentLocation: null });
  };

  checkPermissions = async () => {
    const permissionStates = await Geolocation.checkPermissions();
    alert(`Permissions are:\nlocation = ${permissionStates.location}`);
  };

  requestPermissions = async () => {
    const permissionStates = await Geolocation.requestPermissions();
    alert(`Permissions are:\nlocation = ${permissionStates.location}`);
  };

  render() {
    const { currentLocation, initialLocation } = this.state;

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Geolocation</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonCard>
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
              <IonCardTitle>Location</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              {initialLocation != null ? (
                <ul>
                  <li>
                    Timestamp:{' '}
                    {initialLocation.timestamp
                      ? new Date(initialLocation.timestamp).toISOString()
                      : '-'}
                  </li>
                  <li>Latitude: {initialLocation.latitude}</li>
                  <li>Longitude: {initialLocation.longitude}</li>
                  <li>Altitude: {initialLocation.altitude}</li>
                  <li>
                    Heading:{' '}
                    {initialLocation.heading ? initialLocation.heading : '-'}
                  </li>
                  <li>Accuracy: {initialLocation.accuracy}</li>
                  <li>
                    Altitude Accuracy:{' '}
                    {initialLocation.altitudeAccuracy
                      ? initialLocation.altitudeAccuracy
                      : '-'}
                  </li>
                </ul>
              ) : null}
              <IonButton expand="block" onClick={this.getLocation}>
                Get Location
              </IonButton>
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Current Location</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              {currentLocation != null ? (
                [
                  <ul>
                    <li>
                      Timestamp:{' '}
                      {currentLocation.timestamp
                        ? new Date(currentLocation.timestamp).toISOString()
                        : '-'}
                    </li>
                    <li>Latitude: {currentLocation.latitude}</li>
                    <li>Longitude: {currentLocation.longitude}</li>
                    <li>Altitude: {currentLocation.altitude}</li>
                    <li>
                      Heading:{' '}
                      {currentLocation.heading ? currentLocation.heading : '-'}
                    </li>
                    <li>
                      Speed:{' '}
                      {currentLocation.speed ? currentLocation.speed : '-'}
                    </li>
                    <li>Accuracy: {currentLocation.accuracy}</li>
                    <li>
                      Altitude Accuracy:{' '}
                      {currentLocation.altitudeAccuracy
                        ? currentLocation.altitudeAccuracy
                        : '-'}
                    </li>
                  </ul>,
                  <IonButton expand="block" onClick={this.endWatch}>
                    Stop Watching Location
                  </IonButton>,
                ]
              ) : (
                <IonButton expand="block" onClick={this.startWatch}>
                  Watch Location
                </IonButton>
              )}
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    );
  }
}

export default withIonLifeCycle(GeolocationPage);
