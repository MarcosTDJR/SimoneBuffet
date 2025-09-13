import React, { useState, useEffect } from "react";
import styles from "./Admin.module.css";
import { db } from "./firebaseConfig";
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";

// Tipos
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
    const [credenciais, setCredenciais] = useState<{ usuario: string; senha: string }>({
        usuario: "",
        senha: "",
    });

    const [pagina, setPagina] = useState<"inicio" | "cardapio" | "fotos" | "categorias">("inicio");

    const [pratos, setPratos] = useState<Prato[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [novoPrato, setNovoPrato] = useState<{ nome: string; preco: string; categoriaId: string }>({
        nome: "",
        preco: "",
        categoriaId: "",
    });
    const [novaCategoria, setNovaCategoria] = useState<{ nome: string; descricao: string }>({
        nome: "",
        descricao: "",
    });

    const [editandoCategoriaId, setEditandoCategoriaId] = useState<string | null>(null);

    const [fotos, setFotos] = useState<number>(40);
    const [eventos, setEventos] = useState<number>(65);

    const [atividades] = useState<string[]>([
        "Novo Salgado Adicionado: Coxinha Recheada com Calabresa.",
        'Imagem "Salão Principal" adicionada a sessão "Ambiente".',
        'Valor do Doce "Bem-Casado" alterado para R$ 5,10.',
        'A Bebida "Refrigerante 2L" foi excluída e não será mais exibida.',
    ]);

    // Carregar pratos
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

    // Carregar categorias
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

    // Verificar login
    useEffect(() => {
        const adminLogado = localStorage.getItem("adminLogado");
        if (adminLogado === "true") setLogado(true);
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (credenciais.usuario === "Admin" && credenciais.senha === "12345678") {
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

    // Adicionar prato
    const adicionarPrato = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!novoPrato.nome || !novoPrato.preco || !novoPrato.categoriaId) {
            alert("Preencha todos os campos!");
            return;
        }
        try {
            await addDoc(collection(db, "pratos"), {
                nome: novoPrato.nome,
                preco: parseFloat(novoPrato.preco),
                categoriaId: novoPrato.categoriaId,
            });
            setNovoPrato({ nome: "", preco: "", categoriaId: "" });
            alert("✅ Prato adicionado com sucesso!");
        } catch (error) {
            console.error("Erro ao adicionar prato:", error);
        }
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
                // Limpar edição se estiver editando a mesma categoria
                if (editandoCategoriaId === id) {
                    setNovaCategoria({ nome: "", descricao: "" });
                    setEditandoCategoriaId(null);
                }
            } catch (error) {
                console.error("Erro ao excluir categoria:", error);
            }
        }
    };
    if (!logado) {
        return (
            <div className={styles.florp}>
                <div className={styles.zigzag}>
                    <h1>🔑 Área Administrativa</h1>
                    <p>Faça login para gerenciar seus produtos</p>
                    <form onSubmit={handleLogin}>
                        <input
                            type="text"
                            placeholder="Usuário"
                            value={credenciais.usuario}
                            onChange={(e) => setCredenciais({ ...credenciais, usuario: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            value={credenciais.senha}
                            onChange={(e) => setCredenciais({ ...credenciais, senha: e.target.value })}
                        />
                        <button type="submit">Entrar</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.bloop}>
            <header className={styles.snarp}>
                <div className={styles.wobble}>
                    <h1>🍽 Buffet Simone</h1>
                    <nav>
                        <button className={pagina === "inicio" ? styles.sproing : ""} onClick={() => setPagina("inicio")}>Início</button>
                        <button className={pagina === "cardapio" ? styles.sproing : ""} onClick={() => setPagina("cardapio")}>Cardápio</button>
                        <button className={pagina === "categorias" ? styles.sproing : ""} onClick={() => setPagina("categorias")}>Categorias</button>
                        <button className={pagina === "fotos" ? styles.sproing : ""} onClick={() => setPagina("fotos")}>Fotos</button>
                    </nav>
                </div>
                <button onClick={handleLogout} className={styles.zap}>Sair</button>
            </header>

            {pagina === "inicio" && (
                <>
                    <section className={styles.plop}>
                        <div className={styles.glop}>
                            <h3>Pratos no Cardápio</h3>
                            <p>{pratos.length}</p>
                        </div>
                        <div className={styles.glop}>
                            <h3>Categorias Criadas</h3>
                            <p>{categorias.length}</p>
                        </div>
                        <div className={styles.glop}>
                            <h3>Fotos Adicionadas</h3>
                            <p>{fotos}</p>
                        </div>
                        <div className={styles.glop}>
                            <h3>Eventos Realizados</h3>
                            <p>{eventos}</p>
                        </div>
                    </section>

                    <section className={styles.blop}>
                        <h2>Atividades Recentes</h2>
                        <ul>
                            {atividades.map((a, i) => (
                                <li key={i}>• {a}</li>
                            ))}
                        </ul>
                    </section>

                    <section className={styles.sploosh}>
                        <button onClick={() => setPagina("cardapio")}>➕ Adicionar Novo Prato</button>
                        <button onClick={() => setPagina("categorias")}>📂 Criar Nova Categoria</button>
                        <button onClick={() => setPagina("fotos")}>🖼 Adicionar Nova Imagem</button>
                    </section>
                </>
            )}

            {pagina === "categorias" && (
                <div className={styles.froob}>
                    <h2>📂 Categorias</h2>
                    <form
                        onSubmit={editandoCategoriaId ? salvarCategoriaEditada : adicionarCategoria}
                        className={styles.swoosh}
                    >
                        <input
                            type="text"
                            placeholder="Nome da categoria"
                            value={novaCategoria.nome}
                            onChange={(e) => setNovaCategoria({ ...novaCategoria, nome: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Descrição"
                            value={novaCategoria.descricao}
                            onChange={(e) => setNovaCategoria({ ...novaCategoria, descricao: e.target.value })}
                        />
                        <button type="submit">{editandoCategoriaId ? "Salvar Alteração" : "Salvar Categoria"}</button>
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

            {pagina === "cardapio" && (
                <div className={styles.froob2}>
                    <h2>📋 Cardápio</h2>
                    <form onSubmit={adicionarPrato} className={styles.swoosh2}>
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
                                <option key={c.id} value={c.id}>{c.nome}</option>
                            ))}
                        </select>
                        <button type="submit">Salvar Prato</button>
                    </form>

                    <ul>
                        {pratos.map((p) => {
                            const categoria = categorias.find((c) => c.id === p.categoriaId);
                            return (
                                <li key={p.id}>
                                    🍴 {p.nome} - R$ {p.preco.toFixed(2)} {categoria && <span>({categoria.nome})</span>}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}

            {pagina === "fotos" && (
                <div className={styles.froob3}>
                    <h2>📷 Fotos</h2>
                    <p>Aqui você pode gerenciar as fotos do buffet.</p>
                </div>
            )}
        </div>
    );
};

export default Admin;
