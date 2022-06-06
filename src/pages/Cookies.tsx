import { CapacitorCookies } from '@capacitor/core';
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
} from '@ionic/react';
import React, { useEffect, useState } from 'react';

const CookiesPage: React.FC = () => {
    const [cookiesString, setCookiesString] = useState('');
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');

    useEffect(() => {
        setCookiesString(document.cookie);
    }, []);
    
    const setCookie = () => {
        document.cookie = key + '=' + value;
        setCookiesString(document.cookie);
    }

    const setCapacitorCookie = async () => {
        try {
            await CapacitorCookies.setCookie({
                key: key,
                value: value,
            });

            setCookiesString(document.cookie);
        }
        catch (error) {
            console.error(error);
        }
    }

    const deleteCookie = async () => {
        try {
            await CapacitorCookies.deleteCookie({
                key: key,
            });

            setCookiesString(document.cookie);
        }
        catch (error) {
            console.error(error);
        }
    }

    const clearCookies = async () => {
        try {
            await CapacitorCookies.clearCookies({});

            setCookiesString(document.cookie);
        }
        catch (error) {
            console.error(error);
        }
    }

    const clearAllCookies = async () => {
        try {
            await CapacitorCookies.clearAllCookies();
            setCookiesString(document.cookie);
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Cookies</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent style={{ 'fontSize': 'x-large' }}>
                <IonText style={{ 'width': '100%' }}>Cookies: {cookiesString}</IonText>
                <IonButton style={{ 'width': '100%' }} onClick={() => setCookiesString(document.cookie)}>Get Cookies</IonButton>
                {/* <IonLabel style={{ 'width': '100%' }}>URL:</IonLabel>
                <IonInput value={url}
                    onIonChange={e => setUrl(e.detail.value ?? '')}
                    placeholder="Enter URL"></IonInput> */}
                <IonLabel style={{ 'width': '100%' }}>Key:</IonLabel>
                <IonInput value={key}
                    onIonChange={e => setKey(e.detail.value ?? '')}
                    placeholder="Enter Key"></IonInput>
                <IonLabel style={{ 'width': '100%' }} >Value:</IonLabel>
                <IonInput value={value}
                    onIonChange={e => setValue(e.detail.value ?? '')}
                    placeholder="Enter Value"></IonInput>
                <IonButton style={{ 'width': '100%' }} onClick={setCookie}>Set Cookie</IonButton>
                <IonButton style={{ 'width': '100%' }} onClick={setCapacitorCookie}>Set Capacitor Cookie</IonButton>
                <IonButton style={{ 'width': '100%' }} onClick={deleteCookie}>Delete Cookie</IonButton>
                <IonButton style={{ 'width': '100%' }} onClick={clearCookies}>Clear Cookies</IonButton>
                <IonButton style={{ 'width': '100%' }} onClick={clearAllCookies}>Clear All Cookies</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default CookiesPage;
