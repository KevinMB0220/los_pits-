import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Terms = () => {
  return (
    <div className="legal-page">
      <Navbar />
      <div className="container legal-container">
        <span className="badge-red">Legal</span>
        <h1>Términos de <span className="text-red">Servicio</span></h1>
        <div className="legal-content">
          <p className="last-updated">Última actualización: Mayo 2026</p>

          <section>
            <h2>1. Aceptación de los Términos</h2>
            <p>
              Al acceder y utilizar el sitio web de <strong>Los Pits</strong> y nuestros servicios de detallado automotriz, usted acepta cumplir y estar sujeto a los siguientes términos y condiciones de servicio.
            </p>
          </section>

          <section>
            <h2>2. Reservaciones y Citas</h2>
            <p>
              Las citas deben ser agendadas a través de nuestra plataforma oficial. Nos reservamos el derecho de reprogramar citas debido a condiciones climáticas adversas o situaciones de fuerza mayor que afecten la calidad del servicio.
            </p>
          </section>

          <section>
            <h2>3. Responsabilidad del Cliente</h2>
            <p>
              El cliente debe retirar todos los objetos de valor del vehículo antes de entregarlo para el servicio. Los Pits no se hace responsable por la pérdida de artículos no declarados previamente.
            </p>
          </section>

          <section>
            <h2>4. Garantía de Calidad</h2>
            <p>
              Nos esforzamos por la excelencia. Si no está satisfecho con el resultado, debe informarlo al momento de la entrega del vehículo para que podamos realizar los ajustes necesarios.
            </p>
          </section>

          <section>
            <h2>5. Propiedad Intelectual</h2>
            <p>
              Todo el contenido de este sitio web, incluyendo textos, gráficos y logotipos, es propiedad de Los Pits y está protegido por las leyes de propiedad intelectual.
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
        .text-red { color: var(--primary); }
      `}} />
    </div>
  );
};

export default Terms;
