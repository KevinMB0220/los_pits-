import React, { useState } from 'react';
import { Calendar, Plus, X, LayoutGrid, List } from 'lucide-react';

const columns = [
  { id: 'pendiente', title: 'Pendiente' },
  { id: 'en-proceso', title: 'En Proceso' },
  { id: 'terminado', title: 'Proceso Terminado' },
  { id: 'recogido', title: 'Vehículo Recogido' }
];

const AppointmentsKanban = ({ 
  appointments, 
  setAppointments, 
  onUpdateStatus, // Recibimos la función para actualizar en Supabase
  filter, 
  setFilter, 
  specificDate, 
  setSpecificDate 
}) => {
  const [view, setView] = useState('kanban'); // 'kanban' or 'list'
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Drag and Drop State
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => {
      e.target.style.opacity = '0.5';
    }, 0);
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDraggedItem(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    if (!draggedItem) return;
    
    if (draggedItem.status !== targetStatus) {
      if (onUpdateStatus) {
        onUpdateStatus(draggedItem.id, targetStatus);
      } else {
        setAppointments(prev => 
          prev.map(app => 
            app.id === draggedItem.id ? { ...app, status: targetStatus } : app
          )
        );
      }
    }
  };

  const handleAddAppointment = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newApp = {
      user: formData.get('user'),
      service: formData.get('service'),
      date: formData.get('date'),
      time: formData.get('time'),
      status: 'pendiente'
    };
    
    // Si tenemos setAppointments (que ahora es handleAddAppointment en el padre)
    setAppointments(newApp);
    setIsSidebarOpen(false);
  };

  const getFilteredAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    const currentMonth = today.substring(0, 7);

    return appointments.filter(app => {
      if (filter === 'today') return app.date === today;
      if (filter === 'month') return app.date && app.date.startsWith(currentMonth);
      if (filter === 'specific' && specificDate) return app.date === specificDate;
      return true;
    });
  };

  const filteredAppointments = getFilteredAppointments();

  return (
    <div className="kanban-wrapper">
      {/* Header & Controls */}
      <div className="kanban-header">
        <div className="kanban-title">
          <span className="badge-red-typo">Gestión Operativa</span>
          <h2>Tablero de <span className="text-red">Citas</span></h2>
        </div>
        
        <div className="kanban-actions">
          <div className="filter-group glass-card">
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="today">Hoy</option>
              <option value="month">Este Mes</option>
              <option value="specific">Día Específico</option>
            </select>
            {filter === 'specific' && (
              <input 
                type="date" 
                value={specificDate} 
                onChange={(e) => setSpecificDate(e.target.value)} 
              />
            )}
          </div>

          <div className="view-toggle glass-card">
            <button 
              className={view === 'kanban' ? 'active' : ''} 
              onClick={() => setView('kanban')}
              title="Vista Tablero"
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              className={view === 'list' ? 'active' : ''} 
              onClick={() => setView('list')}
              title="Vista Lista"
            >
              <List size={18} />
            </button>
          </div>

          <button className="btn-primary new-appt-btn" onClick={() => setIsSidebarOpen(true)}>
            <Plus size={18} /> Agendar Cita
          </button>
        </div>
      </div>

      {/* Kanban View */}
      {view === 'kanban' && (
        <div className="kanban-board">
          {columns.map(col => (
            <div 
              key={col.id} 
              className="kanban-column glass-card"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, col.id)}
            >
              <div className="column-header">
                <h3>[ {col.title.toUpperCase()} ]</h3>
                <span className="col-count">
                  {filteredAppointments.filter(a => a.status === col.id).length}
                </span>
              </div>
              
              <div className="column-content">
                {filteredAppointments
                  .filter(a => a.status === col.id)
                  .map(app => (
                    <div 
                      key={app.id} 
                      className="kanban-card"
                      draggable
                      onDragStart={(e) => handleDragStart(e, app)}
                      onDragEnd={handleDragEnd}
                    >
                      <div className="card-top">
                        <span className="card-time">{app.time}</span>
                        <span className="card-id">#{String(app.id).slice(-4)}</span>
                      </div>
                      <h4>{app.user}</h4>
                      <p>{app.service}</p>
                    </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div className="list-view glass-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Servicio</th>
                <th>Fecha y Hora</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map(app => (
                <tr key={app.id}>
                  <td>#{String(app.id).slice(-4)}</td>
                  <td>{app.user}</td>
                  <td>{app.service}</td>
                  <td>{app.date} - {app.time}</td>
                  <td>
                    <span className={`badge ${app.status}`}>
                      {columns.find(c => c.id === app.status)?.title}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredAppointments.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '30px' }}>No hay citas para los filtros seleccionados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Lateral Sidebar for New Appointment */}
      <div className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={() => setIsSidebarOpen(false)}></div>
      <div className={`sidebar-panel ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Agendar Nueva Cita</h3>
          <button className="icon-btn" onClick={() => setIsSidebarOpen(false)}><X size={20} /></button>
        </div>
        <div className="sidebar-content">
          <form onSubmit={handleAddAppointment}>
            <div className="form-group">
              <label>Cliente</label>
              <input type="text" name="user" required placeholder="Nombre completo" />
            </div>
            <div className="form-group">
              <label>Servicio</label>
              <select name="service" required>
                <option value="">Seleccione un servicio</option>
                <option value="Lavado Ultra con Tratamiento">Lavado Ultra con Tratamiento</option>
                <option value="Audio">Audio</option>
                <option value="Autodecoración">Autodecoración</option>
                <option value="Viseras y Calcas">Viseras y Calcas</option>
              </select>
            </div>
            <div className="form-group">
              <label>Fecha</label>
              <input type="date" name="date" required defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
            <div className="form-group">
              <label>Hora</label>
              <input type="time" name="time" required />
            </div>
            <button type="submit" className="btn-primary w-full" style={{ marginTop: '20px' }}>
              Confirmar Cita
            </button>
          </form>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .kanban-wrapper {
          display: flex;
          flex-direction: column;
          gap: 30px;
          height: 100%;
        }

        .kanban-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 20px;
        }

        .kanban-title h2 { font-size: 2.5rem; margin-top: 5px; }

        .badge-red-typo {
          display: block;
          color: var(--primary);
          font-weight: 800;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .kanban-actions {
          display: flex;
          gap: 15px;
          align-items: center;
          flex-wrap: wrap;
        }

        .filter-group {
          display: flex;
          gap: 10px;
          padding: 8px 12px;
          border-radius: 12px;
        }
        .filter-group select, .filter-group input {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          padding: 8px 12px;
          border-radius: 8px;
          font-family: inherit;
        }

        .view-toggle {
          display: flex;
          padding: 5px;
          border-radius: 12px;
        }
        .view-toggle button {
          background: transparent;
          border: none;
          color: var(--text-muted);
          padding: 8px 12px;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s;
        }
        .view-toggle button.active, .view-toggle button:hover {
          background: rgba(255,255,255,0.1);
          color: white;
        }

        .new-appt-btn {
          padding: 12px 20px;
          font-size: 0.9rem;
        }

        /* Kanban Board Styles */
        .kanban-board {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          padding-bottom: 20px;
          min-height: 500px;
        }
        
        .kanban-column {
          flex: 1;
          min-width: 280px;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          background: rgba(20, 20, 20, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .column-header {
          padding: 20px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .column-header h3 {
          font-size: 0.9rem;
          color: #fff;
          letter-spacing: 2px;
          font-family: monospace;
          font-weight: 700;
        }
        .col-count {
          background: rgba(255,255,255,0.1);
          padding: 2px 8px;
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 700;
        }

        .column-content {
          padding: 15px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          flex: 1;
          overflow-y: auto;
        }

        .kanban-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 16px;
          cursor: grab;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .kanban-card:active {
          cursor: grabbing;
          transform: scale(0.98);
        }
        .kanban-card:hover {
          border-color: rgba(230,0,0,0.3);
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .card-id { color: rgba(255,255,255,0.3); }
        .kanban-card h4 { font-size: 1.1rem; margin-bottom: 5px; text-transform: none; font-weight: 600;}
        .kanban-card p { font-size: 0.9rem; margin: 0; color: #aaa; }

        /* Sidebar Styles */
        .sidebar-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(5px);
          z-index: 1000;
          opacity: 0;
          pointer-events: none;
          transition: 0.3s;
        }
        .sidebar-overlay.open { opacity: 1; pointer-events: all; }

        .sidebar-panel {
          position: fixed;
          top: 0;
          right: -400px;
          width: 400px;
          height: 100vh;
          background: #0a0a0a;
          border-left: 1px solid rgba(255,255,255,0.1);
          z-index: 1001;
          transition: 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
        }
        .sidebar-panel.open { right: 0; box-shadow: -10px 0 30px rgba(0,0,0,0.5); }

        .sidebar-header {
          padding: 25px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .sidebar-header h3 { font-size: 1.2rem; }

        .sidebar-content { padding: 25px; overflow-y: auto; }
        
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; margin-bottom: 8px; color: #aaa; font-size: 0.9rem; }
        .form-group input, .form-group select {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 12px 16px;
          border-radius: 8px;
          color: white;
          font-family: inherit;
        }
        .form-group input:focus, .form-group select:focus {
          border-color: var(--primary);
          outline: none;
        }

        /* List View (Table reuse) */
        .list-view { padding: 20px; border-radius: 16px; }

        /* Badges for List View */
        .badge {
          padding: 4px 12px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }
        .badge.pendiente { background: rgba(255,145,0,0.1); color: #ff9100; }
        .badge.en-proceso { background: rgba(41,121,255,0.1); color: #2979ff; }
        .badge.terminado { background: rgba(0,200,83,0.1); color: #00c853; }
        .badge.recogido { background: rgba(150,150,150,0.1); color: #aaa; }

        @media (max-width: 768px) {
          .sidebar-panel { width: 100%; right: -100%; }
        }
      `}} />
    </div>
  );
};

export default AppointmentsKanban;
