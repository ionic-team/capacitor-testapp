import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonMenuButton,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { BackgroundRunner } from "@capacitor/background-runner";
import {
  CapacitorBarcodeScanner,
  CapacitorBarcodeScannerAndroidScanningLibrary,
  CapacitorBarcodeScannerCameraDirection,
  CapacitorBarcodeScannerScanOrientation,
  CapacitorBarcodeScannerTypeHint,
} from '@capacitor/barcode-scanner';
import { useState } from 'react';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { FileTransfer } from '@capacitor/file-transfer';
import { FileViewer } from '@capacitor/file-viewer';
import { GoogleMap } from '@capacitor/google-maps';
import { DefaultWebViewOptions, InAppBrowser } from '@capacitor/inappbrowser';
import { PrivacyScreen, PrivacyScreenConfig } from '@capacitor/privacy-screen';

const OtherOfficialPluginsPage: React.FC = () => {

  const [backgroundRunnerOutput, setBackgroundRunnerOutput] = useState<string>("");

  const backgroundRunnerTest = async () => {
    setBackgroundRunnerOutput("");
    try {
      await BackgroundRunner.dispatchEvent({
        label: "com.example.background.task",
        event: "testCapKVSet",
        details: {
          value: "Hello World",
        },
      });
      const response = await BackgroundRunner.dispatchEvent({
        label: "com.example.background.task",
        event: "testCapKVGet",
        details: {},
      });
      setBackgroundRunnerOutput(`success: retrieved ${JSON.stringify(response)}`);
    } catch (err) {
      setBackgroundRunnerOutput(`ERROR: ${err}`);
    }
  };

  const barcodeScannerTest = async () => {
    try {
      const result = await CapacitorBarcodeScanner.scanBarcode({
        hint: CapacitorBarcodeScannerTypeHint.ALL,
        scanInstructions: "Point your camera at a barcode to scan it.",
        scanButton: false,
        scanText: "",
        cameraDirection: CapacitorBarcodeScannerCameraDirection.BACK,
        scanOrientation: CapacitorBarcodeScannerScanOrientation.ADAPTIVE,
        android: {
          scanningLibrary: CapacitorBarcodeScannerAndroidScanningLibrary.MLKIT,
        }
      });
    } catch (error) {
      console.error("Barcode scan failed", error);
    }
  };

  const fileTransferAndViewerTest = async () => {
    try {
        const fileName = 'test.pdf';
        const pathResult = await Filesystem.getUri({
            path: fileName,
            directory: Directory.Cache
          });
        let filePath = pathResult.uri;;

        // Download file
        const result = await FileTransfer.downloadFile({
          url: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf',
          path: filePath,
          progress: false,
        });

        await FileViewer.openDocumentFromLocalPath({
          path: result.path ?? '',
        });
      } catch (error) {
        console.error("Download and/or open failed", error);
      }
  };

  const googleMapsTest = async () => {
    try {
      const mapRef1 = document.getElementById('map1_create_destroy')!;

      const newMap1 = await GoogleMap.create(
        {
          element: mapRef1,
          id: 'test-map-create-destroy1',
          apiKey: 'YOUR_API_KEY_HERE',
          config: {
            center: {
              lat: 33.6,
              lng: -117.9,
            },
            zoom: 8,
          },
          forceCreate: true,
        },
      );
    } catch (error) {
        console.error("Create Google Maps Failed", error);
    }
  }

  const inAppBrowserTest = async () => {
    try {
      await InAppBrowser.openInWebView({
        url: "https://www.google.com",
        options: DefaultWebViewOptions
      });
    } catch (error) {
      console.error("Open In WebView Failed", error);
    }
  };

  const privacyScreenTest = async () => {
    try {
      const config: PrivacyScreenConfig = {
        android: {
          dimBackground: false,
          preventScreenshots: true,
          privacyModeOnActivityHidden: 'dim'
        },
        ios: {
          blurEffect: 'none'
        }
      };
      await PrivacyScreen.enable(config);
    } catch (error) {
      console.error("Privacy Screen Enable Failed", error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Other Official Capacitor Plugins</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>Background Runner</IonLabel>
            <IonButton expand="block" onClick={backgroundRunnerTest}>
              Test KV with Background Runnber
            </IonButton>
            <div>
              <IonTextarea
                id="backgroundRunnerOutput"
                value={backgroundRunnerOutput}
                autoGrow={true}
              ></IonTextarea>
            </div>
          </IonItem>
          <IonItem>
            <IonLabel>Barcode Scanner</IonLabel>
            <IonButton expand="block" onClick={barcodeScannerTest}>
              Scan Barcode
            </IonButton>
          </IonItem>
          <IonItem>
            <IonLabel>File Transfer + Viewer</IonLabel>
            <IonButton expand="block" onClick={fileTransferAndViewerTest}>
              Download File and Open
            </IonButton>
          </IonItem>
          <IonItem>
            <IonLabel>Google Maps</IonLabel>
            <IonButton expand="block" onClick={googleMapsTest}>
              Create Google maps
            </IonButton>
            <div>
              <capacitor-google-map
                id="map1_create_destroy"
                style={{
                  position: 'absolute',
                  top: window.innerHeight - window.outerWidth / 2,
                  left: 0,
                  width: window.outerWidth / 2,
                  height: window.outerWidth / 2,
                }}
              ></capacitor-google-map>
            </div>
          </IonItem>
          <IonItem>
            <IonLabel>InAppBrowser</IonLabel>
            <IonButton expand="block" onClick={inAppBrowserTest}>
              Open URL in WebView
            </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default OtherOfficialPluginsPage;
