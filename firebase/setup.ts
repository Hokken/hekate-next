import { initializeApp, getApp, FirebaseOptions } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { onAuthStateChanged, getAuth } from 'firebase/auth';


export const firebaseConfig:FirebaseOptions = {
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_DATABASEURL,
    projectId: process.env.NEXT_PUBLIC_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_APPID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID
  };
  
  const createFirebaseApp = () => {
    try {
      return getApp();
    } catch {
      console.log("initializing firebase and firestore");  
      return initializeApp(firebaseConfig);
    }
  }

  export function onAuthStateChange(setUser:Function) {
    return onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }
  
  const firebaseApp = createFirebaseApp();
  export const db = getFirestore(firebaseApp);
  export const auth = getAuth();