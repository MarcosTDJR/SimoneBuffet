import { useState } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { MenuSection } from "./components/MenuSection";
import { AboutSection } from "./components/AboutSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { PhotoGallery } from "./components/Photos";

// Definição do tipo MenuItem
export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  popular?: boolean;
};

export default function Home() {
  const [carrinho, setCarrinho] = useState<MenuItem[]>([]);

  const adicionarAoCarrinho = (item: MenuItem) => {
    setCarrinho(prev => [...prev, item]);
  };

  const removerDoCarrinho = (id: string) => {
    setCarrinho(prev => prev.filter(item => item.id !== id));
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
      </main>
      <Footer />
    </div>
  );
}
