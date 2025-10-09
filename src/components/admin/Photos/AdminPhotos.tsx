import React, { useState, useEffect } from "react";
import './PhotoModules.css'
import {
  UtensilsCrossed,
  Cake,
  Cookie,
  Pizza,
  TruckIcon,
  PartyPopper,
} from "lucide-react";

export interface Photo {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string; // Base64
}

export interface Category {
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
  const found = ICON_OPTIONS.find((opt) => opt.label === label);
  return found ? found.icon : Cake;
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
      className={`photo-category-chip ${active ? "photo-category-chip--active" : ""}`}
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

  useEffect(() => {
    const savedPhotos = localStorage.getItem("photos");
    if (savedPhotos) setPhotos(JSON.parse(savedPhotos));

    const savedCategories = localStorage.getItem("categories");
    if (savedCategories) setCategories(JSON.parse(savedCategories));
  }, []);

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
    setNewPhoto((prev) => ({ ...prev, category: label }));
  };

  return (
    <div className="photo-admin-container">
      <h1 className="photo-admin-title">Gerenciar Fotos</h1>

      <section className="photo-category-section">

        <div className="photo-category-select">
        <h2 className="photo-category-title"> Adicionar nova categoria</h2>
        <div className="photo-icon-picker" style={{ marginTop: 16 }}>
          
          {ICON_OPTIONS.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setSelectedIconLabel(label)}
              className={`photo-icon-button ${selectedIconLabel === label ? "photo-icon-button--selected" : ""}`}
              type="button"
              title={label}
            >
              <Icon className="w-6 h-6 text-rose-600" />
            </button>
          ))}
        </div>
        

        <div className="photo-category-form">
          <input
            type="text"
            placeholder="Nome da nova categoria"
            value={newCategoryLabel}
            onChange={(e) => setNewCategoryLabel(e.target.value)}
            className="photo-category-input"
          />
          <button
            onClick={handleAddCategory}
            className="photo-category-add-btn"
            type="button"
          >
            Adicionar Categoria
          </button>
          </div>
        </div>

        <div className="photo-category-creator">
        <h2 className="photo-category-title">Categorias</h2>
        <div className="photo-select-icon">
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
        </div>
      </section>

      <section className="photo-upload-form">
        <h2 className="photo-category-title"> Adicionar fotos</h2>
        <input
          type="text"
          placeholder="Nome da foto"
          value={newPhoto.name}
          onChange={(e) => setNewPhoto({ ...newPhoto, name: e.target.value })}
          className="photo-upload-input"
        />
        <textarea
          placeholder="Descrição"
          value={newPhoto.description}
          onChange={(e) => setNewPhoto({ ...newPhoto, description: e.target.value })}
          className="photo-upload-textarea"
        />
        <p className="photo-upload-label">
          Categoria selecionada:{" "}
          <strong className="photo-upload-selected">{newPhoto.category || "Nenhuma selecionada"}</strong>
        </p>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-3"
        />
        <button
          onClick={handleAddPhoto}
          className="photo-upload-btn"
          type="button"
        >
          Adicionar Foto
        </button>
      </section>

      <section className="photo-gallery-grid">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-card">
            <img src={photo.image} alt={photo.name} />
            <div className="photo-card-content">
              <h3 className="photo-card-title">{photo.name}</h3>
              <p className="photo-card-description">{photo.description}</p>
              <span className="photo-card-category">{photo.category}</span>
              <button
                onClick={() => handleDelete(photo.id)}
                className="photo-card-delete"
                type="button"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
