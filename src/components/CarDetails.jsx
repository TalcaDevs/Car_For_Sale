// src/components/CarDetails.jsx
import { useEffect, useState } from 'react';
import Lightbox from './Lightbox';

export default function CarDetails({ carData }) {
  // Estado para controlar si las imágenes están cargadas
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Estados para el lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    // Asegurarse de que las imágenes estén cargadas
    let loadedCount = 0;
    const totalImages = carData.images.length;
    
    carData.images.forEach((src, index) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        // Incrementamos el contador incluso para imágenes fallidas
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.src = src;
    });
    
    // Limpieza
    return () => {
      // Cualquier limpieza necesaria
    };
  }, [carData]);

  // Función para manejar el filtrado de la galería
  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  // Función para determinar si un ítem debe mostrarse según el filtro activo
  const shouldShowItem = (category) => {
    return activeFilter === 'all' || category === activeFilter;
  };
  
  // Función para abrir el lightbox con un índice específico
  const openLightbox = (index) => {
    setStartIndex(index);
    setLightboxOpen(true);
    setGalleryImages(carData.images);
  };

  // Función para abrir la galería completa
  const openFullGallery = () => {
    setStartIndex(0);
    setLightboxOpen(true);
    
    // Generar las rutas para las 14 imágenes adicionales
    const additionalImages = [];
    for (let i = 1; i <= 14; i++) {
      additionalImages.push(`/img/${i}.JPEG`);
    }
    
    setGalleryImages(additionalImages);
  };

  // Función para cerrar el lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <>
      {/* Sección de Galería como sección principal */}
      <section className="car-gallery" id="gallery">
        <div className="gallery-container">
          <div className="gallery-heading">
            <h1 className="section-title main-title">
              {carData.brand} {carData.model} <span className="year-text">{carData.year}</span>
            </h1>
            <p className="section-subtitle">
              Descubre una experiencia de conducción excepcional con este sedan compacto, 
              elegante y económico. Un auto diseñado para quienes buscan estilo, 
              confort y rendimiento.
            </p>
          </div>
          
          <div className="gallery-grid">
            {carData.images.map((img, index) => {
              // Asignar categorías a las imágenes
              const category = index <= 1 ? "exterior" : "interior";
              const title = index === 0 ? "Vista Frontal" : 
                          index === 1 ? "Vista Lateral" : 
                          index === 2 ? "Interior" : "Tablero";
              
              return (
                <div 
                  key={index} 
                  className={`gallery-item ${category}`}
                  style={{ display: shouldShowItem(category) ? 'block' : 'none' }}
                  onClick={() => openLightbox(index)}
                >
                  <div className="gallery-img-wrapper">
                    <img 
                      src={img} 
                      alt={`${carData.brand} ${carData.model} ${title}`} 
                      className="gallery-img"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>
                  <div className="gallery-overlay">
                    <h3 className="gallery-title">{title}</h3>
                    <p className="gallery-caption">{carData.brand} {carData.model} {carData.year}</p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="gallery-action-buttons">
            <button 
              className="view-more-button" 
              onClick={openFullGallery}
            >
              <i className="fas fa-images"></i> Ver Galería Completa
            </button>
          </div>
        </div>
      </section>
      
      {/* Componente Lightbox */}
      <Lightbox 
        isOpen={lightboxOpen} 
        onClose={closeLightbox} 
        images={galleryImages}
        startIndex={startIndex}
      />

      {/* Sección de especificaciones */}
      <section className="car-details" id="specs">
        <div className="details-container">
          <h2 className="section-title" data-aos="fade-up">Especificaciones</h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
            Conoce en detalle las características técnicas de este increíble vehículo
          </p>
          
          <div className="specs-grid">
            <div className="spec-card" data-aos="fade-up" data-aos-delay="200">
              <i className="fas fa-car spec-icon"></i>
              <h3 className="spec-title">Marca y Modelo</h3>
              <p className="spec-value">{carData.brand} {carData.model}</p>
              <p className="spec-description">Sedan compacto de origen chino con diseño moderno y atractivo.</p>
            </div>
            
            <div className="spec-card" data-aos="fade-up" data-aos-delay="250">
              <i className="fas fa-calendar-alt spec-icon"></i>
              <h3 className="spec-title">Año</h3>
              <p className="spec-value">{carData.year}</p>
              <p className="spec-description">Vehículo en excelente estado con documentación al día.</p>
            </div>
            
            <div className="spec-card" data-aos="fade-up" data-aos-delay="300">
              <i className="fas fa-palette spec-icon"></i>
              <h3 className="spec-title">Color</h3>
              <p className="spec-value">{carData.color}</p>
              <p className="spec-description">Color elegante que combina estilo y practicidad.</p>
            </div>
            
            <div className="spec-card" data-aos="fade-up" data-aos-delay="350">
              <i className="fas fa-tachometer-alt spec-icon"></i>
              <h3 className="spec-title">Kilometraje</h3>
              <p className="spec-value">{carData.mileage.toLocaleString()} km</p>
              <p className="spec-description">Kilometraje óptimo para el año, todas las mantenciones al día.</p>
            </div>
            
            <div className="spec-card" data-aos="fade-up" data-aos-delay="400">
              <i className="fas fa-cogs spec-icon"></i>
              <h3 className="spec-title">Transmisión</h3>
              <p className="spec-value">{carData.transmission}</p>
              <p className="spec-description">Transmisión suave y precisa para una conducción cómoda.</p>
            </div>
            
            <div className="spec-card" data-aos="fade-up" data-aos-delay="450">
              <i className="fas fa-gas-pump spec-icon"></i>
              <h3 className="spec-title">Combustible</h3>
              <p className="spec-value">{carData.fuel}</p>
              <p className="spec-description">Excelente rendimiento de combustible en ciudad y carretera.</p>
            </div>
            
            <div className="spec-card" data-aos="fade-up" data-aos-delay="500">
              <i className="fas fa-oil-can spec-icon"></i>
              <h3 className="spec-title">Motor</h3>
              <p className="spec-value">{carData.engine}</p>
              <p className="spec-description">Motor confiable con excelente respuesta y bajo consumo.</p>
            </div>
            
            <div className="spec-card" data-aos="fade-up" data-aos-delay="550">
              <i className="fas fa-bolt spec-icon"></i>
              <h3 className="spec-title">Potencia</h3>
              <p className="spec-value">{carData.horsepower}</p>
              <p className="spec-description">Potencia adecuada para un manejo ágil en ciudad y viajes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de características */}
      <section className="features" id="features">
        <div className="features-container">
          <h2 className="section-title" data-aos="fade-up">Características</h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
            Este vehículo cuenta con numerosas funcionalidades para tu comodidad y seguridad
          </p>
          
          <div className="features-grid">
            {carData.features.map((feature, index) => (
              <div className="feature-item" key={index} data-aos="fade-up" data-aos-delay={150 + (index * 50)}>
                <i className="fas fa-check-circle feature-icon"></i>
                <p className="feature-text">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}