import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { Lock, Mail, User as UserIcon, ShieldCheck } from 'lucide-react';

const Login = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulation of login
    const userData = isAdmin 
      ? { role: 'admin', name: 'Administrador Los Pits' }
      : { role: 'user', name: 'Juan Perez' };
    
    login(userData);
    navigate(isAdmin ? '/admin' : '/booking');
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-card glass-card">
          <div className="login-header">
            <div className="login-icon">
              {isAdmin ? <ShieldCheck size={40} /> : <UserIcon size={40} />}
            </div>
            <h2>{isAdmin ? 'Panel de Administración' : 'Bienvenido de Nuevo'}</h2>
            <p>Ingresa tus credenciales para continuar</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <Mail size={20} className="i-icon" />
              <input type="email" placeholder="Correo Electrónico" required />
            </div>
            <div className="input-group">
              <Lock size={20} className="i-icon" />
              <input type="password" placeholder="Contraseña" required />
            </div>

            <button type="submit" className="btn-primary w-full">
              Iniciar Sesión
            </button>
          </form>

          <div className="login-footer">
            <button onClick={() => setIsAdmin(!isAdmin)} className="toggle-btn">
              {isAdmin ? 'Acceso Clientes' : 'Acceso Administrador'}
            </button>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .login-page {
          min-height: calc(100vh - 80px);
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at center, #1a1a1a 0%, #0a0a0a 100%);
          padding: 40px 0;
        }
        .login-card {
          max-width: 450px;
          margin: 0 auto;
          padding: 50px;
          width: 100%;
          animation: fadeIn 0.6s ease-out;
        }
        .login-header {
          text-align: center;
          margin-bottom: 40px;
        }
        .login-icon {
          width: 80px;
          height: 80px;
          background: var(--surface-accent);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: var(--primary);
          border: 2px solid var(--primary);
        }
        .login-header h2 { font-size: 1.8rem; margin-bottom: 10px; }
        .login-header p { color: var(--text-muted); }

        .input-group {
          position: relative;
          margin-bottom: 20px;
        }
        .i-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }
        .input-group input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border);
          padding: 14px 14px 14px 50px;
          border-radius: 8px;
          color: white;
          font-family: inherit;
          transition: 0.3s;
        }
        .input-group input:focus {
          border-color: var(--primary);
          background: rgba(255,255,255,0.08);
          outline: none;
        }
        .w-full { width: 100%; margin-top: 10px; }

        .login-footer {
          margin-top: 30px;
          text-align: center;
          border-top: 1px solid var(--border);
          padding-top: 20px;
        }
        .toggle-btn {
          background: none;
          color: var(--primary);
          font-weight: 600;
          font-size: 0.9rem;
          text-decoration: underline;
        }
      `}} />
    </div>
  );
};

export default Login;
