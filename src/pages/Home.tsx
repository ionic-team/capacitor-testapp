import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';

const Home: React.FC = () => {
  const [count, setCount] = useState(0);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      <IonContent style={{ '--background': '#a7fc7aff' }}>
        <div className="container">
          <p>Welcome to the Capacitor Test App.</p>
          <p>
            This app was created to test and develop Capacitor core and plugins.
            To test plugins, open the side menu and navigate to the plugin's
            page!
          </p>
          <div
            style={{
              fontSize: '30px',
              fontFamily: 'monospace',
            }}>
            App Resolution: {dimensions.width} × {dimensions.height}
          </div>
          <h1>Counter</h1>
          <div className="counter">
            <button onClick={() => setCount(count - 1)}>-</button>
            <span>{count}</span>
            <button onClick={() => setCount(count + 1)}>+</button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
