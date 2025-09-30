import React, { useState } from "react";
import "./PhotoModules.css"; 

interface AdminPhotosProps {
  fotos: number;
  onFotosChange: (novoTotal: number) => void;
}

const AdminPhotos: React.FC<AdminPhotosProps> = ({
  fotos,
  onFotosChange,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleUploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      setUploading(true);
      setTimeout(() => {
        onFotosChange(fotos + 1);
        setUploading(false);
        alert("✅ Foto adicionada com sucesso!");
        setPreview(null); 
      }, 2000);
    }
  };

  const handleRemovePhoto = () => {
    if (fotos > 0) {
      onFotosChange(fotos - 1);
      alert(" Foto removida!");
    }
  };

  return (
    <div className="photos-container">
      <h2> Gerenciamento de Fotos</h2>

      <section className="photos-stats">
        <div className="stat-card">
          <h3>Total de Fotos</h3>
          <p className="stat-number">{fotos}</p>
        </div>
        <div className="stat-card">
          <h3>Categorias de Fotos</h3>
          <p className="stat-number">5</p>
          <small>Ambiente, Pratos, Eventos, Equipe, Decoração</small>
        </div>
        <div className="stat-card">
          <h3>Espaço Usado</h3>
          <p className="stat-number">{Math.round(fotos * 2.5)}MB</p>
          <small>Aproximadamente 2.5MB por foto</small>
        </div>
      </section>


      <section className="upload-section">
        <h3> Upload de Nova Foto</h3>
        <div className="upload-area">
          <input
            type="file"
            accept="image/*"
            onChange={handleUploadPhoto}
            className="file-input"
            id="photo-upload"
            disabled={uploading}
          />
          <label htmlFor="photo-upload" className={`upload-label ${uploading ? 'uploading' : ''}`}>
            {uploading ? (
              <> Fazendo upload...</>
            ) : (
              <> Clique ou arraste uma foto aqui</>
            )}
          </label>
        </div>

        {preview && (
          <div className="preview-section">
            <h4>Preview:</h4>
            <img src={preview} alt="Preview" className="preview-image" />
          </div>
        )}
      </section>

      <section className="gallery-section">
        <div className="gallery-header">
          <h3> Galeria de Fotos</h3>
          <button 
            onClick={handleRemovePhoto} 
            className="remove-btn"
            disabled={fotos === 0}
          >
            🗑️ Remover Última Foto
          </button>
        </div>

        {fotos === 0 ? (
          <div className="empty-gallery">
            <p> Nenhuma foto adicionada ainda</p>
            <small>Use o upload acima para adicionar a primeira foto</small>
          </div>
        ) : (
          <div className="gallery-grid">
            {Array.from({ length: Math.min(fotos, 12) }).map((_, index) => (
              <div key={index} className="photo-item">
                <div className="photo-placeholder">
                  <span>🖼️</span>
                  <small>Foto {index + 1}</small>
                </div>
                <div className="photo-actions">
                  <button className="edit-btn">✏️</button>
                  <button className="delete-btn">🗑️</button>
                </div>
              </div>
            ))}
            {fotos > 12 && (
              <div className="more-photos">
                <span>+{fotos - 12} fotos</span>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminPhotos;