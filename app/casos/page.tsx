import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site/chrome";

export default function CasosPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-header">
          <div className="container">
            <span className="eyebrow"><span className="dot" />Casos reales</span>
            <h1 style={{ marginTop: "16px" }}>Empresas que ya tienen el telefono sonando.</h1>
            <p className="lead" style={{ marginTop: "20px" }}>Sin retoques, sin promesas vacias.</p>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="cases-grid" style={{ marginTop: "24px" }}>
              <article className="case-card"><div className="case-head"><div className="case-avatar">MG</div><div className="case-meta"><strong>Mudanzas Garcia</strong><span>Sevilla - 2 furgonetas</span></div></div><p>Empezo con nosotros en septiembre y ahora recibe presupuestos diarios.</p><blockquote className="case-quote">Ahora me llegan 3 o 4 al dia pidiendo precio.</blockquote></article>
              <article className="case-card"><div className="case-head"><div className="case-avatar">TR</div><div className="case-meta"><strong>Transportes Ruiz</strong><span>Madrid - 5 furgonetas</span></div></div><p>En la segunda semana ya tenia 11 presupuestos nuevos.</p><blockquote className="case-quote">Llevo 8 meses y funciona.</blockquote></article>
              <article className="case-card"><div className="case-head"><div className="case-avatar">AM</div><div className="case-meta"><strong>Mudanzas Martin</strong><span>Valencia - 3 furgonetas</span></div></div><p>Combinan WhatsApp y llamadas para cerrar mas mudanzas cada mes.</p><blockquote className="case-quote">Mas facil imposible.</blockquote></article>
              <article className="case-card"><div className="case-head"><div className="case-avatar">JB</div><div className="case-meta"><strong>Mudanzas Beltran</strong><span>Bilbao - 1 furgoneta</span></div></div><p>Arranco con el plan pequeno y lleno agenda en 3 meses.</p><blockquote className="case-quote">Me quite la angustia en semanas.</blockquote></article>
            </div>
          </div>
        </section>

        <section className="section cta-final">
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto" }}>
              <h2 style={{ color: "var(--blanco)" }}>Y si tu empresa fuera el siguiente caso?</h2>
              <p className="lead" style={{ color: "rgba(255,255,255,0.75)", marginTop: "16px", marginBottom: "28px" }}>
                Empieza gratis. Si funciona, hablamos.
              </p>
              <Link href="/contacto" className="btn btn-primary btn-lg">Quiero estar aqui el ano que viene</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
