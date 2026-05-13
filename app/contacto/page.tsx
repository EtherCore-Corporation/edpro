import Image from "next/image";
import { BookingCalendar } from "@/components/site/booking-calendar";
import { SiteFooter, SiteHeader } from "@/components/site/chrome";

export default function ContactoPage() {
  return (
    <>
      <div className="urgency-bar">
        <div className="container">
          <span style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}><span className="urgency-pulse" />Hoy quedan <strong>7 huecos</strong> para llamadas de presentacion</span>
        </div>
      </div>
      <SiteHeader />
      <main>
        <section className="page-header">
          <div className="container">
            <span className="eyebrow"><span className="dot" />Reserva tu llamada</span>
            <h1 style={{ marginTop: "16px" }}>Elige dia. Elige hora. Te llamamos.</h1>
            <p className="lead" style={{ marginTop: "20px" }}>15 minutos. Sin guion comercial.</p>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="booking-grid">
              <aside className="booking-info">
                <div className="director-card" data-reveal>
                  <Image
                    className="director-photo"
                    src="https://msqgtohbpexxlgzainqx.supabase.co/storage/v1/object/sign/jorge/jorge_seo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iOTU4NDRhZi04ZTM1LTRkMTAtYmZiNi0wZGJiYzU1MDA3MTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJqb3JnZS9qb3JnZV9zZW8ucG5nIiwiaWF0IjoxNzc4Njk1MTQ5LCJleHAiOjE5MzYzNzUxNDl9.rNncw1avaAiEKWy0g7zTtrR0OTGoE6FVipggTOOmYC8"
                    alt="Jorge Roldan, director"
                    width={800}
                    height={600}
                    loading="lazy"
                  />
                  <div className="director-copy">
                    <strong>Jorge Roldan</strong>
                    <span>Director</span>
                  </div>
                </div>
                <div className="info-card" data-reveal>
                  <h3>Que pasa en la llamada?</h3>
                  <p>Te llama una persona del equipo, revisamos tu zona y tu caso.</p>
                </div>
                <div className="info-card" data-reveal>
                  <h3>Y si no me convence?</h3>
                  <p>No pasa nada. Te quedas la informacion y listo.</p>
                </div>
                <div className="info-card" data-reveal>
                  <h3>Prefieres hablar por email o telefono?</h3>
                  <p>Email: <a className="link-anim" href="mailto:j.roldan@estudiodigitalpro.com">j.roldan@estudiodigitalpro.com</a></p>
                  <p>Telefono: <a className="link-anim" href="tel:+34643168396">643168396</a></p>
                </div>
                <div className="info-trust" data-reveal>
                  <h3>Lo que prometemos</h3>
                  <div className="info-trust-item">Puntualidad en la llamada.</div>
                  <div className="info-trust-item">Cero tecnicismos.</div>
                  <div className="info-trust-item">Sin presion comercial.</div>
                  <div className="info-trust-item">Numero espanol, sin spam.</div>
                </div>
              </aside>

              <BookingCalendar />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
