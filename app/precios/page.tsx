import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site/chrome";

export default function PreciosPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-header">
          <div className="container">
            <span className="eyebrow"><span className="dot" />Precios honestos</span>
            <h1 style={{ marginTop: "16px" }}>El primer mes es gratis. El segundo, tu decides.</h1>
            <p className="lead" style={{ marginTop: "20px" }}>Sin cuotas sorpresa, sin packs con letra pequena.</p>
          </div>
        </section>

        <section className="section pricing-section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="pricing-grid">
              <div className="pricing-card">
                <div className="price-label">Mes 1 - Prueba real</div>
                <div className="price-amount">0EUR<sub>completos</sub></div>
                <div className="price-sub">Te montamos la web y te llegan presupuestos sin sacar la tarjeta.</div>
                <ul className="pricing-list">
                  <li>Web profesional incluida</li>
                  <li>Anuncios activos en tu zona</li>
                  <li>Avisos por WhatsApp</li>
                  <li>Si no funciona, no pagas</li>
                </ul>
                <Link href="/contacto" className="btn btn-dark">Empezar gratis</Link>
              </div>

              <div className="pricing-card featured">
                <span className="ribbon">Lo mas elegido</span>
                <div className="price-label">Mes 2 en adelante</div>
                <div className="price-amount">Tu eliges<sub>volumen</sub></div>
                <div className="price-sub">Decides cuantos presupuestos quieres recibir al mes.</div>
                <ul className="pricing-list">
                  <li>Pagas por presupuesto, no por suerte</li>
                  <li>Si no contesta, no cuenta</li>
                  <li>Subes o bajas el volumen cuando quieras</li>
                  <li>Sin contrato</li>
                </ul>
                <Link href="/contacto" className="btn btn-primary">Habla con nosotros</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
