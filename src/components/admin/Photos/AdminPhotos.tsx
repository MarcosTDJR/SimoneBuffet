import React, { useState, useEffect } from "react";
import {
  UtensilsCrossed,
  Cake,
  Cookie,
  Pizza,
  TruckIcon,
  PartyPopper,
} from "lucide-react";

// Tipagens
export interface Photo {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string; // Base64
}

export interface Category {
  label: string;
  iconLabel: string; // salva o nome do ícone em string
}

// Lista de ícones disponíveis
const ICON_OPTIONS = [
  { label: "UtensilsCrossed", icon: UtensilsCrossed },
  { label: "Cake", icon: Cake },
  { label: "Cookie", icon: Cookie },
  { label: "Pizza", icon: Pizza },
  { label: "TruckIcon", icon: TruckIcon },
  { label: "PartyPopper", icon: PartyPopper },
];

// Utilitário para obter ícone pelo label
const getIconByLabel = (label: string) => {
  const found = ICON_OPTIONS.find((opt) => opt.label === label);
  return found ? found.icon : Cake; // padrão: Cake
};

// Componentes de UI
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
      className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-300 ${active
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

interface AdminPhotosProps {
  photos: Photo[];
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

export function AdminPhotos({
  photos,
  setPhotos,
  categories,
  setCategories,
}: AdminPhotosProps) {
  const [newPhoto, setNewPhoto] = useState<{
    name: string;
    description: string;
    category: string;
    file: File | null;
  }>({
    name: "",
    description: "",
    category: "",
    file: null,
  });

  const [newCategoryLabel, setNewCategoryLabel] = useState("");
  const [selectedIconLabel, setSelectedIconLabel] = useState<string | null>(null);

  // Carregar dados salvos
  useEffect(() => {
    const savedPhotos = localStorage.getItem("photos");
    if (savedPhotos) setPhotos(JSON.parse(savedPhotos));

    const savedCategories = localStorage.getItem("categories");
    if (savedCategories) setCategories(JSON.parse(savedCategories));
  }, []);

  // Salvar mudanças
  useEffect(() => {
    localStorage.setItem("photos", JSON.stringify(photos));
  }, [photos]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setNewPhoto({ ...newPhoto, file });
  };

  const handleAddPhoto = () => {
    if (!newPhoto.file || !newPhoto.name || !newPhoto.category) {
      alert("Preencha todos os campos e selecione uma imagem e categoria!");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      const newItem: Photo = {
        id: Date.now().toString(),
        name: newPhoto.name,
        description: newPhoto.description,
        category: newPhoto.category,
        image: base64,
      };
      setPhotos((prev) => [...prev, newItem]);
      setNewPhoto({ name: "", description: "", category: "", file: null });
    };
    reader.readAsDataURL(newPhoto.file);
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta foto?")) {
      setPhotos((prev) => prev.filter((photo) => photo.id !== id));
    }
  };

  const handleAddCategory = () => {
    const label = newCategoryLabel.trim();
    if (!label) {
      alert("Digite o nome da categoria.");
      return;
    }
    if (!selectedIconLabel) {
      alert("Selecione um ícone para a categoria.");
      return;
    }
    if (categories.find((c) => c.label.toLowerCase() === label.toLowerCase())) {
      alert("Categoria já existe.");
      return;
    }

    setCategories((prev) => [...prev, { label, iconLabel: selectedIconLabel }]);
    setNewCategoryLabel("");
    setSelectedIconLabel(null);

    // ✅ Seleciona automaticamente a nova categoria
    setNewPhoto((prev) => ({ ...prev, category: label }));
  };


  return (
    <div className="p-8 bg-gray-50 min-h-screen max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📷 Gerenciar Fotos</h1>

      {/* Seção de Categorias */}
      <div className="mb-6">
        <h2 className="font-semibold mb-2 text-gray-700">Categorias</h2>
        <div className="flex gap-2 flex-wrap mb-3">
          {categories.map((cat) => (
            <CategoryChip
              key={cat.label}
              icon={getIconByLabel(cat.iconLabel)}
              label={cat.label}
              active={newPhoto.category === cat.label}
              onClick={() => setNewPhoto({ ...newPhoto, category: cat.label })}
            />
          ))}
        </div>

        {/* Escolher ícone */}
        <div className="mb-3 flex gap-3 flex-wrap">
          {ICON_OPTIONS.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setSelectedIconLabel(label)}
              className={`p-2 rounded border ${selectedIconLabel === label
                  ? "border-rose-600 bg-rose-100"
                  : "border-gray-300"
                }`}
              type="button"
              title={label}
            >
              <Icon className="w-6 h-6 text-rose-600" />
            </button>
          ))}
        </div>

        {/* Campo novo nome da categoria */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Nome da nova categoria"
            value={newCategoryLabel}
            onChange={(e) => setNewCategoryLabel(e.target.value)}
            className="border p-2 rounded flex-grow"
          />
          <button
            onClick={handleAddCategory}
            className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700"
            type="button"
          >
            Adicionar Categoria
          </button>
        </div>
      </div>

      {/* Formulário adicionar nova foto */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-10">
        <input
          type="text"
          placeholder="Nome da foto"
          value={newPhoto.name}
          onChange={(e) => setNewPhoto({ ...newPhoto, name: e.target.value })}
          className="border w-full p-2 rounded mb-3"
        />
        <textarea
          placeholder="Descrição"
          value={newPhoto.description}
          onChange={(e) => setNewPhoto({ ...newPhoto, description: e.target.value })}
          className="border w-full p-2 rounded mb-3"
        />
        <p className="mb-2 text-gray-600">
          Categoria selecionada:{" "}
          <strong>{newPhoto.category || "Nenhuma selecionada"}</strong>
        </p>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-3"
        />
        <button
          onClick={handleAddPhoto}
          className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700"
          type="button"
        >
          Adicionar Foto
        </button>
      </div>

      {/* Galeria de fotos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <div key={photo.id} className="bg-white rounded-xl shadow overflow-hidden">
            <img src={photo.image} alt={photo.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">{photo.name}</h3>
              <p className="text-sm text-gray-600">{photo.description}</p>
              <span className="text-xs text-rose-600 font-medium">{photo.category}</span>
              <button
                onClick={() => handleDelete(photo.id)}
                className="mt-3 text-sm bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200"
                type="button"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
