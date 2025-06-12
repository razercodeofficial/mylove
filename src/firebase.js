// Konfigurasi Firebase untuk My Love
// Ganti value di bawah dengan config dari Firebase Console
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCkhVL-s-ureATx3uuiLtcRbo5i8w5i8HM",
    authDomain: "mylove-4064c.firebaseapp.com",
    projectId: "mylove-4064c",
    storageBucket: "mylove-4064c.firebasestorage.app",
    messagingSenderId: "525628671574",
    appId: "1:525628671574:web:107945a176ee2bc5c11df7",
    measurementId: "G-GJETMR1CCH"
  };

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app); 