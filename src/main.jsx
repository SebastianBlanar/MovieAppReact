import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react'
import './index.css'
import { getFirestore } from 'firebase/firestore';


const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN;
const auth0ClientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCYjoKXR0gecdlslWjr9g1_RmcaQayba5U",
  authDomain: "maxclone-ab9cd.firebaseapp.com",
  projectId: "maxclone-ab9cd",
  storageBucket: "maxclone-ab9cd.firebasestorage.app",
  messagingSenderId: "327822661007",
  appId: "1:327822661007:web:b482fe8a02ac53592e27fa",
  measurementId: "G-X0S0LEREL3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider 
    domain={auth0Domain} 
    clientId={auth0ClientId}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    >
        <App />
    </Auth0Provider>
  </StrictMode>,
)
