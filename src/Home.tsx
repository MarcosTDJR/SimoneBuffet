import { useState } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { MenuSection } from "./components/MenuSection";
import { AboutSection } from "./components/AboutSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { FaqSection } from "./components/FaqSection";
import { PhotoGallery } from "./components/Photos";

export type MenuItem = {
  preco: ReactNode;
  nome: ReactNode;
  id: string;
  name: string;
  description: string;
  price: string;
  popular?: boolean;
};

export default function Home() {
  const [carrinho, setCarrinho] = useState<MenuItem[]>([]);

  const adicionarAoCarrinho = (item: MenuItem) => {
    const novoItem = {
      ...item,
      id: `${item.id}-${Date.now()}-${Math.random()}`,
    };
    setCarrinho((prev) => [...prev, novoItem]);
  };

  const removerDoCarrinho = (id: string) => {
    setCarrinho((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header carrinho={carrinho} removerDoCarrinho={removerDoCarrinho} />
      <main>
        <HeroSection />
        <MenuSection adicionarAoCarrinho={adicionarAoCarrinho} />
        <AboutSection />
        <ContactSection />
        <PhotoGallery />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
