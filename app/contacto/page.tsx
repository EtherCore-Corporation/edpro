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
                <div className="info-card" data-reveal>
                  <h3>Que pasa en la llamada?</h3>
                  <p>Te llama una persona del equipo, revisamos tu zona y tu caso.</p>
                </div>
                <div className="info-card" data-reveal>
                  <h3>Y si no me convence?</h3>
                  <p>No pasa nada. Te quedas la informacion y listo.</p>
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
