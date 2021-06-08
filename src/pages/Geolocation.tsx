import {
  useIonViewDidLeave,
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
import React, { useCallback, useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { capInvoke } from '../utils/call';

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

const GeolocationPage = () => {
  const [watchId, setWatchId] = useState('');
  const [initialLocation, setInitialLocation] = useState<any>(null);
  const [currentLocation, setCurrentLocation] = useState<any>(null);

  const options = { enableHighAccuracy: true };

  useIonViewDidLeave(async () => {
    await endWatch();
  });

  const getLocation = async () => {
    try {
      const { coords, timestamp } = await capInvoke(() =>
        Geolocation.getCurrentPosition(options),
      );

      setInitialLocation({
        timestamp,
        latitude: coords.latitude,
        longitude: coords.longitude,
        accuracy: coords.accuracy,
        altitude: coords.altitude,
        altitudeAccuracy: coords.altitudeAccuracy,
        heading: coords.heading,
        speed: coords.speed,
      });
    } catch (error) {
      console.log('Error getting location', error);
    }
  };

  const startWatch = async () => {
    const watchId = await capInvoke(() =>
      Geolocation.watchPosition(options, (position, err) => {
        setCurrentLocation({
          timestamp: position?.timestamp,
          latitude: position?.coords.latitude,
          longitude: position?.coords.longitude,
          accuracy: position?.coords.accuracy,
          altitude: position?.coords.altitude,
          altitudeAccuracy: position?.coords.altitudeAccuracy,
          heading: position?.coords.heading,
          speed: position?.coords.speed,
        });
      }),
    );
    setWatchId(watchId);
  };

  const endWatch = useCallback(async () => {
    await capInvoke(() => Geolocation.clearWatch({ id: watchId }));
    setCurrentLocation(null);
  }, [watchId]);

  const checkPermissions = async () => {
    await capInvoke(() => Geolocation.checkPermissions());
  };

  const requestPermissions = async () => {
    await capInvoke(() => Geolocation.requestPermissions());
  };

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
            <IonButton expand="block" onClick={checkPermissions}>
              Check Permissions
            </IonButton>
            <IonButton expand="block" onClick={requestPermissions}>
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
            <IonButton expand="block" onClick={getLocation}>
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
                    Speed: {currentLocation.speed ? currentLocation.speed : '-'}
                  </li>
                  <li>Accuracy: {currentLocation.accuracy}</li>
                  <li>
                    Altitude Accuracy:{' '}
                    {currentLocation.altitudeAccuracy
                      ? currentLocation.altitudeAccuracy
                      : '-'}
                  </li>
                </ul>,
                <IonButton expand="block" onClick={endWatch}>
                  Stop Watching Location
                </IonButton>,
              ]
            ) : (
              <IonButton expand="block" onClick={startWatch}>
                Watch Location
              </IonButton>
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default GeolocationPage;
