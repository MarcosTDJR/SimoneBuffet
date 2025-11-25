import React, { useState } from "react";
import "./HeaderModules.css";
import { Home, UtensilsCrossed, Image, LogOut, Menu, X } from "lucide-react";

interface HeaderNavProps {
  onLogout?: () => void;
  userName?: string;
  pagina: string;
  setPagina: (page: string) => void;
}

const HeaderNav: React.FC<HeaderNavProps> = ({ onLogout, userName = "Simone", pagina, setPagina }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (page: string) => {
    setPagina(page);
    setMenuOpen(false);
  };

  return (
    <>
      <header className="header-top">
        <div className="header-brand">
          <div className="icon-container">
            <UtensilsCrossed size={28} strokeWidth={2.5} />
          </div>
          <div className="header-brand-text">
            <h1>Buffet Simone</h1>
            <p>Painel Administrativo</p>
          </div>
        </div>
        <div className="header-user">
          <div className="user-avatar">
            <span>{userName.charAt(0).toUpperCase()}</span>
          </div>
          <div className="user-info">
            <span className="user-name">{userName}</span>
            <span className="user-role">Administrador</span>
          </div>
        </div>
      </header>

      <header className="main-navbar">
        <div className="nav-container">
          <button 
            className={`hamburger-menu ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu de navegacao"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className={menuOpen ? 'nav-open' : ''}>
            <button 
              className={pagina === "inicio" ? "nav-active" : ""} 
              onClick={() => handleNavClick("inicio")}
            >
              <Home size={20} />
              <span>Inicio</span>
            </button>
            <button 
              className={pagina === "cardapio" ? "nav-active" : ""} 
              onClick={() => handleNavClick("cardapio")}
            >
              <UtensilsCrossed size={20} />
              <span>Cardapio</span>
            </button>
            <button 
              className={pagina === "fotos" ? "nav-active" : ""} 
              onClick={() => handleNavClick("fotos")}
            >
              <Image size={20} />
              <span>Fotos</span>
            </button>
          </nav>
        </div>
        {onLogout && (
          <button onClick={onLogout} className="logout-button">
            <LogOut size={18} />
            <span>Sair</span>
          </button>
        )}
      </header>
    </>
  );
};

export default HeaderNav;