import { CapacitorCookies } from '@capacitor/core';
import {
  IonButtons,
  IonContent,
  IonDatetime,
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
  const [expires, setExpires] = useState('');
  const [url, setUrl] = useState('');
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    setCookiesString(document.cookie);
  }, []);

  const getCookies = async () => {
    const cookies = await CapacitorCookies.getCookies({ url });
    setCookiesString(JSON.stringify(cookies));
  };

  const setCookie = () => {
    const date = new Date(expires);
    const sanitizedExpires = isNaN(date.getTime()) ? '' : date.toUTCString();
    document.cookie = `${key}=${value}; domain=${url}; expires=${sanitizedExpires}`;
    setCookiesString(document.cookie);
  };

  const setCapacitorCookie = async () => {
    try {
      const date = new Date(expires);
      const sanitizedExpires = isNaN(date.getTime()) ? '' : date.toUTCString();

      await CapacitorCookies.setCookie({
        url,
        key,
        value,
        expires: sanitizedExpires,
      });

      setCookiesString(document.cookie);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCookie = async () => {
    try {
      await CapacitorCookies.deleteCookie({ url, key });
      setCookiesString(document.cookie);
    } catch (error) {
      console.error(error);
    }
  };

  const clearCookies = async () => {
    try {
      await CapacitorCookies.clearCookies({ url });

      setCookiesString(document.cookie);
    } catch (error) {
      console.error(error);
    }
  };

  const clearAllCookies = async () => {
    try {
      await CapacitorCookies.clearAllCookies();
      setCookiesString(document.cookie);
    } catch (error) {
      console.error(error);
    }
  };

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
      <IonContent style={{ fontSize: 'x-large' }}>
        <IonText>Cookies: {cookiesString}</IonText>
        <IonButton expand="block" onClick={() => getCookies()}>
          Get Cookies
        </IonButton>
        <IonLabel>URL:</IonLabel>
        <IonInput
          value={url}
          onIonChange={e => setUrl(e.detail.value ?? '')}
          placeholder="Enter URL"
        ></IonInput>
        <IonLabel>Expires:</IonLabel>
        <IonDatetime
          value={expires}
          displayFormat="DDD, DD MMM YYYY HH:mm:ss"
          displayTimezone="utc"
          onIonChange={e => setExpires(e.detail.value ?? '')}
        >
          {expires}
        </IonDatetime>
        <IonLabel>Key:</IonLabel>
        <IonInput
          value={key}
          onIonChange={e => setKey(e.detail.value ?? '')}
          placeholder="Enter Key"
        ></IonInput>
        <IonLabel>Value:</IonLabel>
        <IonInput
          value={value}
          onIonChange={e => setValue(e.detail.value ?? '')}
          placeholder="Enter Value"
        ></IonInput>
        <IonButton expand="block" onClick={setCookie}>
          Set Document Cookie
        </IonButton>
        <IonButton expand="block" onClick={setCapacitorCookie}>
          Set Capacitor Cookie
        </IonButton>
        <IonButton expand="block" onClick={deleteCookie}>
          Delete Cookie
        </IonButton>
        <IonButton expand="block" onClick={clearCookies}>
          Clear Cookies
        </IonButton>
        <IonButton expand="block" onClick={clearAllCookies}>
          Clear All Cookies
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default CookiesPage;
