import { Button } from "./ui/button";
import { Star, Users, Award, Heart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HeroSection() {
  const scrollToCardapio = () => {
    const element = document.getElementById('cardapio');
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="inicio" className="min-h-screen bg-gradient-to-br from-rose-50 via-beige-50 to-rose-100 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-rose-200 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-beige-300 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-rose-300 rounded-full opacity-40"></div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Conteúdo textual */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-rose-600 text-sm border border-rose-200">
                <Award size={16} />
                <span>Mais de 15 anos de experiência</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                Buffet <span className="text-transparent bg-gradient-to-r from-rose-500 to-rose-700 bg-clip-text">Simone</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Transformamos seus momentos especiais em experiências gastronômicas únicas.
                Sabores autênticos, ingredientes frescos e o carinho de sempre.
              </p>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-rose-100 rounded-full mx-auto mb-2">
                  <Users className="w-6 h-6 text-rose-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">500+</div>
                <div className="text-sm text-gray-600">Eventos realizados</div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-rose-100 rounded-full mx-auto mb-2">
                  <Star className="w-6 h-6 text-rose-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">4.9</div>
                <div className="text-sm text-gray-600">Avaliação média</div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-rose-100 rounded-full mx-auto mb-2">
                  <Heart className="w-6 h-6 text-rose-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">98%</div>
                <div className="text-sm text-gray-600">Clientes satisfeitos</div>
              </div>
            </div>

            {/* Call to actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={scrollToCardapio}
                size="lg"
                className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white px-8 py-4"
              >
                Ver Cardápio
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-rose-300 text-rose-600 hover:bg-rose-50 px-8 py-4"
              >
                Solicitar Orçamento
              </Button>
            </div>
          </div>

          {/* Imagem hero */}
          <div className="relative">
            <div className="relative w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1751651054985-7dc01c37369c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwYnVmZmV0JTIwZm9vZCUyMHNwcmVhZHxlbnwxfHx8fDE3NTU5NTYxODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Buffet Simone - Mesa elegante com variedade de pratos"
                className="w-full h-full object-cover"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

              {/* Badge flutuante */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">5.0</span>
                </div>
              </div>
            </div>

            {/* Elementos decorativos */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-rose-300 to-rose-400 rounded-full opacity-80 blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-beige-300 to-beige-400 rounded-full opacity-60 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}