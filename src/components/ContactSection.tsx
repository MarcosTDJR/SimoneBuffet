import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Phone, MapPin, Clock, Mail, Instagram, Facebook } from "lucide-react";

export function ContactSection() {
  const contactInfo = [
    {
      icon: Phone,
      title: "Telefone",
      details: ["(11) 9999-9999", "(11) 3333-3333"],
      action: "Ligar Agora"
    },
    {
      icon: MapPin,
      title: "Endereço",
      details: ["Rua das Flores, 123", "São Paulo - SP"],
      action: "Ver no Mapa"
    },
    {
      icon: Clock,
      title: "Horário",
      details: ["Segunda à Domingo", "8h às 22h"],
      action: "Agendar Visita"
    },
    {
      icon: Mail,
      title: "E-mail",
      details: ["contato@buffetsimone.com", "eventos@buffetsimone.com"],
      action: "Enviar E-mail"
    }
  ];

  return (
    <section id="contato" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header da seção */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-rose-100 px-4 py-2 rounded-full text-rose-600 text-sm mb-4">
            <span>📞</span>
            <span>Fale Conosco</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Vamos Conversar sobre seu <span className="text-transparent bg-gradient-to-r from-rose-500 to-rose-700 bg-clip-text">Evento</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Entre em contato conosco e vamos planejar juntos o evento dos seus sonhos. 
            Estamos prontos para atender você com todo carinho e atenção.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Informações de contato */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Informações de Contato</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="border-rose-100 hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center">
                          <info.icon className="w-6 h-6 text-rose-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-2">{info.title}</h4>
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-sm text-gray-600">{detail}</p>
                          ))}
                          <Button 
                            variant="link" 
                            className="text-rose-600 hover:text-rose-700 p-0 h-auto mt-2"
                          >
                            {info.action}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Redes sociais */}
            <Card className="border-rose-100">
              <CardHeader>
                <CardTitle className="text-lg">Siga-nos nas Redes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="border-rose-200 text-rose-600 hover:bg-rose-50"
                  >
                    <Instagram className="w-5 h-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="border-rose-200 text-rose-600 hover:bg-rose-50"
                  >
                    <Facebook className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Formulário de contato */}
          <div className="lg:col-span-2">
            <Card className="border-rose-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-rose-50 to-beige-50">
                <CardTitle className="text-2xl text-gray-800">Solicite seu Orçamento</CardTitle>
                <p className="text-gray-600">Preencha o formulário e entraremos em contato em até 24 horas</p>
              </CardHeader>
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome Completo *
                      </label>
                      <Input 
                        placeholder="Seu nome completo"
                        className="border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefone *
                      </label>
                      <Input 
                        placeholder="(11) 99999-9999"
                        className="border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        E-mail *
                      </label>
                      <Input 
                        type="email"
                        placeholder="seu@email.com"
                        className="border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Evento
                      </label>
                      <Input 
                        placeholder="Casamento, Aniversário, Corporativo..."
                        className="border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Data do Evento
                      </label>
                      <Input 
                        type="date"
                        className="border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Número de Convidados
                      </label>
                      <Input 
                        placeholder="Quantidade aproximada"
                        className="border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Detalhes do Evento
                    </label>
                    <Textarea 
                      placeholder="Conte-nos mais sobre seu evento, preferências culinárias, horário, local..."
                      rows={4}
                      className="border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                    />
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white py-4"
                  >
                    Solicitar Orçamento Gratuito
                  </Button>

                  <p className="text-sm text-gray-500 text-center">
                    * Campos obrigatórios. Responderemos em até 24 horas.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}