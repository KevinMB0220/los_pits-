import React from 'react';
import { Users, Calendar, TrendingUp, DollarSign, Search, Filter } from 'lucide-react';

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
        <div className="admin-header">
          <div>
            <h1>Panel Administrativo</h1>
            <p>Bienvenido al control central de Los Pits.</p>
          </div>
          <button className="btn-primary">Descargar Reporte</button>
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
        .admin-dashboard { padding: 60px 0; background: #080808; min-height: 100vh; }
        .admin-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; }
        
        .admin-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }
        .stat-card {
          padding: 30px;
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .stat-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .stat-info h3 { font-size: 1.8rem; margin-bottom: 5px; }
        .stat-info p { color: var(--text-muted); font-size: 0.9rem; }

        .admin-content-section { padding: 30px; }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }
        .actions { display: flex; gap: 15px; }
        .search-box {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--surface-accent);
          padding: 8px 15px;
          border-radius: 8px;
          border: 1px solid var(--border);
        }
        .search-box input {
          background: none;
          border: none;
          color: white;
          outline: none;
        }

        .table-responsive { overflow-x: auto; }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        .admin-table th {
          padding: 15px;
          border-bottom: 1px solid var(--border);
          color: var(--text-muted);
          font-weight: 600;
        }
        .admin-table td {
          padding: 20px 15px;
          border-bottom: 1px solid var(--glass-border);
        }

        .badge {
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        .badge.pendiente { background: rgba(255,145,0,0.1); color: #ff9100; }
        .badge.en-proceso { background: rgba(41,121,255,0.1); color: #2979ff; }
        .badge.completado { background: rgba(0,200,83,0.1); color: #00c853; }

        .edit-btn {
          background: none;
          color: var(--primary);
          font-weight: 600;
          border: 1px solid var(--primary);
          padding: 5px 12px;
          border-radius: 6px;
        }
        .edit-btn:hover {
          background: var(--primary);
          color: white;
        }

        .icon-btn {
          background: var(--surface-accent);
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}} />
    </div>
  );
};

export default AdminDashboard;
