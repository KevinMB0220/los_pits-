import React, { useState } from 'react';
import { Calendar, Clock, Car, CheckCircle } from 'lucide-react';

const UserDashboard = () => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    service: '',
    date: '',
    time: '',
    carType: ''
  });

  const services = ['lavado ultra con tratamiento', 'lavadotop con combo', 'audio', 'autodecoracion', 'viseras y calcas personalizadas'];

  const times = ['09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM'];

  const handleBooking = (e) => {
    e.preventDefault();
    setStep(3);
  };

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Reserva tu Cita</h1>
          <p>Sigue los pasos para agendar tu servicio en Los Pits.</p>
        </div>

        <div className="booking-wizard">
          <div className="steps-indicator">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Detalles</div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Horario</div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Confirmación</div>
          </div>

          <div className="booking-content glass-card">
            {step === 1 && (
              <div className="step-content">
                <h3>Selecciona el Servicio</h3>
                <div className="selection-grid">
                  {services.map(s => (
                    <button 
                      key={s} 
                      className={`select-card ${bookingData.service === s ? 'selected' : ''}`}
                      onClick={() => setBookingData({...bookingData, service: s})}
                    >
                      <Car size={24} />
                      <span>{s}</span>
                    </button>
                  ))}
                </div>
                <div style={{ marginTop: '30px', textAlign: 'right' }}>
                  <button 
                    className="btn-primary" 
                    disabled={!bookingData.service}
                    onClick={() => setStep(2)}
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="step-content">
                <h3>Elige Fecha y Hora</h3>
                <div className="datetime-form">
                  <div className="input-group">
                    <label>Fecha</label>
                    <input 
                      type="date" 
                      onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                    />
                  </div>
                  <div className="time-grid">
                    {times.map(t => (
                      <button 
                        key={t}
                        className={`time-chip ${bookingData.time === t ? 'selected' : ''}`}
                        onClick={() => setBookingData({...bookingData, time: t})}
                      >
                        <Clock size={16} />
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between' }}>
                  <button className="btn-secondary" onClick={() => setStep(1)}>Atrás</button>
                  <button 
                    className="btn-primary" 
                    disabled={!bookingData.date || !bookingData.time}
                    onClick={handleBooking}
                  >
                    Confirmar Reserva
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="step-content success-view">
                <CheckCircle size={80} color="var(--primary)" />
                <h2>¡Cita Reservada Exitosamente!</h2>
                <p>Hemos enviado los detalles a tu correo electrónico.</p>
                <div className="summary glass-card">
                  <p><strong>Servicio:</strong> {bookingData.service}</p>
                  <p><strong>Fecha:</strong> {bookingData.date}</p>
                  <p><strong>Hora:</strong> {bookingData.time}</p>
                </div>
                <button className="btn-primary" onClick={() => setStep(1)}>Nueva Reserva</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .dashboard { padding: 60px 0; background: #050505; }
        .dashboard-header { margin-bottom: 50px; text-align: center; }
        .dashboard-header h1 { font-size: 3rem; margin-bottom: 10px; }

        .steps-indicator {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 30px;
        }
        .step {
          padding: 10px 20px;
          border-bottom: 3px solid var(--surface-accent);
          color: var(--text-muted);
          font-weight: 700;
          transition: 0.3s;
        }
        .step.active {
          color: var(--primary);
          border-color: var(--primary);
        }

        .booking-content { padding: 50px; max-width: 800px; margin: 0 auto; }
        
        .selection-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 15px;
          margin-top: 20px;
        }
        .select-card {
          background: var(--surface-accent);
          padding: 25px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          border: 2px solid transparent;
          color: white;
        }
        .select-card.selected {
          border-color: var(--primary);
          background: rgba(230,0,0,0.1);
        }

        .datetime-form { margin-top: 20px; }
        .time-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 20px;
        }
        .time-chip {
          padding: 10px 20px;
          background: var(--surface-accent);
          border-radius: 30px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: white;
          border: 1px solid var(--border);
        }
        .time-chip.selected {
          background: var(--primary);
          border-color: var(--primary);
        }

        .success-view {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }
        .summary {
          text-align: left;
          padding: 25px;
          width: 100%;
          margin: 20px 0;
        }
      `}} />
    </div>
  );
};

export default UserDashboard;
