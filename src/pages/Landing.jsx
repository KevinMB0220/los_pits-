import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, Droplets, Volume2, ArrowRight, CheckCircle2, Car } from 'lucide-react';


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

  const serviceCategories = [
    {
      id: 'servicios',
      title: 'Autodecoracion',
      icon: <Car />,
      image: '/motor.png',
      items: [
        { name: 'alerones' },
        { name: 'lips' },
        { name: 'difusores' },
        { name: 'viseras y calcas personalizadas' },
        { name: 'aros' },
        { name: 'accesorios extras' },
        { name: 'otros' },
      ]
    },
    {
      id: 'detallado',
      title: 'Detallado Automotriz',
      icon: <Droplets />,
      image: '/lavado.png',
      items: [
        { name: 'Lavado Ultra con Tratamiento' },
        { name: 'Lavado Top con Combo' },
        { name: 'Lavado Aspirado y Encerado' },
        { name: 'Lavado Premium' },
        { name: 'Lavado Express' },
      ]
    },
    {
      id: 'audio',
      title: 'Audio',
      icon: <Volume2 />,
      image: '/ceramic.png',
      items: [
        { name: 'tweters' },
        { name: 'parlantes' },
        { name: 'medios' },
        { name: 'bajo amplificado' },
        { name: 'bajo' },
        { name: 'plantas' },
        { name: 'otros' },
      ]
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
            <span className="badge-red hero-badge-anim">Estética Automotriz de Élite</span>
            <h1 className="hero-title-anim">EL ARTE DEL <span className="text-red">DETALLADO</span></h1>
            <p className="hero-p-anim">En Los Pits, no lavamos autos, restauramos la pasión por conducir. Experimenta el nivel de detalle que solo los verdaderos expertos pueden ofrecer.</p>
            <div className="hero-action-group reveal" style={{ transitionDelay: '300ms' }}>
              <Link to="/login" className="btn-primary hero-btn-glow">
                Agendar Mi Cita <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="services-section">
        <div className="container">
          <div className="section-title-group reveal">
            <span className="badge-red">Nuestros Servicios</span>
            <h2>Tratamientos de <span className="text-red">Lujo</span></h2>
          </div>
          
          <div className="premium-services-grid">
            {serviceCategories.map((cat, i) => (
              <div key={cat.id} className="premium-service-card reveal" style={{ transitionDelay: `${i * 150}ms` }}>
                <div className="psc-image-container">
                  <img src={cat.image} alt={cat.title} className="psc-bg-image" />
                  <div className="psc-overlay">
                    <div className="psc-icon-box">{cat.icon}</div>
                  </div>
                </div>
                
                <div className="psc-content">
                  <h3 className="psc-title">{cat.title}</h3>
                  <div className="psc-divider"></div>
                  
                  <ul className={`psc-list ${cat.items.length > 5 ? 'two-columns' : ''}`}>
                    {cat.items.map((item, idx) => (
                      <li key={idx} className="psc-item">
                        <CheckCircle2 size={14} className="psc-check" />
                        <span className="psc-item-name">{item.name}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="psc-footer">
                    <Link to="/login" className="psc-btn">
                      <span>Agendar Cita</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="sobre-nosotros" className="why-us">
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
            <img src="/hero.png" alt="Workshop" className="side-img" />
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .text-red { color: var(--primary); }
        .badge-red {
          display: block;
          color: var(--primary);
          font-weight: 800;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 15px;
          opacity: 0.8;
          border: none;
          background: none;
          padding: 0;
        }
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

        /* Hero Animations */
        .hero-badge-anim { animation: fadeInDown 0.8s ease-out; }
        .hero-title-anim { animation: fadeInLeft 1s ease-out 0.2s both; }
        .hero-p-anim { animation: fadeInLeft 1s ease-out 0.4s both; }
        .hero-btn-glow { position: relative; overflow: hidden; }
        .hero-btn-glow::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
          transform: rotate(45deg);
          animation: shine 3s infinite;
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes shine {
          0% { left: -100%; }
          20% { left: 100%; }
          100% { left: 100%; }
        }
        
        /* Premium Service Cards */
        .premium-services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
          padding: 40px 0;
        }

        .premium-service-card {
          background: rgba(15, 15, 15, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 40px;
          overflow: hidden;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .premium-service-card:hover {
          transform: translateY(-15px);
          border-color: var(--primary);
          box-shadow: 0 40px 80px rgba(0,0,0,0.6), 0 0 30px rgba(230,0,0,0.15);
        }

        .psc-image-container {
          height: 220px;
          position: relative;
          overflow: hidden;
        }

        .psc-bg-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1.2s ease;
          filter: brightness(0.6) contrast(1.2);
        }

        .premium-service-card:hover .psc-bg-image {
          transform: scale(1.15);
          filter: brightness(0.8) contrast(1.3);
        }

        .psc-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(15,15,15,1) 0%, transparent 60%);
          display: flex;
          align-items: flex-end;
          padding: 30px;
        }

        .psc-icon-box {
          background: var(--primary);
          width: 56px;
          height: 56px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 10px 25px rgba(230,0,0,0.4);
          transform: translateY(10px);
          transition: 0.4s;
        }

        .premium-service-card:hover .psc-icon-box {
          transform: translateY(0) scale(1.1);
        }

        .psc-content {
          padding: 30px;
          padding-top: 10px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .psc-title {
          font-size: 1.8rem;
          font-weight: 900;
          letter-spacing: -0.5px;
          margin-bottom: 15px;
          text-transform: uppercase;
        }

        .psc-divider {
          width: 40px;
          height: 4px;
          background: var(--primary);
          border-radius: 2px;
          margin-bottom: 25px;
          transition: 0.4s;
        }

        .premium-service-card:hover .psc-divider {
          width: 80px;
        }

        .psc-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 35px;
        }

        .psc-list.two-columns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px 20px;
        }

        .psc-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.95rem;
          color: #aaa;
          transition: 0.3s;
        }

        .psc-item:hover {
          color: white;
        }

        .psc-check {
          color: var(--primary);
          flex-shrink: 0;
          opacity: 0.7;
        }

        .psc-item-name {
          text-transform: capitalize;
        }

        .psc-price {
          margin-left: auto;
          font-weight: 800;
          color: var(--primary);
          font-size: 1rem;
        }

        .psc-footer {
          margin-top: auto;
        }

        .psc-btn {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 16px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          font-weight: 700;
          color: white;
          transition: 0.3s;
        }

        .psc-btn:hover {
          background: white;
          color: black;
          border-color: white;
        }


        .card-features { margin-bottom: 30px; }
        .card-features li { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; font-size: 0.9rem; color: #ccc; }
        .card-cta { margin-top: auto; display: flex; align-items: center; gap: 10px; font-weight: 700; color: white; transition: 0.3s; }
        .card-cta:hover { color: var(--primary); padding-left: 10px; }

        /* Why Us Section */
        .why-us { padding: 80px 0; background: #000; }
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
