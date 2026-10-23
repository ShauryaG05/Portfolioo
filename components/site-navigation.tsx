"use client";

import { useEffect, useState } from "react";
import { portfolio } from "@/data/portfolio";

const links = [
  { label: "Work", href: "#work" },
  { label: "Stack", href: "#stack" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function SiteNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <>
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label={`${portfolio.name}, home`}>
        <span className="wordmark-dot" aria-hidden="true" />
        <span>{portfolio.name}</span>
      </a>

      <nav className={`site-nav${menuOpen ? " site-nav--open" : ""}`} aria-label="Main navigation">
        {links.map((link, index) => (
          <a
            className="nav-link"
            href={link.href}
            key={link.href}
            onClick={() => setMenuOpen(false)}
          >
            <span className="nav-link-index">0{index + 1}</span>
            {link.label}
          </a>
        ))}
      </nav>

      <a className="header-contact" href={`mailto:${portfolio.contact.email}`}>
        <span>Let’s talk</span>
        <span aria-hidden="true">↗</span>
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
      </button>
    </header>
    <nav
      className={`mobile-nav${menuOpen ? " mobile-nav--open" : ""}`}
      id="mobile-navigation"
      aria-label="Mobile navigation"
      aria-hidden={!menuOpen}
    >
      {links.map((link) => (
        <a href={link.href} key={link.href} onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}>
          {link.label}
          <span aria-hidden="true">↗</span>
        </a>
      ))}
      <a href={`mailto:${portfolio.contact.email}`} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}>
        {portfolio.contact.email}
        <span aria-hidden="true">↗</span>
      </a>
    </nav>
    </>
  );
}
