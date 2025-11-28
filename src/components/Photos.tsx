import React, { useEffect, useState } from "react";
import {
  UtensilsCrossed, Cake, Cookie, Pizza, TruckIcon, PartyPopper, Image as ImageIcon
} from "lucide-react";

// --- CORREÇÃO 1: Caminho do import ajustado para "../" ---
import { db } from "../firebaseConfig"; 
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

// Definição dos tipos
export interface Photo {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  createdAt?: string; // Adicionado opcional para evitar erros
}

export interface Category {
  id?: string;
  label: string;
  iconLabel: string;
}

const ICON_OPTIONS = [
  { label: "UtensilsCrossed", icon: UtensilsCrossed },
  { label: "Cake", icon: Cake },
  { label: "Cookie", icon: Cookie },
  { label: "Pizza", icon: Pizza },
  { label: "TruckIcon", icon: TruckIcon },
  { label: "PartyPopper", icon: PartyPopper },
];

const getIconByLabel = (label: string) => {
  return ICON_OPTIONS.find((opt) => opt.label === label)?.icon || Cake;
};

interface CategoryChipProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function CategoryChip({ icon: Icon, label, active, onClick }: CategoryChipProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
        active
          ? "bg-gradient-to-r from-rose-500 to-rose-700 text-white shadow-lg shadow-pink-300/50"
          : "bg-pink-50 text-pink-600 hover:bg-pink-100"
      }`}
      type="button"
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
}

interface GalleryCardProps {
  image: string;
  title: string;
  category: string;
}

function GalleryCard({ image, title, category }: GalleryCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 
            className="text-white font-bold text-lg"
            style={{
              textShadow: "1px 1px 0 #ec4899, -1px -1px 0 #ec4899, 1px -1px 0 #ec4899, -1px 1px 0 #ec4899"
            }}
          >
            {title}
          </h3>
          <p 
            className="text-white text-sm font-medium"
            style={{
              textShadow: "1px 1px 0 #be185d, -1px -1px 0 #be185d, 1px -1px 0 #be185d, -1px 1px 0 #be185d"
            }}
          >
            {category}
          </p>
        </div>
      </div>
    </div>
  );
}

export function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    // 1. Ouvir Categorias
    const qCat = query(collection(db, "photo_categories"));
    const unsubCat = onSnapshot(qCat, (snapshot) => {
      const catsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Category[];
      setCategories(catsData);
    });

    // 2. Ouvir Fotos
    // --- CORREÇÃO 2: Removi o orderBy temporariamente para testar ---
    // Se funcionar, depois podemos colocar: query(collection(db, "photos"), orderBy("createdAt", "desc"));
    const qPhotos = query(collection(db, "photos"));
    
    const unsubPhotos = onSnapshot(qPhotos, (snapshot) => {
      const photosData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Photo[];
      
      console.log("Fotos carregadas:", photosData); // Debug no console
      setPhotos(photosData);
      setLoading(false);
    }, (error) => {
      console.error("ERRO FIREBASE:", error);
      // Mostra o erro na tela para sabermos o que é
      if (error.code === 'permission-denied') {
        setErrorMsg("Erro de Permissão: Verifique as Regras do Firestore.");
      } else {
        setErrorMsg(`Erro ao carregar: ${error.message}`);
      }
      setLoading(false);
    });

    return () => {
      unsubCat();
      unsubPhotos();
    };
  }, []);

  const mappedCategories = categories.map((cat) => ({
    ...cat,
    icon: getIconByLabel(cat.iconLabel),
  }));

  const allCategories = [
    {
      label: "Todas",
      id: "all",
      icon: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path d="M4 12h16M12 4v16" />
        </svg>
      ),
    },
    ...mappedCategories,
  ];

  const filteredPhotos = activeCategory === "Todas"
      ? photos
      : photos.filter((photo) => photo.category === activeCategory);

  if (loading) {
     return <div className="text-center py-20 animate-pulse text-gray-500">Carregando galeria...</div>;
  }

  if (errorMsg) {
    return (
      <div className="text-center py-20 text-red-500 bg-red-50 p-4 rounded-lg m-4">
        <h3 className="font-bold">Ops! Ocorreu um erro.</h3>
        <p>{errorMsg}</p>
      </div>
    );
  }

  return (
    <section id="Galeria" className="min-h-screen bg-white flex flex-col">
       <div className="max-w-7xl mx-auto w-full px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Galeria de Fotos
            </h1>
            <p className="text-gray-600 mt-2">Confira nossas categorias</p>
          </div>
          
          {/* Filtros */}
          <div className="mt-8 mb-12 flex gap-3 justify-center flex-wrap">
            {allCategories.map((category) => (
               <CategoryChip
                  key={category.id || category.label}
                  icon={category.icon}
                  label={category.label}
                  active={activeCategory === category.label}
                  onClick={() => setActiveCategory(category.label)}
                />
            ))}
          </div>

          {/* Grid */}
          {filteredPhotos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {filteredPhotos.map((photo) => (
                  <GalleryCard
                    key={photo.id}
                    image={photo.image}
                    title={photo.name}
                    category={photo.category}
                  />
               ))}
            </div>
          ) : (
            <div className="text-center py-16 flex flex-col items-center">
               <ImageIcon className="w-16 h-16 text-gray-200 mb-4" />
               <p className="text-gray-500">Nenhuma foto encontrada.</p>
            </div>
          )}
       </div>
    </section>
  );
}