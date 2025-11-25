// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6KjLDPZUaeMLs08z0Bm8-Cu-v_lC-9M8",
  authDomain: "simone-buffet.firebaseapp.com",
  projectId: "simone-buffet",
  storageBucket: "simone-buffet.firebasestorage.app",
  messagingSenderId: "664173332248",
  appId: "1:664173332248:web:a5999556ddab0373a9006d"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta a instância do Firestore
export const db = getFirestore(app);
