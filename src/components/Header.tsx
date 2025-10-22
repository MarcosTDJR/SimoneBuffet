import { Menu, Phone, MapPin, Clock, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { MenuItem } from "../Home"; // importa o tipo do Home

interface HeaderProps {
  carrinho: MenuItem[];
  removerDoCarrinho: (id: string) => void;
}

export function Header({ carrinho, removerDoCarrinho }: HeaderProps) {
  const [showCarrinho, setShowCarrinho] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const total = carrinho.reduce(
    (acc, item) => acc + parseFloat(item.price.replace("R$ ", "")),
    0
  );

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-rose-100 sticky top-0 z-50">
      {/* Top bar com informações de contato */}
      <div className="bg-gradient-to-r from-rose-400 to-rose-500 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center md:justify-between gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>(11) 96054-8369</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>Rua das Flores, 123 - São Paulo</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>Seg-Dom: 8h às 22h</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navegação principal */}
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xl font-bold">S</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-rose-600">Buffet Simone</h1>
            <p className="text-sm text-beige-700">Sabores únicos para momentos especiais</p>
          </div>
        </div>

        {/* Navegação desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          <button onClick={() => scrollToSection('inicio')} className="text-gray-700 hover:text-rose-600 transition-colors">Início</button>
          <button onClick={() => scrollToSection('cardapio')} className="text-gray-700 hover:text-rose-600 transition-colors">Cardápio</button>
          <button onClick={() => scrollToSection('sobre')} className="text-gray-700 hover:text-rose-600 transition-colors">Sobre</button>
          <button onClick={() => scrollToSection('contato')} className="text-gray-700 hover:text-rose-600 transition-colors">Contato</button>

          {/* Botão do carrinho */}
          {/* Botão do carrinho */}
<div className="relative">
  <Button
    onClick={() => setShowCarrinho(!showCarrinho)}
    className="bg-gradient-to-r from-rose-400 to-rose-600 cursor-pointer hover:from-rose-500 hover:to-rose-700 flex items-center gap-2 transition-all transform hover:scale-105"
  >
    <ShoppingCart className="w-5 h-5" />
    <span className="cursor-pointer">Carrinho ({carrinho.length})</span>
  </Button>
        
  {/* Dropdown do carrinho */}
  {showCarrinho && (
    <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-50 p-4 animate-fade-in">
      {carrinho.length === 0 ? (
        <p className="text-gray-600 text-sm">Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul className="space-y-2">
            {carrinho.map((item, idx) => (
              <li key={idx} className="flex justify-between items-center">
                <span>{item.nome}</span>
                <div className="flex items-center gap-2">
                  <span>R$ {item.preco}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-500"
                    onClick={() => removerDoCarrinho(item.id)}
                  >
                    X
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-2 font-semibold">Total: R$ {total}</p>
          <Button className="w-full mt-2 bg-rose-500 hover:bg-rose-600 text-white">
            Finalizar Pedido
          </Button>
        </>
      )}
    </div>
  )}
</div>

        </nav>

        {/* Menu mobile */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-6 mt-8">
              <button onClick={() => scrollToSection('inicio')} className="text-left text-lg text-gray-700 hover:text-rose-600 transition-colors">Início</button>
              <button onClick={() => scrollToSection('cardapio')} className="text-left text-lg text-gray-700 hover:text-rose-600 transition-colors">Cardápio</button>
              <button onClick={() => scrollToSection('sobre')} className="text-left text-lg text-gray-700 hover:text-rose-600 transition-colors">Sobre</button>
              <button onClick={() => scrollToSection('contato')} className="text-left text-lg text-gray-700 hover:text-rose-600 transition-colors">Contato</button>
              <Button className="bg-gradient-to-r from-rose-400 to-rose-600 hover:from-rose-500 hover:to-rose-700 w-full">Fazer Pedido</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
