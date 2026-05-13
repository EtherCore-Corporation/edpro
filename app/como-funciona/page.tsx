import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site/chrome";

export default function ComoFuncionaPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-header">
          <div className="container">
            <span className="eyebrow"><span className="dot" />Como funciona</span>
            <h1 style={{ marginTop: "16px" }}>Tu negocio es dar presupuestos. El nuestro es traertelos.</h1>
            <p className="lead" style={{ marginTop: "20px" }}>No tienes que aprender de internet. No tienes que contratar a nadie.</p>
          </div>
        </section>

        <section className="process-section">
          <div className="container">
            <div className="process-row">
              <div className="process-text">
                <div className="process-step-num">Paso 01 - Dia 1 al 7</div>
                <h2>Te montamos la web. Gratis.</h2>
                <p>Hablamos contigo media hora. Con eso preparamos una web profesional para tu empresa.</p>
                <ul>
                  <li>Tu logo, tus colores, tus servicios</li>
                  <li>Tu telefono y WhatsApp bien visibles</li>
                  <li>Lista para aparecer en Google</li>
                  <li>Tu la apruebas antes de publicarla</li>
                </ul>
              </div>
              <div className="process-visual" />
            </div>

            <div className="process-row reverse">
              <div className="process-text">
                <div className="process-step-num">Paso 02 - Dia 8 en adelante</div>
                <h2>Aparecemos donde la gente busca mudanzas.</h2>
                <p>Cuando alguien busca mudanzas en tu zona, nos encargamos de que tu negocio salga.</p>
                <ul>
                  <li>Anuncios en Google y redes</li>
                  <li>Posicionamiento natural en tu zona</li>
                  <li>Solo gente con intencion real</li>
                  <li>Sin que tengas que tocar nada</li>
                </ul>
              </div>
              <div className="process-visual" />
            </div>

            <div className="process-row">
              <div className="process-text">
                <div className="process-step-num">Paso 03 - Cada dia</div>
                <h2>Te llegan los datos por WhatsApp.</h2>
                <p>Quien quiere mudarse rellena un formulario. Te llega nombre, telefono, detalles y fecha.</p>
                <ul>
                  <li>Llamas tu, das precio y cierras</li>
                  <li>Sin intermediarios ni comisiones</li>
                  <li>Si no contestan, te avisamos</li>
                  <li>Todo queda guardado</li>
                </ul>
              </div>
              <div className="process-visual" />
            </div>
          </div>
        </section>

        <section className="section cta-final">
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto" }}>
              <h2 style={{ color: "var(--blanco)" }}>Empieza esta semana. Sin pagar nada.</h2>
              <p className="lead" style={{ color: "rgba(255,255,255,0.75)", marginTop: "16px", marginBottom: "28px" }}>
                Te llamamos, te explicamos en 15 minutos y decides tu.
              </p>
              <Link href="/contacto" className="btn btn-primary btn-lg">Quiero empezar gratis</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
