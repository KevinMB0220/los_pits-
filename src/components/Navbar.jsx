import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { Menu, X, Car, LogOut, ArrowRight, User, Globe, Share2 } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className={`nav-v2 ${isScrolled ? 'nav-scrolled' : ''}`}>
      <div className="container nav-wrap-v2">
        <Link to="/" className="nav-logo-v2">
          <div className="logo-icon-wrap">
            <Car size={24} fill="white" />
          </div>
          <span className="logo-text">LOS <span className="text-red">PITS</span></span>
        </Link>

        {/* Desktop Links */}
        <div className="nav-links-v2">
          <Link to="/" className="nav-item">
            <span>Inicio</span>
            <div className="nav-hover-line"></div>
          </Link>
          <a href="/#servicios" className="nav-item">
            <span>Servicios</span>
            <div className="nav-hover-line"></div>
          </a>
          <a href="#contacto" className="nav-item">
            <span>Contacto</span>
            <div className="nav-hover-line"></div>
          </a>
          
          <div className="nav-divider-v2"></div>
          
          {user ? (
            <div className="nav-user-controls">
              <Link to={user.role === 'admin' ? '/admin' : '/booking'} className="nav-profile-link">
                <div className="profile-avatar">
                  <User size={18} />
                </div>
                <span>Panel</span>
              </Link>
              <button onClick={handleLogout} className="logout-btn-v2">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="nav-cta-v2">
              <span>INGRESAR</span>
              <div className="cta-icon-wrap">
                <ArrowRight size={16} />
              </div>
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className={`nav-toggle-v2 ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className="hamburger">
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      {/* Full Screen Mobile Menu */}
      <div className={`nav-mobile-v3 ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-bg-glow"></div>
        <div className="mobile-menu-container container">
          {/* Main links start here since the Navbar logo is already visible above */}

          <nav className="mobile-nav-links">
            <Link to="/" onClick={() => setIsMenuOpen(false)} style={{ transitionDelay: '0.1s' }}>
              <span className="num">01</span> Inicio
            </Link>
            <a href="/#servicios" onClick={() => setIsMenuOpen(false)} style={{ transitionDelay: '0.2s' }}>
              <span className="num">02</span> Servicios
            </a>
            <a href="#contacto" onClick={() => setIsMenuOpen(false)} style={{ transitionDelay: '0.3s' }}>
              <span className="num">03</span> Contacto
            </a>
            {user ? (
              <Link to={user.role === 'admin' ? '/admin' : '/booking'} onClick={() => setIsMenuOpen(false)} style={{ transitionDelay: '0.4s' }}>
                <span className="num">04</span> Mi Panel
              </Link>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)} style={{ transitionDelay: '0.4s' }}>
                <span className="num">04</span> Ingresar
              </Link>
            )}
          </nav>

          <div className="mobile-menu-footer">
            <div className="mobile-socials">
              <a href="#"><Globe size={24} /></a>
              <a href="#"><Share2 size={24} /></a>
              <a href="#"><X size={24} /></a>
            </div>
            {user ? (
              <button onClick={handleLogout} className="mobile-auth-btn logout">Cerrar Sesión</button>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="mobile-auth-btn">
                COMENZAR AHORA <ArrowRight size={20} />
              </Link>
            )}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .nav-v2 {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 100px;
          display: flex;
          align-items: center;
          z-index: 1000;
          transition: all 0.5s ease;
        }

        .nav-scrolled {
          height: 80px;
          background: rgba(5, 5, 5, 0.7);
          backdrop-filter: blur(25px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .nav-wrap-v2 { display: flex; justify-content: space-between; align-items: center; width: 100%; }

        /* LOGO */
        .nav-logo-v2 { display: flex; align-items: center; gap: 15px; text-decoration: none; z-index: 1001; }
        .logo-icon-wrap {
          width: 42px; height: 42px; background: var(--primary); border-radius: 12px;
          display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 15px rgba(230, 0, 0, 0.3);
        }
        .logo-text { color: white; font-weight: 900; font-size: 1.7rem; letter-spacing: -1px; }

        /* DESKTOP LINKS */
        .nav-links-v2 { display: flex; align-items: center; gap: 40px; }
        .nav-item { color: #ccc; text-decoration: none; font-weight: 700; font-size: 0.95rem; text-transform: uppercase; position: relative; padding: 5px 0; }
        .nav-hover-line { position: absolute; bottom: 0; left: 0; width: 0; height: 2px; background: var(--primary); transition: 0.3s; }
        .nav-item:hover .nav-hover-line { width: 100%; }
        .nav-divider-v2 { width: 1px; height: 24px; background: rgba(255, 255, 255, 0.1); }

        .nav-cta-v2 {
          background: white; color: black; padding: 8px 8px 8px 24px; border-radius: 100px;
          display: flex; align-items: center; gap: 15px; text-decoration: none; font-weight: 800; font-size: 0.85rem;
          transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .cta-icon-wrap { width: 34px; height: 34px; background: black; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .nav-cta-v2:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(255, 255, 255, 0.2); }

        /* MOBILE TOGGLE (HAMBURGER) */
        .nav-toggle-v2 {
          display: none;
          width: 46px;
          height: 46px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          cursor: pointer;
          z-index: 1001;
          position: relative;
          align-items: center;
          justify-content: center;
          transition: 0.3s;
          margin-right: -5px; /* Offset for better visual alignment */
        }
        .nav-toggle-v2:hover { background: rgba(255, 255, 255, 0.1); border-color: var(--primary); }
        
        .hamburger {
          width: 22px;
          height: 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .hamburger span {
          width: 100%;
          height: 2px;
          background: white;
          border-radius: 10px;
          transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nav-toggle-v2.active .hamburger span:first-child { transform: translateY(6px) rotate(45deg); }
        .nav-toggle-v2.active .hamburger span:last-child { transform: translateY(-6px) rotate(-45deg); }

        /* FULL SCREEN MOBILE MENU v3 */
        .nav-mobile-v3 {
          position: fixed; inset: 0; background: #000; z-index: 1000;
          opacity: 0; pointer-events: none; transition: 0.6s cubic-bezier(0.19, 1, 0.22, 1);
          padding-top: 100px;
        }
        .nav-mobile-v3.open { opacity: 1; pointer-events: auto; }
        
        .mobile-bg-glow {
          position: absolute; top: -10%; left: 50%; transform: translateX(-50%);
          width: 200%; height: 50%; background: radial-gradient(circle, rgba(230,0,0,0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .mobile-menu-container {
          height: 100%; display: flex; flex-direction: column; justify-content: space-between; padding-bottom: 60px;
        }

        .mobile-nav-links { display: flex; flex-direction: column; gap: 30px; }
        .mobile-nav-links a {
          font-size: 3rem; font-weight: 900; color: white; text-decoration: none;
          text-transform: uppercase; line-height: 1; opacity: 0; transform: translateY(30px); transition: 0.5s;
        }
        .nav-mobile-v3.open .mobile-nav-links a { opacity: 1; transform: translateY(0); }
        .mobile-nav-links a .num { font-size: 1rem; color: var(--primary); vertical-align: top; margin-right: 15px; }

        .mobile-menu-footer {
          opacity: 0; transform: translateY(20px); transition: 0.5s 0.4s;
        }
        .nav-mobile-v3.open .mobile-menu-footer { opacity: 1; transform: translateY(0); }

        .mobile-socials { display: flex; gap: 25px; margin-bottom: 40px; color: #555; }
        .mobile-socials a { color: inherit; transition: 0.3s; }
        .mobile-socials a:hover { color: var(--primary); }

        .mobile-auth-btn {
          width: 100%; background: var(--primary); color: white; padding: 25px; border-radius: 20px;
          display: flex; align-items: center; justify-content: center; gap: 15px; font-weight: 900;
          font-size: 1.1rem; text-decoration: none; border: none;
        }
        .mobile-auth-btn.logout { background: #111; color: #ff4444; }

        @media (max-width: 1024px) {
          .nav-links-v2 { display: none; }
          .nav-toggle-v2 { display: flex; align-items: center; justify-content: center; }
        }

        @media (max-width: 768px) {
          .nav-v2 { height: 80px; }
          .mobile-nav-links a { font-size: 2.2rem; }
          .mobile-menu-container { padding-top: 40px; }
        }
      `}} />
    </nav>
  );
};

export default Navbar;
