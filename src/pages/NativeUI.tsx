import React, { useContext, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonButton } from '@ionic/react';
import { ellipse, square, triangle } from 'ionicons/icons';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from '@capacitor/native-ui-library-ionic-react';

export interface NativeUIContextState {
  setTab3Title: (t: string) => void;
  toggleTab2Visibility: () => void;
  toggleTab1Enabled: () => void;
  toggleTabbarVisibility: () => void;
}

export const NativeUIContext = React.createContext<NativeUIContextState>({
  setTab3Title: () => null,
  toggleTab2Visibility: () => null,
  toggleTab1Enabled: () => null,
  toggleTabbarVisibility: () => null,
});

const NativeUI: React.FC = () => {
  const [tab3Title, setTab3Title] = useState('Tab 3');
  const [tab2Visible, setTab2Visible] = useState(true);
  const [isTab1Enabled, setTab1Enabled] = useState(true);
  const [isTabbarVisible, setTabbarVisible] = useState(true);
  const ctx: NativeUIContextState = {
    setTab3Title,
    toggleTab2Visibility: () => setTab2Visible(!tab2Visible),
    toggleTab1Enabled: () => setTab1Enabled(!isTab1Enabled),
    toggleTabbarVisibility: () => setTabbarVisible(!isTabbarVisible),
  };

  return (
    <NativeUIContext.Provider value={ctx}>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/native-ui/tab1" component={Tab1} exact={true} />
          <Route path="/native-ui/tab1-detail" component={Tab1Detail} />
          <Route path="/native-ui/tab2" component={Tab2} exact={true} />
          <Route path="/native-ui/tab3" component={Tab3} />
          <Route
            path="/native-ui"
            render={() => <Redirect to="/native-ui/tab1" />}
            exact={true}
          />
        </IonRouterOutlet>
        <IonTabBar slot="bottom" visible={isTabbarVisible}>
          <IonTabButton
            tab="tab1"
            href="/native-ui/tab1"
            enabled={isTab1Enabled}>
            <IonIcon icon={triangle} />
            <IonLabel>Tab 1</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/native-ui/tab2" visible={tab2Visible}>
            <IonIcon icon={ellipse} />
            <IonLabel>Tab 2</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/native-ui/tab3">
            <IonIcon icon={square} />
            <IonLabel>{tab3Title}</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </NativeUIContext.Provider>
  );
};

const Tab1: React.FC = () => {
  const router = useIonRouter();
  const ctx = useContext(NativeUIContext);
  const [title, setTitle] = useState('Tab 1');
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <IonButton
          color="tertiary"
          expand="full"
          onClick={ev => {
            ev.preventDefault();
            ctx.toggleTab1Enabled();
          }}>
          Toggle Tab 1 Enabled
        </IonButton>
        <IonButton
          color="success"
          expand="full"
          onClick={ev => {
            ev.preventDefault();
            ctx.toggleTab2Visibility();
          }}>
          Toggle Tab 2 Visibility
        </IonButton>
        <IonButton
          color="warning"
          expand="full"
          onClick={ev => {
            ev.preventDefault();
            ctx.toggleTabbarVisibility();
          }}>
          Toggle Tabbar Visibility
        </IonButton>
        <IonButton
          expand="full"
          onClick={() => {
            ctx.setTab3Title(String(Math.round(Math.random() * 999)));
          }}>
          Change Tab 3 Title
        </IonButton>
        <IonButton
          color="primary"
          expand="full"
          onClick={ev => {
            ev.preventDefault();
            setTitle('Tab ' + String(Math.round(Math.random() * 999)));
          }}>
          Update Title: {title}
        </IonButton>
        <IonButton
          color="danger"
          expand="full"
          onClick={ev => {
            ev.preventDefault();
            router.push('/native-ui/tab1-detail');
          }}>
          Go to Tab 1 Detail
        </IonButton>
        <IonButton
          color="light"
          expand="full"
          onClick={ev => {
            ev.preventDefault();
            router.push('/native-ui/tab2', 'none');
          }}>
          Go to Tab 2
        </IonButton>
        <IonButton
          color="dark"
          expand="full"
          onClick={ev => {
            ev.preventDefault();
            router.push('/native-ui/tab3', 'none');
          }}>
          Go to Tab 3
        </IonButton>
        <IonButton
          color="success"
          expand="full"
          onClick={ev => {
            ev.preventDefault();
            router.back();
          }}>
          Go Back
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

const Tab1Detail: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1 Detail</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <IonButton
          expand="full"
          onClick={ev => {
            ev.preventDefault();
            router.back();
          }}>
          Go Back
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

const Tab2: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <IonButton
          color="success"
          expand="full"
          onClick={ev => {
            ev.preventDefault();
            router.push('/native-ui/tab1', 'none');
          }}>
          Go to Tab 1
        </IonButton>
        <IonButton
          color="primary"
          expand="full"
          onClick={ev => {
            ev.preventDefault();
            router.push('/native-ui/tab3', 'none');
          }}>
          Go to Tab 3
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
const Tab3: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <IonButton
          color="danger"
          expand="full"
          onClick={ev => {
            ev.preventDefault();
            router.push('/native-ui/tab1', 'none');
          }}>
          Go to Tab 1
        </IonButton>
        <IonButton
          color="warning"
          expand="full"
          onClick={ev => {
            ev.preventDefault();
            router.push('/native-ui/tab2', 'none');
          }}>
          Go to Tab 2
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default NativeUI;
