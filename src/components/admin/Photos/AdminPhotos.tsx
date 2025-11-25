import React, { useState, useEffect } from "react";
import "./PhotoModules.css";
import { Edit2, Trash2, Plus, X, Image, FolderPlus } from "lucide-react";
import {
  UtensilsCrossed,
  Cake,
  Cookie,
  Pizza,
  TruckIcon,
  PartyPopper,
} from "lucide-react";
import { useActivity } from "../context/ActivityContext";

export interface Photo {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
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
  const { addActivity } = useActivity();

  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const [newPhoto, setNewPhoto] = useState<{
    name: string;
    description: string;
    category: string;
    file: File | null;
    preview: string | null;
  }>({
    name: "",
    description: "",
    category: "",
    file: null,
    preview: null,
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
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPhoto({ ...newPhoto, file, preview: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPhoto = () => {
    if (!newPhoto.file || !newPhoto.name || !newPhoto.category) {
      alert("Preencha todos os campos e selecione uma imagem e categoria!");
      return;
    }

    const newItem: Photo = {
      id: Date.now().toString(),
      name: newPhoto.name,
      description: newPhoto.description,
      category: newPhoto.category,
      image: newPhoto.preview!,
    };

    setPhotos((prev) => [...prev, newItem]);
    addActivity(`Nova foto adicionada: "${newPhoto.name}".`);
    setNewPhoto({ name: "", description: "", category: "", file: null, preview: null });
    setShowAddPhotoModal(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm("Tem certeza que deseja excluir esta foto?")) {
      setPhotos((prev) => prev.filter((photo) => photo.id !== id));
      addActivity(`Foto "${name}" foi excluida.`);
    }
  };

  const handleAddCategory = () => {
    const label = newCategoryLabel.trim();
    if (!label) {
      alert("Digite o nome da categoria.");
      return;
    }
    if (!selectedIconLabel) {
      alert("Selecione um icone para a categoria.");
      return;
    }
    if (categories.find((c) => c.label.toLowerCase() === label.toLowerCase())) {
      alert("Categoria ja existe.");
      return;
    }

    setCategories((prev) => [...prev, { label, iconLabel: selectedIconLabel }]);
    addActivity(`Nova categoria de fotos adicionada: "${label}".`);
    setNewCategoryLabel("");
    setSelectedIconLabel(null);
  };

  const handleDeleteCategory = (label: string) => {
    if (confirm(`Tem certeza que deseja excluir a categoria "${label}"?`)) {
      setCategories((prev) => prev.filter((c) => c.label !== label));
      addActivity(`Categoria de fotos "${label}" foi excluida.`);
    }
  };

  const filteredPhotos = selectedCategory === "all" 
    ? photos 
    : photos.filter(p => p.category === selectedCategory);

  return (
    <div className="navbar">
      <div className="dashboard-content">
        
        <div className="welcome-card">
          <div className="photo-header-wrapper">
            <div>
              <h2>Gerenciar Fotos</h2>
              <p>Adicione, edite ou remova fotos da sua galeria.</p>
            </div>
            <div className="header-actions-buttons">
              <button className="action-btn-white" onClick={() => setShowCategoryModal(true)}>
                <FolderPlus size={18} /> Gerenciar Categorias
              </button>
              <button className="action-btn-white" onClick={() => setShowAddPhotoModal(true)}>
                <Plus size={18} /> Nova Foto
              </button>
            </div>
          </div>
        </div>

        <div className="photo-filter-section">
          <span className="filter-label">Filtrar por categoria:</span>
          <div className="photo-filter-chips">
            <button 
              className={`filter-chip ${selectedCategory === "all" ? "filter-chip--active" : ""}`}
              onClick={() => setSelectedCategory("all")}
            >
              Todas
            </button>
            {categories.map((cat) => {
              const IconComponent = getIconByLabel(cat.iconLabel);
              return (
                <button
                  key={cat.label}
                  className={`filter-chip ${selectedCategory === cat.label ? "filter-chip--active" : ""}`}
                  onClick={() => setSelectedCategory(cat.label)}
                >
                  <IconComponent size={16} />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="photo-gallery-section">
          <div className="section-header-bar">
            <Image size={20} />
            Galeria de Fotos
          </div>
          
          <div className="photo-gallery-content">
            {filteredPhotos.length === 0 ? (
              <div className="empty-gallery">
                <Image size={48} strokeWidth={1} />
                <p>Nenhuma foto encontrada.</p>
              </div>
            ) : (
              <div className="photo-gallery-grid">
                {filteredPhotos.map((photo) => (
                  <div key={photo.id} className="photo-card">
                    <div className="photo-card-image">
                      <img src={photo.image} alt={photo.name} />
                      <span className="photo-card-badge">{photo.category}</span>
                    </div>
                    <div className="photo-card-content">
                      <h3 className="photo-card-title">{photo.name}</h3>
                      <p className="photo-card-description">{photo.description}</p>
                      <div className="photo-card-actions">
                        <button 
                          className="btn-icon-delete"
                          onClick={() => handleDelete(photo.id, photo.name)}
                        >
                          <Trash2 size={16} /> Excluir
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      {showAddPhotoModal && (
        <div className="modal-overlay-custom">
          <div className="modal-box">
            <div className="modal-top">
              <h3>Adicionar Nova Foto</h3>
              <button className="close-modal" onClick={() => setShowAddPhotoModal(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-form">
              <label>Nome da Foto</label>
              <input
                type="text"
                placeholder="Ex: Decoracao de Mesa"
                value={newPhoto.name}
                onChange={(e) => setNewPhoto({ ...newPhoto, name: e.target.value })}
              />

              <label>Descricao</label>
              <textarea
                placeholder="Descreva a foto..."
                value={newPhoto.description}
                onChange={(e) => setNewPhoto({ ...newPhoto, description: e.target.value })}
              />

              <label>Categoria</label>
              <select
                value={newPhoto.category}
                onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })}
              >
                <option value="">Selecione...</option>
                {categories.map((c) => (
                  <option key={c.label} value={c.label}>{c.label}</option>
                ))}
              </select>

              <label>Imagem</label>
              <div className="photo-upload-area">
                {newPhoto.preview ? (
                  <div className="photo-preview">
                    <img src={newPhoto.preview} alt="Preview" />
                    <button 
                      type="button" 
                      className="remove-preview"
                      onClick={() => setNewPhoto({ ...newPhoto, file: null, preview: null })}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <label className="upload-placeholder">
                    <Image size={32} strokeWidth={1} />
                    <span>Clique para selecionar uma imagem</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                  </label>
                )}
              </div>

              <div className="modal-btns">
                <button type="button" className="btn-c" onClick={() => setShowAddPhotoModal(false)}>
                  Cancelar
                </button>
                <button type="button" className="btn-s" onClick={handleAddPhoto}>
                  Salvar Foto
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCategoryModal && (
        <div className="modal-overlay-custom">
          <div className="modal-box modal-large">
            <div className="modal-top">
              <h3>Gerenciar Categorias de Fotos</h3>
              <button className="close-modal" onClick={() => setShowCategoryModal(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-form">
              <label>Selecione um Icone</label>
              <div className="icon-picker-grid">
                {ICON_OPTIONS.map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setSelectedIconLabel(label)}
                    className={`icon-picker-btn ${selectedIconLabel === label ? "icon-picker-btn--selected" : ""}`}
                    title={label}
                  >
                    <Icon size={24} />
                  </button>
                ))}
              </div>

              <label>Nome da Categoria</label>
              <input
                type="text"
                placeholder="Ex: Decoracao"
                value={newCategoryLabel}
                onChange={(e) => setNewCategoryLabel(e.target.value)}
              />

              <div className="modal-btns">
                <button type="button" className="btn-s" onClick={handleAddCategory}>
                  Adicionar Categoria
                </button>
              </div>
            </div>

            <div className="category-list-section">
              <h4>Categorias Existentes</h4>
              {categories.length === 0 ? (
                <p className="empty-cat">Nenhuma categoria cadastrada.</p>
              ) : (
                <div className="category-list">
                  {categories.map((cat) => {
                    const IconComponent = getIconByLabel(cat.iconLabel);
                    return (
                      <div key={cat.label} className="category-list-item">
                        <div className="category-list-info">
                          <IconComponent size={20} className="category-icon" />
                          <span className="category-list-name">{cat.label}</span>
                        </div>
                        <div className="category-list-actions">
                          <button 
                            className="btn-icon-delete"
                            onClick={() => handleDeleteCategory(cat.label)}
                          >
                            <Trash2 size={16} /> Excluir
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}