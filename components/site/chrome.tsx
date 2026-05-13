"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
};

const navItems: NavItem[] = [
  { href: "/como-funciona", label: "Como funciona" },
  { href: "/precios", label: "Precios" },
  { href: "/casos", label: "Casos reales" },
];

function EdproLogo({ dark = false }: { dark?: boolean }) {
  const azul = dark ? "#FFFFFF" : "#1B3A5C";
  const teal = "#1A7D6F";
  const tealLight = dark ? "#5DCAA5" : "#1A7D6F";

  return (
    <svg width="118" height="32" viewBox="0 0 118 32" xmlns="http://www.w3.org/2000/svg" aria-label="edpro">
      <g>
        <line x1="9" y1="20" x2="20" y2="11" stroke={azul} strokeWidth="2" strokeLinecap="round" opacity="0.85" />
        <circle cx="9" cy="20" r="4" fill={azul} />
        <circle cx="20" cy="11" r="7" fill={tealLight} />
        <circle cx="18.4" cy="9.4" r="2.5" fill="#FFFFFF" opacity="0.35" />
      </g>
      <g fontFamily="Sora, sans-serif" fontWeight="700" fontSize="22" letterSpacing="-0.5">
        <text x="32" y="23" fill={azul}>ed</text>
        <text x="59" y="23" fill={teal}>pro</text>
        <circle cx="55" cy="10" r="3" fill={tealLight} />
      </g>
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link href="/" className="logo" aria-label="edpro inicio" onClick={() => setMenuOpen(false)}>
          <EdproLogo />
        </Link>
        <nav className="nav-links" aria-label="Principal">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={isActive ? "active" : undefined} onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Link href="/contacto" className="btn btn-primary no-mobile">
          Quiero clientes
        </Link>

        <div className="nav-mobile">
          <button
            type="button"
            className={menuOpen ? "hamburger open" : "hamburger"}
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-label="Menu movil">
          <div className="container mobile-menu-inner">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} className={isActive ? "active" : undefined} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </Link>
              );
            })}
            <Link href="/contacto" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={() => setMenuOpen(false)}>
              Quiero clientes
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <Link href="/" className="logo" aria-label="edpro">
              <EdproLogo dark />
            </Link>
            <p className="footer-tag">Clientes para empresas de mudanzas. La forma sencilla de tener tu telefono sonando.</p>
          </div>
          <div className="footer-col">
            <h4>Producto</h4>
            <ul>
              <li>
                <Link href="/como-funciona">Como funciona</Link>
              </li>
              <li>
                <Link href="/precios">Precios</Link>
              </li>
              <li>
                <Link href="/casos">Casos reales</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Empresa</h4>
            <ul>
              <li>
                <Link href="/contacto">Contacto</Link>
              </li>
              <li>
                <Link href="/contacto">Soporte WhatsApp</Link>
              </li>
              <li>
                <Link href="/casos">Preguntas frecuentes</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li>
                <a href="#">Aviso legal</a>
              </li>
              <li>
                <a href="#">Politica de privacidad</a>
              </li>
              <li>
                <a href="#">Cookies</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 edpro - Clientes para empresas de mudanzas</span>
          <span>Hecho en Espana - j.roldan@estudiodigitalpro.com - 643168396</span>
        </div>
      </div>
    </footer>
  );
}
