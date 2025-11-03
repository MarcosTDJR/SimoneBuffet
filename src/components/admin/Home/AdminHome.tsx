import React from "react";
import "./HomeModules.css";
const garfoFacaIcon = "/Icons/garfo-faca.png";
const categoriaIcon = "/Icons/categoria.png";
const galeriaIcon = "/Icons/galeria.png";
const mensagemIcon = "/Icons/mensagem.png";
const garfoFacaBlackIcon = "/Icons/garfo-faca-black.png";
const galeriaBlackIcon = "/Icons/galeria-black.png";

import fundo from "../../../Icons/rectangle 19.png";


interface AdminHomeProps {
  pratos: number;
  categorias: number;
  fotos: number;
  eventos: number;
  atividades: string[];
  onNavigateTo: (page: "cardapio" | "categorias" | "fotos") => void;
}

const AdminHome: React.FC<AdminHomeProps> = ({
  pratos,
  categorias,
  fotos,
  eventos,
  atividades,
  onNavigateTo,
}) => {
return (
  <div className="navbar" style={{ backgroundImage: `url(${fundo})` }}>
    <div className="dashboard-content">
      
      <div className="welcome-card">
        <h2>Bem-vinda, Simone!</h2>
        <h1>Aqui você pode gerenciar seu cardápio e fotos de forma simples e rápida.</h1>
      </div>
    <section className="stats-container">
      <div className="stats-card">
        <div className="stats-card-header">
          <img src={garfoFacaIcon} alt="" />
          Pratos no Cardápio
        </div>
        <div className="stats-card-content">
          <p>{pratos}</p>
        </div>
      </div>
      
      <div className="stats-card">
        <div className="stats-card-header">
          <img src={categoriaIcon} alt="" />
          Categorias Criadas
        </div>
        <div className="stats-card-content">
          <p>{categorias}</p>
        </div>
      </div>
      
      <div className="stats-card">
        <div className="stats-card-header">
          <img src={galeriaIcon} alt="" />
          Fotos Adicionadas
        </div>
        <div className="stats-card-content">
          <p>{fotos}</p>
        </div>
      </div>
      
      <div className="stats-card">
        <div className="stats-card-header">
          <img src={mensagemIcon} alt="" />
          Mensagens Recebidas
        </div>
        <div className="stats-card-content">
          <p>{eventos}</p>
        </div>
      </div>
    </section>

    {/* Seção de Atividades Recentes */}
    <section className="activities-section">
      <div className="activities-header">
        Atividades Recentes
      </div>
      <div className="activities-list">
        {atividades.map((atividade, index) => (
          <div key={index} className="activity-item">
            <div className="activity-bullet"></div>
            <p className="activity-text">{atividade}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Seção de Ações Rápidas */}
    <section className="quick-actions">
      <div className="actions-header">
        Ações Rápidas
      </div>
      <div className="actions-grid">
        <div 
          className="action-button prato"
          onClick={() => onNavigateTo("cardapio")}
        >
          <img src={garfoFacaBlackIcon} alt="" />
          <span>Adicionar Novo Prato</span>
        </div>
        
        <div 
          className="action-button imagem"
          onClick={() => onNavigateTo("fotos")}
        >
          <img src={galeriaBlackIcon} alt="" />
          <span>Adicionar Nova Imagem</span>
        </div>
      </div>
    </section>

  </div>
  </div>
);
};

export default AdminHome;