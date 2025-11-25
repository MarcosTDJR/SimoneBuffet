import { Menu, Phone, MapPin, Clock, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export function Header() {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-rose-100 sticky top-0 z-50">
      <div className="bg-gradient-to-r from-rose-400 to-rose-500 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center md:justify-between gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>(11) 96054-8369</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>Rua das Flores, 123 - Sao Paulo</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>Seg-Dom: 8h as 22h</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xl font-bold">S</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-rose-600">Buffet Simone</h1>
            <p className="text-sm text-beige-700">
              Sabores unicos para momentos especiais
            </p>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection("inicio")}
            className="text-gray-700 hover:text-rose-600 transition-colors"
          >
            Inicio
          </button>
          <button
            onClick={() => scrollToSection("cardapio")}
            className="text-gray-700 hover:text-rose-600 transition-colors"
          >
            Cardapio
          </button>
          <button
            onClick={() => scrollToSection("sobre")}
            className="text-gray-700 hover:text-rose-600 transition-colors"
          >
            Sobre
          </button>
          <button
            onClick={() => scrollToSection("contato")}
            className="text-gray-700 hover:text-rose-600 transition-colors"
          >
            Contato
          </button>
          <button
            onClick={() => scrollToSection("faq")}
            className="text-gray-700 hover:text-rose-600 transition-colors"
          >
            FAQ
          </button>

          <Button
            onClick={() => navigate("/admin")}
            className="bg-gradient-to-r from-rose-400 to-rose-600 cursor-pointer hover:from-rose-500 hover:to-rose-700 flex items-center gap-2 transition-all transform hover:scale-105"
          >
            <LogIn className="w-5 h-5" />
            <span>Login</span>
          </Button>
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-6 mt-8">
              <button
                onClick={() => scrollToSection("inicio")}
                className="text-left text-lg text-gray-700 hover:text-rose-600 transition-colors"
              >
                Inicio
              </button>
              <button
                onClick={() => scrollToSection("cardapio")}
                className="text-left text-lg text-gray-700 hover:text-rose-600 transition-colors"
              >
                Cardapio
              </button>
              <button
                onClick={() => scrollToSection("sobre")}
                className="text-left text-lg text-gray-700 hover:text-rose-600 transition-colors"
              >
                Sobre
              </button>
              <button
                onClick={() => scrollToSection("contato")}
                className="text-left text-lg text-gray-700 hover:text-rose-600 transition-colors"
              >
                Contato
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-left text-lg text-gray-700 hover:text-rose-600 transition-colors"
              >
                FAQ
              </button>
              <Button 
                onClick={() => navigate("/admin")}
                className="bg-gradient-to-r from-rose-400 to-rose-600 hover:from-rose-500 hover:to-rose-700 w-full flex items-center justify-center gap-2"
              >
                <LogIn className="w-5 h-5" />
                Login
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}