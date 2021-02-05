import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonButton,
} from '@ionic/react';
import { useIonRouter } from '@capacitor/native-ui-library-ionic-react';
import React from 'react';

const Home: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <p>Welcome to the Capacitor Test App.</p>
        <p>
          This app was created to test and develop Capacitor core and plugins.
          To test plugins, open the side menu and navigate to the plugin's page!
        </p>
        <p>
          <IonButton
            onClick={() => {
              router.push('/native-ui');
            }}>
            Native UI
          </IonButton>
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Home;
