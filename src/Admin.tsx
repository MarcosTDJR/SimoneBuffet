import React, { useState, useEffect } from "react";
import "./Admin.css";
import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import AdminHome from "./components/admin/Home/AdminHome";
import Login from "./components/admin/Login/Login";
import AdminMenu from "./components/admin/Menu/AdminMenu";
import AdminPhotos from "./components/admin/Photos/AdminPhotos";

const homeIcon = "/src/Icons/home-black.png";
const cardapioIcon = "/src/Icons/cardapio-black.png";
const categoriaIcon = "/src/Icons/categoria-black.png";
const galeriaIcon = "/src/Icons/galeria-black.png";

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

const Admin: React.FC = () => {
  // Estados principais (reduzidos - apenas o essencial)
  const [logado, setLogado] = useState<boolean>(false);
  const [pagina, setPagina] = useState<"inicio" | "cardapio" | "fotos" | "categorias">("inicio");

  // Estados dos dados (mantidos para Firebase)
  const [pratos, setPratos] = useState<Prato[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  
  // Estados para dashboard
  const [fotos, setFotos] = useState<number>(40);
  const [eventos, setEventos] = useState<number>(65);
  const [atividades] = useState<string[]>([
    "Novo Salgado Adicionado: Coxinha Recheada com Calabresa.",
    'Imagem "Salão Principal" adicionada a sessão "Ambiente".',
    'Valor do Doce "Bem-Casado" alterado para R$ 5,10.',
    'A Bebida "Refrigerante 2L" foi excluída e não será mais exibida.',
  ]);

  // Estados para categorias (mantidos para Firebase)
  const [novaCategoria, setNovaCategoria] = useState<{
    nome: string;
    descricao: string;
  }>({
    nome: "",
    descricao: "",
  });
  const [editandoCategoriaId, setEditandoCategoriaId] = useState<string | null>(null);

  // useEffects do Firebase (mantidos)
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "pratos"), (snapshot) => {
      const lista: Prato[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Prato, "id">),
      }));
      setPratos(lista);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "categorias"), (snapshot) => {
      const lista: Categoria[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Categoria, "id">),
      }));
      setCategorias(lista);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const adminLogado = localStorage.getItem("adminLogado");
    if (adminLogado === "true") setLogado(true);
  }, []);

  // Funções principais (simplificadas)
  const handleLogin = (usuario: string, senha: string) => {
    if (usuario === "Admin" && senha === "12345678") {
      setLogado(true);
      localStorage.setItem("adminLogado", "true");
    } else {
      alert("Usuário ou senha incorretos!");
    }
  };

  const handleLogout = () => {
    setLogado(false);
    localStorage.removeItem("adminLogado");
  };

  // Função para adicionar prato (para AdminMenu)
  const handleAddPrato = async (novoPrato: { nome: string; preco: number; categoriaId: string }) => {
    try {
      await addDoc(collection(db, "pratos"), novoPrato);
    } catch (error) {
      console.error("Erro ao adicionar prato:", error);
      throw error;
    }
  };

  // Função para gerenciar fotos (para AdminPhotos)
  const handleFotosChange = (novoTotal: number) => {
    setFotos(novoTotal);
  };

  // Função de navegação (para AdminHome)
  const handleNavigateTo = (page: "cardapio" | "categorias" | "fotos") => {
    setPagina(page);
  };

  // Adicionar nova categoria
  const adicionarCategoria = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaCategoria.nome || !novaCategoria.descricao) {
      alert("Preencha todos os campos!");
      return;
    }
    try {
      await addDoc(collection(db, "categorias"), {
        nome: novaCategoria.nome,
        descricao: novaCategoria.descricao,
      });
      setNovaCategoria({ nome: "", descricao: "" });
      alert("✅ Categoria criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
    }
  };

  // Salvar categoria editada
  const salvarCategoriaEditada = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaCategoria.nome || !novaCategoria.descricao || !editandoCategoriaId) {
      alert("Preencha todos os campos!");
      return;
    }
    try {
      const categoriaRef = doc(db, "categorias", editandoCategoriaId);
      await updateDoc(categoriaRef, {
        nome: novaCategoria.nome,
        descricao: novaCategoria.descricao,
      });
      setNovaCategoria({ nome: "", descricao: "" });
      setEditandoCategoriaId(null);
      alert("✅ Categoria editada com sucesso!");
    } catch (error) {
      console.error("Erro ao editar categoria:", error);
    }
  };

  const excluirCategoria = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta categoria?")) {
      try {
        await deleteDoc(doc(db, "categorias", id));
        alert("❌ Categoria excluída com sucesso!");
        if (editandoCategoriaId === id) {
          setNovaCategoria({ nome: "", descricao: "" });
          setEditandoCategoriaId(null);
        }
      } catch (error) {
        console.error("Erro ao excluir categoria:", error);
      }
    }
  };

  // SE NÃO LOGADO, USAR COMPONENTE LOGIN
  if (!logado) {
    return <Login onLogin={handleLogin} />;
  }

return (
  <div className="admin-layout">
    <header className="header-top">
      <div className="header-brand">
        <div className="icon-container">
          <img src="./src/Icons/garfo-faca.png" alt="Buffet Simone" />
        </div>
        <div className="header-brand-text">
          <h1>Buffet Simone</h1>
          <p>Painel Administrativo</p>
        </div>
      </div>
      
      <div className="header-user">
        <img 
          src="./src/Icons/usuario.png" 
          alt="Avatar" 
          className="user-avatar"
        />
      <span className="user-name">Simone</span>
    </div>
    </header>

      <header className="main-navbar">
        <div className="nav-container">
<nav>
  <button
    className={pagina === "inicio" ? "nav-active" : ""}
    onClick={() => setPagina("inicio")}
  >
    <img src={homeIcon} alt="" />
    Início
  </button>
  <button
    className={pagina === "cardapio" ? "nav-active" : ""}
    onClick={() => setPagina("cardapio")}
  >
    <img src={cardapioIcon} alt="" />
    Cardápio
  </button>
  <button
    className={pagina === "categorias" ? "nav-active" : ""}
    onClick={() => setPagina("categorias")}
  >
    <img src={categoriaIcon} alt="" />
    Categorias
  </button>
  <button
    className={pagina === "fotos" ? "nav-active" : ""}
    onClick={() => setPagina("fotos")}
  >
    <img src={galeriaIcon} alt="" />
    Fotos
  </button>
</nav>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Sair
        </button>
      </header>

      {pagina === "inicio" && (
        <AdminHome
          pratos={pratos.length}
          categorias={categorias.length}
          fotos={fotos}
          eventos={eventos}
          atividades={atividades}
          onNavigateTo={handleNavigateTo}
        />
      )}

      {pagina === "cardapio" && (
        <AdminMenu
          pratos={pratos}
          categorias={categorias}
          onAddPrato={handleAddPrato}
        />
      )}

      {pagina === "fotos" && (
        <AdminPhotos
          fotos={fotos}
          onFotosChange={handleFotosChange}
        />
      )}

      {pagina === "categorias" && (
        <div className="categories-container">
          <h2> Categorias</h2>
          <form
            onSubmit={editandoCategoriaId ? salvarCategoriaEditada : adicionarCategoria}
            className="category-form"
          >
            <input
              type="text"
              placeholder="Nome da categoria"
              value={novaCategoria.nome}
              onChange={(e) =>
                setNovaCategoria({ ...novaCategoria, nome: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Descrição"
              value={novaCategoria.descricao}
              onChange={(e) =>
                setNovaCategoria({
                  ...novaCategoria,
                  descricao: e.target.value,
                })
              }
            />
            <button type="submit">
              {editandoCategoriaId ? "Salvar Alteração" : "Salvar Categoria"}
            </button>
          </form>

          <ul>
            {categorias.map((c) => (
              <li key={c.id}>
                📌 {c.nome} - {c.descricao}{" "}
                <button
                  onClick={() => {
                    setNovaCategoria({ nome: c.nome, descricao: c.descricao });
                    setEditandoCategoriaId(c.id);
                  }}
                  style={{
                    marginLeft: "10px",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    background: "#e6007e",
                    color: "white",
                    border: "none",
                  }}
                >
                  Editar
                </button>
                <button
                  onClick={() => excluirCategoria(c.id)}
                  style={{
                    marginLeft: "5px",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    background: "#ff3333",
                    color: "white",
                    border: "none",
                  }}
                >
                  Excluir
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Admin;