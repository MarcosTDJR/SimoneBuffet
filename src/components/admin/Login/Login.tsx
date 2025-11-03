// src/components/Login/Login.tsx
import React, { useState } from "react";
import "./Login.css";

import boloWhite from "../../../Icons/bolo-white.png";
import boloColor from "../../../Icons/bolo-color.gif";
import fundo from "../../../Icons/rectangle 19.png";
import frutas from "../../../Icons/Group 10.png";
import frutasbaixo from "../../../Icons/Group (baixo).png";
import loginOriginal from "../../../Icons/b.png";
import animacaoSalada from "../../../Icons/healthy-food (1).gif";
import fruitSaladPana from "../../../Icons/fruit salad-pana.gif";
import healthyFoodBro from "../../../Icons/healthy food-bro.png";
import userIcon from "../../../Icons/user.png";
import senhaIcon from "../../../Icons/senha.png";
import olhoAberto from "../../../Icons/olhoAberto.png";
import olhoFechado from "../../../Icons/olhoFechado.png";
import emailIcon from "../../../Icons/email.png";
import codigoIcon from "../../../Icons/codigoIcon.png";
import iconeErroCodigo from "../../../Icons/iconeErroCodigo.png";
import fundoCinzaDireita from "../../../Icons/fundoCinzaDireita.png";

interface LoginProps {
  onLogin: (usuario: string, senha: string) => void;
}

const LoginBox = ({ onLogin }: { onLogin: (usuario: string, senha: string) => void }) => {
  const [credenciais, setCredenciais] = useState({ usuario: "", senha: "" });
  const [lembrar, setLembrar] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  // Recuperação
  const [modoRecuperacao, setModoRecuperacao] = useState(false);
  const [etapaRecuperacao, setEtapaRecuperacao] = useState(1); // 1=email, 2=codigo, 3=nova senha
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState(["", "", "", ""]);
  const [tempoRestante, setTempoRestante] = useState(600); // 10 minutos
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  // modal + toast
  const [mostrarModal, setMostrarModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [mostrarToast, setMostrarToast] = useState(false);

  React.useEffect(() => {
    if (modoRecuperacao && etapaRecuperacao === 2 && tempoRestante > 0) {
      const timer = setInterval(() => {
        setTempoRestante((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
    if (tempoRestante === 0 && modoRecuperacao && etapaRecuperacao === 2) {
      alert("Código expirado! Solicite um novo código.");
      setEtapaRecuperacao(1);
      setTempoRestante(600);
    }
  }, [modoRecuperacao, etapaRecuperacao, tempoRestante]);

  const formatarTempo = (segundos: number) => {
    const minutos = Math.floor(segundos / 60);
    const segs = segundos % 60;
    return `${minutos}:${segs.toString().padStart(2, "0")}`;
  };

  const handleCodigoChange = (index: number, valor: string) => {
    if (valor.length > 1) return;
    if (valor !== "" && !/^\d$/.test(valor)) return;

    const novoCodigo = [...codigo];
    novoCodigo[index] = valor;
    setCodigo(novoCodigo);

    if (valor !== "" && index < 3) {
      const nextInput = document.getElementById(`codigo-${index + 1}`) as HTMLInputElement | null;
      nextInput?.focus();
    }
  };

  const handleCodigoKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && codigo[index] === "" && index > 0) {
      const prevInput = document.getElementById(`codigo-${index - 1}`) as HTMLInputElement | null;
      prevInput?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      const prevInput = document.getElementById(`codigo-${index - 1}`) as HTMLInputElement | null;
      prevInput?.focus();
    }
    if (e.key === "ArrowRight" && index < 3) {
      const nextInput = document.getElementById(`codigo-${index + 1}`) as HTMLInputElement | null;
      nextInput?.focus();
    }
  };

  const showToast = (msg: string, duration = 3000) => {
    setToastMessage(msg);
    setMostrarToast(true);
    setTimeout(() => {
      setMostrarToast(false);
    }, duration);
  };

  const verificarCodigo = () => {
    const codigoCompleto = codigo.join("");
    if (codigoCompleto.length !== 4) {
      showToast("Digite os 4 dígitos do código.");
      return;
    }

    const codigoCorreto = "1234"; // simulação

    if (codigoCompleto === codigoCorreto) {
      setEtapaRecuperacao(3);
      showToast("Código verificado. Você pode criar uma nova senha.");
    } else {
      showToast("Código incorreto. Verifique e tente novamente.");
      setMostrarModal(true);
    }
  };

  const confirmarNovaSenha = () => {
    if (!novaSenha || !confirmarSenha) {
      showToast("Preencha os campos de senha.");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      showToast("As senhas não coincidem!");
      return;
    }

    console.log("Senha alterada com sucesso (simulação).");
    showToast("Senha alterada com sucesso!");
    // reset do modo de recuperação
    setModoRecuperacao(false);
    setEtapaRecuperacao(1);
    setEmail("");
    setCodigo(["", "", "", ""]);
    setNovaSenha("");
    setConfirmarSenha("");
    setTempoRestante(600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Se estiver em modo recuperação, segue o fluxo de recuperação normalmente.
    if (modoRecuperacao) {
      if (etapaRecuperacao === 1) {
        if (!email || email.trim() === "" || !email.includes("@")) {
          showToast("Insira um email válido.");
          return;
        }
        console.log("Enviando email para:", email);
        setEtapaRecuperacao(2);
        setTempoRestante(600);
        showToast("Código enviado (simulação).");
      } else if (etapaRecuperacao === 2) {
        verificarCodigo();
      } else if (etapaRecuperacao === 3) {
        confirmarNovaSenha();
      }
      return;
    }

    // ---------- MODO LOGIN NORMAL ----------
    // Importante: quando NÃO estivermos em modoRecuperacao, o form tem noValidate
    // e TODOS os inputs de recuperação estão disabled (logo o browser não bloqueia).
    const usuario = credenciais.usuario.trim();
    const senha = credenciais.senha.trim();

    if (!usuario || !senha) {
      showToast("Preencha usuário e senha.");
      return;
    }

    // chama onLogin (Admin.tsx faz a verificação final)
    try {
      onLogin(usuario, senha);
      // por segurança, reseta qualquer coisa de recuperação (caso esteja "oculto" mas com estado)
      setModoRecuperacao(false);
      setEtapaRecuperacao(1);
      setEmail("");
      setCodigo(["", "", "", ""]);
      setNovaSenha("");
      setConfirmarSenha("");
      setTempoRestante(600);

      // opcional: toast de sucesso (Admin pode redirecionar)
      showToast("Tentando entrar...");
    } catch (error) {
      console.error("Erro no onLogin:", error);
      showToast("Erro no login.");
    }
  };

  const toggleRecuperacao = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    // alterna pra modo recuperação e zera pra etapa 1
    setModoRecuperacao((prev) => !prev);
    setEtapaRecuperacao(1);
    setEmail("");
    setCodigo(["", "", "", ""]);
    setNovaSenha("");
    setConfirmarSenha("");
    setTempoRestante(600);
  };

  // ---------- AQUI: quando NÃO estamos em modoRecuperacao,
  // desativamos a validação nativa do form (noValidate) e
  // deixamos os inputs de recuperação com disabled=true para o navegador ignorar. ----------
  return (
    <div className="login-box">
      <h1>
        Painel <span className="simone-gradient">Administrativo</span>
      </h1>

      {/* Modal de erro */}
      {mostrarModal && (
        <div
          className="modal-overlay"
          onClick={() => setMostrarModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={iconeErroCodigo} alt="Erro" className="icone-erro-codigo" />
            <h2 style={{ marginTop: 0 }}>Código Incorreto</h2>
            <p>O código digitado está incorreto. Por favor, tente novamente.</p>
            <div className="modal-actions">
              <button
                className="btn-modal"
                onClick={() => {
                  setMostrarModal(false);
                  const first = document.getElementById("codigo-0") as HTMLInputElement | null;
                  first?.focus();
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast (simples) */}
      {mostrarToast && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: "fixed",
            right: 20,
            bottom: 20,
            zIndex: 10000,
            background: "rgba(0,0,0,0.85)",
            color: "#fff",
            padding: "10px 14px",
            borderRadius: 8,
            boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
            maxWidth: 320,
            fontSize: 14,
          }}
        >
          {toastMessage}
        </div>
      )}

      {/* noValidate = true quando não estamos em modoRecuperacao (desativa validação nativa) */}
      <form onSubmit={handleSubmit} autoComplete="on" noValidate={!modoRecuperacao}>
        <div
          className={`formulario-wrapper ${modoRecuperacao ? "modo-recuperacao" : ""} ${etapaRecuperacao === 2 ? "etapa-2" : ""} ${etapaRecuperacao === 3 ? "etapa-3" : ""}`}
        >
          {/* PAINEL 1: LOGIN */}
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
                // não required: tratamos em JS
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
                aria-label={mostrarSenha ? "Esconder senha" : "Mostrar senha"}
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
              >
                <img className="icon-bolo" src={isHovering ? boloColor : boloWhite} alt="" />
                Entrar
              </button>
            </div>
          </div>

          {/* PAINEL 2: RECUPERAÇÃO (email) */}
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
                required={modoRecuperacao && etapaRecuperacao === 1}
                disabled={!modoRecuperacao || etapaRecuperacao !== 1}
              />
            </div>

            <div className="acoes-recuperacao">
              <button
                type="button"
                className="btn-enviar-codigo"
                onClick={() => {
                  if (!email || !email.includes("@")) {
                    showToast("Insira um email válido.");
                    return;
                  }
                  setEtapaRecuperacao(2);
                  setTempoRestante(600);
                }}
                disabled={!modoRecuperacao || etapaRecuperacao !== 1}
              >
                Enviar Código
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

          {/* PAINEL 3: CÓDIGO DE VERIFICAÇÃO */}
          <div className="painel-codigo">
            <div className="codigo-header">
              <img src={codigoIcon} alt="Código" className="codigo-icon" />
            </div>

            <div className="codigo-container">
              <div className="codigo-inputs">
                {codigo.map((digito, index) => (
                  <input
                    key={index}
                    id={`codigo-${index}`}
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    maxLength={1}
                    value={digito}
                    onChange={(e) => handleCodigoChange(index, e.target.value)}
                    onKeyDown={(e) => handleCodigoKeyDown(index, e)}
                    className="input-codigo"
                    autoComplete="one-time-code"
                    aria-label={`Dígito ${index + 1}`}
                    style={{ textAlign: "center" }}
                    disabled={!modoRecuperacao || etapaRecuperacao !== 2}
                    required={modoRecuperacao && etapaRecuperacao === 2}
                  />
                ))}
              </div>

              <p className="codigo-aviso">
                É importante que você digite o código dentro de{" "}
                <span className="tempo-destaque">{formatarTempo(tempoRestante)}</span> minutos. Após esse período, será necessário solicitar um novo código.
              </p>
            </div>

            <div className="btn-enviar">
              <button type="button" className="entrar" onClick={verificarCodigo} disabled={!modoRecuperacao || etapaRecuperacao !== 2}>
                Verificar Código
              </button>
              <button type="button" className="btn-voltar-codigo" onClick={toggleRecuperacao}>
                Voltar
              </button>
            </div>
          </div>

          {/* PAINEL 4: NOVA SENHA */}
          <div className="painel-nova-senha">
            <div className="input-group">
              <img className="icon-senha" src={senhaIcon} alt="" />
              <label htmlFor="nova-senha">Nova Senha</label>
              <input
                id="nova-senha"
                type={mostrarNovaSenha ? "text" : "password"}
                value={novaSenha}
                placeholder="Digite sua nova senha"
                onChange={(e) => setNovaSenha(e.target.value)}
                required={modoRecuperacao && etapaRecuperacao === 3}
                disabled={!modoRecuperacao || etapaRecuperacao !== 3}
              />
              <button
                type="button"
                className="toggle-senha"
                onClick={() => setMostrarNovaSenha(!mostrarNovaSenha)}
                aria-label={mostrarNovaSenha ? "Esconder senha" : "Mostrar senha"}
              >
                <img src={mostrarNovaSenha ? olhoAberto : olhoFechado} alt="" />
              </button>
            </div>

            <div className="input-group">
              <img className="icon-senha" src={senhaIcon} alt="" />
              <label htmlFor="confirmar-senha">Confirmar Senha</label>
              <input
                id="confirmar-senha"
                type={mostrarConfirmarSenha ? "text" : "password"}
                value={confirmarSenha}
                placeholder="Confirme sua nova senha"
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required={modoRecuperacao && etapaRecuperacao === 3}
                disabled={!modoRecuperacao || etapaRecuperacao !== 3}
              />
              <button
                type="button"
                className="toggle-senha"
                onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                aria-label={mostrarConfirmarSenha ? "Esconder senha" : "Mostrar senha"}
              >
                <img src={mostrarConfirmarSenha ? olhoAberto : olhoFechado} alt="" />
              </button>
            </div>

            <div className="btn-enviar painel-nova-acao">
              <button
                type="button"
                className="btn-voltar-nova-senha"
                onClick={toggleRecuperacao}
              >
                Voltar
              </button>
              <button
                type="button"
                className="entrar"
                onClick={confirmarNovaSenha}
                disabled={!modoRecuperacao || etapaRecuperacao !== 3}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

const Login: React.FC<LoginProps> = ({ onLogin }) => (
  <div className="login-container" style={{ backgroundImage: `url(${fundo})` }}>
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
  </div>
);

export default Login;
