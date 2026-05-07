import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../useAuth';
import { supabase } from '../lib/supabase';
import { Lock, Mail, User as UserIcon, ShieldCheck } from 'lucide-react';

const Login = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    
    try {
      // Usando mock login para saltar autenticación
      await login(email || 'admin@demo.com', password || 'admin123');
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Error en la operación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-card glass-card">
          <div className="login-header">
            <div className="login-icon">
              {isRegistering ? <UserIcon size={40} /> : (isAdmin ? <ShieldCheck size={40} /> : <UserIcon size={40} />)}
            </div>
            <h2>{isRegistering ? 'Crear Cuenta' : (isAdmin ? 'Panel de Administración' : 'Bienvenido de Nuevo')}</h2>
            <p>{isRegistering ? 'Únete a la comunidad de Los Pits' : 'Ingresa tus credenciales para continuar'}</p>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <Mail size={20} className="i-icon" />
              <input 
                type="email" 
                placeholder="Correo Electrónico" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <Lock size={20} className="i-icon" />
              <input 
                type="password" 
                placeholder="Contraseña" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? 'Procesando...' : (isRegistering ? 'Registrarse' : 'Iniciar Sesión')}
            </button>
          </form>

          <div className="login-footer">
            {!isAdmin && (
              <button onClick={() => { setIsRegistering(!isRegistering); setError(null); }} className="toggle-btn">
                {isRegistering ? '¿Ya tienes cuenta? Inicia Sesión' : '¿No tienes cuenta? Regístrate'}
              </button>
            )}
            
            {!isRegistering && (
              <button onClick={() => { setIsAdmin(!isAdmin); setError(null); }} className="toggle-btn" style={{ marginTop: '10px' }}>
                <ShieldCheck size={16} />
                {isAdmin ? 'Volver a Acceso Clientes' : 'Acceso para Administradores'}
              </button>
            )}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .login-page {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          background: radial-gradient(circle at 50% 50%, #1a1a1a 0%, #050505 100%);
          padding: 80px 20px 20px;
        }
        .login-card {
          max-width: 420px;
          margin: 60px auto 0;
          padding: 50px 40px;
          width: 100%;
          animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          border-radius: 32px;
          background: rgba(20, 20, 20, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        .login-header {
          text-align: center;
          margin-bottom: 40px;
        }
        .login-icon {
          width: 72px;
          height: 72px;
          background: rgba(230, 0, 0, 0.05);
          border-radius: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          color: var(--primary);
          border: 1px solid rgba(230, 0, 0, 0.2);
          box-shadow: 0 0 20px rgba(230, 0, 0, 0.1);
          transition: 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .login-card:hover .login-icon {
          transform: rotate(10deg) scale(1.1);
          border-color: var(--primary);
          box-shadow: 0 0 30px rgba(230, 0, 0, 0.2);
        }
        .login-header h2 { 
          font-size: 2rem; 
          font-weight: 900; 
          letter-spacing: -1px;
          margin-bottom: 8px; 
        }
        .login-header p { 
          color: var(--text-muted); 
          font-size: 0.95rem;
        }
        .error-message {
          background: rgba(230, 0, 0, 0.1);
          border: 1px solid rgba(230, 0, 0, 0.2);
          color: var(--primary);
          padding: 10px;
          border-radius: 8px;
          margin-top: 15px;
          font-size: 0.85rem;
          font-weight: 600;
        }
        .success-message {
          background: rgba(0, 230, 0, 0.1);
          border: 1px solid rgba(0, 230, 0, 0.2);
          color: #00e600;
          padding: 10px;
          border-radius: 8px;
          margin-top: 15px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .input-group {
          position: relative;
          margin-bottom: 20px;
        }
        .i-icon {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: #555;
          transition: 0.3s;
        }
        .input-group input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 16px 16px 16px 52px;
          border-radius: 14px;
          color: white;
          font-family: inherit;
          font-size: 1rem;
          transition: 0.3s;
        }
        .input-group input:focus {
          border-color: var(--primary);
          background: rgba(255,255,255,0.06);
          outline: none;
          box-shadow: 0 0 20px rgba(230, 0, 0, 0.05);
        }
        .input-group input:focus + .i-icon {
          color: var(--primary);
        }

        .btn-primary {
          width: 100%;
          background: var(--primary);
          color: white;
          border: none;
          padding: 16px;
          border-radius: 14px;
          font-weight: 800;
          font-size: 1rem;
          cursor: pointer;
          transition: 0.3s;
          box-shadow: 0 10px 20px rgba(230, 0, 0, 0.2);
          text-transform: uppercase;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 30px;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(230, 0, 0, 0.3);
          background: #ff1a1a;
        }

        .login-footer {
          margin-top: 40px;
          text-align: center;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 30px;
        }
        .toggle-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-muted);
          padding: 10px 20px;
          border-radius: 100px;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: 0.3s;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .toggle-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: white;
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-1px);
        }
      `}} />
    </div>
  );
};

export default Login;
