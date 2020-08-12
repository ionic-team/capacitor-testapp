import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
  IonButton,
  withIonLifeCycle,
  IonItemDivider,
  IonLabel,
} from '@ionic/react';
import React from 'react';
import { Clipboard } from '@capacitor/clipboard';

interface ClipboardInterface {
  content: string;
  type: string;
}

interface ClipboardPageState {
  clipboardData: ClipboardInterface | null;
}

class ClipboardPage extends React.Component<{}, ClipboardPageState> {
  constructor() {
    super({});
    this.state = {
      clipboardData: null,
    };
  }

  getClipboardData = async () => {
    const data = await Clipboard.read();
    this.setState({
      clipboardData: {
        type: data.type,
        content: data.value,
      },
    });
  };

  setClipboardText = async () => {
    Clipboard.write({ string: 'www.reddit.com' });
  };

  setClipboardImage = async () => {
    Clipboard.write({
      image:
        'data:image/png;base64,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',
    });
  };

  render() {
    const { clipboardData } = this.state;

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Clipboard</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonItemDivider>
          <IonLabel>Set</IonLabel>
        </IonItemDivider>
        <IonContent>
          <IonButton onClick={this.setClipboardText} expand="block">
            Text to clipboard
          </IonButton>
          <IonButton onClick={this.setClipboardImage} expand="block">
            Image to Clipboard
          </IonButton>
          <IonItemDivider>
            <IonLabel>Get</IonLabel>
          </IonItemDivider>
          <IonButton onClick={this.getClipboardData} expand="block">
            Read Clipboard Data
          </IonButton>
          {clipboardData ? (
            clipboardData.type === 'image/png' ? (
              <div>
                <IonItemDivider>
                  <IonLabel>Clipboard Image</IonLabel>
                </IonItemDivider>
                <img src={clipboardData.content} alt="From clipboard" />
              </div>
            ) : (
              <div>
                <IonItemDivider>
                  <IonLabel>Clipboard Text</IonLabel>
                </IonItemDivider>
                <p>{clipboardData.content}</p>
              </div>
            )
          ) : (
            'Empty'
          )}
        </IonContent>
      </IonPage>
    );
  }
}

export default withIonLifeCycle(ClipboardPage);
