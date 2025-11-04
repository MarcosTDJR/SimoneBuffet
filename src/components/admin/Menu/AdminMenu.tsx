import React, { useState } from "react";
import "./MenuModules.css";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

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
}

const AdminMenu: React.FC<AdminMenuProps> = ({
  pratos,
  categorias,
  onAddPrato,
  onDeletePrato,
  onEditPrato,
}) => {
  const [novoPrato, setNovoPrato] = useState<{ nome: string; preco: string; categoriaId: string }>({
    nome: "",
    preco: "",
    categoriaId: "",
  });

  // estado para edição
  const [editandoPratoId, setEditandoPratoId] = useState<string | null>(null);
  const [pratoEditado, setPratoEditado] = useState<{ nome: string; preco: string; categoriaId: string }>({
    nome: "",
    preco: "",
    categoriaId: "",
  });

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
    setNovoPrato({ nome: "", preco: "", categoriaId: "" });
    toast.success("✅ Prato adicionado com sucesso!");
  };

  const salvarEdicao = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editandoPratoId || !pratoEditado.nome || !pratoEditado.preco || !pratoEditado.categoriaId) {
      toast.info("Preencha todos os campos!");
      return;
    }
    await onEditPrato(editandoPratoId, {
      nome: pratoEditado.nome,
      preco: parseFloat(pratoEditado.preco),
      categoriaId: pratoEditado.categoriaId,
    });
    setEditandoPratoId(null);
    setPratoEditado({ nome: "", preco: "", categoriaId: "" });
  };

  return (
    <div className="menu-container">
      <h2> Cardápio</h2>

      {/* Formulário de adicionar prato */}
      <form onSubmit={adicionarPrato} className="form-container">
        <input
          type="text"
          placeholder="Nome do prato"
          value={novoPrato.nome}
          onChange={(e) => setNovoPrato({ ...novoPrato, nome: e.target.value })}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Preço"
          value={novoPrato.preco}
          onChange={(e) => setNovoPrato({ ...novoPrato, preco: e.target.value })}
        />
        <select
          value={novoPrato.categoriaId}
          onChange={(e) => setNovoPrato({ ...novoPrato, categoriaId: e.target.value })}
        >
          <option value="">Selecione uma categoria</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </select>
        <button type="submit">Salvar Prato</button>
      </form>

      <div className="pratos-list">
        <h3>Pratos Cadastrados ({pratos.length})</h3>
        {pratos.length === 0 ? (
          <p className="empty-message">Nenhum prato cadastrado ainda.</p>
        ) : (
          <ul>
            {pratos.map((p) => {
              const categoria = categorias.find((c) => c.id === p.categoriaId);
              return (
                <li key={p.id} className="prato-item">
                  {editandoPratoId === p.id ? (
                    <form onSubmit={salvarEdicao} className="form-edit">
                      <input
                        type="text"
                        value={pratoEditado.nome}
                        onChange={(e) => setPratoEditado({ ...pratoEditado, nome: e.target.value })}
                      />
                      <input
                        type="number"
                        step="0.01"
                        value={pratoEditado.preco}
                        onChange={(e) => setPratoEditado({ ...pratoEditado, preco: e.target.value })}
                      />
                      <select
                        value={pratoEditado.categoriaId}
                        onChange={(e) => setPratoEditado({ ...pratoEditado, categoriaId: e.target.value })}
                      >
                        <option value="">Selecione uma categoria</option>
                        {categorias.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.nome}
                          </option>
                        ))}
                      </select>
                      <button type="submit">Salvar</button>
                      <button type="button" onClick={() => setEditandoPratoId(null)}>Cancelar</button>
                    </form>
                  ) : (
                    <>
                      🍴 {p.nome} - R$ {p.preco.toFixed(2)}{" "}
                      {categoria && <span className="categoria-badge">({categoria.nome})</span>}
                      <button
                        className="edit-btn"
                        onClick={() => {
                          setEditandoPratoId(p.id);
                          setPratoEditado({
                            nome: p.nome,
                            preco: p.preco.toString(),
                            categoriaId: p.categoriaId || "",
                          });
                        }}
                      >
                        ✏️ Editar
                      </button>
                      <button className="delete-btn" onClick={() => onDeletePrato(p.id)}>
                        ❌ Excluir
                      </button>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
    </div>
  );
};

export default AdminMenu;
