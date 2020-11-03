import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonMenuButton,
  IonTitle,
  IonToolbar,
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
  constructor(props: Readonly<{}>) {
    super(props);
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
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAK5QTFRFAAAAQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMQGCMdURlpwAAADp0Uk5TAAIBAwVPqge4RUP8/6/C+Dz3scU9S/r7+UjPxva2GtmzBMe/GxnbrLrB2typrquwsqj9P81Gtz5HSsnXzJUAAAF3SURBVHicjZPrWsIwDIbTtYDQOE4yJjrOIAdBERC9/xszbdN1Qx+1f9b1e5t+aRqAMISIwk8kBFwNaZgc5oXCUFCp5osSajd1WirpDY23TEhQMTZbRUJCA7GNHUuQ3qUffRdOEdDTqDExhLB6gn1M770psj+gLegIUA80QXzEjAETaDiyiwmOYTK10xRnCiLnrzeYw2LJxNOKJ2vpAlj/myEstlbQSKdbXfiUrP9tIHRJF1Bx/gOBJkbMOgHP7L9AaMwifwdkc8emCqfgPtSFvi8/EONQLPp2vhEJ3/r/iVdO/ooo+NijS3+7CMQOIPIhJisLlGK08ZAXS03tESWCbq/nAOnry5dsiCXtfzvm76tr9T5iIEaYHt2TE15PMKuGbOens9MjqMW8HEeUrZtu5vmzF/DOxVobQx32f6LO8VdQb5v3aevPddGYnkMPSWj1aYt7H9IQ5P9SbCsFrSbOpE+Jqp9erpvqI1Oh6eDwWdb/bttfG/8LFe8ohlFXdYYAAAAASUVORK5CYII=',
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
