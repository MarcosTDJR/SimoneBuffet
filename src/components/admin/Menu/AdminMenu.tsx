import React, { useState } from "react";
import "./MenuModules.css";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { Edit2, Trash2, Plus, Settings, X, ChefHat } from "lucide-react";
import { useActivity } from "../context/ActivityContext";

interface Prato {
  id: string;
  nome: string;
  preco: number;
  categoriaId?: string;
}

interface Categoria {
  id: string;
  nome: string;
  descricao: string;
}

interface AdminMenuProps {
  pratos: Prato[];
  categorias: Categoria[];
  onAddPrato: (prato: { nome: string; preco: number; categoriaId: string }) => void;
  onDeletePrato: (id: string) => void;
  onEditPrato: (id: string, prato: { nome: string; preco: number; categoriaId: string }) => void;
  onAddCategoria: (categoria: { nome: string; descricao: string }) => void;
  onEditCategoria: (id: string, categoria: { nome: string; descricao: string }) => void;
  onDeleteCategoria: (id: string) => void;
}

const AdminMenu: React.FC<AdminMenuProps> = ({
  pratos,
  categorias,
  onAddPrato,
  onDeletePrato,
  onEditPrato,
  onAddCategoria,
  onEditCategoria,
  onDeleteCategoria,
}) => {
  const { addActivity } = useActivity();

  // Estados dos Modais
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  // Estado Formulario Adicionar Prato
  const [novoPrato, setNovoPrato] = useState<{ nome: string; preco: string; categoriaId: string }>({
    nome: "",
    preco: "",
    categoriaId: "",
  });

  // Estado Formulario Editar Prato
  const [pratoSendoEditadoId, setPratoSendoEditadoId] = useState<string | null>(null);
  const [pratoEditado, setPratoEditado] = useState<{ nome: string; preco: string; categoriaId: string }>({
    nome: "",
    preco: "",
    categoriaId: "",
  });

  // Estado Formulario Categoria
  const [novaCategoria, setNovaCategoria] = useState<{ nome: string; descricao: string }>({
    nome: "",
    descricao: "",
  });
  const [categoriaSendoEditadaId, setCategoriaSendoEditadaId] = useState<string | null>(null);

  // --- HANDLERS PRATO ---

  const abrirModalEdicao = (prato: Prato) => {
    setPratoSendoEditadoId(prato.id);
    setPratoEditado({
      nome: prato.nome,
      preco: prato.preco.toString(),
      categoriaId: prato.categoriaId || "",
    });
    setShowEditModal(true);
  };

  const adicionarPrato = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoPrato.nome || !novoPrato.preco || !novoPrato.categoriaId) {
      toast.info("Preencha todos os campos!");
      return;
    }
    
    await onAddPrato({
      nome: novoPrato.nome,
      preco: parseFloat(novoPrato.preco),
      categoriaId: novoPrato.categoriaId,
    });

    addActivity(`Novo prato adicionado: "${novoPrato.nome}".`);
    setNovoPrato({ nome: "", preco: "", categoriaId: "" });
    setShowAddModal(false);
  };

  const salvarEdicao = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pratoSendoEditadoId || !pratoEditado.nome || !pratoEditado.preco || !pratoEditado.categoriaId) {
      toast.info("Preencha todos os campos!");
      return;
    }

    await onEditPrato(pratoSendoEditadoId, {
      nome: pratoEditado.nome,
      preco: parseFloat(pratoEditado.preco),
      categoriaId: pratoEditado.categoriaId,
    });

    addActivity(`Prato "${pratoEditado.nome}" foi atualizado.`);
    setPratoSendoEditadoId(null);
    setShowEditModal(false);
  };

  // --- HANDLERS CATEGORIA ---

  const abrirEdicaoCategoria = (categoria: Categoria) => {
    setCategoriaSendoEditadaId(categoria.id);
    setNovaCategoria({ nome: categoria.nome, descricao: categoria.descricao });
  };

  const cancelarEdicaoCategoria = () => {
    setCategoriaSendoEditadaId(null);
    setNovaCategoria({ nome: "", descricao: "" });
  };

  const salvarCategoria = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaCategoria.nome || !novaCategoria.descricao) {
      toast.info("Preencha todos os campos!");
      return;
    }

    if (categoriaSendoEditadaId) {
      await onEditCategoria(categoriaSendoEditadaId, novaCategoria);
      addActivity(`Categoria "${novaCategoria.nome}" foi atualizada.`);
    } else {
      await onAddCategoria(novaCategoria);
      addActivity(`Nova categoria adicionada: "${novaCategoria.nome}".`);
    }

    setNovaCategoria({ nome: "", descricao: "" });
    setCategoriaSendoEditadaId(null);
  };

  const excluirCategoria = async (id: string, nome: string) => {
    if (window.confirm(`Tem certeza que deseja excluir a categoria "${nome}"?`)) {
      await onDeleteCategoria(id);
      addActivity(`Categoria "${nome}" foi excluida.`);
      if (categoriaSendoEditadaId === id) {
        cancelarEdicaoCategoria();
      }
    }
  };

  // --- ORGANIZACAO DOS DADOS ---
  const pratosPorCategoria = categorias.map(cat => ({
    categoria: cat,
    pratos: pratos.filter(p => p.categoriaId === cat.id)
  }));

  const pratosSemCategoria = pratos.filter(p => !p.categoriaId || !categorias.find(c => c.id === p.categoriaId));

  return (
    <div className="navbar">
      <div className="dashboard-content">
        
        <div className="welcome-card">
          <div className="menu-header-wrapper">
            <div>
              <h2>Gerenciar Cardapio</h2>
              <h1>Adicione, edite ou remova pratos do seu menu digital.</h1>
            </div>
            <div className="header-actions-buttons">
              <button className="action-btn-white" onClick={() => setShowCategoryModal(true)}>
                <Settings size={18} /> Gerenciar Categorias
              </button>
              <button className="action-btn-white" onClick={() => setShowAddModal(true)}>
                <Plus size={18} /> Novo Prato
              </button>
            </div>
          </div>
        </div>

        <div className="menu-content-pad">
          {pratosPorCategoria.map((grupo) => (
            <div key={grupo.categoria.id} className="category-block">
              <div className="category-header-gradient">
                <ChefHat size={20} color="white" style={{marginRight: 10}} />
                {grupo.categoria.nome}
              </div>
              
              <div className="category-items-list">
                {grupo.pratos.length === 0 ? (
                  <p className="empty-cat">Nenhum prato nesta categoria.</p>
                ) : (
                  grupo.pratos.map((prato) => (
                    <div key={prato.id} className="prato-item-row">
                      <div className="prato-info-col">
                        <span className="prato-name-text">{prato.nome}</span>
                        <span className="prato-price-text">R$ {prato.preco.toFixed(2).replace('.', ',')}</span>
                      </div>
                      <div className="prato-actions-col">
                        <button className="btn-icon-edit" onClick={() => abrirModalEdicao(prato)}>
                          <Edit2 size={16} /> Editar
                        </button>
                        <button 
                          className="btn-icon-delete" 
                          onClick={() => {
                            onDeletePrato(prato.id);
                            addActivity(`Prato "${prato.nome}" foi excluido.`);
                          }}
                        >
                          <Trash2 size={16} /> Excluir
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}

          {pratosSemCategoria.length > 0 && (
            <div className="category-block">
              <div className="category-header-gradient" style={{background: 'linear-gradient(135deg, #757575, #424242)'}}>
                Outros / Sem Categoria
              </div>
              <div className="category-items-list">
                {pratosSemCategoria.map((prato) => (
                  <div key={prato.id} className="prato-item-row">
                    <div className="prato-info-col">
                      <span className="prato-name-text">{prato.nome}</span>
                      <span className="prato-price-text">R$ {prato.preco.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div className="prato-actions-col">
                      <button className="btn-icon-edit" onClick={() => abrirModalEdicao(prato)}>
                        <Edit2 size={16} /> Editar
                      </button>
                      <button 
                        className="btn-icon-delete" 
                        onClick={() => {
                          onDeletePrato(prato.id);
                          addActivity(`Prato "${prato.nome}" foi excluido.`);
                        }}
                      >
                        <Trash2 size={16} /> Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* MODAL ADICIONAR PRATO */}
      {showAddModal && (
        <div className="modal-overlay-custom">
          <div className="modal-box">
            <div className="modal-top">
              <h3>Adicionar Novo Prato</h3>
              <button className="close-modal" onClick={() => setShowAddModal(false)}><X size={24}/></button>
            </div>
            <form onSubmit={adicionarPrato} className="modal-form">
              <label>Nome do Prato</label>
              <input
                type="text"
                placeholder="Ex: Coxinha"
                value={novoPrato.nome}
                onChange={(e) => setNovoPrato({ ...novoPrato, nome: e.target.value })}
              />
              
              <label>Preco (R$)</label>
              <input
                type="number"
                step="0.01"
                placeholder="0,00"
                value={novoPrato.preco}
                onChange={(e) => setNovoPrato({ ...novoPrato, preco: e.target.value })}
              />
              
              <label>Categoria</label>
              <select
                value={novoPrato.categoriaId}
                onChange={(e) => setNovoPrato({ ...novoPrato, categoriaId: e.target.value })}
              >
                <option value="">Selecione...</option>
                {categorias.map((c) => (
                  <option key={c.id} value={c.id}>{c.nome}</option>
                ))}
              </select>
              
              <div className="modal-btns">
                <button type="button" className="btn-c" onClick={() => setShowAddModal(false)}>Cancelar</button>
                <button type="submit" className="btn-s">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL EDITAR PRATO */}
      {showEditModal && (
        <div className="modal-overlay-custom">
          <div className="modal-box">
            <div className="modal-top">
              <h3>Editar Prato</h3>
              <button className="close-modal" onClick={() => setShowEditModal(false)}><X size={24}/></button>
            </div>
            <form onSubmit={salvarEdicao} className="modal-form">
              <label>Nome do Prato</label>
              <input
                type="text"
                value={pratoEditado.nome}
                onChange={(e) => setPratoEditado({ ...pratoEditado, nome: e.target.value })}
              />
              
              <label>Preco (R$)</label>
              <input
                type="number"
                step="0.01"
                value={pratoEditado.preco}
                onChange={(e) => setPratoEditado({ ...pratoEditado, preco: e.target.value })}
              />
              
              <label>Categoria</label>
              <select
                value={pratoEditado.categoriaId}
                onChange={(e) => setPratoEditado({ ...pratoEditado, categoriaId: e.target.value })}
              >
                <option value="">Selecione...</option>
                {categorias.map((c) => (
                  <option key={c.id} value={c.id}>{c.nome}</option>
                ))}
              </select>
              
              <div className="modal-btns">
                <button type="button" className="btn-c" onClick={() => setShowEditModal(false)}>Cancelar</button>
                <button type="submit" className="btn-s">Salvar Alteracoes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL GERENCIAR CATEGORIAS */}
      {showCategoryModal && (
        <div className="modal-overlay-custom">
          <div className="modal-box modal-large">
            <div className="modal-top">
              <h3>Gerenciar Categorias</h3>
              <button className="close-modal" onClick={() => {
                setShowCategoryModal(false);
                cancelarEdicaoCategoria();
              }}><X size={24}/></button>
            </div>
            
            <form onSubmit={salvarCategoria} className="modal-form">
              <label>Nome da Categoria</label>
              <input
                type="text"
                placeholder="Ex: Salgados"
                value={novaCategoria.nome}
                onChange={(e) => setNovaCategoria({ ...novaCategoria, nome: e.target.value })}
              />
              
              <label>Descricao</label>
              <input
                type="text"
                placeholder="Ex: Salgados variados para festas"
                value={novaCategoria.descricao}
                onChange={(e) => setNovaCategoria({ ...novaCategoria, descricao: e.target.value })}
              />
              
              <div className="modal-btns">
                {categoriaSendoEditadaId && (
                  <button type="button" className="btn-c" onClick={cancelarEdicaoCategoria}>Cancelar Edicao</button>
                )}
                <button type="submit" className="btn-s">
                  {categoriaSendoEditadaId ? "Salvar Alteracoes" : "Adicionar Categoria"}
                </button>
              </div>
            </form>

            <div className="category-list-section">
              <h4>Categorias Existentes</h4>
              {categorias.length === 0 ? (
                <p className="empty-cat">Nenhuma categoria cadastrada.</p>
              ) : (
                <div className="category-list">
                  {categorias.map((cat) => (
                    <div key={cat.id} className="category-list-item">
                      <div className="category-list-info">
                        <span className="category-list-name">{cat.nome}</span>
                        <span className="category-list-desc">{cat.descricao}</span>
                      </div>
                      <div className="category-list-actions">
                        <button className="btn-icon-edit" onClick={() => abrirEdicaoCategoria(cat)}>
                          <Edit2 size={16} /> Editar
                        </button>
                        <button className="btn-icon-delete" onClick={() => excluirCategoria(cat.id, cat.nome)}>
                          <Trash2 size={16} /> Excluir
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
};

export default AdminMenu;