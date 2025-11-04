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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminHome from "./components/admin/Home/AdminHome";
import Login from "./components/admin/Login/Login";
import AdminMenu from "./components/admin/Menu/AdminMenu";
import {
  AdminPhotos,
  Photo,
  Category,
} from "./components/admin/Photos/AdminPhotos";
import HeaderNav from "./components/admin/Header/HeaderNav";

const homeIcon = "/Icons/home-black.png";
const cardapioIcon = "/Icons/cardapio-black.png";
const categoriaIcon = "/Icons/categoria-black.png";
const galeriaIcon = "/Icons/galeria-black.png";

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
  const [logado, setLogado] = useState<boolean>(false);
  const [pagina, setPagina] = useState<
    "inicio" | "cardapio" | "fotos" | "categorias"
  >("inicio");

  const [pratos, setPratos] = useState<Prato[]>([]);
  const [categoriasFirestore, setCategoriasFirestore] = useState<Categoria[]>(
    []
  );

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [eventos] = useState<number>(65);
  const [atividades] = useState<string[]>([
    "Novo Salgado Adicionado: Coxinha Recheada com Calabresa.",
    'Imagem "Salão Principal" adicionada à sessão "Ambiente".',
    'Valor do Doce "Bem-Casado" alterado para R$ 5,10.',
    'A Bebida "Refrigerante 2L" foi excluída e não será mais exibida.',
  ]);

  const [novaCategoria, setNovaCategoria] = useState<{
    nome: string;
    descricao: string;
  }>({
    nome: "",
    descricao: "",
  });
  const [editandoCategoriaId, setEditandoCategoriaId] = useState<string | null>(
    null
  );

  // -------------------- FIRESTORE SNAPSHOTS --------------------
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "pratos"), (snapshot) => {
      const lista: Prato[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Prato, "id">),
      }));
      setPratos(lista);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "categorias"), (snapshot) => {
      const lista: Categoria[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Categoria, "id">),
      }));
      setCategoriasFirestore(lista);
    });
    return () => unsub();
  }, []);

  // -------------------- LOCAL STORAGE --------------------
  useEffect(() => {
    const savedPhotos = localStorage.getItem("photos");
    if (savedPhotos) setPhotos(JSON.parse(savedPhotos));
    const savedCats = localStorage.getItem("categories");
    if (savedCats) setCategories(JSON.parse(savedCats));
  }, []);

  useEffect(() => {
    localStorage.setItem("photos", JSON.stringify(photos));
  }, [photos]);
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    const adminLogado = localStorage.getItem("adminLogado");
    if (adminLogado === "true") setLogado(true);
  }, []);

  // -------------------- LOGIN --------------------
  const handleLogin = (usuario: string, senha: string) => {
    if (usuario === "Admin" && senha === "12345678") {
      setLogado(true);
      localStorage.setItem("adminLogado", "true");
      toast.success("✅ Login realizado com sucesso!");
    } else {
      toast.error("❌ Usuário ou senha incorretos!");
    }
  };

  const handleLogout = () => {
    setLogado(false);
    localStorage.removeItem("adminLogado");
    toast.info("👋 Logout realizado com sucesso!");
  };

  // -------------------- PRATOS --------------------
  const handleAddPrato = async (novoPrato: {
    nome: string;
    preco: number;
    categoriaId: string;
  }) => {
    try {
      await addDoc(collection(db, "pratos"), novoPrato);
      toast.success("🍽️ Prato adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar prato:", error);
      toast.error("❌ Erro ao adicionar prato!");
    }
  };

  const handleDeletePrato = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este prato?")) {
      try {
        await deleteDoc(doc(db, "pratos", id));
        toast.success("❌ Prato excluído com sucesso!");
      } catch (error) {
        console.error("Erro ao excluir prato:", error);
        toast.error("❌ Erro ao excluir prato!");
      }
    }
  };

  const handleEditPrato = async (
    id: string,
    pratoAtualizado: { nome: string; preco: number; categoriaId: string }
  ) => {
    try {
      const pratoRef = doc(db, "pratos", id);
      await updateDoc(pratoRef, pratoAtualizado);
      toast.success("✏️ Prato atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao editar prato:", error);
      toast.error("❌ Erro ao editar prato!");
    }
  };

  // -------------------- CATEGORIAS --------------------
  const adicionarCategoria = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaCategoria.nome || !novaCategoria.descricao) {
      toast.warning("⚠️ Preencha todos os campos!");
      return;
    }
    try {
      await addDoc(collection(db, "categorias"), {
        nome: novaCategoria.nome,
        descricao: novaCategoria.descricao,
      });
      setNovaCategoria({ nome: "", descricao: "" });
      toast.success("✅ Categoria criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
      toast.error("❌ Erro ao criar categoria!");
    }
  };

  const salvarCategoriaEditada = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !novaCategoria.nome ||
      !novaCategoria.descricao ||
      !editandoCategoriaId
    ) {
      toast.warning("⚠️ Preencha todos os campos!");
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
      toast.success("✅ Categoria editada com sucesso!");
    } catch (error) {
      console.error("Erro ao editar categoria:", error);
      toast.error("❌ Erro ao editar categoria!");
    }
  };

  const excluirCategoria = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta categoria?")) {
      try {
        await deleteDoc(doc(db, "categorias", id));
        toast.success("❌ Categoria excluída com sucesso!");
        if (editandoCategoriaId === id) {
          setNovaCategoria({ nome: "", descricao: "" });
          setEditandoCategoriaId(null);
        }
      } catch (error) {
        console.error("Erro ao excluir categoria:", error);
        toast.error("❌ Erro ao excluir categoria!");
      }
    }
  };

  // -------------------- RENDER --------------------
  if (!logado) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="admin-layout">
      <HeaderNav
        onLogout={handleLogout}
        userName="Simone"
        pagina={pagina}
        setPagina={setPagina}
      />

      {/* Renderização condicional */}
      {pagina === "inicio" && (
        <AdminHome
          pratos={pratos.length}
          categorias={categoriasFirestore.length}
          fotos={photos.length}
          eventos={eventos}
          atividades={atividades}
          onNavigateTo={(p) => setPagina(p)}
        />
      )}
      {pagina === "cardapio" && (
        <AdminMenu
          pratos={pratos}
          categorias={categoriasFirestore}
          onAddPrato={handleAddPrato}
          onDeletePrato={handleDeletePrato}
          onEditPrato={handleEditPrato}
        />
      )}
      {pagina === "fotos" && (
        <AdminPhotos
          photos={photos}
          setPhotos={setPhotos}
          categories={categories}
          setCategories={setCategories}
        />
      )}
      {pagina === "categorias" && (
        <div className="categories-container">
          <h2>Categorias</h2>
          <form
            onSubmit={
              editandoCategoriaId ? salvarCategoriaEditada : adicionarCategoria
            }
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
            {categoriasFirestore.map((c) => (
              <li key={c.id}>
                📌 {c.nome} - {c.descricao}
                <button
                  onClick={() => {
                    setNovaCategoria({ nome: c.nome, descricao: c.descricao });
                    setEditandoCategoriaId(c.id);
                  }}
                >
                  Editar
                </button>
                <button onClick={() => excluirCategoria(c.id)}>Excluir</button>
              </li>
            ))}
          </ul>
        </div>
      )}


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

export default Admin;
