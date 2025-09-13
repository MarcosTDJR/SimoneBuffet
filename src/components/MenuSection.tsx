// src/components/MenuSection.tsx
import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { db } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  popular?: boolean;
};

type MenuCategory = {
  id: string;
  name: string;
  description: string;
  image: string;
  items: MenuItem[];
};

export function MenuSection() {
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([]);
  useEffect(() => {
    let unsubscribePratos: () => void;
    let unsubscribeCategorias: () => void;

    const pratosCollection = collection(db, "pratos");
    const categoriasCollection = collection(db, "categorias");

    // 🔥 Escuta em tempo real os pratos
    unsubscribePratos = onSnapshot(pratosCollection, (snapshotPratos) => {
      const pratos = snapshotPratos.docs.map(doc => {
        const data = doc.data() as { nome: string; preco: number; categoriaId?: string };
        return {
          id: doc.id,
          name: data.nome,
          description: "Prato adicionado pelo administrador 🍴",
          price: `R$ ${data.preco.toFixed(2)}`,
          categoriaId: data.categoriaId || "sem-categoria",
        };
      });

      // Agora pega categorias
      unsubscribeCategorias = onSnapshot(categoriasCollection, (snapshotCats) => {
        const categorias = snapshotCats.docs.map(doc => {
          const data = doc.data() as { nome: string; descricao: string };
          return {
            id: doc.id,
            name: data.nome,
            description: data.descricao,
            image: "https://images.unsplash.com/photo-1585216045166-56dd417c7f8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", // Pode customizar
          };
        });

        // Cria menuCategories combinando categorias e pratos
        const menu = categorias.map(cat => ({
          ...cat,
          items: pratos.filter(p => p.categoriaId === cat.id)
        }));

        // Se houver pratos sem categoria, criar uma categoria "Outros"
        const semCategoria = pratos.filter(p => p.categoriaId === "sem-categoria");
        if (semCategoria.length > 0) {
          menu.push({
            id: "outros",
            name: "Outros Pratos",
            description: "Pratos ainda sem categoria",
            image: "https://images.unsplash.com/photo-1585216045166-56dd417c7f8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
            items: semCategoria
          });
        }

        setMenuCategories(menu);
      });
    });

    return () => {
      unsubscribePratos?.();
      unsubscribeCategorias?.();
    };
  }, []);

  useEffect(() => {
    // Escuta em tempo real os pratos adicionados no Firestore
    const unsub = onSnapshot(collection(db, "pratos"), (snapshot) => {
      const pratos: MenuItem[] = snapshot.docs.map((doc) => {
        const data = doc.data() as { nome: string; preco: number };
        return {
          id: doc.id,
          name: data.nome,
          description: "Prato adicionado pelo administrador 🍴", // pode expandir depois
          price: `R$ ${data.preco.toFixed(2)}`
        };
      });

      // Aqui você decide em qual categoria os pratos vão entrar
      // Exemplo: todos no "Pratos Principais"
      setMenuCategories([
        {
          id: "pratos",
          name: "Pratos Principais",
          description: "Refeições completas e saborosas",
          image: "https://images.unsplash.com/photo-1585216045166-56dd417c7f8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          items: pratos
        }
      ]);
    });

    return () => unsub();
  }, []);

  return (
    <section id="cardapio" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header da seção */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-rose-100 px-4 py-2 rounded-full text-rose-600 text-sm mb-4">
            <span>🍽️</span>
            <span>Nosso Cardápio</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Sabores que{" "}
            <span className="text-transparent bg-gradient-to-r from-rose-500 to-rose-700 bg-clip-text">
              Encantam
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubra nossa seleção de pratos cadastrados pelo administrador.
          </p>
        </div>

        {/* Tabs do cardápio */}
        <Tabs defaultValue={menuCategories[0]?.id} className="max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-1 lg:grid-cols-4 mb-12 bg-rose-50 p-2 rounded-xl">
            {menuCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="data-[state=active]:bg-white data-[state=active]:text-rose-600 data-[state=active]:shadow-sm rounded-lg py-3"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {menuCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-8">
              {/* Header da categoria */}
              <div className="text-center mb-12">
                <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-6 shadow-lg">
                  <ImageWithFallback
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                    <div className="p-8 text-white">
                      <h3 className="text-3xl font-bold mb-2">{category.name}</h3>
                      <p className="text-lg opacity-90">{category.description}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid de itens */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item) => (
                  <Card
                    key={item.id}
                    className="group hover:shadow-lg transition-all duration-300 border-rose-100 hover:border-rose-200"
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold text-gray-800 group-hover:text-rose-600 transition-colors">
                          {item.name}
                        </h4>
                        {item.popular && (
                          <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-200">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-rose-600 font-bold text-lg">
                          {item.price}
                        </span>
                        <button className="bg-rose-50 text-rose-600 px-4 py-2 rounded-lg hover:bg-rose-100 transition-colors text-sm font-medium">
                          Adicionar
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
