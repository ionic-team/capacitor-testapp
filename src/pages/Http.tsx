import {
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonMenuButton,
    IonTitle,
    IonToolbar,
    IonText,
    IonButton,
    IonInput,
    IonLabel,
    IonSelect,
    IonSelectOption,
} from '@ionic/react';
import React, { useState } from 'react';

const HttpPage: React.FC = () => {
    const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts/1');
    const [headers, setHeaders] = useState('{"Content-Type": "application/json; charset=UTF-8"}');
    const [params, setParams] = useState('');
    const [response, setResponse] = useState('');
    const [requestType, setRequestType] = useState('GET');
    const [implementation, setImplementation] = useState('FETCH');

    const toggleParams = () => {
        if (params.length > 0) {
            setParams('');
        }
        else {
            setParams('{"id": 1, "title": "foo","body": "bar","userId": 1}');
        }
    }

    const sendRequest = () => {
        if (implementation === 'FETCH') {
            sendRequestFetch();
        }
        else if (implementation === 'XHR') {
            sendRequestXHR();
        }
        else {
            sendRequestCapacitor();
        }
    }

    const sendRequestFetch = async () => {
        try {
            const response = await fetch(
                url,
                {
                    headers: JSON.parse(headers),
                    method: requestType,
                    body: (params.length > 0) ? params : undefined,
                }
            );
    
            const responseJSON = await response.json();
            setResponse(JSON.stringify(responseJSON));
        }
        catch (err: any) {
            setResponse(err.message);
        }
    }

    const sendRequestXHR = async () => {
        try {
            var xhr = new XMLHttpRequest();
            xhr.open(requestType, url, true);

            for (const [key, value] of Object.entries(JSON.parse(headers))) {
                xhr.setRequestHeader(key, `${value}`);
            }

            xhr.onload = function() {
                setResponse(xhr.responseText);
            };

            xhr.onerror = function () {
                setResponse(xhr.responseText);
            };

            if (params.length > 0) {
                xhr.send(params);
            }
            else {
                xhr.send();
            }
        }
        catch (err: any) {
            setResponse(err.message);
        }
    }

    const sendRequestCapacitor = async () => {
        setResponse('{}');
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Http</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent style={{ 'fontSize': 'x-large' }}>
                <IonText color="primary">
                    <p>Response: {response}</p>
                </IonText>
                <IonLabel>URL:</IonLabel>
                <IonInput value={url}
                    onIonChange={e => setUrl(e.detail.value ?? '')}
                    placeholder="Enter URL"></IonInput>
                <IonLabel>Headers:</IonLabel>
                <IonInput value={headers}
                    onIonChange={e => setHeaders(e.detail.value ?? '')}
                    placeholder="Enter Headers"></IonInput>
                <IonLabel>Params:</IonLabel>
                <IonInput value={params}
                    onIonChange={e => setParams(e.detail.value ?? '')}
                    placeholder="Enter Params"></IonInput>
                <IonLabel>Request Type:</IonLabel>
                <IonSelect placeholder="Select Request Type"
                    onIonChange={e => setRequestType(e.detail.value ?? '')}
                    value={requestType}>
                    <IonSelectOption value="GET">GET</IonSelectOption>
                    <IonSelectOption value="POST">POST</IonSelectOption>
                    <IonSelectOption value="PUT">PUT</IonSelectOption>
                    <IonSelectOption value="DELETE">DELETE</IonSelectOption>
                    <IonSelectOption value="PATCH">PATCH</IonSelectOption>
                </IonSelect>
                <IonLabel>Implementation:</IonLabel>
                <IonSelect placeholder="Select Implementation"
                    onIonChange={e => setImplementation(e.detail.value ?? '')}
                    value={implementation}>
                    <IonSelectOption value="FETCH">Fetch</IonSelectOption>
                    <IonSelectOption value="XHR">XMLHttpRequest</IonSelectOption>
                    <IonSelectOption value="CAPACITOR">Capacitor</IonSelectOption>
                </IonSelect>
                <IonButton expand="block" onClick={() => toggleParams()}>Toggle Params On/Off</IonButton>
                <IonButton expand="block" onClick={() => sendRequest()}>Send Request</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default HttpPage;
