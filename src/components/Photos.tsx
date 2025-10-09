import React, { useEffect, useState } from "react";
import { UtensilsCrossed, Cake, Cookie, Pizza, TruckIcon, PartyPopper } from "lucide-react";

type Photo = {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
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
      className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300  ${
        active
          ? 'bg-gradient-to-r from-rose-500 to-rose-700 text-white shadow-lg shadow-pink-300/50'
          : 'bg-pink-50 text-pink-600 hover:bg-pink-100'
      }`}
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
  const [activeCategory, setActiveCategory] = useState("Todas");

  useEffect(() => {
    const saved = localStorage.getItem("photos");
    if (saved) setPhotos(JSON.parse(saved));
  }, []);

  const categories = [
    { icon: UtensilsCrossed, label: "Todas" },
    { icon: PartyPopper, label: "Eventos" },
    { icon: TruckIcon, label: "Entregas" },
    { icon: Cake, label: "Bolos" },
    { icon: Cookie, label: "Doces" },
    { icon: Pizza, label: "Salgados" },
  ];

  const filteredGallery =
    activeCategory === "Todas"
      ? photos
      : photos.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen ">
      <div className="bg-white/80 sticky top-0 z-50 ">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent text-4xl font-bold">
            🌸 Galeria de Fotos
          </h1>
          <p className="text-gray-600 mt-2">Confira nossas categorias</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Categories */}
        <div className="mb-12 mt-20 flex gap-3 justify-center flex-wrap">
          {categories.map((category) => (
            <CategoryChip
              key={category.label}
              icon={category.icon}
              label={category.label}
              active={activeCategory === category.label}
              onClick={() => setActiveCategory(category.label)}
            />
          ))}
        </div>

        {/* Gallery Grid */}
        {filteredGallery.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((photo) => (
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

      
    </div>
  );
}
