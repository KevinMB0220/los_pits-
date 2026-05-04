import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar, TrendingUp, DollarSign, Search, Filter, ShoppingBag } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { label: 'Citas Hoy', value: '12', icon: <Calendar />, color: '#e60000' },
    { label: 'Clientes Nuevos', value: '48', icon: <Users />, color: '#00c853' },
    { label: 'Ingresos Mes', value: '$3,450', icon: <DollarSign />, color: '#2979ff' },
    { label: 'Crecimiento', value: '+15%', icon: <TrendingUp />, color: '#ff9100' },
  ];

  const appointments = [
    { id: 1, user: 'Juan Perez', service: 'Lavado Premium', status: 'Pendiente', time: '10:30 AM' },
    { id: 2, user: 'Maria Garcia', service: 'Ceramic Coating', status: 'En Proceso', time: '11:00 AM' },
    { id: 3, user: 'Carlos Ruiz', service: 'Express Polish', status: 'Completado', time: '09:00 AM' },
    { id: 4, user: 'Ana Lopez', service: 'Detallado Motor', status: 'Pendiente', time: '02:00 PM' },
  ];

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="admin-header-main">
          <div className="admin-title-area">
            <span className="badge-red">Gestión de Negocio</span>
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

        {/* Table Section */}
        <div className="admin-content-section glass-card">
          <div className="section-header">
            <h3>Citas Recientes</h3>
            <div className="actions">
              <div className="search-box">
                <Search size={18} />
                <input type="text" placeholder="Buscar..." />
              </div>
              <button className="icon-btn"><Filter size={18} /></button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Servicio</th>
                  <th>Horario</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(app => (
                  <tr key={app.id}>
                    <td>#{app.id}</td>
                    <td>{app.user}</td>
                    <td>{app.service}</td>
                    <td>{app.time}</td>
                    <td>
                      <span className={`badge ${app.status.toLowerCase().replace(' ', '-')}`}>
                        {app.status}
                      </span>
                    </td>
                    <td>
                      <button className="edit-btn">Gestionar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .admin-dashboard { 
          padding: 60px 0 40px; 
          background: #050505; 
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

        .admin-content-section { padding: 30px; border-radius: 24px; margin-bottom: 40px; }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }
        .section-header h3 { font-size: 1.5rem; }
        
        .actions { display: flex; gap: 12px; }
        .search-box {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255,255,255,0.03);
          padding: 8px 16px;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.1);
          width: 250px;
        }
        .search-box input {
          background: none;
          border: none;
          color: white;
          outline: none;
          width: 100%;
          font-family: inherit;
          font-size: 0.9rem;
        }

        .table-responsive { overflow-x: auto; }
        .admin-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0 8px;
          text-align: left;
        }
        .admin-table th {
          padding: 12px 16px;
          color: var(--text-muted);
          font-weight: 700;
          text-transform: uppercase;
          font-size: 0.8rem;
          letter-spacing: 1px;
        }
        .admin-table td {
          padding: 16px;
          background: rgba(255,255,255,0.02);
          border-top: 1px solid rgba(255,255,255,0.03);
          border-bottom: 1px solid rgba(255,255,255,0.03);
          font-size: 0.9rem;
        }
        .admin-table td:first-child { border-radius: 12px 0 0 12px; border-left: 1px solid rgba(255,255,255,0.03); }
        .admin-table td:last-child { border-radius: 0 12px 12px 0; border-right: 1px solid rgba(255,255,255,0.03); }

        .badge {
          padding: 4px 12px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }
        .badge.pendiente { background: rgba(255,145,0,0.1); color: #ff9100; }
        .badge.en-proceso { background: rgba(41,121,255,0.1); color: #2979ff; }
        .badge.completado { background: rgba(0,200,83,0.1); color: #00c853; }

        .edit-btn {
          background: rgba(255,255,255,0.05);
          color: white;
          font-weight: 700;
          border: 1px solid rgba(255,255,255,0.1);
          padding: 6px 14px;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s;
          font-size: 0.85rem;
        }
        .edit-btn:hover { background: var(--primary); border-color: var(--primary); }

        .icon-btn {
          background: rgba(255,255,255,0.05);
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,0.1);
          cursor: pointer;
          transition: 0.3s;
        }
        .icon-btn:hover { background: rgba(255,255,255,0.1); border-color: white; }

        @media (max-width: 1024px) {
          .admin-dashboard { padding: 80px 0 20px; }
          .admin-header-main { flex-direction: column; align-items: flex-start; gap: 20px; margin-bottom: 30px; }
          .admin-actions-group { width: 100%; }
          .admin-actions-group > * { flex: 1; justify-content: center; }
          .admin-title-area h1 { font-size: 2.2rem; }
          .admin-stats-grid { gap: 15px; margin-bottom: 30px; }
          .stat-card { padding: 20px; gap: 15px; }
          .stat-info h3 { font-size: 1.5rem; }
          .admin-content-section { padding: 20px; border-radius: 20px; }
          .section-header { margin-bottom: 25px; flex-direction: column; align-items: flex-start; gap: 15px; }
          .search-box { width: 100%; }
        }
      `}} />
    </div>
  );
};

export default AdminDashboard;
