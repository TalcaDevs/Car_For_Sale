// src/App.jsx
import { useEffect } from 'react'
import './styles/index.css' // Cambiado de './App.css' a './styles/index.css'
import Header from './components/Header'
import CarDetails from './components/CarDetails'
import PriceSection from './components/PriceSection'
import ContactButtons from './components/ContactButtons'
import Footer from './components/Footer'
import FloatingContact from './components/FloatingContact'

function App() {
  // Datos del auto Great Wall C30 2019
  const carData = {
    brand: 'Great Wall',
    model: 'C30+',
    year: 2019,
    color: 'Blanco',
    mileage: 75000,
    transmission: 'Manual',
    fuel: 'Gasolina',
    engine: '1.5L',
    horsepower: '105 HP',
    features: [
      'Aire acondicionado',
      'Ventanas eléctricas',
      'Cierre centralizado',
      'Dirección asistida',
      'Frenos ABS',
      'Airbags frontales',
      'Sistema de audio con USB/MP3',
      'Llantas de aleación',
      'Espejos eléctricos',
      'Asientos tapizados en tela de alta calidad',
      'Computadora de viaje',
      'Control de estabilidad'
    ],
    images: [
      '/img/greatwall-front.jpg',
      '/img/greatwall-side.jpg',
      '/img/greatwall-interior.jpg',
      '/img/greatwall-dashboard.jpg'
    ],
    price: 5700000,
    currency: 'CLP',
    contact: {
      phone: '+56940453861',
      whatsapp: '+56940453861',
      email: 'tuemail@ejemplo.com'
    }
  };

  useEffect(() => {
    // Inicializar AOS si está disponible
    if (window.AOS) {
      window.AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: false
      });
    }
    
    // Inicializar animaciones al cargar la página
    window.scrollTo(0, 0);
    
    // Crear partículas de fondo si gsap está disponible
    if (window.gsap) {
      createParticles();
    }
    
    // Smooth scrolling para navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  // Función para crear partículas animadas en el fondo
  const createParticles = () => {
    const gsap = window.gsap;
    const container = document.querySelector('.app-container');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'animated-bg';
    container.appendChild(particlesContainer);
    
    // Crear 50 partículas
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Tamaño aleatorio
      const size = Math.random() * 5 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Posición inicial aleatoria
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      particlesContainer.appendChild(particle);
      
      // Animar la partícula
      gsap.to(particle, {
        x: `random(-100, 100)`,
        y: `random(-100, 100)`,
        opacity: Math.random() * 0.5 + 0.1,
        duration: Math.random() * 20 + 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
  };

  return (
    <div className="app-container">
      <Header brand={carData.brand} model={carData.model} year={carData.year} />
      <CarDetails carData={carData} />
      <PriceSection price={carData.price} currency={carData.currency} />
      <ContactButtons contact={carData.contact} />
      <Footer brand={carData.brand} model={carData.model} />
      <FloatingContact contact={carData.contact} />
    </div>
  );
}

export default App;
