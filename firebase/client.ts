
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth} from 'firebase/auth';
import { getFirestore }  from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDYY8SgBrqHDc30ygO2R2byEEaYac5bMMg",
    authDomain: "prepwise-925d6.firebaseapp.com",
    projectId: "prepwise-925d6",
    storageBucket: "prepwise-925d6.firebasestorage.app",
    messagingSenderId: "117936779837",
    appId: "1:117936779837:web:97d4beedfa959d223d3054",
    measurementId: "G-92RMLRN983"
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app)