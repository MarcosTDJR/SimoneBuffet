import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function MenuSection() {
  const menuCategories = [
    {
      id: "salgados",
      name: "Salgados",
      description: "Deliciosos salgados para sua festa",
      image: "https://images.unsplash.com/photo-1536739782508-c2388552aad3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYXBwZXRpemVyc3xlbnwxfHx8fDE3NTU5NTYxODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      items: [
        { name: "Coxinhas Premium", description: "Coxinha de frango desfiado com catupiry", price: "R$ 4,50", popular: true },
        { name: "Pastel de Queijo", description: "Massa crocante com queijo derretido", price: "R$ 3,80" },
        { name: "Risoles de Camarão", description: "Recheio cremoso de camarão", price: "R$ 5,20", popular: true },
        { name: "Empadas de Palmito", description: "Massa amanteigada com palmito", price: "R$ 4,00" },
        { name: "Quiches Sortidas", description: "Queijo, presunto, cogumelos", price: "R$ 4,80" },
        { name: "Esfirras Abertas", description: "Carne, frango ou queijo", price: "R$ 3,50" }
      ]
    },
    {
      id: "doces",
      name: "Doces",
      description: "Sobremesas irresistíveis",
      image: "https://images.unsplash.com/photo-1676194661417-e0aeef8fe1fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW5jeSUyMGRlc3NlcnRzJTIwcGFzdHJpZXN8ZW58MXx8fHwxNzU1OTU2MTg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      items: [
        { name: "Brigadeiros Gourmet", description: "Chocolate belga, pistache, maracujá", price: "R$ 3,20", popular: true },
        { name: "Bem-casados", description: "Doce de leite artesanal", price: "R$ 4,50" },
        { name: "Tortinhas de Limão", description: "Base crocante com creme de limão", price: "R$ 5,80", popular: true },
        { name: "Profiteroles", description: "Massa choux com creme de baunilha", price: "R$ 6,20" },
        { name: "Macarons Franceses", description: "Sabores variados", price: "R$ 7,00" },
        { name: "Cheesecake de Frutas", description: "Morangos, mirtilos, framboesas", price: "R$ 8,50" }
      ]
    },
    {
      id: "pratos",
      name: "Pratos Principais",
      description: "Refeições completas e saborosas",
      image: "https://images.unsplash.com/photo-1585216045166-56dd417c7f8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwbWFpbiUyMGNvdXJzZSUyMGRpbmluZ3xlbnwxfHx8fDE3NTU5NTYxODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      items: [
        { name: "Salmão Grelhado", description: "Com molho de alcaparras e arroz de brócolis", price: "R$ 48,00", popular: true },
        { name: "Frango à Parmegiana", description: "Filé empanado com molho e queijo", price: "R$ 32,00" },
        { name: "Picanha na Chapa", description: "Corte nobre com acompanhamentos", price: "R$ 55,00", popular: true },
        { name: "Risotto de Camarão", description: "Arroz cremoso com camarões grandes", price: "R$ 42,00" },
        { name: "Lasanha da Casa", description: "Camadas de massa, carne e queijos", price: "R$ 28,00" },
        { name: "Bacalhau à Braz", description: "Clássico português com batata palha", price: "R$ 45,00" }
      ]
    },
    {
      id: "bebidas",
      name: "Bebidas",
      description: "Refrescantes e saborosas",
      image: "https://images.unsplash.com/photo-1685270386242-487b9e1c9fc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWZyZXNoaW5nJTIwYmV2ZXJhZ2VzJTIwZHJpbmtzfGVufDF8fHx8MTc1NTk1NjE4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      items: [
        { name: "Sucos Naturais", description: "Laranja, limão, maracujá, acerola", price: "R$ 8,00", popular: true },
        { name: "Água de Coco", description: "Geladinha e natural", price: "R$ 6,00" },
        { name: "Refrigerantes", description: "Coca-Cola, Guaraná, Fanta", price: "R$ 5,00" },
        { name: "Águas Saborizadas", description: "Limão, morango, maracujá", price: "R$ 4,50", popular: true },
        { name: "Chás Gelados", description: "Mate, hibisco, frutas vermelhas", price: "R$ 7,00" },
        { name: "Café Expresso", description: "Blend especial da casa", price: "R$ 4,00" }
      ]
    }
  ];

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
            Sabores que <span className="text-transparent bg-gradient-to-r from-rose-500 to-rose-700 bg-clip-text">Encantam</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubra nossa seleção cuidadosa de pratos, doces e bebidas, 
            preparados com ingredientes frescos e muito carinho.
          </p>
        </div>

        {/* Tabs do cardápio */}
        <Tabs defaultValue="salgados" className="max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-12 bg-rose-50 p-2 rounded-xl">
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
                {category.items.map((item, index) => (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-rose-100 hover:border-rose-200">
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