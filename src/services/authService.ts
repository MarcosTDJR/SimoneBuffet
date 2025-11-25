// src/services/authService.ts
import { doc, setDoc, getDoc } from "firebase/firestore";
import emailjs from '@emailjs/browser';

// IMPORTANTE: Importamos o 'db' (Firestore) direto do seu arquivo de configuração central.
// Verifique se o seu 'src/firebaseConfig.tsx' exporta 'db'.
import { db } from "../firebaseConfig"; 

// --- CONFIGURAÇÕES DO EMAILJS ---
const SERVICE_ID = "service_ngmclco"; 
const TEMPLATE_ID = "template_x2cslju"; 
const PUBLIC_KEY = "6UWvSYoqcFlgMlsWW"; 

export const authService = {
  
  // 1. Gera código, salva no banco e envia por email
  async enviarCodigoRecuperacao(email: string): Promise<boolean> {
    try {
      const codigo = Math.floor(1000 + Math.random() * 9000).toString();
      console.log(`[DEBUG] Código gerado para ${email}: ${codigo}`);

      await setDoc(doc(db, "recovery_codes", email), {
        code: codigo,
        createdAt: new Date().toISOString(),
        used: false
      });

      const templateParams = {
        to_email: email,
        code: codigo,
        message: "Use este código para redefinir sua senha no Simone Buffet."
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      return true;

    } catch (error) {
      console.error("Erro ao enviar código:", error);
      return false;
    }
  },

  // 2. Verifica se o código digitado está correto
  async validarCodigo(email: string, codigoDigitado: string): Promise<boolean> {
    try {
      const docRef = doc(db, "recovery_codes", email);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) return false;

      const data = docSnap.data();
      if (data.code === codigoDigitado && !data.used) {
        return true;
      }
      return false;

    } catch (error) {
      console.error("Erro ao validar:", error);
      return false;
    }
  },

  // 3. Finaliza o processo
  async invalidarCodigo(email: string) {
    try {
      await setDoc(doc(db, "recovery_codes", email), { used: true }, { merge: true });
    } catch (error) {
      console.error("Erro ao invalidar código", error);
    }
  }
};