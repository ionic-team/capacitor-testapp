import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  withIonLifeCycle,
  IonText,
} from '@ionic/react';
import React from 'react';
import { Network, ConnectionStatus } from '@capacitor/network';
import { PluginListenerHandle } from '@capacitor/core';
import './Network.css';

interface NetworkPageState {
  handler: PluginListenerHandle | undefined;
  networkStatus: ConnectionStatus | undefined;
}

class NetworkPage extends React.Component<{}, NetworkPageState> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      handler: undefined,
      networkStatus: {
        connected: false,
        connectionType: 'unknown',
      },
    };
  }

  ionViewDidEnter() {
    this.updateNetworkStatus();
    const handler = Network?.addListener(
      'networkStatusChange',
      (status: ConnectionStatus) => {
        this.setState({
          networkStatus: status,
        });
      },
    );
    this.setState({ handler: handler });
  }

  ionViewDidLeave() {
    this.state.handler?.remove();
    this.setState({ handler: undefined });
  }

  updateNetworkStatus = async () => {
    const status = await Network?.getStatus();
    this.setState({
      networkStatus: status,
    });
  };

  render() {
    const status = this.state.networkStatus;
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Network</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="container">
            {status?.connected ? (
              <IonText color="dark">
                <p>Connected</p>
              </IonText>
            ) : (
              <IonText color="medium">
                <p>Disconnected</p>
              </IonText>
            )}
            <IonText color="dark">
              <p>Connection type is {status?.connectionType}</p>
            </IonText>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

export default withIonLifeCycle(NetworkPage);
