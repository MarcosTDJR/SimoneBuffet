import React, { useState } from "react";
import "./Login.css";

// --- IMPORTAÇÕES DO FIREBASE ---
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// --- TOASTIFY (Avisos Bonitos) ---
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// --- SUAS IMAGENS ORIGINAIS (MANTIDAS) ---
import boloWhite from "/Icons/bolo-white.png";
import boloColor from "/Icons/bolo-color.gif";
import fundo from "/Icons/rectangle 19.png";
import frutas from "/Icons/Group 10.png";
import frutasbaixo from "/Icons/Group (baixo).png";
import loginOriginal from "/Icons/b.png";
import animacaoSalada from "/Icons/healthy-food (1).gif";
import fruitSaladPana from "/Icons/fruit salad-pana.gif";
import healthyFoodBro from "/Icons/healthy food-bro.png";
import senhaIcon from "/Icons/senha.png";
import olhoAberto from "/Icons/olhoAberto.png";
import olhoFechado from "/Icons/olhoFechado.png";
import emailIcon from "/Icons/email.png";
// Mantidos para evitar erro de import no build, caso algo ainda referencie
import codigoIcon from "/Icons/codigoIcon.png";
import iconeErroCodigo from "/Icons/iconeErroCodigo.png";
import fundoCinzaDireita from "/Icons/fundoCinzaDireita.png";

// --- CONFIGURAÇÃO FIREBASE ---
const firebaseConfig = JSON.parse(
  (typeof window !== 'undefined' && (window as any).__firebase_config) || '{}'
);

// Inicialização Segura
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

interface LoginProps {
  onLogin: (usuario: string, senha: string) => void;
}

const LoginBox = ({ onLogin }: { onLogin: (usuario: string, senha: string) => void }) => {
  // Estados de Login
  const [credenciais, setCredenciais] = useState({ usuario: "", senha: "" });
  const [lembrar, setLembrar] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  // Recuperação (Simplificado: Apenas controle de modo e email)
  const [modoRecuperacao, setModoRecuperacao] = useState(false);
  const [email, setEmail] = useState("");
  
  // Estado de carregamento
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // --- MODO RECUPERAÇÃO (Envio de Link Nativo) ---
    if (modoRecuperacao) {
      if (!email || email.trim() === "" || !email.includes("@")) {
        toast.warn("⚠️ Por favor, insira um e-mail válido.");
        return;
      }
      
      setLoading(true);
      try {
        // Método nativo do Firebase
        await sendPasswordResetEmail(auth, email);
        
        // AVISO MODERNO
        toast.success("Link enviado! Verifique seu e-mail para redefinir a senha.", {
          autoClose: 5000,
          theme: "colored"
        });
        
        // Retorna ao login e limpa campo
        toggleRecuperacao();
        setEmail("");
        
      } catch (error: any) {
        console.error("Erro Recuperação:", error);
        if (error.code === 'auth/user-not-found') {
           toast.error("E-mail não encontrado no sistema.");
        } else {
           toast.error("Erro ao enviar e-mail. Tente novamente.");
        }
      } finally {
        setLoading(false);
      }
      return;
    }

    // --- MODO LOGIN NORMAL ---
    const usuario = credenciais.usuario.trim();
    const senha = credenciais.senha.trim();

    if (!usuario || !senha) {
      toast.info("Preencha usuário e senha.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, usuario, senha);
      
      // Sucesso
      onLogin(usuario, senha);
      toast.success("Bem-vinda de volta! 👋", { theme: "colored" });
      
      // Limpa estados
      setModoRecuperacao(false);
      setEmail("");
      
    } catch (error: any) {
      console.error("Erro no Login:", error);
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
        toast.error("E-mail ou senha incorretos.");
      } else if (error.code === 'auth/too-many-requests') {
        toast.warning("Muitas tentativas. Aguarde alguns instantes.");
      } else {
        toast.error("Erro ao fazer login.");
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleRecuperacao = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setModoRecuperacao((prev) => !prev);
    setEmail("");
  };

  // A estrutura abaixo mantém as classes exatas do seu CSS original
  return (
    <div className="login-box">
      <h1>
        Painel <span className="simone-gradient">Administrativo</span>
      </h1>

      {/* Form com noValidate para não usar balões padrão do navegador */}
      <form onSubmit={handleSubmit} autoComplete="on" noValidate={!modoRecuperacao}>
        
        {/* MANTIDO: A classe 'formulario-wrapper' e a lógica 'modo-recuperacao'.
           Isso garante que a animação de deslizar (slide) do seu CSS continue funcionando.
        */}
        <div className={`formulario-wrapper ${modoRecuperacao ? "modo-recuperacao" : ""}`}>
          
          {/* --- PAINEL 1: LOGIN (INTOCADO) --- */}
          <div className="painel-login">
            <div className="input-group">
              <label htmlFor="email-login">Usuário</label>
              <img className="icon-senha" src={emailIcon} alt="" />
              <input
                id="email-login"
                name="username"
                type="text"
                value={credenciais.usuario}
                onChange={(e) => setCredenciais({ ...credenciais, usuario: e.target.value })}
                placeholder="Digite seu usuário"
                autoComplete="username"
              />
            </div>

            <div className="input-group" style={{ position: "relative" }}>
              <img className="icon-senha" src={senhaIcon} alt="" />
              <label htmlFor="senha-login">Senha</label>
              <input
                id="senha-login"
                name="password"
                type={mostrarSenha ? "text" : "password"}
                value={credenciais.senha}
                placeholder="Digite sua senha"
                onChange={(e) => setCredenciais({ ...credenciais, senha: e.target.value })}
                autoComplete="current-password"
                style={{ paddingRight: "52px" }}
              />
              <button
                type="button"
                className="toggle-senha"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                style={{
                  position: "absolute",
                  right: 8,
                  top: "68%",
                  transform: "translateY(-50%)",
                  width: 36,
                  height: 36,
                  padding: 0,
                  border: "none",
                  background: "transparent",
                }}
              >
                <img src={mostrarSenha ? olhoAberto : olhoFechado} alt="" />
              </button>
            </div>

            <div className="extras">
              <label className="switch">
                <input type="checkbox" checked={lembrar} onChange={(e) => setLembrar(e.target.checked)} />
                <span className="switch-text">Lembrar login?</span>
              </label>

              <a href="#recuperar" className="link-recuperar" onClick={toggleRecuperacao}>
                Esqueci a senha
              </a>
            </div>

            <div className="botoes-container">
              <button
                type="submit"
                className="entrar"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                disabled={loading}
              >
                {loading ? "Carregando..." : (
                  <>
                    <img className="icon-bolo" src={isHovering ? boloColor : boloWhite} alt="" />
                    Entrar
                  </>
                )}
              </button>
            </div>
          </div>

          {/* --- PAINEL 2: RECUPERAÇÃO (EMAIL) --- */}
          <div className="painel-recuperacao">
            <div className="input-group">
              <label htmlFor="email-recuperacao">Email de Recuperação</label>
              <img className="icon-senha" src={emailIcon} alt="" />
              <input
                id="email-recuperacao"
                name="recovery-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
                autoComplete="off"
                required={modoRecuperacao}
                disabled={!modoRecuperacao}
              />
            </div>
            
            {/* Pequeno texto de ajuda para preencher o espaço visual deixado pelo timer */}
            <p style={{fontSize: '0.9rem', color: '#666666a2', marginBottom: '20px', marginTop: '-10px', paddingLeft: '60px', textAlign: 'left'}}>
              *Você receberá um link seguro para criar uma nova senha.
            </p>

            <div className="acoes-recuperacao">
              <button
                type="submit"
                className="btn-enviar-codigo" // Mantido o nome da classe para não perder o estilo (largura/cor)
                disabled={(!modoRecuperacao) || loading}
              >
                {loading ? "Enviando..." : "Enviar Link"}
              </button>
              <button
                type="button"
                className="btn-voltar-recuperacao"
                onClick={toggleRecuperacao}
              >
                Voltar
              </button>
            </div>
          </div>

        </div>
      </form>
    </div>
  );
};

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();

  return (
    <div className="login-container" style={{ backgroundImage: `url(${fundo})` }}>
      
      {/* Botão Voltar para o Site */}
      <button 
        className="btn-voltar-site" 
        onClick={() => navigate("/")}
        // Estilo inline apenas para garantir posicionamento caso a classe CSS tenha sido afetada
        style={{
             position: 'absolute', top: '20px', left: '20px', zIndex: 100,
             padding: '10px 20px', borderRadius: '30px', border: 'none',
             background: 'rgba(255,255,255,0.95)', color: '#e91e63', fontWeight: 'bold',
             display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
             boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 19-7-7 7-7"/>
          <path d="M19 12H5"/>
        </svg>
        Voltar ao Site
      </button>

      <img src={frutas} alt="Frutas" />
      <img src={frutasbaixo} alt="Frutas Baixo" />
      <img src={animacaoSalada} alt="Animação Salada" className="animacao-salada" />
      <img src={fruitSaladPana} alt="Fruit Salad Pana" className="fruit-salad-pana" />
      <img src={healthyFoodBro} alt="Healthy Food Bro" className="healthy-food-bro" />

      <div className="left-side-container">
        <img src={loginOriginal} alt="Login Original" className="login-original-img" />
      </div>

      <div className="titulo-camadas">
        <div className="buffet-principal">Buffet</div>
        <div className="s-grande-destaque">S</div>
        <div className="imone-texto">imone</div>
      </div>

      <div className="quadrado-imagem"></div>

      <LoginBox onLogin={onLogin} />
      <div className="login-box-outline"></div>

      {/* Container do Toastify Global na tela de Login */}
      <ToastContainer 
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Login;