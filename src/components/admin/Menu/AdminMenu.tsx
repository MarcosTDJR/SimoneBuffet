import React, { useState } from "react";
import "./MenuModules.css"; 

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
}

const AdminMenu: React.FC<AdminMenuProps> = ({
  pratos,
  categorias,
  onAddPrato,
}) => {
  const [novoPrato, setNovoPrato] = useState<{
    nome: string;
    preco: string;
    categoriaId: string;
  }>({
    nome: "",
    preco: "",
    categoriaId: "",
  });

  const adicionarPrato = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoPrato.nome || !novoPrato.preco || !novoPrato.categoriaId) {
      alert("Preencha todos os campos!");
      return;
    }

    await onAddPrato({
      nome: novoPrato.nome,
      preco: parseFloat(novoPrato.preco),
      categoriaId: novoPrato.categoriaId,
    });

    setNovoPrato({ nome: "", preco: "", categoriaId: "" });
    alert("✅ Prato adicionado com sucesso!");
  };

  return (
    <div className="menu-container">
      <h2> Cardápio</h2>
      
      <form onSubmit={adicionarPrato} className="form-container">
        <input
          type="text"
          placeholder="Nome do prato"
          value={novoPrato.nome}
          onChange={(e) =>
            setNovoPrato({ ...novoPrato, nome: e.target.value })
          }
        />
        <input
          type="number"
          step="0.01"
          placeholder="Preço"
          value={novoPrato.preco}
          onChange={(e) =>
            setNovoPrato({ ...novoPrato, preco: e.target.value })
          }
        />
        <select
          value={novoPrato.categoriaId}
          onChange={(e) =>
            setNovoPrato({ ...novoPrato, categoriaId: e.target.value })
          }
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
                  🍴 {p.nome} - R$ {p.preco.toFixed(2)}{" "}
                  {categoria && <span className="categoria-badge">({categoria.nome})</span>}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminMenu;