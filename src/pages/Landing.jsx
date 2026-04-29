import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, Droplets, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

const Landing = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const services = [
    { 
      id: 'wash',
      image: '/lavado.png',
      icon: <Droplets />, 
      title: 'Lavado Ultra Premium', 
      desc: 'No es solo agua y jabón. Utilizamos un sistema de tres cubetas, pre-lavado con espuma activa y descontaminado químico para asegurar que ni una sola partícula ralle tu pintura.',
      details: ['Tratamiento de llantas y rines', 'Secado con aire comprimido', 'Encerrado de cortesía'],
      price: '$25'
    },
    { 
      id: 'ceramic',
      image: '/ceramic.png',
      icon: <Shield />, 
      title: 'Protección Cerámica', 
      desc: 'La armadura definitiva para tu vehículo. Crea una capa de cristal líquido que protege contra rayos UV, lluvia ácida y rayones ligeros hasta por 3 años.',
      details: ['Dureza 9H certificada', 'Efecto ultra-hidrofóbico', 'Garantía por escrito'],
      price: '$199'
    },
    { 
      id: 'motor',
      image: '/motor.png',
      icon: <Zap />, 
      title: 'Detallado de Motor', 
      desc: 'Limpieza profunda del corazón de tu auto. Eliminamos grasa y suciedad acumulada usando vapor seco, protegiendo todos los componentes electrónicos.',
      details: ['Hidratación de plásticos', 'Protección anticorrosiva', 'Acabado de fábrica'],
      price: '$55'
    },
    { 
      id: 'polish',
      image: '/pulido.png',
      icon: <Clock />, 
      title: 'Corrección de Pintura', 
      desc: 'Restauramos el brillo espejo eliminando el 90% de los defectos. Usamos pulidoras orbitales y compuestos de corte fino para un acabado perfecto sin hologramas.',
      details: ['Eliminación de "swirls"', 'Nivelación de barniz', 'Sellado acrílico'],
      price: '$85'
    }
  ];

  return (
    <div className="landing-page">
      {/* Premium Hero */}
      <section className="hero">
        <div className="hero-visual">
          <div className="hero-image-container">
            <img src="/hero.png" alt="Los Pits Garage" />
            <div className="hero-gradient-overlay"></div>
          </div>
        </div>
        
        <div className="container hero-layout">
          <div className="hero-text-side reveal">
            <span className="badge-red">Estética Automotriz de Élite</span>
            <h1>EL ARTE DEL <span className="text-red">DETALLADO</span></h1>
            <p>En Los Pits, no lavamos autos, restauramos la pasión por conducir. Experimenta el nivel de detalle que solo los verdaderos expertos pueden ofrecer.</p>
            <div className="hero-action-group">
              <Link to="/login" className="btn-primary">
                Agendar Mi Cita <ArrowRight size={20} />
              </Link>
              <div className="hero-stats-mini">
                <div><strong>5.0</strong> <span className="text-red">★★★★★</span></div>
                <p>Basado en 500+ reseñas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Redesigned */}
      <section id="servicios" className="services-section">
        <div className="container">
          <div className="section-title-group reveal">
            <span className="badge-red">Nuestros Servicios</span>
            <h2>Tratamientos de <span className="text-red">Lujo</span></h2>
          </div>
          
          <div className="floating-cards-grid">
            {services.map((s, i) => (
              <div key={s.id} className="floating-card reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="card-image-wrap">
                  <img src={s.image} alt={s.title} />
                  <div className="card-icon-overlay">{s.icon}</div>
                </div>
                <div className="card-body">
                  <div className="card-header">
                    <h3>{s.title}</h3>
                    <span className="card-price">{s.price}</span>
                  </div>
                  <p className="card-desc">{s.desc}</p>
                  <ul className="card-features">
                    {s.details.map((d, idx) => (
                      <li key={idx}><CheckCircle2 size={16} className="text-red" /> {d}</li>
                    ))}
                  </ul>
                  <Link to="/login" className="card-cta">
                    Reservar Servicio <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="why-us">
        <div className="container why-grid">
          <div className="why-content reveal">
            <span className="badge-red">¿Por qué elegirnos?</span>
            <h2>Compromiso con la <span className="text-red">Perfección</span></h2>
            <p>Utilizamos solo las mejores marcas del mercado como Chemical Guys, Meguiar's y Gyeon para garantizar que tu inversión esté siempre protegida.</p>
            
            <div className="why-features">
              <div className="why-item">
                <div className="why-dot"></div>
                <div>
                  <h4>Tecnología de Punta</h4>
                  <p>Lavado al vapor y herramientas neumáticas para mayor eficiencia.</p>
                </div>
              </div>
              <div className="why-item">
                <div className="why-dot"></div>
                <div>
                  <h4>Seguro de Responsabilidad</h4>
                  <p>Tu vehículo está asegurado mientras permanece en nuestras manos.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="why-image-wrap reveal">
            <div className="experience-badge">
              <span>+10</span>
              <p>Años Exp.</p>
            </div>
            <img src="/hero.png" alt="Workshop" className="side-img" />
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .text-red { color: var(--primary); }
        
        /* New Hero */
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 80px;
          background: #000;
          overflow: hidden;
        }
        .hero-visual {
          position: absolute;
          top: 0;
          right: 0;
          width: 55%;
          height: 100%;
          clip-path: polygon(20% 0, 100% 0, 100% 100%, 0% 100%);
        }
        .hero-image-container {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .hero-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.7) contrast(1.1);
        }
        .hero-gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, #000 0%, transparent 40%),
                      linear-gradient(to top, #000 0%, transparent 20%);
        }
        .hero-layout { position: relative; z-index: 10; }
        .hero-text-side { max-width: 650px; }
        .hero-text-side h1 { font-size: clamp(3rem, 10vw, 6rem); line-height: 0.9; margin: 30px 0; }
        .hero-text-side p { font-size: 1.3rem; max-width: 500px; margin-bottom: 40px; }
        .hero-action-group { display: flex; align-items: center; gap: 40px; flex-wrap: wrap; }
        .hero-stats-mini strong { font-size: 1.5rem; display: block; }
        
        /* Floating Cards Section */
        .services-section { padding: 150px 0; background: #080808; position: relative; }
        .floating-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 40px;
        }
        .floating-card {
          background: var(--surface);
          border-radius: 32px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid var(--border);
          display: flex;
          flex-direction: column;
        }
        .floating-card:hover {
          transform: translateY(-20px);
          border-color: var(--primary);
          box-shadow: 0 30px 60px rgba(0,0,0,0.8), 0 0 20px rgba(230,0,0,0.1);
        }
        .card-image-wrap {
          height: 240px;
          position: relative;
          overflow: hidden;
        }
        .card-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s ease;
        }
        .floating-card:hover .card-image-wrap img { transform: scale(1.1); }
        .card-icon-overlay {
          position: absolute;
          bottom: 20px;
          right: 20px;
          background: var(--primary);
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 10px 20px rgba(230,0,0,0.3);
        }
        .card-body { padding: 35px; flex: 1; display: flex; flex-direction: column; }
        .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .card-header h3 { font-size: 1.5rem; }
        .card-price { background: rgba(255,255,255,0.05); padding: 5px 15px; border-radius: 8px; font-weight: 800; color: var(--primary); }
        .card-desc { font-size: 0.95rem; margin-bottom: 25px; line-height: 1.6; min-height: 70px; }
        .card-features { margin-bottom: 30px; }
        .card-features li { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; font-size: 0.9rem; color: #ccc; }
        .card-cta { margin-top: auto; display: flex; align-items: center; gap: 10px; font-weight: 700; color: white; transition: 0.3s; }
        .card-cta:hover { color: var(--primary); padding-left: 10px; }

        /* Why Us Section */
        .why-us { padding: 150px 0; background: #000; }
        .why-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 100px; align-items: center; }
        .why-features { margin-top: 50px; display: grid; gap: 30px; }
        .why-item { display: flex; gap: 20px; }
        .why-dot { width: 12px; height: 12px; background: var(--primary); border-radius: 50%; margin-top: 5px; flex-shrink: 0; box-shadow: 0 0 10px var(--primary); }
        .why-item h4 { margin-bottom: 5px; }
        .why-image-wrap { position: relative; }
        .side-img { width: 100%; border-radius: 40px; border: 1px solid var(--border); }
        .experience-badge {
          position: absolute;
          top: -30px;
          left: -30px;
          background: var(--primary);
          width: 120px;
          height: 120px;
          border-radius: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          transform: rotate(-10deg);
          box-shadow: 20px 20px 40px rgba(0,0,0,0.5);
        }
        .experience-badge span { font-size: 2.5rem; font-weight: 900; line-height: 1; }
        .experience-badge p { color: white; font-size: 0.8rem; font-weight: 700; margin-top: -5px; }

        @media (max-width: 1024px) {
          .hero-visual { display: none; }
          .hero { padding: 120px 0 80px; }
          .why-grid { grid-template-columns: 1fr; gap: 60px; }
          .experience-badge { left: 20px; }
        }
      `}} />
    </div>
  );
};

export default Landing;
