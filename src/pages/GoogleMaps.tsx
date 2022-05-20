import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, Marker } from '@capacitor/google-maps';

import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonActionSheet,
  useIonViewDidEnter,
  useIonViewDidLeave,
} from '@ionic/react';

import './GoogleMaps.css';

interface LatLng {
  lat: number;
  lng: number;
}

const MapPage: React.FC = () => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const [map, setMap] = useState<GoogleMap | undefined>(undefined);
  const [points, setPoints] = useState<Marker[]>([]);
  const mapRef = useRef<HTMLElement>(null);
  const [showSheet, setShowSheet] = useState<boolean>(false);

  const buildPOIs = async () => {
    const pois: LatLng[] = [
      { lat: 44.941473, lng: -93.407755},
      { lat: 44.926405, lng: -93.424262},
      { lat: 44.920570, lng: -93.384410},
      { lat: 45.058001, lng: -93.366545},
      { lat: 45.044904, lng: -93.329438},
      { lat: 45.029862, lng: -93.350738},
      { lat: 44.808147, lng: -93.181582},
      { lat: 44.802301, lng: -93.143105},
      { lat: 44.818864, lng: -93.110124},
    ];

    console.log(pois);

    const markers: Marker[] = pois.map((p) => {
      return {
        coordinate: p,              
      } 
    })

    setPoints(markers);

    if (!map) {
      return;
    }
    await map.setCamera({
      coordinate: {
        lat: 44.925918,
        lng: -93.278613
      },
      zoom: 10,
      animate: true,
    })
    await map.enableClustering();
    await map.addMarkers(markers);
  }

  const enableMap = async (element: HTMLElement) => {
    const newMap = await GoogleMap.create({
      element: element,
      id: 'demo-map',
      apiKey: apiKey!,
      config: {
        center: {
          lat: 44.880566,
          lng: -93.20542,
        },
        zoom: 8,
      },
      forceCreate: true,
    });

    setMap(newMap);
  };

  const disableMap = async () => {
    if (map) {
      await map.destroy();
      setMap(undefined);
    }
  };

  const showBottomSheet = async () => {
    setShowSheet(true);
  };

  const mapShowAirport = () => {
    if (!map) {
      return null;
    }

    map.setCamera({
      zoom: 15,
      angle: 45,
      bearing: 30,
      animate: true,
    });
  };

  const mapShowShopping = async () => {
    if (!map) {
      return null;
    }

    await map.setCamera({
      coordinate: {
        lat: 44.854728,
        lng: -93.242013,
      },
      angle: 0,
      bearing: 0,
      zoom: 17,
      animate: true,
    });

    await map.enableIndoorMaps(true);
  };

  const mapShowTraffic = async () => {
    if (!map) {
      return null;
    }

    await map.setCamera({
      zoom: 8,
      animate: true,
    });
    await map.enableIndoorMaps(false);
    await map.enableTrafficLayer(true);
  };

  const mapShowPOIs = async () => {
    if (!map) {
      return null;
    }

    buildPOIs();    
  }

  useIonViewDidEnter(async () => {
    if (mapRef.current) {
      setTimeout(() => {
        console.log('map ref loaded');
        enableMap(mapRef.current!);
      }, 500);
    }
  });

  useIonViewDidLeave(async () => {
    disableMap();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Google Maps</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <capacitor-google-map ref={mapRef} id="demo-map"></capacitor-google-map>
      </IonContent>
      <IonFooter style={{ padding: '15px', paddingBottom: '25px' }}>
        <IonButton expand="block" onClick={showBottomSheet}>
          Options
        </IonButton>
      </IonFooter>
      <IonActionSheet
        isOpen={showSheet}
        onDidDismiss={() => setShowSheet(false)}
        buttons={[
          {
            text: 'Show Airport',
            handler: () => {
              mapShowAirport();
            },
          },
          {
            text: 'Show Shopping',
            handler: () => {
              mapShowShopping();
            },
          },
          {
            text: 'Show Traffic',
            handler: () => {
              mapShowTraffic();
            },
          },
          {
            text: 'Show POIs',
            handler: () => {
              mapShowPOIs();
            },
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            },
          },
        ]}
      />
    </IonPage>
  );
};

export default MapPage;
