"use client";

import { useEffect, useRef, useState } from "react";

type FeedItem = {
  title: string;
  text: string;
};

const feedItems: FeedItem[] = [
  { title: "Nuevo presupuesto", text: "Mudanza Madrid -> Toledo - hace 3 min" },
  { title: "Nueva empresa", text: "Mudanzas Beltran (Bilbao) acaba de empezar - hace 8 min" },
  { title: "Nuevo presupuesto", text: "Piso 80m2 en Valencia - hace 12 min" },
  { title: "Plaza ocupada", text: "Sevilla - quedan 2 plazas en la provincia - hace 14 min" },
  { title: "Nuevo presupuesto", text: "Oficina en Bilbao - hace 19 min" },
  { title: "Cliente cerrado", text: "Mudanzas Garcia firma su 4a mudanza esta semana - hace 22 min" },
];

const targetOffset = (2 * 86400000) + (14 * 3600000) + (37 * 60000) + 12000;

function useCountdown() {
  const targetRef = useRef<number | null>(null);
  const [parts, setParts] = useState({ d: "02", h: "14", m: "37", s: "12" });

  useEffect(() => {
    if (targetRef.current === null) {
      targetRef.current = Date.now() + targetOffset;
    }

    const tick = () => {
      let diff = Math.max(0, (targetRef.current ?? Date.now()) - Date.now());
      const d = Math.floor(diff / 86400000);
      diff -= d * 86400000;
      const h = Math.floor(diff / 3600000);
      diff -= h * 3600000;
      const m = Math.floor(diff / 60000);
      diff -= m * 60000;
      const s = Math.floor(diff / 1000);

      setParts({
        d: String(d).padStart(2, "0"),
        h: String(h).padStart(2, "0"),
        m: String(m).padStart(2, "0"),
        s: String(s).padStart(2, "0"),
      });
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return parts;
}

export function UrgencyCountdown() {
  const { d, h, m, s } = useCountdown();

  return (
    <span className="countdown" aria-live="polite">
      <span className="countdown-label">Cierre de plazas en</span>
      <b>{d}</b>d <b>{h}</b>h <b>{m}</b>m <b>{s}</b>s
    </span>
  );
}

export function LiveFeed() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % feedItems.length);
    }, 3600);
    return () => window.clearInterval(id);
  }, []);

  const item = feedItems[index];

  return (
    <div className="live-feed" data-reveal>
      <span className="live-pulse" aria-hidden="true" />
      <div className="feed-content">
        <div className="feed-row">
          <strong>{item.title}</strong> - {item.text}
        </div>
      </div>
      <span className="spots-live" style={{ color: "var(--texto-suave)" }}>
        +1.300 presupuestos enviados este mes
      </span>
    </div>
  );
}

export function RevenueCalculator() {
  const [now, setNow] = useState(8);
  const [price, setPrice] = useState(650);
  const [leads, setLeads] = useState(30);
  const [rate, setRate] = useState(28);

  const newMudanzas = (leads * rate) / 100;
  const extra = newMudanzas * price;
  const cost = leads * 9;
  const currentRev = now * price;

  const fmt = (n: number) => new Intl.NumberFormat("es-ES").format(Math.round(n));

  return (
    <div className="calc-grid">
      <div className="calc-panel" data-reveal>
        <div className="calc-row">
          <div className="calc-label">Cuantas mudanzas cierras al mes hoy? <span className="calc-val">{now}</span></div>
          <input type="range" min={0} max={40} value={now} className="calc-slider" onChange={(e) => setNow(Number(e.target.value))} />
        </div>
        <div className="calc-row">
          <div className="calc-label">Precio medio por mudanza <span className="calc-val">{price}EUR</span></div>
          <input type="range" min={200} max={2500} step={50} value={price} className="calc-slider" onChange={(e) => setPrice(Number(e.target.value))} />
        </div>
        <div className="calc-row">
          <div className="calc-label">Presupuestos que aceptarias al mes <span className="calc-val">{leads}</span></div>
          <input type="range" min={10} max={120} step={5} value={leads} className="calc-slider" onChange={(e) => setLeads(Number(e.target.value))} />
        </div>
        <div className="calc-row">
          <div className="calc-label">Porcentaje que cierras de los que llegan <span className="calc-val">{rate}%</span></div>
          <input type="range" min={10} max={60} value={rate} className="calc-slider" onChange={(e) => setRate(Number(e.target.value))} />
        </div>
      </div>

      <div className="calc-result" data-reveal>
        <span className="calc-result-label">Tu facturacion con edpro</span>
        <div className="calc-big">{fmt(extra)}EUR<sub>al mes extra</sub></div>
        <div className="calc-breakdown">
          <div>
            <div className="calc-cell-label">Mudanzas nuevas/mes</div>
            <div className="calc-cell-val teal">{newMudanzas.toFixed(1).replace(".", ",")}</div>
          </div>
          <div>
            <div className="calc-cell-label">Coste edpro estimado</div>
            <div className="calc-cell-val">{fmt(cost)}EUR</div>
          </div>
          <div>
            <div className="calc-cell-label">Facturacion actual</div>
            <div className="calc-cell-val">{fmt(currentRev)}EUR</div>
          </div>
          <div>
            <div className="calc-cell-label">Total con edpro</div>
            <div className="calc-cell-val teal">{fmt(currentRev + extra)}EUR</div>
          </div>
        </div>
      </div>
    </div>
  );
}
