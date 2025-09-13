import { Heart, Phone, MapPin, Mail, Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Logo e descrição */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">S</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Buffet Simone</h3>
                <p className="text-sm text-gray-300">Sabores únicos</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Há mais de 15 anos criando momentos especiais através da gastronomia.
              Cada evento é único, cada sabor é inesquecível.
            </p>
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center hover:bg-rose-700 transition-colors cursor-pointer">
                <Instagram size={16} />
              </div>
              <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center hover:bg-rose-700 transition-colors cursor-pointer">
                <Facebook size={16} />
              </div>
            </div>
          </div>

          {/* Links rápidos */}
          <div>
            <h4 className="font-semibold text-white mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#inicio" className="text-gray-300 hover:text-rose-400 transition-colors text-sm">
                  Início
                </a>
              </li>
              <li>
                <a href="#cardapio" className="text-gray-300 hover:text-rose-400 transition-colors text-sm">
                  Cardápio
                </a>
              </li>
              <li>
                <a href="#sobre" className="text-gray-300 hover:text-rose-400 transition-colors text-sm">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#contato" className="text-gray-300 hover:text-rose-400 transition-colors text-sm">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Serviços */}
          <div>
            <h4 className="font-semibold text-white mb-4">Nossos Serviços</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Casamentos</li>
              <li>Aniversários</li>
              <li>Eventos Corporativos</li>
              <li>Formaturas</li>
              <li>Confraternizações</li>
              <li>Buffet Delivery</li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-rose-400" />
                <span className="text-sm text-gray-300">(11) 9999-9999</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-rose-400" />
                <span className="text-sm text-gray-300">contato@buffetsimone.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-rose-400 mt-0.5" />
                <div className="text-sm text-gray-300">
                  <p>Rua das Flores, 123</p>
                  <p>São Paulo - SP</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2024 Buffet Simone. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Feito com</span>
              <Heart size={14} className="text-rose-400" />
              <span>para momentos especiais</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}