import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar, TrendingUp, DollarSign, ShoppingBag } from 'lucide-react';
import { supabase } from '../lib/supabase';

import AppointmentsKanban from '../components/AppointmentsKanban';

const SERVICE_PRICES = {
  'Lavado Ultra con Tratamiento': 50,
  'Audio': 250,
  'Autodecoración': 180,
  'Viseras y Calcas': 75
};

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('today');
  const [specificDate, setSpecificDate] = useState('');
  const [loading, setLoading] = useState(true);

  // Cargar citas desde Supabase
  useEffect(() => {
    const fetchAppointments = async () => {
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from('appointments')
          .select('*');
        
        if (error) throw error;
        setAppointments(data || []);
      } catch (err) {
        console.error('Error al cargar citas:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Función para actualizar estado en Supabase
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: newStatus })
        .eq('id', id);
      
      if (error) throw error;
      setAppointments(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
    } catch (err) {
      console.error('Error al actualizar estado:', err.message);
    }
  };

  // Función para agregar cita en Supabase
  const handleAddAppointment = async (newApp) => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert([newApp])
        .select();
      
      if (error) throw error;
      setAppointments(prev => [...prev, ...(data || [])]);
    } catch (err) {
      console.error('Error al agregar cita:', err.message);
    }
  };

  // Dinámicamente calcular las estadísticas
  const stats = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const currentMonthStr = todayStr.substring(0, 7);
    
    const todayAppointments = appointments.filter(a => a.date === todayStr);
    const monthAppointments = appointments.filter(a => a.date && a.date.startsWith(currentMonthStr));
    
    const monthlyRevenue = monthAppointments.reduce((acc, curr) => {
      if (['terminado', 'recogido'].includes(curr.status)) {
        return acc + (SERVICE_PRICES[curr.service] || 0);
      }
      return acc;
    }, 0);

    const uniqueClientsMonth = new Set(monthAppointments.map(a => a.user)).size;
    
    let displayAppointmentsCount = todayAppointments.length;
    let appointmentsLabel = 'Citas Hoy';
    
    if (filter === 'month') {
      displayAppointmentsCount = monthAppointments.length;
      appointmentsLabel = 'Citas Mes';
    } else if (filter === 'specific' && specificDate) {
      displayAppointmentsCount = appointments.filter(a => a.date === specificDate).length;
      appointmentsLabel = `Citas (${specificDate})`;
    }

    return [
      { label: appointmentsLabel, value: displayAppointmentsCount.toString(), icon: <Calendar />, color: '#e60000' },
      { label: 'Clientes Mes', value: uniqueClientsMonth.toString(), icon: <Users />, color: '#00c853' },
      { label: 'Ingresos Mes', value: `$${monthlyRevenue.toLocaleString()}`, icon: <DollarSign />, color: '#2979ff' },
      { label: 'Crecimiento', value: '+18.5%', icon: <TrendingUp />, color: '#ff9100' },
    ];
  }, [appointments, filter, specificDate]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#050505', color: 'white' }}>
        <p>Cargando datos del panel...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="admin-header-main">
          <div className="admin-title-area">
            <span className="badge-red-typo">Gestión de Negocio</span>
            <h1>Panel Administrativo</h1>
            <p>Control central de operaciones Los Pits</p>
          </div>
          <div className="admin-actions-group">
            <Link to="/pos" className="pos-entry-btn">
              <ShoppingBag size={18} />
              <span>Sistema POS</span>
            </Link>
            <button className="report-btn">
              Descargar Reporte
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="admin-stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="stat-card glass-card">
              <div className="stat-icon" style={{ backgroundColor: s.color + '20', color: s.color }}>
                {s.icon}
              </div>
              <div className="stat-info">
                <h3>{s.value}</h3>
                <p>{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Kanban Board Section */}
        <AppointmentsKanban 
          appointments={appointments}
          setAppointments={handleAddAppointment} // Usamos la función de agregar
          onUpdateStatus={handleUpdateStatus} // Nueva prop para actualizar estado
          filter={filter}
          setFilter={setFilter}
          specificDate={specificDate}
          setSpecificDate={setSpecificDate}
        />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .admin-dashboard { 
          padding: 60px 0 40px; 
          background: transparent; 
          position: relative;
          z-index: 5;
        }
        
        .admin-header-main { 
          display: flex; 
          justify-content: space-between; 
          align-items: flex-end; 
          margin-bottom: 40px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding-bottom: 25px;
        }
        
        .admin-title-area h1 { font-size: clamp(2.5rem, 5vw, 3.5rem); line-height: 1; margin: 10px 0; }
        .admin-title-area p { font-size: 1rem; color: var(--text-muted); }

        .badge-red-typo {
          display: block;
          color: var(--primary);
          font-weight: 800;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .admin-actions-group { display: flex; gap: 15px; }
        
        .pos-entry-btn {
          background: rgba(255, 255, 255, 0.03);
          color: white;
          padding: 10px 20px;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid rgba(255,255,255,0.1);
          transition: 0.3s;
          font-size: 0.95rem;
        }
        .pos-entry-btn:hover { background: white; color: black; }

        .report-btn {
          background: var(--primary);
          color: white;
          padding: 10px 24px;
          border-radius: 12px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: 0.3s;
          box-shadow: 0 8px 20px rgba(230,0,0,0.2);
          font-size: 0.95rem;
        }
        .report-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(230,0,0,0.4); }

        .admin-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }
        .stat-card {
          padding: 24px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 20px;
          transition: 0.3s;
        }
        .stat-card:hover { transform: translateY(-5px); border-color: rgba(255,255,255,0.2); }
        
        .stat-icon {
          width: 50px;
          height: 50px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .stat-info h3 { font-size: 1.8rem; margin-bottom: 2px; }
        .stat-info p { color: var(--text-muted); font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }

        @media (max-width: 1024px) {
          .admin-dashboard { padding: 80px 0 20px; }
          .admin-header-main { flex-direction: column; align-items: flex-start; gap: 20px; margin-bottom: 30px; }
          .admin-actions-group { width: 100%; }
          .admin-actions-group > * { flex: 1; justify-content: center; }
          .admin-title-area h1 { font-size: 2.2rem; }
          .admin-stats-grid { gap: 15px; margin-bottom: 30px; }
          .stat-card { padding: 20px; gap: 15px; }
          .stat-info h3 { font-size: 1.5rem; }
        }
      `}} />
    </div>
  );
};

export default AdminDashboard;
