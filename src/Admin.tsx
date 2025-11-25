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

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { initializeApp, getApp, getApps } from "firebase/app";

import AdminHome from "./components/admin/Home/AdminHome";
import Login from "./components/admin/Login/Login";
import AdminMenu from "./components/admin/Menu/AdminMenu";
import {
  AdminPhotos,
  Photo,
  Category,
} from "./components/admin/Photos/AdminPhotos";
import HeaderNav from "./components/admin/Header/HeaderNav";

const firebaseConfig = JSON.parse(
  (typeof window !== 'undefined' && (window as any).__firebase_config) || '{}'
);
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

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
  const [pagina, setPagina] = useState<"inicio" | "cardapio" | "fotos">("inicio");

  const [pratos, setPratos] = useState<Prato[]>([]);
  const [categoriasFirestore, setCategoriasFirestore] = useState<Categoria[]>([]);

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [eventos] = useState<number>(65);
  const [atividades] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogado(true);
        localStorage.setItem("adminLogado", "true");
      } else {
        setLogado(false);
        localStorage.removeItem("adminLogado");
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!logado) return;

    const unsub = onSnapshot(collection(db, "pratos"), (snapshot) => {
      const lista: Prato[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Prato, "id">),
      }));
      setPratos(lista);
    });
    return () => unsub();
  }, [logado]);

  useEffect(() => {
    if (!logado) return;

    const unsub = onSnapshot(collection(db, "categorias"), (snapshot) => {
      const lista: Categoria[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Categoria, "id">),
      }));
      setCategoriasFirestore(lista);
    });
    return () => unsub();
  }, [logado]);

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

  const handleLogin = (usuario: string, senha: string) => {
    setLogado(true);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setLogado(false);
      setPagina("inicio");
    } catch (error) {
      console.error("Erro ao sair", error);
    }
  };

  // HANDLERS PRATO
  const handleAddPrato = async (novoPrato: { nome: string; preco: number; categoriaId: string }) => {
    try {
      await addDoc(collection(db, "pratos"), novoPrato);
    } catch (error) {
      console.error("Erro ao adicionar prato:", error);
    }
  };

  const handleDeletePrato = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este prato?")) {
      try {
        await deleteDoc(doc(db, "pratos", id));
      } catch (error) {
        console.error("Erro ao excluir prato:", error);
      }
    }
  };

  const handleEditPrato = async (id: string, pratoAtualizado: { nome: string; preco: number; categoriaId: string }) => {
    try {
      const pratoRef = doc(db, "pratos", id);
      await updateDoc(pratoRef, pratoAtualizado);
    } catch (error) {
      console.error("Erro ao editar prato:", error);
    }
  };

  // HANDLERS CATEGORIA
  const handleAddCategoria = async (novaCategoria: { nome: string; descricao: string }) => {
    try {
      await addDoc(collection(db, "categorias"), novaCategoria);
    } catch (error) {
      console.error("Erro ao adicionar categoria:", error);
    }
  };

  const handleEditCategoria = async (id: string, categoriaAtualizada: { nome: string; descricao: string }) => {
    try {
      const categoriaRef = doc(db, "categorias", id);
      await updateDoc(categoriaRef, categoriaAtualizada);
    } catch (error) {
      console.error("Erro ao editar categoria:", error);
    }
  };

  const handleDeleteCategoria = async (id: string) => {
    try {
      await deleteDoc(doc(db, "categorias", id));
    } catch (error) {
      console.error("Erro ao excluir categoria:", error);
    }
  };

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
          onAddCategoria={handleAddCategoria}
          onEditCategoria={handleEditCategoria}
          onDeleteCategoria={handleDeleteCategoria}
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
    </div>
  );
};

export default Admin;