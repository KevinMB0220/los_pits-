import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Share2, X, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

const Footer = ({ minimal = false }) => {
  return (
    <footer className={`footer-v3 ${minimal ? 'footer-minimal' : ''}`}>
      <div className="container">
        {!minimal && (
          <>
            {/* Newsletter / CTA Section */}
            <div className="footer-cta reveal">
              <div className="cta-content-v3">
                <span className="badge-red">MEMBRESÍA VIP</span>
                <h2>ÚNETE AL CLUB <span className="text-red">LOS PITS</span></h2>
                <p>Recibe beneficios exclusivos, prioridad en citas y ofertas de temporada directamente en tu correo.</p>
              </div>
              <form className="cta-form-v3" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Tu correo electrónico" />
                <button type="submit">
                  UNIRSE <ArrowRight size={18} />
                </button>
              </form>
            </div>

            {/* Main Info Grid */}
            <div className="footer-grid-v3">
              {/* Brand Info */}
              <div className="footer-col reveal">
                <Link to="/" className="footer-logo-v3">
                  <div className="footer-logo-box">
                    <span className="logo-lp-footer">LP</span>
                  </div>
                  <span>LOS PITS</span>
                </Link>
                <p className="footer-about">
                  Estableciendo el estándar de oro en estética automotriz. Pasión, precisión y perfección en cada detalle.
                </p>
                <div className="footer-social-v3">
                  <a href="#" aria-label="Website"><Globe size={20} /></a>
                </div>
              </div>

              {/* Links */}
              <div className="footer-col reveal" style={{ transitionDelay: '100ms' }}>
                <h3>SERVICIOS</h3>
                <ul>
                  <li><Link to="/">Lavado Ultra con Tratamiento</Link></li>
                  <li><Link to="/">Audio</Link></li>
                  <li><Link to="/">Autodecoración</Link></li>
                  <li><Link to="/">Viseras y Calcas</Link></li>
                </ul>
              </div>

              <div className="footer-col reveal" style={{ transitionDelay: '200ms' }}>
                <h3>EMPRESA</h3>
                <ul>
                  <li><a href="/#sobre-nosotros">Sobre Nosotros</a></li>
                  <li><Link to="/login">Reservar Cita</Link></li>
                  <li><a href="#">Preguntas Frecuentes</a></li>
                  <li><a href="#contacto">Contacto</a></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div id="contacto" className="footer-col reveal" style={{ transitionDelay: '300ms' }}>
                <h3>CONTACTO</h3>
                <div className="footer-contact-v3">
                  <div className="contact-item-v3">
                    <MapPin size={18} className="text-red" />
                    <span>San José, Costa Rica</span>
                  </div>
                  <div className="contact-item-v3">
                    <Phone size={18} className="text-red" />
                    <span>+506 1234-5678</span>
                  </div>
                  <div className="contact-item-v3">
                    <Mail size={18} className="text-red" />
                    <span>info@lospits.com</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Copyright Bar */}
        <div className="footer-bottom-v3">
          <p>&copy; {new Date().getFullYear()} LOS PITS • Todos los derechos reservados.</p>
          <div className="footer-legal">
            <Link to="/legal/privacy">Privacidad</Link>
            <Link to="/legal/terms">Términos</Link>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .footer-v3 {
          background-color: #030303;
          padding: 30px 0 30px;
          position: relative;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          color: white;
          overflow: hidden;
        }

        .badge-red {
          display: block;
          color: var(--primary);
          font-weight: 800;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 12px;
          border: none;
          background: none;
          padding: 0;
        }

        .footer-minimal {
          padding: 20px 0;
          background: #000;
        }

        .footer-minimal .footer-bottom-v3 {
          border-top: none;
          padding-top: 0;
        }

        .footer-cta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 30px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          margin-bottom: 30px;
          gap: 40px;
        }

        .cta-content-v3 h2 { font-size: 2.5rem; margin: 10px 0; letter-spacing: -1px; }
        .cta-content-v3 p { color: #888; max-width: 500px; }

        .cta-form-v3 { display: flex; gap: 10px; width: 100%; max-width: 450px; }
        .cta-form-v3 input {
          flex: 1;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 15px 25px;
          border-radius: 8px;
          color: white;
          font-family: inherit;
        }
        .cta-form-v3 button {
          background: var(--primary);
          color: white;
          padding: 0 30px;
          border-radius: 8px;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: 0.3s;
        }
        .cta-form-v3 button:hover { background: #ff1a1a; transform: translateY(-2px); }

        .footer-grid-v3 {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 40px;
          margin-bottom: 40px;
        }

        .footer-logo-v3 {
          display: flex;
          align-items: center;
          gap: 15px;
          font-size: 1.8rem;
          font-weight: 900;
          margin-bottom: 25px;
          text-decoration: none;
          color: white;
        }
        .footer-logo-box {
          width: 48px;
          height: 48px;
          background: var(--primary);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 16px rgba(230, 0, 0, 0.2);
        }
        .logo-lp-footer {
          font-weight: 900;
          font-size: 1.5rem;
          font-style: italic;
          color: white;
          letter-spacing: -1px;
        }

        .footer-about { color: #888; line-height: 1.6; margin-bottom: 30px; max-width: 300px; }
        
        .footer-social-v3 { display: flex; gap: 15px; }
        .footer-social-v3 a {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #888;
          transition: 0.3s;
        }
        .footer-social-v3 a:hover { border-color: var(--primary); color: var(--primary); transform: translateY(-3px); }

        .footer-col h3 { font-size: 0.9rem; letter-spacing: 2px; color: #555; margin-bottom: 30px; font-weight: 900; }
        .footer-col ul { list-style: none; }
        .footer-col ul li { margin-bottom: 15px; }
        .footer-col ul li a { color: #888; text-decoration: none; transition: 0.3s; font-weight: 500; }
        .footer-col ul li a:hover { color: white; padding-left: 5px; }

        .footer-contact-v3 { display: grid; gap: 20px; }
        .contact-item-v3 { display: flex; align-items: center; gap: 15px; color: #888; }
        
        .footer-bottom-v3 {
          padding-top: 40px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #444;
          font-size: 0.9rem;
        }
        .footer-legal { display: flex; gap: 30px; }
        .footer-legal a { color: #444; text-decoration: none; }
        .footer-legal a:hover { color: white; }

        @media (max-width: 1024px) {
          .footer-cta { flex-direction: column; text-align: center; }
          .footer-grid-v3 { grid-template-columns: 1fr 1fr; }
          .footer-col:first-child { grid-column: span 2; display: flex; flex-direction: column; align-items: center; text-align: center; }
        }

        @media (max-width: 768px) {
          .footer-grid-v3 { grid-template-columns: 1fr; gap: 40px; }
          .footer-col:first-child { grid-column: span 1; align-items: flex-start; text-align: left; }
          .footer-bottom-v3 { flex-direction: column; gap: 20px; text-align: center; }
        }
      `}} />
    </footer>
  );
};

export default Footer;
