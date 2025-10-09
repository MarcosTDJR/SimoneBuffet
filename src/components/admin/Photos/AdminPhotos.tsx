// src/pages/AdminPhoto.tsx
import React, { useState, useEffect } from "react";

export interface Photo {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string; // Base64
}

interface AdminPhotosProps {
  photos: Photo[];
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>;
}

export function AdminPhotos({ photos, setPhotos }: AdminPhotosProps) {
  const [newPhoto, setNewPhoto] = useState({
    name: "",
    description: "",
    category: "",
    file: null as File | null,
  });

  // Carregar fotos do localStorage (somente na primeira renderização)
  useEffect(() => {
    const saved = localStorage.getItem("photos");
    if (saved) setPhotos(JSON.parse(saved));
  }, []);

  // Salvar fotos sempre que mudar
  useEffect(() => {
    localStorage.setItem("photos", JSON.stringify(photos));
  }, [photos]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setNewPhoto({ ...newPhoto, file });
  };

  const handleAddPhoto = () => {
    if (!newPhoto.file || !newPhoto.name || !newPhoto.category) {
      alert("Preencha todos os campos e escolha uma imagem!");
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
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        📷 Gerenciar Fotos
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md mb-10 max-w-lg">
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
          onChange={(e) =>
            setNewPhoto({ ...newPhoto, description: e.target.value })
          }
          className="border w-full p-2 rounded mb-3"
        />
        <input
          type="text"
          placeholder="Categoria (Ex: Buffet, Ambiente...)"
          value={newPhoto.category}
          onChange={(e) =>
            setNewPhoto({ ...newPhoto, category: e.target.value })
          }
          className="border w-full p-2 rounded mb-3"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-3"
        />
        <button
          onClick={handleAddPhoto}
          className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700"
        >
          Adicionar Foto
        </button>
      </div>

      {/* Lista de fotos adicionadas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="bg-white rounded-xl shadow overflow-hidden"
          >
            <img
              src={photo.image}
              alt={photo.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">{photo.name}</h3>
              <p className="text-sm text-gray-600">{photo.description}</p>
              <span className="text-xs text-rose-600 font-medium">
                {photo.category}
              </span>
              <button
                onClick={() => handleDelete(photo.id)}
                className="mt-3 text-sm bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200"
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
