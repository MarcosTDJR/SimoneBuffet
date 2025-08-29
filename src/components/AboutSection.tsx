import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Heart, Users, Award, Sparkles } from "lucide-react";

export function AboutSection() {
  const features = [
    {
      icon: Heart,
      title: "Feito com Amor",
      description: "Cada prato é preparado com carinho e ingredientes selecionados especialmente para você."
    },
    {
      icon: Users,
      title: "Experiência Familiar",
      description: "Mais de 15 anos atendendo famílias e criando momentos especiais inesquecíveis."
    },
    {
      icon: Award,
      title: "Qualidade Premium",
      description: "Ingredientes frescos e de primeira qualidade em todas as nossas criações culinárias."
    },
    {
      icon: Sparkles,
      title: "Eventos Únicos",
      description: "Personalizamos cada evento para torná-lo único e especial para você e seus convidados."
    }
  ];

  return (
    <section id="sobre" className="py-20 bg-gradient-to-br from-rose-50 to-beige-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Imagem e visual */}
          <div className="relative">
            <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1697659602792-31dcb2a5a4ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwY29va2luZyUyMGtpdGNoZW58ZW58MXx8fHwxNzU1OTA5Njg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Chef Simone preparando pratos especiais"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>

            {/* Cards flutuantes com estatísticas */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg border border-rose-100">
              <div className="text-center">
                <div className="text-3xl font-bold text-rose-600 mb-1">500+</div>
                <div className="text-sm text-gray-600">Eventos Realizados</div>
              </div>
            </div>
            
            <div className="absolute -top-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-rose-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-rose-600 mb-1">15+</div>
                <div className="text-xs text-gray-600">Anos de Experiência</div>
              </div>
            </div>
          </div>

          {/* Conteúdo textual */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-rose-600 text-sm border border-rose-200 mb-6">
                <span>👩‍🍳</span>
                <span>Nossa História</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
                Conheça a <span className="text-transparent bg-gradient-to-r from-rose-500 to-rose-700 bg-clip-text">Simone</span>
              </h2>
              
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Há mais de 15 anos, a Chef Simone dedica sua vida a criar experiências gastronômicas 
                  únicas e memoráveis. O que começou como uma paixão pela culinária familiar se 
                  transformou no Buffet Simone, referência em eventos especiais na região.
                </p>
                
                <p>
                  Nossa filosofia é simples: cada prato conta uma história, cada sabor desperta uma 
                  emoção. Utilizamos apenas ingredientes frescos e de qualidade premium, preparados 
                  com técnicas tradicionais e um toque especial de carinho.
                </p>
                
                <p>
                  Do planejamento à execução, cuidamos de cada detalhe para que seu evento seja 
                  exatamente como você sonhou. Porque acreditamos que momentos especiais merecem 
                  sabores inesquecíveis.
                </p>
              </div>
            </div>

            {/* Features cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <Card key={index} className="border-rose-100 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                        <feature.icon className="w-5 h-5 text-rose-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">{feature.title}</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}