import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../App';
import { Menu, X, LogOut, ArrowRight, User, Globe, Share2, Layout } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <nav className={`main-nav ${isScrolled ? 'scrolled' : ''} ${isAdminPath ? 'admin-nav' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="logo">
          <div className="logo-box">
            <span className="logo-lp">LP</span>
          </div>
          <span className="logo-text">LOS <span className="red">PITS</span></span>
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-menu">
          {!isAdminPath && (
            <div className="nav-links">
              <Link to="/" className="nav-link">Inicio</Link>
              <a href="/#servicios" className="nav-link">Servicios</a>
              <a href="#contacto" className="nav-link">Contacto</a>
            </div>
          )}
          
          <div className="nav-actions">
            {user ? (
              <>
                <Link to={user.role === 'admin' ? '/admin' : '/booking'} className="user-panel-btn">
                  <div className="avatar">
                    {user.role === 'admin' ? <Layout size={16} /> : <User size={16} />}
                  </div>
                  <span>{user.role === 'admin' ? 'Panel Admin' : 'Mis Citas'}</span>
                </Link>
                <button onClick={handleLogout} className="logout-icon-btn" title="Cerrar Sesión">
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <Link to="/login" className="login-btn">
                <span>INGRESAR</span>
                <div className="btn-icon">
                  <ArrowRight size={14} />
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-overlay ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-content container">
          <div className="mobile-links">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Inicio</Link>
            <a href="/#servicios" onClick={() => setIsMenuOpen(false)}>Servicios</a>
            <a href="#contacto" onClick={() => setIsMenuOpen(false)}>Contacto</a>
            {user && (
              <Link to={user.role === 'admin' ? '/admin' : '/booking'} onClick={() => setIsMenuOpen(false)}>
                {user.role === 'admin' ? 'Panel Admin' : 'Mi Panel'}
              </Link>
            )}
          </div>
          <div className="mobile-footer">
            {user ? (
              <button onClick={handleLogout} className="mobile-auth-link logout">Cerrar Sesión</button>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="mobile-auth-link">
                Iniciar Sesión <ArrowRight size={20} />
              </Link>
            )}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .main-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 90px;
          display: flex;
          align-items: center;
          z-index: 2000;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          border-bottom: 1px solid transparent;
        }

        .main-nav.scrolled, 
        .main-nav.menu-open {
          height: 70px;
          background: #050505;
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .main-nav.admin-nav {
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(20px);
          height: 70px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .main-nav.admin-nav.menu-open {
          background: #050505;
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        /* LOGO */
        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: white;
          z-index: 1001;
        }
        .logo-box {
          width: 40px;
          height: 40px;
          background: var(--primary);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 16px rgba(230, 0, 0, 0.2);
        }
        .logo-lp {
          font-weight: 900;
          font-size: 1.2rem;
          font-style: italic;
          color: white;
          letter-spacing: -1px;
        }
        .logo-text {
          font-weight: 900;
          font-size: 1.5rem;
          letter-spacing: -1px;
        }
        .logo-text .red { color: var(--primary); }

        /* DESKTOP MENU */
        .nav-menu { display: flex; align-items: center; gap: 40px; }
        .nav-links { display: flex; gap: 32px; }
        .nav-link {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-weight: 700;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: 0.3s;
        }
        .nav-link:hover { color: white; }

        .nav-actions { display: flex; align-items: center; gap: 20px; }
        
        .user-panel-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.05);
          padding: 6px 16px 6px 6px;
          border-radius: 100px;
          text-decoration: none;
          color: white;
          font-weight: 700;
          font-size: 0.85rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: 0.3s;
        }
        .user-panel-btn:hover { background: rgba(255, 255, 255, 0.1); transform: translateY(-2px); }
        .avatar {
          width: 30px;
          height: 30px;
          background: var(--primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logout-icon-btn {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.4);
          cursor: pointer;
          transition: 0.3s;
        }
        .logout-icon-btn:hover { color: var(--primary); }

        .login-btn {
          background: white;
          color: black;
          padding: 6px 6px 6px 20px;
          border-radius: 100px;
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          font-weight: 800;
          font-size: 0.85rem;
          transition: 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .login-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(255, 255, 255, 0.1); }
        .btn-icon {
          width: 32px;
          height: 32px;
          background: black;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* MOBILE OVERLAY */
        .mobile-toggle {
          display: none;
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
          z-index: 10000;
        }

        .mobile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: #000000;
          z-index: 9999;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          padding: 120px 40px 40px;
        }
        .mobile-overlay.active { 
          opacity: 1; 
          visibility: visible;
          pointer-events: auto; 
        }
        
        .mobile-links { 
          display: flex; 
          flex-direction: column; 
          gap: 25px; 
          margin-bottom: 40px; 
        }
        .mobile-links a {
          font-size: 2.2rem;
          font-weight: 900;
          color: white;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: -1px;
        }

        .mobile-auth-link {
          width: 100%;
          background: var(--primary);
          color: white;
          padding: 20px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          text-decoration: none;
          font-weight: 900;
          font-size: 1.1rem;
          border: none;
        }
        .mobile-auth-link.logout { background: #111; color: #ff4444; }

        @media (max-width: 1024px) {
          .nav-links { display: none; }
          .mobile-toggle { display: block; }
          .nav-actions { margin-right: 20px; }
        }

        @media (max-width: 768px) {
          .nav-actions { display: none; }
        }
      `}} />
    </nav>
  );
};

export default Navbar;
