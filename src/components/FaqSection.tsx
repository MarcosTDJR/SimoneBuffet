import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const faqData = [
  {
    id: "item-1",
    question: "Como posso solicitar um orçamento?",
    answer:
      'É muito simples! Aqui mesmo no site, na seção "Contato", você encontrará nosso formulário. Preencha com os detalhes do seu evento e nossa equipe entrará em contato o mais breve possível para conversar com você!',
  },
  {
    id: "item-2",
    question: "Quais tipos de eventos vocês atendem?",
    answer:
      "Atendemos uma grande variedade de celebrações! Nossa especialidade inclui casamentos, aniversários, eventos corporativos, formaturas e confraternizações. Se o seu evento for diferente, nos mande uma mensagem! Adoramos novos desafios.",
  },
  {
    id: "item-3",
    question: "É possível personalizar o cardápio?",
    answer:
      "Com certeza! Acreditamos que cada evento é único. Você pode usar nosso cardápio online como inspiração e, durante o contato para o orçamento, podemos personalizar os pratos para que tudo fique do seu jeito.",
  },
  {
    id: "item-4",
    question: "Vocês atendem a restrições alimentares (alergias, veganos, etc.)?",
    answer:
      "Sim! Levamos isso muito a sério. No formulário de orçamento, há um campo específico para você informar sobre quaisquer alergias ou restrições alimentares. Montaremos um cardápio delicioso e seguro para todos os seus convidados.",
  },
  {
    id: "item-5",
    question: "Com quanta antecedência devo solicitar meu orçamento?",
    answer:
      "Recomendamos que entre em contato assim que tiver a data do seu evento definida. O ideal é de 3 a 6 meses de antecedência para garantir nossa disponibilidade e planejar tudo com calma, mas não hesite em nos contatar para datas mais próximas!",
  },
  {
    id: "item-6",
    question: "Onde posso ver fotos de eventos que a Simone já realizou?",
    answer:
      'Você pode conferir alguns dos nossos trabalhos na seção "Galeria" aqui no site. Para ver ainda mais fotos e os bastidores dos nossos eventos, siga nossas redes sociais! Os links estão no rodapé da página.',
  },
  {
    id: "item-7",
    question: "Vocês oferecem degustação dos pratos?",
    answer:
      "Sim, oferecemos degustação para eventos em fase de fechamento de contrato. É uma ótima oportunidade para você conhecer de perto a qualidade e o sabor dos nossos pratos. Os detalhes são combinados durante a negociação do orçamento.",
  },
];

export function FaqSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFaqs, setFilteredFaqs] = useState(faqData);
  const [openItem, setOpenItem] = useState<string | null>(null);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredFaqs(faqData);
    } else {
      const lowercasedFilter = searchTerm.toLowerCase();
      const filtered = faqData.filter(
        (faq) =>
          faq.question.toLowerCase().includes(lowercasedFilter) ||
          faq.answer.toLowerCase().includes(lowercasedFilter)
      );
      setFilteredFaqs(filtered);
    }
  }, [searchTerm]);

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section 
      id="faq" 
      className="py-20" 
      style={{ backgroundColor: "#FDF4F9" }} 
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 text-center md:text-left">
            Perguntas{" "}
            <span style={{ color: "#E91E63" }}>Frequentes</span>
          </h2>
          
          <div className="relative" style={{ width: "300px" }}> 
            <ImageWithFallback
              src="/Icons/LupaRose.png"
              alt="Ícone de busca"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
            />
            <Input
              type="text"
              placeholder="Busque aqui..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                borderRadius: "46px", 
                border: "2px solid #E91E63",
                backgroundColor: "white",
                height: "46px",
                paddingLeft: "20px",
                paddingRight: "45px"
              }}
              className="w-full text-base
                         focus:ring-2 focus:ring-[#E91E63] focus:ring-offset-0 focus:border-[#E91E63]
                         placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {filteredFaqs.length === 0 ? (
            <p className="text-center text-gray-600 mt-10 text-lg">
              Nenhuma pergunta encontrada para "{searchTerm}".
            </p>
          ) : (
 filteredFaqs.map((faq) => {
  const isOpen = openItem === faq.id;

  return (
    <div
      key={faq.id}
      style={{
        backgroundColor: "white",
        border: "1px solid #E91E63",
        borderRadius: "16px",
        boxShadow: "10px 10px 8px rgba(216, 30, 30, 0.15)",
        transition: "all 0.3s ease",
        position: "relative" 
      }}
      className="hover:shadow-[6px_6px_12px_rgba(0,0,0,0.2)]"
    >
      <button
        onClick={() => toggleItem(faq.id)}
        className="w-full flex justify-between items-center p-6 text-left 
                   transition-colors duration-200"
        style={{ paddingRight: "40px" }} 
      >
                    <span
                      className="font-semibold text-lg pr-4 transition-colors duration-200"
                      style={{ color: isOpen ? "#E91E63" : "#000000ff" }} 
        >
          {faq.question}
        </span>

        <div 
          style={{
            position: "absolute",
            right: "22px",
            top: "-9px", 
            zIndex: 10
          }}
          className="flex-shrink-0"
        >
          <ImageWithFallback
            src={
              isOpen
                ? "/Icons/CollapseRoseCima.png"
                : "/Icons/CollapseRoseBaixo.png"
            }
            alt="Ícone de expandir/recolher"
            className="w-16 h-16 transition-all duration-500 cursor-pointer"
            style={{
              transform: isOpen ? "rotate(180deg)" : "rotate(-180deg)"
            }}
          />
        </div>
      </button>

                <div
                    style={{
                    maxHeight: isOpen ? "500px" : "0px", 
                    opacity: isOpen ? 1 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.7s ease-in-out, opacity 0.8s ease-in-out"
                    }}
                >
                    <div className="px-6 pb-6 pt-2 text-gray-700 leading-relaxed">
                    {faq.answer}
                    </div>
                </div>
                </div>
            );
            })
          )}
        </div>
      </div>
    </section>
  );
}