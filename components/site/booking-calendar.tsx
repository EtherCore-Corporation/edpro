"use client";

import { FormEvent, useMemo, useState } from "react";

type Slot = {
  time: string;
  taken: boolean;
  few: boolean;
};

const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const weekdays = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
const baseSlots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"];

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function slotsForDay(iso: string): Slot[] {
  const seed = iso.split("-").reduce((acc, part) => acc + Number(part), 0);
  return baseSlots.map((time, index) => {
    const taken = (seed * (index + 3)) % 5 === 0;
    const few = !taken && (seed * (index + 7)) % 9 === 0;
    return { time, taken, few };
  });
}

function buildAvailableDays(today: Date) {
  const availableDays = new Set<string>();
  const cursor = new Date(today);
  let count = 0;

  while (count < 18) {
    const dow = cursor.getDay();
    if (dow !== 0 && dow !== 6) {
      availableDays.add(toIsoDate(cursor));
      count += 1;
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  return availableDays;
}

export function BookingCalendar() {
  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [takenSlots, setTakenSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const availableDays = useMemo(() => buildAvailableDays(today), [today]);

  const dayCells = useMemo(() => {
    const first = new Date(viewYear, viewMonth, 1);
    const offset = (first.getDay() + 6) % 7;
    const totalDays = new Date(viewYear, viewMonth + 1, 0).getDate();

    const cells: Array<{ key: string; day?: number; iso?: string; disabled?: boolean; today?: boolean; selected?: boolean; available?: boolean }> = [];

    for (let i = 0; i < offset; i += 1) {
      cells.push({ key: `empty-${i}`, disabled: true });
    }

    for (let day = 1; day <= totalDays; day += 1) {
      const date = new Date(viewYear, viewMonth, day);
      const iso = toIsoDate(date);
      const isPast = date < today;
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const available = availableDays.has(iso) && !isPast && !isWeekend;

      cells.push({
        key: iso,
        day,
        iso,
        disabled: !available,
        available,
        today: date.getTime() === today.getTime(),
        selected: selectedDay === iso,
      });
    }

    return cells;
  }, [availableDays, selectedDay, today, viewMonth, viewYear]);

  const slotItems = selectedDay
    ? slotsForDay(selectedDay).map((slot) => ({
        ...slot,
        taken: slot.taken || takenSlots.includes(slot.time),
      }))
    : [];

  const selectedDateLabel = useMemo(() => {
    if (!selectedDay) return "";
    const date = new Date(selectedDay);
    return `${date.getDate()} de ${months[date.getMonth()].toLowerCase()}`;
  }, [selectedDay]);

  const selectedDateLong = useMemo(() => {
    if (!selectedDay) return "";
    const date = new Date(selectedDay);
    return `${weekdays[date.getDay()]} ${date.getDate()} de ${months[date.getMonth()].toLowerCase()}`;
  }, [selectedDay]);

  function previousMonth() {
    setSelectedSlot(null);
    setViewMonth((current) => {
      if (current === 0) {
        setViewYear((year) => year - 1);
        return 11;
      }
      return current - 1;
    });
  }

  function nextMonth() {
    setSelectedSlot(null);
    setViewMonth((current) => {
      if (current === 11) {
        setViewYear((year) => year + 1);
        return 0;
      }
      return current + 1;
    });
  }

  async function loadTakenSlots(dayIso: string) {
    setSlotsLoading(true);

    try {
      const res = await fetch(`/api/bookings?date=${encodeURIComponent(dayIso)}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("slots_fetch_failed");
      const data = (await res.json()) as { takenSlots?: string[] };
      setTakenSlots(Array.isArray(data.takenSlots) ? data.takenSlots : []);
    } catch {
      setTakenSlots([]);
    } finally {
      setSlotsLoading(false);
    }
  }

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedDay || !selectedSlot) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("loading");
    setErrorMessage(null);

    try {
      const payload = {
        name: String(formData.get("name") ?? ""),
        phone: String(formData.get("phone") ?? ""),
        company: String(formData.get("company") ?? ""),
        bookingDate: selectedDay,
        bookingTime: selectedSlot,
      };

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "request_failed");
      }

      form.reset();
      setStatus("ok");
      setSelectedSlot(null);
      await loadTakenSlots(selectedDay);
      setTimeout(() => setStatus("idle"), 3500);
    } catch (error) {
      if (error instanceof Error && error.message) {
        setErrorMessage(error.message === "request_failed" ? "No hemos podido guardar la reserva" : error.message);
      }
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3500);
    }
  }

  return (
    <div className="cal-shell" id="cal-shell" data-reveal>
      <div className="cal-head">
        <h3>Reserva tu llamada gratis</h3>
        <div className="cal-month">
          <button type="button" className="cal-nav" onClick={previousMonth} aria-label="Mes anterior">{"<"}</button>
          <span>{months[viewMonth]} {viewYear}</span>
          <button type="button" className="cal-nav" onClick={nextMonth} aria-label="Mes siguiente">{">"}</button>
        </div>
      </div>

      <div className="cal-weekdays">
        <span>L</span><span>M</span><span>X</span><span>J</span><span>V</span><span>S</span><span>D</span>
      </div>

      <div className="cal-days">
        {dayCells.map((cell) => (
          <span
            key={cell.key}
            className={[
              "cal-day",
              cell.disabled ? "disabled" : "",
              cell.available ? "available" : "",
              cell.today ? "today" : "",
              cell.selected ? "selected" : "",
            ].join(" ").trim()}
            onClick={() => {
              if (!cell.iso || cell.disabled) return;
              setSelectedDay(cell.iso);
              setSelectedSlot(null);
              setTakenSlots([]);
              setErrorMessage(null);
              void loadTakenSlots(cell.iso);
            }}
          >
            {cell.day ?? ""}
          </span>
        ))}
      </div>

      {selectedDay && (
        <div className="cal-slots-wrap">
          <div className="cal-slots-head">
            <h4>Horas disponibles - {selectedDateLong}</h4>
            <span className="cal-timezone">Hora peninsular - Espana</span>
          </div>
          {slotsLoading && <p className="cal-loading">Cargando disponibilidad real...</p>}
          <div className="cal-slots">
            {slotItems.map((slot) => (
              <button
                key={slot.time}
                type="button"
                className={[
                  "cal-slot",
                  slot.taken ? "taken" : "",
                  slot.few ? "few" : "",
                  !slot.taken && selectedSlot === slot.time ? "selected" : "",
                ].join(" ").trim()}
                onClick={() => {
                  if (!slot.taken) setSelectedSlot(slot.time);
                }}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={selectedDay ? "cal-summary" : "cal-summary empty"}>
        {!selectedDay && "Elige un dia para ver las horas libres."}
        {selectedDay && !selectedSlot && <span>Has elegido el <strong>{selectedDateLabel}</strong>. Elige una hora.</span>}
        {selectedDay && selectedSlot && (
          <span>Tu llamada: <strong>{selectedDateLabel} a las {selectedSlot}</strong>. Te llamamos nosotros.</span>
        )}
      </div>

      <form onSubmit={submitBooking} noValidate>
        <div className={selectedSlot ? "cal-form-fields active" : "cal-form-fields"}>
          <div className="form-group">
            <label htmlFor="b-name">Nombre</label>
            <input id="b-name" name="name" type="text" placeholder="Tu nombre" required />
          </div>
          <div className="form-group">
            <label htmlFor="b-phone">Telefono</label>
            <input id="b-phone" name="phone" type="tel" placeholder="643168396" required />
          </div>
          <div className="form-group span-2">
            <label htmlFor="b-company">Empresa de mudanzas (y ciudad)</label>
            <input id="b-company" name="company" type="text" placeholder="Mudanzas Garcia - Sevilla" required />
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-lg cal-confirm-btn" disabled={!selectedSlot || status === "loading"}>
          {status === "loading" ? "Confirmando..." : status === "ok" ? "Reserva confirmada" : status === "error" ? "Error, prueba otra vez" : "Confirmar mi llamada"}
        </button>
        {errorMessage && <p className="form-note" style={{ textAlign: "center", marginTop: "10px", color: "#B91C1C" }}>{errorMessage}</p>}
        <p className="form-note" style={{ textAlign: "center", marginTop: "14px" }}>
          Recibiras un WhatsApp de confirmacion al momento. No mandamos correos basura.
        </p>
      </form>
    </div>
  );
}
