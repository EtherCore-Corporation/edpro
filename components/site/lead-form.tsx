"use client";

import { FormEvent, useState } from "react";

type LeadFormProps = {
  className?: string;
};

export function LeadForm({ className }: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("loading");
    setErrorMessage(null);

    try {
      const payload = {
        name: String(formData.get("name") ?? ""),
        phone: String(formData.get("phone") ?? ""),
        city: String(formData.get("city") ?? ""),
        source: "home_cta",
      };

      const res = await fetch("/api/leads", {
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
      setTimeout(() => setStatus("idle"), 3500);
    } catch (error) {
      if (error instanceof Error && error.message) {
        setErrorMessage(error.message === "request_failed" ? "No hemos podido guardar tus datos" : error.message);
      }
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3500);
    }
  }

  return (
    <form className={className} onSubmit={onSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="f-name">Nombre</label>
        <input id="f-name" name="name" type="text" placeholder="Tu nombre" required />
      </div>
      <div className="form-group">
        <label htmlFor="f-phone">Telefono</label>
        <input id="f-phone" name="phone" type="tel" placeholder="643168396" required />
      </div>
      <div className="form-group">
        <label htmlFor="f-city">Ciudad donde trabajas</label>
        <input id="f-city" name="city" type="text" placeholder="Madrid, Barcelona..." required />
      </div>
      <button type="submit" className="btn btn-primary btn-lg" disabled={status === "loading"}>
        {status === "loading" ? "Enviando..." : status === "ok" ? "Listo, te llamamos pronto" : status === "error" ? "Error, prueba otra vez" : "Quiero empezar gratis"}
      </button>
      {errorMessage && <p className="form-note" style={{ color: "#B91C1C" }}>{errorMessage}</p>}
      <p className="form-note">Te llamamos en menos de 24 horas. Sin compromiso.</p>
    </form>
  );
}
