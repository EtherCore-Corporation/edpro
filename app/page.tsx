import Link from "next/link";
import Image from "next/image";
import { LiveFeed, RevenueCalculator, UrgencyCountdown } from "@/components/site/home-interactive";
import { LeadForm } from "@/components/site/lead-form";
import { SiteFooter, SiteHeader } from "@/components/site/chrome";

export default function Home() {
  return (
    <>
      <div className="urgency-bar" role="region" aria-label="Plazas disponibles">
        <div className="container">
          <span className="urgency-text" style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
            <span className="urgency-pulse" />Solo aceptamos <strong>3 empresas nuevas</strong> esta semana en cada provincia
          </span>
          <span className="sep">-</span>
          <UrgencyCountdown />
        </div>
      </div>

      <SiteHeader />

      <main>
        <section className="hero">
          <div className="hero-blob" aria-hidden="true" />
          <div className="container hero-inner">
            <div className="hero-text">
              <span className="eyebrow"><span className="dot" />Mudanzas - Espana</span>
              <h1>Tu telefono suena.<br />Son clientes pidiendo presupuesto.</h1>
              <p className="lead" style={{ marginTop: "20px", maxWidth: "540px" }}>
                Conseguimos personas que quieren mudarse y las mandamos directamente a tu negocio. La web es gratis. El primer mes tambien.
              </p>
              <div className="hero-cta-row">
                <Link href="/contacto" className="btn btn-primary btn-lg">Empieza gratis</Link>
                <Link href="/como-funciona" className="btn btn-ghost">Ver como funciona</Link>
              </div>
              <div className="hero-meta">
                <div className="hero-meta-item">Sin contrato</div>
                <div className="hero-meta-item">Sin permanencia</div>
                <div className="hero-meta-item">Pagas solo si funciona</div>
              </div>
            </div>

            <div className="phone-wrap">
              <div className="phone">
                <div className="phone-screen">
                  <div className="phone-time">9:41 - martes 12 mayo</div>
                  <div className="notif">
                    <div className="notif-icon">W</div>
                    <div className="notif-body">
                      <div className="notif-head"><span className="notif-app">WhatsApp - edpro</span><span className="notif-time">ahora</span></div>
                      <div className="notif-title">Nuevo presupuesto</div>
                      <div className="notif-msg">Mudanza Madrid - Barcelona, 3 dormitorios. Telefono incluido.</div>
                    </div>
                  </div>
                  <div className="notif">
                    <div className="notif-icon">W</div>
                    <div className="notif-body">
                      <div className="notif-head"><span className="notif-app">WhatsApp - edpro</span><span className="notif-time">9:38</span></div>
                      <div className="notif-title">Nuevo presupuesto</div>
                      <div className="notif-msg">Piso 80m2 en Valencia, mudanza local urgente.</div>
                    </div>
                  </div>
                  <div className="notif">
                    <div className="notif-icon">W</div>
                    <div className="notif-body">
                      <div className="notif-head"><span className="notif-app">WhatsApp - edpro</span><span className="notif-time">9:15</span></div>
                      <div className="notif-title">Nuevo presupuesto</div>
                      <div className="notif-msg">Oficina, traslado en Sevilla. Quiere precio hoy.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-tight" style={{ paddingTop: "20px", background: "var(--fondo)" }}>
          <div className="container">
            <div className="director-highlight" data-reveal>
              <Image
                className="director-highlight-photo"
                src="https://msqgtohbpexxlgzainqx.supabase.co/storage/v1/object/sign/jorge/jorge_seo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iOTU4NDRhZi04ZTM1LTRkMTAtYmZiNi0wZGJiYzU1MDA3MTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJqb3JnZS9qb3JnZV9zZW8ucG5nIiwiaWF0IjoxNzc4Njk1MTQ5LCJleHAiOjE5MzYzNzUxNDl9.rNncw1avaAiEKWy0g7zTtrR0OTGoE6FVipggTOOmYC8"
                alt="Jorge Roldan, socio"
                width={560}
                height={560}
                unoptimized
                loading="lazy"
              />
              <div>
                <span className="eyebrow"><span className="dot" />Tu socio estrategico</span>
                <h3 style={{ marginTop: "14px", marginBottom: "8px" }}>Hablaras con Jorge Roldan, socio de la empresa</h3>
                <p style={{ fontSize: "15px" }}>Te atiende personalmente para revisar tu zona y darte un plan realista.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="spots-strip">
          <div className="container spots-row">
            <div className="spots-text">
              <span className="spots-live"><span className="pulse" />En directo</span>
              <span>- Esta semana <strong>11 de 14</strong> plazas ocupadas en Espana</span>
            </div>
            <div className="spots-track" aria-hidden="true"><div className="spots-fill" /></div>
            <div className="spots-live"><strong style={{ color: "var(--teal)", fontFamily: "Sora, sans-serif" }}>3 plazas</strong>&nbsp;libres</div>
          </div>
        </section>

        <section className="section-tight" style={{ background: "var(--blanco)" }}>
          <div className="container">
            <div className="section-head" data-reveal>
              <span className="eyebrow"><span className="dot" />2 minutos</span>
              <h2>Ve como funciona en video</h2>
              <p className="lead">Sin tecnicismos. Una empresa real contando como le llegan los presupuestos cada manana.</p>
            </div>
            <div style={{ maxWidth: "900px", margin: "48px auto 0" }} data-reveal>
              <div className="video-wrap" role="button" aria-label="Reproducir video de demostracion">
                <div className="video-grid" aria-hidden="true" />
                <span className="video-badge"><span className="live-dot" />Caso real</span>
                <span className="video-duration">02:14</span>
                <div className="video-play">
                  <div className="video-play-btn">▶</div>
                  <div className="video-caption">Caso real: como monte la web y empezaron a llegar mudanzas</div>
                  <div className="video-sub">Manolo Garcia - Mudanzas Garcia, Sevilla</div>
                </div>
              </div>
            </div>
            <LiveFeed />
          </div>
        </section>

        <section className="proof-bar">
          <div className="container proof-inner">
            <div className="proof-text"><strong>+47 empresas</strong> de mudanzas en Espana ya reciben presupuestos cada semana</div>
            <div className="marquee" aria-hidden="true">
              <div className="marquee-track">
                <span className="marquee-item">Madrid</span><span className="marquee-item">Barcelona</span><span className="marquee-item">Valencia</span><span className="marquee-item">Sevilla</span><span className="marquee-item">Bilbao</span><span className="marquee-item">Malaga</span><span className="marquee-item">Zaragoza</span><span className="marquee-item">Murcia</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow"><span className="dot" />Asi de sencillo</span>
              <h2>Tres pasos. Sin tecnicismos.</h2>
              <p className="lead">No hace falta que entiendas de internet. Nosotros hacemos el trabajo digital, tu das los presupuestos.</p>
            </div>
            <div className="steps">
              <article className="step"><span className="step-num">1</span><div className="step-icon">1</div><h3>Te hacemos la web gratis</h3><p>Disenamos tu web con tus colores, tu logo y tus servicios. Sin coste.</p></article>
              <article className="step"><span className="step-num">2</span><div className="step-icon">2</div><h3>Captamos a quien busca mudarse</h3><p>Aparecemos donde la gente busca mudanzas y piden informacion.</p></article>
              <article className="step"><span className="step-num">3</span><div className="step-icon">3</div><h3>Te llegan sus datos para presupuestar</h3><p>Recibes aviso por WhatsApp con nombre, telefono y detalles.</p></article>
            </div>
          </div>
        </section>

        <section className="section calc-section" id="calculadora">
          <div className="container">
            <div className="section-head" data-reveal>
              <span className="eyebrow"><span className="dot" />Calculadora</span>
              <h2>Cuanto puedes facturar al mes con edpro</h2>
              <p className="lead">Mueve las barras segun tu negocio.</p>
            </div>
            <RevenueCalculator />
          </div>
        </section>

        <section className="section testimonials">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow on-dark"><span className="dot" />Lo que nos dicen</span>
              <h2>Empresas reales. Mudanzas reales.</h2>
            </div>
            <div className="testi-grid">
              <article className="testi" data-reveal><div className="testi-stars">★★★★★</div><blockquote className="testi-quote">Antes esperaba que me llamaran. Ahora me llegan 3 o 4 al dia pidiendo precio.</blockquote><div className="testi-author"><div className="testi-avatar">MG</div><div className="testi-meta"><strong>Manolo Garcia</strong><span>Mudanzas Garcia - Sevilla</span></div></div></article>
              <article className="testi" data-reveal><div className="testi-stars">★★★★★</div><blockquote className="testi-quote">Pensaba que era otra agencia mas. Llevo 8 meses y no he firmado nada. Funciona.</blockquote><div className="testi-author"><div className="testi-avatar">JR</div><div className="testi-meta"><strong>Javier Ruiz</strong><span>Transportes Ruiz - Madrid</span></div></div></article>
              <article className="testi" data-reveal><div className="testi-stars">★★★★★</div><blockquote className="testi-quote">Mi hijo lleva el WhatsApp y yo doy presupuestos. Mas facil imposible.</blockquote><div className="testi-author"><div className="testi-avatar">AM</div><div className="testi-meta"><strong>Antonio Martin</strong><span>Mudanzas Martin - Valencia</span></div></div></article>
            </div>
          </div>
        </section>

        <section className="section cta-final">
          <div className="container">
            <div className="section-head" style={{ textAlign: "left", margin: 0 }}>
              <span className="eyebrow on-dark"><span className="dot" />Empieza esta semana</span>
              <h2 style={{ marginTop: "16px" }}>Cuantos presupuestos quieres recibir esta semana?</h2>
            </div>
            <div className="cta-grid">
              <div className="cta-points">
                <div className="cta-point"><div><strong>Te llamamos en 24 horas</strong><span>Una persona real, no un robot.</span></div></div>
                <div className="cta-point"><div><strong>Sin compromiso</strong><span>Si no te convence, no pasa nada.</span></div></div>
                <div className="cta-point"><div><strong>Web lista en 7 dias</strong><span>Tu nos cuentas, nosotros lo montamos todo.</span></div></div>
              </div>
              <LeadForm className="cta-form" />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
