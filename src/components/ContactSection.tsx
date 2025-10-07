import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Phone, MapPin, Clock, Mail, Instagram, Facebook } from "lucide-react";
import { useState } from "react";

export function ContactSection() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [tipoEvento, setTipoEvento] = useState("");
  const [dataEvento, setDataEvento] = useState("");
  const [numConvidados, setNumConvidados] = useState("");
  const [detalhes, setDetalhes] = useState("");
  const [temAlergia, setTemAlergia] = useState("não");
  const [alergias, setAlergias] = useState("");

  // Erros dos campos
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // --- VALIDADORES ---
  const validateNome = (value: string) => {
    if (!value.trim()) return "Por favor, insira seu nome completo.";
    if (value.trim().length < 3) return "O nome parece muito curto.";
    return "";
  };

  const validateTelefone = (value: string) => {
    const regex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    if (!value.trim()) return "Telefone é obrigatório.";
    if (!regex.test(value)) return "Formato inválido. Ex: (11) 99999-9999";
    return "";
  };

  const validateEmail = (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.trim()) return "E-mail é obrigatório.";
    if (!regex.test(value)) return "Digite um e-mail válido.";
    return "";
  };

  const validateNumConvidados = (value: string) => {
    if (!value) return "";
    if (isNaN(Number(value))) return "Digite apenas números.";
    if (Number(value) < 1) return "O número de convidados deve ser positivo.";
    return "";
  };

  const validateAlergias = (value: string) => {
    if (temAlergia === "sim" && !value.trim())
      return "Por favor, informe quais são as alergias.";
    return "";
  };

  // --- SUBMISSÃO ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {
      nome: validateNome(nome),
      telefone: validateTelefone(telefone),
      email: validateEmail(email),
      numConvidados: validateNumConvidados(numConvidados),
      alergias: validateAlergias(alergias),
    };

    setErrors(newErrors);

    // verifica se tem erro
    const hasError = Object.values(newErrors).some((msg) => msg !== "");
    if (hasError) return; // não envia se tiver erro

    const mensagem = `
Olá, quero solicitar um orçamento:
- Nome: ${nome}
- Telefone: ${telefone}
- E-mail: ${email}
- Tipo de Evento: ${tipoEvento}
- Data do Evento: ${dataEvento}
- Número de Convidados: ${numConvidados}
- Detalhes: ${detalhes}
- Possui alergia: ${temAlergia}${temAlergia === "sim" ? ` (${alergias})` : ""}
    `;

    const numeroWhats = "5511960882764";
    const url = `https://api.whatsapp.com/send?phone=${numeroWhats}&text=${encodeURIComponent(
      mensagem
    )}`;

    window.open(url, "_blank");
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Telefone",
      details: ["(11) 9999-9999", "(11) 3333-3333"],
      action: "Ligar Agora",
    },
    {
      icon: MapPin,
      title: "Endereço",
      details: ["Rua das Flores, 123", "São Paulo - SP"],
      action: "Ver no Mapa",
    },
    {
      icon: Clock,
      title: "Horário",
      details: ["Segunda à Domingo", "8h às 22h"],
      action: "Agendar Visita",
    },
    {
      icon: Mail,
      title: "E-mail",
      details: ["contato@buffetsimone.com", "eventos@buffetsimone.com"],
      action: "Enviar E-mail",
    },
  ];

  return (
    <section id="contato" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-rose-100 px-4 py-2 rounded-full text-rose-600 text-sm mb-4">
            <span>📞</span>
            <span>Fale Conosco</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Vamos Conversar sobre seu{" "}
            <span className="text-transparent bg-gradient-to-r from-rose-500 to-rose-700 bg-clip-text">
              Evento
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Entre em contato conosco e vamos planejar juntos o evento dos seus
            sonhos.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Informações */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="border-rose-100 hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center">
                      <info.icon className="w-6 h-6 text-rose-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        {info.title}
                      </h4>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-sm text-gray-600">
                          {detail}
                        </p>
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

          {/* Formulário */}
          <div className="lg:col-span-2">
            <Card className="border-rose-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-rose-50 to-beige-50">
                <CardTitle className="text-2xl text-gray-800">
                  Solicite seu Orçamento
                </CardTitle>
                <p className="text-gray-600">
                  Preencha o formulário e entraremos em contato em até 24 horas.
                </p>
              </CardHeader>

              <CardContent className="p-8">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Nome */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome Completo *
                      </label>
                      <Input
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className={`border-rose-200 focus:border-rose-400 focus:ring-rose-400 ${
                          errors.nome ? "border-red-500" : ""
                        }`}
                        placeholder="Seu nome completo"
                      />
                      {errors.nome && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.nome}
                        </p>
                      )}
                    </div>

                    {/* Telefone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefone *
                      </label>
                      <Input
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        className={`border-rose-200 focus:border-rose-400 focus:ring-rose-400 ${
                          errors.telefone ? "border-red-500" : ""
                        }`}
                        placeholder="(11) 99999-9999"
                      />
                      {errors.telefone && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.telefone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        E-mail *
                      </label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`border-rose-200 focus:border-rose-400 focus:ring-rose-400 ${
                          errors.email ? "border-red-500" : ""
                        }`}
                        placeholder="seu@email.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Tipo de evento */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Evento
                      </label>
                      <Input
                        value={tipoEvento}
                        onChange={(e) => setTipoEvento(e.target.value)}
                        placeholder="Casamento, Aniversário, etc."
                        className="border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Data */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Data do Evento
                      </label>
                      <Input
                        type="date"
                        value={dataEvento}
                        onChange={(e) => setDataEvento(e.target.value)}
                        className="border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                      />
                    </div>

                    {/* Convidados */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Número de Convidados
                      </label>
                      <Input
                        value={numConvidados}
                        onChange={(e) => setNumConvidados(e.target.value)}
                        placeholder="Quantidade aproximada"
                        className={`border-rose-200 focus:border-rose-400 focus:ring-rose-400 ${
                          errors.numConvidados ? "border-red-500" : ""
                        }`}
                      />
                      {errors.numConvidados && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.numConvidados}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Detalhes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Detalhes do Evento
                    </label>
                    <Textarea
                      rows={4}
                      value={detalhes}
                      onChange={(e) => setDetalhes(e.target.value)}
                      placeholder="Conte-nos mais sobre o evento..."
                      className="border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                    />
                  </div>

                  {/* Alergias */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Possui alguma alergia?
                    </label>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="alergia"
                          value="não"
                          checked={temAlergia === "não"}
                          onChange={() => setTemAlergia("não")}
                        />
                        <span>Não</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="alergia"
                          value="sim"
                          checked={temAlergia === "sim"}
                          onChange={() => setTemAlergia("sim")}
                        />
                        <span>Sim</span>
                      </label>
                    </div>
                  </div>

                  {temAlergia === "sim" && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quais alergias devemos considerar?
                      </label>
                      <Textarea
                        rows={4}
                        value={alergias}
                        onChange={(e) => setAlergias(e.target.value)}
                        className={`border-rose-200 focus:border-rose-400 focus:ring-rose-400 ${
                          errors.alergias ? "border-red-500" : ""
                        }`}
                        placeholder="Ex: Glúten, leite, camarão..."
                      />
                      {errors.alergias && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.alergias}
                        </p>
                      )}
                    </div>
                  )}

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

