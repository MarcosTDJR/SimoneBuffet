import React, { useEffect, useState } from "react";
import { Category, Photo } from "./admin/Photos/AdminPhotos";
import {
  UtensilsCrossed,
  Cake,
  Cookie,
  Pizza,
  TruckIcon,
  PartyPopper,
} from "lucide-react";

// Lista de ícones disponíveis
const ICON_OPTIONS = [
  { label: "UtensilsCrossed", icon: UtensilsCrossed },
  { label: "Cake", icon: Cake },
  { label: "Cookie", icon: Cookie },
  { label: "Pizza", icon: Pizza },
  { label: "TruckIcon", icon: TruckIcon },
  { label: "PartyPopper", icon: PartyPopper },
];

// Função utilitária para encontrar o ícone pelo label
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
          <h3 className="text-white">{title}</h3>
          <p className="text-pink-200 text-sm">{category}</p>
        </div>
      </div>
    </div>
  );
}

export function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState("Todas");

  useEffect(() => {
    const savedPhotos = localStorage.getItem("photos");
    if (savedPhotos) setPhotos(JSON.parse(savedPhotos));

    const savedCategories = localStorage.getItem("categories");
    if (savedCategories) setCategories(JSON.parse(savedCategories));
  }, []);

  // Mapeia as categorias para incluir o componente de ícone
  const mappedCategories = categories.map((cat) => ({
    ...cat,
    icon: getIconByLabel(cat.iconLabel),
  }));

  // Montar a lista de categorias para filtro incluindo "Todas"
  const allCategories = [
    {
      label: "Todas",
      icon: () => (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M4 12h16M12 4v16" />
        </svg>
      ),
    },
    ...mappedCategories,
  ];

  const filteredPhotos =
    activeCategory === "Todas"
      ? photos
      : photos.filter((photo) => photo.category === activeCategory);

  return (
    <section id="Galeria" className="min-h-screen bg-white flex flex-col">
      <div className="max-w-7xl mx-auto w-full px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Galeria de Fotos
          </h1>
          <p className="text-gray-600 mt-2">Confira nossas categorias</p>
        </div>

        <div className="mt-8 mb-12 flex gap-3 justify-center flex-wrap">
          {allCategories.map((category) => (
            <CategoryChip
              key={category.label}
              icon={category.icon}
              label={category.label}
              active={activeCategory === category.label}
              onClick={() => setActiveCategory(category.label)}
            />
          ))}
        </div>

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
          <div className="text-center py-16">
            <p className="text-gray-500">Nenhum item encontrado</p>
          </div>
        )}
      </div>
    </section>
  );
}
