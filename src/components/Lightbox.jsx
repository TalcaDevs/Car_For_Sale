// src/components/Lightbox.jsx
import { useState } from 'react';

export default function Lightbox({ isOpen, onClose, images, startIndex = 0 }) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  
  // Si la galería está cerrada, no renderizar nada
  if (!isOpen) return null;
  
  // Funciones para navegar entre imágenes
  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  
  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-container" onClick={e => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose}>×</button>
        
        <img 
          src={images[currentIndex]} 
          alt={`Imagen ${currentIndex + 1}`} 
          className="lightbox-image"
        />
        
        <button className="lightbox-nav lightbox-prev" onClick={prevImage}>
          &#10094;
        </button>
        
        <button className="lightbox-nav lightbox-next" onClick={nextImage}>
          &#10095;
        </button>
        
        <div className="lightbox-counter">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}