// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAnzDc4jWWxVr5pDuGjmEGdiuHSy7dH5ic",
    authDomain: "projeto-simone.firebaseapp.com",
    projectId: "projeto-simone",
    storageBucket: "projeto-simone.firebasestorage.app",
    messagingSenderId: "414153938328",
    appId: "1:414153938328:web:e71a6a05180f16cd4e47ed",
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta a instância do Firestore
export const db = getFirestore(app);
