import React, { useState } from "react";
import "./Login.css"; // ← MUDANÇA: CSS próprio

interface LoginProps {
  onLogin: (usuario: string, senha: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [credenciais, setCredenciais] = useState({
    usuario: "",
    senha: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(credenciais.usuario, credenciais.senha);
  };

return (
  <div className="login-container"> 
    <div className="login-box">
      <h1>🍽 Buffet Simone</h1>
      <p>Painel Administrativo</p>
      <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuário"
            value={credenciais.usuario}
            onChange={(e) =>
              setCredenciais({ ...credenciais, usuario: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={credenciais.senha}
            onChange={(e) =>
              setCredenciais({ ...credenciais, senha: e.target.value })
            }
            required
          />
          <button type="submit">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;