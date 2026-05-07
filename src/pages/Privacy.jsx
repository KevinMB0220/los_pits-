import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Privacy = () => {
  return (
    <div className="legal-page">
      <Navbar />
      <div className="container legal-container">
        <span className="badge-red">Legal</span>
        <h1>Política de <span className="text-red">Privacidad</span></h1>
        <div className="legal-content">
          <p className="last-updated">Última actualización: Mayo 2026</p>

          <section>
            <h2>1. Introducción</h2>
            <p>
              En <strong>Los Pits</strong>, valoramos su privacidad y estamos comprometidos a proteger sus datos personales. Esta política de privacidad describe cómo recopilamos, utilizamos y compartimos su información cuando visita nuestro sitio web o utiliza nuestros servicios.
            </p>
          </section>

          <section>
            <h2>2. Información que recopilamos</h2>
            <p>
              Recopilamos información que usted nos proporciona directamente, como su nombre, dirección de correo electrónico, número de teléfono y detalles del vehículo cuando reserva una cita o se une a nuestra membresía VIP.
            </p>
          </section>

          <section>
            <h2>3. Uso de la información</h2>
            <p>
              Utilizamos la información recopilada para:
            </p>
            <ul>
              <li>Gestionar y confirmar sus citas de detallado automotriz.</li>
              <li>Enviar comunicaciones relacionadas con el servicio y ofertas exclusivas.</li>
              <li>Mejorar la experiencia del usuario en nuestro sitio web.</li>
              <li>Garantizar la seguridad de nuestros servicios.</li>
            </ul>
          </section>

          <section>
            <h2>4. Protección de datos</h2>
            <p>
              Implementamos medidas de seguridad técnicas y organizativas para proteger sus datos personales contra el acceso no autorizado, la pérdida o la alteración. Sus datos son tratados con la máxima confidencialidad.
            </p>
          </section>

          <section>
            <h2>5. Sus derechos</h2>
            <p>
              Usted tiene derecho a acceder, rectificar o eliminar sus datos personales en cualquier momento. Para ejercer estos derechos, puede contactarnos a través de info@lospits.com.
            </p>
          </section>
        </div>
      </div>
      <Footer />

      <style dangerouslySetInnerHTML={{ __html: `
        .legal-page { background: #000; min-height: 100vh; color: white; }
        .legal-container { padding: 120px 20px 80px; max-width: 900px; }
        .legal-container h1 { font-size: clamp(2.5rem, 8vw, 4rem); margin: 20px 0 40px; font-weight: 900; }
        .legal-content { line-height: 1.8; color: #ccc; }
        .last-updated { font-style: italic; color: #666; margin-bottom: 40px; }
        .legal-content section { margin-bottom: 40px; }
        .legal-content h2 { color: white; margin-bottom: 20px; font-size: 1.5rem; }
        .legal-content ul { padding-left: 20px; margin-top: 10px; }
        .legal-content ul li { margin-bottom: 10px; }
        .text-red { color: var(--primary); }
      `}} />
    </div>
  );
};

export default Privacy;
