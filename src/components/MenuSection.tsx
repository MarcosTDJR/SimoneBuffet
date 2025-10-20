import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { db } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

export type MenuItem = {
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

interface MenuSectionProps {
  adicionarAoCarrinho: (item: MenuItem) => void;
}

export function MenuSection({ adicionarAoCarrinho }: MenuSectionProps) {
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    const pratosCollection = collection(db, "pratos");
    const categoriasCollection = collection(db, "categorias");

    const unsubscribe = onSnapshot(pratosCollection, (snapshotPratos) => {
      const pratos = snapshotPratos.docs.map((doc) => {
        const data = doc.data() as { nome: string; preco: number; categoriaId?: string };
        return {
          id: doc.id,
          name: data.nome,
          description: "Prato adicionado pelo administrador 🍴",
          price: `R$ ${data.preco.toFixed(2)}`,
          categoriaId: data.categoriaId || "sem-categoria",
        };
      });

      onSnapshot(categoriasCollection, (snapshotCats) => {
        const categorias = snapshotCats.docs.map((doc) => {
          const data = doc.data() as { nome: string; descricao: string };
          return {
            id: doc.id,
            name: data.nome,
            description: data.descricao,
            image:
              "https://images.unsplash.com/photo-1585216045166-56dd417c7f8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          };
        });

        const menu = categorias.map((cat) => ({
          ...cat,
          items: pratos.filter((p) => p.categoriaId === cat.id),
        }));

        const semCategoria = pratos.filter((p) => p.categoriaId === "sem-categoria");
        if (semCategoria.length > 0) {
          menu.push({
            id: "outros",
            name: "Outros Pratos",
            description: "Pratos ainda sem categoria",
            image:
              "https://images.unsplash.com/photo-1585216045166-56dd417c7f8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
            items: semCategoria,
          });
        }

        setMenuCategories(menu);

        // Seleciona a primeira categoria automaticamente
        if (!selectedCategory && menu.length > 0) {
          setSelectedCategory(menu[0].id);
        }
      });
    });

    return () => unsubscribe();
  }, []);

  return (
    <section id="cardapio" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
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

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="max-w-7xl mx-auto">
          <TabsList className="flex justify-center flex-wrap gap-4 w-full mb-12 bg-transparent p-0">
            {menuCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="cursor-pointer px-6 py-3 font-medium rounded-md border border-rose-200 text-gray-700
                   bg-white shadow-sm transition-all duration-300
                   hover:bg-rose-100 hover:text-rose-600 hover:shadow-md
                   data-[state=active]:bg-rose-600 data-[state=active]:text-white data-[state=active]:border-rose-600
                   data-[state=active]:shadow-lg"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {menuCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-8">
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
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{item.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-rose-600 font-bold text-lg">{item.price}</span>
                        <button
                          onClick={() => adicionarAoCarrinho(item)}
                          className="bg-rose-50 text-rose-600 px-4 py-2 rounded-lg hover:bg-rose-100 transition-colors text-sm font-medium"
                        >
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
