/**
 * VERSÃO ALTERNATIVA - BASE64 (SEM FIREBASE STORAGE)
 * * Como o Firebase Storage está pedindo cartão de crédito, usamos esta versão
 * que converte a imagem para texto (Base64) e comprime para caber no Firestore.
 */

export const uploadImageToStorage = async (file: File, folder: string = "photos"): Promise<string> => {
  return new Promise((resolve, reject) => {
    // 1. Ler o arquivo
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (event) => {
      // 2. Criar um elemento de imagem para manipular
      const img = new Image();
      img.src = event.target?.result as string;
      
      img.onload = () => {
        // 3. Configurar um Canvas para redimensionar (Compressão)
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Define um tamanho máximo seguro (ex: 800px) para não estourar o banco
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        // Lógica de redimensionamento mantendo proporção
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Desenha a imagem redimensionada no canvas
        ctx?.drawImage(img, 0, 0, width, height);
        
        // 4. Converte para texto (Base64) com qualidade JPEG 0.7 (70%)
        // Isso garante que a string final seja leve
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        
        console.log("Imagem convertida e comprimida com sucesso.");
        resolve(dataUrl);
      };
      
      img.onerror = (err) => reject(new Error("Erro ao processar imagem"));
    };
    
    reader.onerror = (error) => reject(error);
  });
};