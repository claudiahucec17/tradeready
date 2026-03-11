// @ts-nocheck"use client";import { useState, useEffect, useRef } from "react";

/* ─── Google Fonts ──────────────────────────────────────────────────────── */
const FontLink = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');
  `}</style>
);

/* ─── CSS Variables & Global Styles ────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    :root {
      --navy: #0a0f1e;
      --navy-light: #111827;
      --navy-mid: #1a2540;
      --teal: #00d4aa;
      --teal-dim: #00b894;
      --teal-glow: rgba(0,212,170,0.15);
      --amber: #f59e0b;
      --slate: #8892a4;
      --slate-light: #c4cad6;
      --white: #ffffff;
      --off-white: #f8fafc;
      --card-bg: rgba(255,255,255,0.04);
      --border: rgba(255,255,255,0.08);
      --border-light: rgba(255,255,255,0.12);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      font-family: 'DM Sans', sans-serif;
      background: var(--navy);
      color: var(--white);
      overflow-x: hidden;
    }
    h1,h2,h3,h4,h5 { font-family: 'Syne', sans-serif; }

    /* Noise texture overlay */
    .noise::after {
      content: '';
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 0;
    }

    /* Animations */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes pulse-ring {
      0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0,212,170,0.4); }
      70%  { transform: scale(1);    box-shadow: 0 0 0 12px rgba(0,212,170,0); }
      100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0,212,170,0); }
    }
    @keyframes float {
      0%,100% { transform: translateY(0); }
      50%      { transform: translateY(-8px); }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes ticker {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @keyframes gradientShift {
      0%,100% { background-position: 0% 50%; }
      50%      { background-position: 100% 50%; }
    }

    .animate-fade-up { animation: fadeUp 0.7s ease forwards; }
    .animate-fade-in { animation: fadeIn 0.6s ease forwards; }
    .animate-float   { animation: float 4s ease-in-out infinite; }

    .stagger-1 { animation-delay: 0.1s; opacity: 0; }
    .stagger-2 { animation-delay: 0.2s; opacity: 0; }
    .stagger-3 { animation-delay: 0.35s; opacity: 0; }
    .stagger-4 { animation-delay: 0.5s; opacity: 0; }
    .stagger-5 { animation-delay: 0.65s; opacity: 0; }

    .gradient-text {
      background: linear-gradient(135deg, #00d4aa 0%, #00b4d8 50%, #0077ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .teal-btn {
      background: linear-gradient(135deg, #00d4aa, #00b4d8);
      color: #0a0f1e;
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
      overflow: hidden;
    }
    .teal-btn::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
      opacity: 0;
      transition: opacity 0.2s;
    }
    .teal-btn:hover::after { opacity: 1; }
    .teal-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 30px rgba(0,212,170,0.35); }
    .teal-btn:active { transform: translateY(0); }

    .ghost-btn {
      background: transparent;
      border: 1.5px solid var(--border-light);
      color: var(--white);
      font-family: 'Syne', sans-serif;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .ghost-btn:hover {
      border-color: var(--teal);
      color: var(--teal);
      background: var(--teal-glow);
    }

    .card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 16px;
      transition: all 0.25s ease;
    }
    .card:hover {
      border-color: var(--border-light);
      transform: translateY(-3px);
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }

    .section-label {
      font-family: 'DM Sans', sans-serif;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--teal);
    }

    /* Ticker */
    .ticker-wrap { overflow: hidden; }
    .ticker-inner { display: flex; width: max-content; animation: ticker 30s linear infinite; }

    /* FAQ accordion */
    .faq-item { border-bottom: 1px solid var(--border); }
    .faq-btn { width: 100%; background: none; border: none; color: var(--white); cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 22px 0; text-align: left; font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 600; }
    .faq-btn:hover .faq-icon { color: var(--teal); }
    .faq-answer { overflow: hidden; transition: max-height 0.35s ease, opacity 0.3s ease; }
    .faq-icon { transition: transform 0.3s ease; color: var(--slate); font-size: 20px; flex-shrink: 0; }
    .faq-icon.open { transform: rotate(45deg); color: var(--teal); }

    /* Nav */
    .nav-blur {
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      background: rgba(10,15,30,0.8);
      border-bottom: 1px solid var(--border);
    }

    /* Comparison table */
    .comp-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0; }

    /* Mobile */
    @media (max-width: 768px) {
      .hide-mobile { display: none !important; }
      .comp-row { grid-template-columns: 1fr 1fr; }
      .comp-row > div:first-child { display: none; }
    }

    /* Scroll fade-in for sections */
    .scroll-reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.65s ease, transform 0.65s ease; }
    .scroll-reveal.visible { opacity: 1; transform: translateY(0); }

    /* Star rating */
    .stars { color: #f59e0b; letter-spacing: 2px; }

    /* Gradient mesh bg */
    .mesh-bg {
      background: 
        radial-gradient(ellipse 60% 40% at 20% 20%, rgba(0,212,170,0.08) 0%, transparent 60%),
        radial-gradient(ellipse 50% 50% at 80% 80%, rgba(0,180,216,0.07) 0%, transparent 60%),
        radial-gradient(ellipse 40% 60% at 60% 10%, rgba(0,119,255,0.05) 0%, transparent 60%),
        var(--navy);
    }

    .section-bg-alt { background: var(--navy-light); }

    /* Progress bar */
    @keyframes progressBar { from { width: 0; } to { width: 100%; } }
  `}</style>
);

/* ─── Icons (inline SVG) ────────────────────────────────────────────────── */
const Icon = ({ name, size = 20, color = "currentColor", style = {} }) => {
  const paths = {
    check: <polyline points="20 6 9 17 4 12" />,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
    zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
    star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
    map: <><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></>,
    phone: <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.35 2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.07 6.07l.9-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></>,
    message: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></>,
    refresh: <><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></>,
    user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    search: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    trending: <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    tool: <><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></>,
    award: <><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></>,
    arrow: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    menu: <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>,
    lock: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
    smile: <><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></>,
    briefcase: <><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></>,
    pound: <path d="M9 7a4 4 0 0 1 7.71 1.5c.29.97.29 2.03 0 3H5M5 14h14M9 21H5v-7"/>,
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={style}>
      {paths[name]}
    </svg>
  );
};

/* ─── useScrollReveal Hook ──────────────────────────────────────────────── */
const useScrollReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll(".scroll-reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

/* ─── NAV ───────────────────────────────────────────────────────────────── */
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = ["How it works", "Features", "For Trades", "FAQ"];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      transition: "all 0.3s ease",
      ...(scrolled ? {} : { background: "transparent", borderBottom: "none" })
    }} className={scrolled ? "nav-blur" : ""}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 9,
            background: "linear-gradient(135deg, #00d4aa, #00b4d8)",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <Icon name="tool" size={16} color="#0a0f1e" />
          </div>
          <span style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 18, letterSpacing: "-0.02em" }}>
            Trade<span style={{ color: "var(--teal)" }}>Ready</span>
          </span>
        </div>

        {/* Desktop links */}
        <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`}
              style={{ color: "var(--slate-light)", fontSize: 14, fontWeight: 500, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "var(--white)"}
              onMouseLeave={e => e.target.style.color = "var(--slate-light)"}
            >{l}</a>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button className="ghost-btn hide-mobile" style={{ padding: "9px 20px", borderRadius: 10, fontSize: 14 }}>
            Sign in
          </button>
          <button className="teal-btn" style={{ padding: "9px 20px", borderRadius: 10, fontSize: 14 }}>
            Get early access
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} style={{ background: "none", border: "none", color: "var(--white)", cursor: "pointer", padding: 4 }}
            className={mobileOpen ? "" : "show-mobile"}>
            <Icon name={mobileOpen ? "x" : "menu"} size={22} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ background: "var(--navy-light)", borderTop: "1px solid var(--border)", padding: "20px 24px 24px" }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`}
              onClick={() => setMobileOpen(false)}
              style={{ display: "block", color: "var(--slate-light)", fontSize: 16, fontWeight: 500, textDecoration: "none", padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
              {l}
            </a>
          ))}
          <button className="teal-btn" style={{ width: "100%", padding: "14px", borderRadius: 12, fontSize: 15, marginTop: 16 }}>
            Join the waitlist
          </button>
        </div>
      )}
    </nav>
  );
};

/* ─── HERO ──────────────────────────────────────────────────────────────── */
const AppMockup = () => (
  <div className="animate-float" style={{
    background: "var(--navy-light)",
    border: "1px solid var(--border-light)",
    borderRadius: 20,
    overflow: "hidden",
    width: "100%",
    maxWidth: 440,
    boxShadow: "0 40px 120px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
    fontFamily: "DM Sans, sans-serif",
  }}>
    {/* App header */}
    <div style={{ background: "var(--navy-mid)", padding: "14px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg, #00d4aa, #00b4d8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name="tool" size={13} color="#0a0f1e" />
      </div>
      <span style={{ fontFamily: "Syne", fontSize: 13, fontWeight: 700, color: "var(--white)" }}>TradeReady</span>
      <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
        {["#ff5f57","#febc2e","#28c840"].map(c => <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />)}
      </div>
    </div>

    {/* Search bar */}
    <div style={{ padding: "16px 20px 8px" }}>
      <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, border: "1px solid var(--border)" }}>
        <Icon name="search" size={15} color="var(--slate)" />
        <span style={{ fontSize: 13, color: "var(--slate)" }}>Plumber · London, SW1</span>
        <div style={{ marginLeft: "auto", background: "var(--teal)", borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 700, color: "#0a0f1e" }}>Search</div>
      </div>
    </div>

    {/* Trader cards */}
    {[
      { name: "Mike Hargreaves", trade: "Master Plumber", rating: "4.9", jobs: 142, avail: "Today 2pm", badge: "Top Rated" },
      { name: "Sara Okonkwo", trade: "Certified Electrician", rating: "5.0", jobs: 89, avail: "Tomorrow 9am", badge: "Verified" },
    ].map((t, i) => (
      <div key={i} style={{ margin: "8px 20px", padding: "14px", background: "rgba(255,255,255,0.03)", borderRadius: 12, border: "1px solid var(--border)", display: "flex", gap: 12, alignItems: "flex-start" }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: `linear-gradient(135deg, ${i === 0 ? "#00d4aa,#0077ff" : "#f59e0b,#ef4444"})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon name="user" size={18} color="white" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--white)" }}>{t.name}</span>
            <span style={{ fontSize: 10, background: "rgba(0,212,170,0.15)", color: "var(--teal)", padding: "2px 7px", borderRadius: 20, fontWeight: 600 }}>{t.badge}</span>
          </div>
          <div style={{ fontSize: 11, color: "var(--slate)", marginTop: 2 }}>{t.trade}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6 }}>
            <span style={{ fontSize: 11, color: "#f59e0b" }}>★ {t.rating}</span>
            <span style={{ fontSize: 11, color: "var(--slate)" }}>{t.jobs} jobs</span>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--teal)", animation: "pulse-ring 2s ease infinite" }} />
              <span style={{ fontSize: 11, color: "var(--teal)", fontWeight: 600 }}>{t.avail}</span>
            </div>
          </div>
        </div>
      </div>
    ))}

    {/* Book button */}
    <div style={{ padding: "12px 20px 18px" }}>
      <div style={{
        background: "linear-gradient(135deg, #00d4aa, #00b4d8)",
        borderRadius: 12, padding: "13px", textAlign: "center",
        fontSize: 13, fontWeight: 700, color: "#0a0f1e", fontFamily: "Syne",
        cursor: "pointer"
      }}>
        Book Mike — Available Today ↗
      </div>
    </div>
  </div>
);

const Hero = () => (
  <section id="hero" className="noise" style={{
    minHeight: "100vh", display: "flex", alignItems: "center", position: "relative",
    paddingTop: 100, paddingBottom: 80,
    background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,212,170,0.12) 0%, transparent 60%), var(--navy)"
  }}>
    {/* Grid lines */}
    <div style={{
      position: "absolute", inset: 0, zIndex: 0, opacity: 0.03,
      backgroundImage: "linear-gradient(var(--white) 1px, transparent 1px), linear-gradient(90deg, var(--white) 1px, transparent 1px)",
      backgroundSize: "60px 60px"
    }} />

    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", width: "100%", position: "relative", zIndex: 1 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
        {/* Left */}
        <div>
          <div className="animate-fade-up stagger-1" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,212,170,0.1)", border: "1px solid rgba(0,212,170,0.25)", borderRadius: 100, padding: "6px 14px 6px 8px", marginBottom: 28 }}>
            <span style={{ background: "var(--teal)", color: "#0a0f1e", fontSize: 10, fontWeight: 800, padding: "3px 8px", borderRadius: 100, letterSpacing: "0.05em" }}>NEW</span>
            <span style={{ fontSize: 13, color: "var(--teal)", fontWeight: 500 }}>Now taking early access signups</span>
          </div>

          <h1 className="animate-fade-up stagger-2" style={{ fontSize: "clamp(38px, 5vw, 60px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 22 }}>
            Book trusted<br />tradespeople<br />
            <span className="gradient-text">instantly.</span>
          </h1>

          <p className="animate-fade-up stagger-3" style={{ fontSize: 18, color: "var(--slate-light)", lineHeight: 1.7, marginBottom: 36, maxWidth: 460 }}>
            See live availability, compare reviews, and book a plumber, electrician, or any tradesperson in minutes — not days.
          </p>

          <div className="animate-fade-up stagger-4" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 44 }}>
            <button className="teal-btn" style={{ padding: "15px 28px", borderRadius: 12, fontSize: 15, display: "flex", alignItems: "center", gap: 9 }}>
              Get early access <Icon name="arrow" size={16} color="#0a0f1e" />
            </button>
            <button className="ghost-btn" style={{ padding: "15px 28px", borderRadius: 12, fontSize: 15 }}>
              Join as a tradesperson
            </button>
          </div>

          {/* Social proof mini */}
          <div className="animate-fade-up stagger-5" style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
            {[
              { icon: "user", val: "2,400+", label: "on waitlist" },
              { icon: "shield", val: "100%", label: "verified trades" },
              { icon: "map", val: "UK-wide", label: "coverage" },
            ].map(s => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ color: "var(--teal)" }}><Icon name={s.icon} size={16} /></div>
                <span style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 15 }}>{s.val}</span>
                <span style={{ fontSize: 13, color: "var(--slate)" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — app mockup */}
        <div className="animate-fade-up stagger-3 hide-mobile" style={{ display: "flex", justifyContent: "center" }}>
          <AppMockup />
        </div>
      </div>
    </div>
  </section>
);

/* ─── TRUST BAR ─────────────────────────────────────────────────────────── */
const TrustBar = () => {
  const items = [
    "✓ Verified Tradespeople", "★ Genuine Customer Reviews", "⚡ Instant Online Booking",
    "📍 UK-Wide Coverage", "🔒 Secure Payments", "📱 Mobile-First Platform",
    "✓ Verified Tradespeople", "★ Genuine Customer Reviews", "⚡ Instant Online Booking",
    "📍 UK-Wide Coverage", "🔒 Secure Payments", "📱 Mobile-First Platform",
  ];
  return (
    <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "18px 0", background: "var(--navy-light)", overflow: "hidden" }}>
      <div className="ticker-wrap">
        <div className="ticker-inner">
          {items.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 36px", flexShrink: 0 }}>
              <span style={{ fontSize: 13, color: "var(--slate-light)", fontWeight: 500, whiteSpace: "nowrap" }}>{item}</span>
              <span style={{ color: "var(--border-light)", fontSize: 18 }}>·</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── HOW IT WORKS ──────────────────────────────────────────────────────── */
const HowItWorks = () => {
  const [tab, setTab] = useState("customer");

  const steps = {
    customer: [
      { icon: "search", num: "01", title: "Search by trade & area", desc: "Type what you need — plumber, electrician, tiler — and your postcode. See local professionals instantly." },
      { icon: "calendar", num: "02", title: "View live availability", desc: "No guessing, no back-and-forth. See exactly when each tradesperson is free and choose a slot that works for you." },
      { icon: "zap", num: "03", title: "Book instantly online", desc: "Confirm your booking in seconds. You'll get an instant confirmation and reminders — all in one place." },
      { icon: "star", num: "04", title: "Leave a verified review", desc: "Once the job is done, share your experience. Your honest review helps others make confident choices." },
    ],
    trade: [
      { icon: "user", num: "01", title: "Create your free profile", desc: "Set up your professional profile in minutes. Showcase your skills, qualifications, and past work." },
      { icon: "calendar", num: "02", title: "Set your availability", desc: "Add your working hours and available slots. Update in real-time so customers only see when you're free." },
      { icon: "briefcase", num: "03", title: "Receive direct bookings", desc: "Customers find you and book directly — no middlemen, no bidding wars. Just confirmed jobs straight to you." },
      { icon: "award", num: "04", title: "Build your reputation", desc: "Every 5-star review grows your profile. The better your reputation, the more bookings you attract." },
    ],
  };

  return (
    <section id="how-it-works" style={{ padding: "100px 24px", background: "var(--navy)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="scroll-reveal" style={{ textAlign: "center", marginBottom: 52 }}>
          <div className="section-label" style={{ marginBottom: 12 }}>How it works</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16 }}>
            Simple from start to finish
          </h2>
          <p style={{ color: "var(--slate-light)", fontSize: 17, maxWidth: 500, margin: "0 auto" }}>
            Whether you're a homeowner or a tradesperson, getting started takes minutes.
          </p>
        </div>

        {/* Tab selector */}
        <div className="scroll-reveal" style={{ display: "flex", justifyContent: "center", marginBottom: 52 }}>
          <div style={{ display: "inline-flex", background: "var(--navy-mid)", border: "1px solid var(--border)", borderRadius: 14, padding: 5, gap: 4 }}>
            {[["customer", "For Customers"], ["trade", "For Tradespeople"]].map(([key, label]) => (
              <button key={key} onClick={() => setTab(key)} style={{
                padding: "11px 24px", borderRadius: 10, fontSize: 14, fontWeight: 600,
                fontFamily: "Syne", cursor: "pointer", border: "none", transition: "all 0.25s ease",
                background: tab === key ? "linear-gradient(135deg, #00d4aa, #00b4d8)" : "transparent",
                color: tab === key ? "#0a0f1e" : "var(--slate-light)",
              }}>{label}</button>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {steps[tab].map((step, i) => (
            <div key={i} className="card scroll-reveal" style={{ padding: "28px 26px", position: "relative", overflow: "hidden" }}>
              {/* Step number bg */}
              <div style={{ position: "absolute", top: -10, right: -8, fontFamily: "Syne", fontSize: 80, fontWeight: 800, color: "rgba(255,255,255,0.025)", lineHeight: 1, pointerEvents: "none" }}>
                {step.num}
              </div>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(0,212,170,0.1)", border: "1px solid rgba(0,212,170,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                <Icon name={step.icon} size={20} color="var(--teal)" />
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--teal)", letterSpacing: "0.08em", marginBottom: 8 }}>STEP {step.num}</div>
              <h3 style={{ fontFamily: "Syne", fontSize: 17, fontWeight: 700, marginBottom: 10, letterSpacing: "-0.01em" }}>{step.title}</h3>
              <p style={{ color: "var(--slate)", fontSize: 14, lineHeight: 1.65 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── FEATURES ──────────────────────────────────────────────────────────── */
const Features = () => {
  const features = [
    { icon: "calendar", title: "Live Availability Calendar", desc: "Tradespeople update their schedule in real-time. Customers always see accurate, up-to-date availability — no surprises." },
    { icon: "zap", title: "Instant Booking", desc: "No emails, no phone tag. Confirm your booking in seconds and receive immediate confirmation." },
    { icon: "shield", title: "Verified Profiles", desc: "Every tradesperson on TradeReady goes through ID and qualification checks before they can accept bookings." },
    { icon: "star", title: "Genuine Reviews", desc: "Reviews can only be left by customers who've actually completed a booking — keeping feedback honest and trustworthy." },
    { icon: "message", title: "In-App Messaging", desc: "Communicate directly with your tradesperson before and after the job, all within the platform." },
    { icon: "refresh", title: "Easy Rescheduling", desc: "Plans change. Reschedule or cancel with a tap — no awkward phone calls, no lost deposits." },
    { icon: "map", title: "UK Local Search", desc: "Built for British postcodes. Find available trades in your area whether you're in London, Leeds, or Liverpool." },
    { icon: "phone", title: "Mobile-First Experience", desc: "Designed for how people actually search — on their phone, in the moment, when something needs fixing." },
  ];

  return (
    <section id="features" style={{ padding: "100px 24px", background: "var(--navy-light)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="scroll-reveal" style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="section-label" style={{ marginBottom: 12 }}>Platform features</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16 }}>
            Everything you need, nothing you don't
          </h2>
          <p style={{ color: "var(--slate-light)", fontSize: 17, maxWidth: 500, margin: "0 auto" }}>
            A platform built around one goal: making booking a tradesperson as easy as booking a restaurant.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18 }}>
          {features.map((f, i) => (
            <div key={i} className="card scroll-reveal" style={{ padding: "26px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(0,212,170,0.08)", border: "1px solid rgba(0,212,170,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name={f.icon} size={17} color="var(--teal)" />
                </div>
                <h3 style={{ fontFamily: "Syne", fontSize: 15, fontWeight: 700, letterSpacing: "-0.01em" }}>{f.title}</h3>
              </div>
              <p style={{ color: "var(--slate)", fontSize: 14, lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── WHY IT'S BETTER ───────────────────────────────────────────────────── */
const WhyBetter = () => {
  const rows = [
    { label: "Finding availability", old: "Ring around, wait for callbacks", new: "See live slots, book instantly" },
    { label: "Trust & credentials", old: "Hope for the best, ask around", new: "Verified profiles, real reviews" },
    { label: "Getting a response", old: "Wait days for a text back", new: "Instant booking confirmation" },
    { label: "Managing changes", old: "Phone calls, rescheduling stress", new: "One-tap reschedule in the app" },
    { label: "Finding good trades", old: "Facebook groups, dodgy flyers", new: "Rated local professionals nearby" },
    { label: "Admin for tradespeople", old: "Endless WhatsApps and no-shows", new: "Managed calendar & confirmed jobs" },
  ];

  return (
    <section style={{ padding: "100px 24px", background: "var(--navy)" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div className="scroll-reveal" style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="section-label" style={{ marginBottom: 12 }}>Why TradeReady</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16 }}>
            The old way is broken.
            <br /><span className="gradient-text">We fixed it.</span>
          </h2>
        </div>

        <div className="scroll-reveal" style={{ border: "1px solid var(--border)", borderRadius: 18, overflow: "hidden" }}>
          {/* Header row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: "var(--navy-mid)" }}>
            <div style={{ padding: "16px 24px", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: "var(--slate)", textTransform: "uppercase" }}>Category</div>
            <div style={{ padding: "16px 24px", borderLeft: "1px solid var(--border)", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: "#ef4444", textTransform: "uppercase" }}>❌ The old way</div>
            <div style={{ padding: "16px 24px", borderLeft: "1px solid var(--border)", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: "var(--teal)", textTransform: "uppercase" }}>✓ TradeReady</div>
          </div>

          {rows.map((row, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderTop: "1px solid var(--border)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)" }}>
              <div style={{ padding: "18px 24px", fontSize: 14, fontWeight: 600, color: "var(--slate-light)" }}>{row.label}</div>
              <div style={{ padding: "18px 24px", borderLeft: "1px solid var(--border)", fontSize: 14, color: "var(--slate)", lineHeight: 1.5 }}>{row.old}</div>
              <div style={{ padding: "18px 24px", borderLeft: "1px solid var(--border)", fontSize: 14, color: "var(--white)", fontWeight: 500, lineHeight: 1.5 }}>{row.new}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── FOR TRADESPEOPLE ──────────────────────────────────────────────────── */
const ForTrades = () => {
  const benefits = [
    { icon: "calendar", title: "Fill your calendar", desc: "Get discovered by local customers actively searching for your trade. No more quiet weeks." },
    { icon: "trending", title: "Grow your reputation", desc: "Every completed job is a chance for a 5-star review. Build a profile that sells itself." },
    { icon: "pound", title: "Reduce admin overhead", desc: "Forget the WhatsApp chaos. Manage bookings, availability, and messages in one clean dashboard." },
    { icon: "map", title: "Get discovered locally", desc: "Show up when customers in your area search for your trade. Your profile does the marketing." },
    { icon: "lock", title: "Confirmed bookings only", desc: "No time-wasters or unconfirmed enquiries. Every booking is real, scheduled, and ready to go." },
    { icon: "smile", title: "Free to get started", desc: "Create your profile and start receiving bookings with no upfront cost. We grow when you grow." },
  ];

  return (
    <section id="for-trades" style={{
      padding: "100px 24px",
      background: "linear-gradient(135deg, rgba(0,212,170,0.06) 0%, rgba(0,119,255,0.06) 100%), var(--navy-light)"
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 70, alignItems: "center" }}>
          {/* Left */}
          <div className="scroll-reveal">
            <div className="section-label" style={{ marginBottom: 14 }}>For Tradespeople</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 18, lineHeight: 1.15 }}>
              Your business,<br />on your terms.
            </h2>
            <p style={{ color: "var(--slate-light)", fontSize: 17, lineHeight: 1.7, marginBottom: 32 }}>
              TradeReady puts you in control. Set your hours, manage your bookings, and build a reputation that keeps customers coming back — all from your phone.
            </p>
            <button className="teal-btn" style={{ padding: "15px 28px", borderRadius: 12, fontSize: 15, display: "inline-flex", alignItems: "center", gap: 9 }}>
              Join as a tradesperson <Icon name="arrow" size={16} color="#0a0f1e" />
            </button>
            <div style={{ marginTop: 28, display: "flex", gap: 24, flexWrap: "wrap" }}>
              {[["Free", "to get started"], ["5 min", "profile setup"], ["1000+", "ready customers"]].map(([val, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: "Syne", fontSize: 22, fontWeight: 800, color: "var(--teal)" }}>{val}</div>
                  <div style={{ fontSize: 13, color: "var(--slate)" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — benefit grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {benefits.map((b, i) => (
              <div key={i} className="card scroll-reveal" style={{ padding: "20px 18px" }}>
                <div style={{ color: "var(--teal)", marginBottom: 10 }}><Icon name={b.icon} size={20} /></div>
                <div style={{ fontFamily: "Syne", fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{b.title}</div>
                <div style={{ fontSize: 13, color: "var(--slate)", lineHeight: 1.6 }}>{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── TESTIMONIALS ──────────────────────────────────────────────────────── */
const Testimonials = () => {
  const reviews = [
    { name: "James O.", role: "Homeowner · Manchester", stars: 5, text: "Used TradeReady to find a plumber after a pipe burst on a Sunday. Had someone booked and on the way within 20 minutes. Can't believe this didn't exist before." },
    { name: "Sarah B.", role: "Landlord · London", stars: 5, text: "I manage three properties and used to spend hours chasing tradespeople. Now I just check availability and book. Saves me so much time every single month." },
    { name: "Dave K.", role: "Master Plumber · Birmingham", stars: 5, text: "My calendar has been full every week since joining. I've reduced my admin by about 80%. The app just handles everything — I can focus on the work." },
    { name: "Priya T.", role: "First-time Buyer · Bristol", stars: 5, text: "I had no idea how to find a reliable electrician when I moved in. TradeReady made it so easy — verified profiles, real reviews. I felt totally safe." },
    { name: "Mark H.", role: "Electrician · Leeds", stars: 5, text: "The customers I get through TradeReady are serious and confirmed. No more no-shows, no more chasing. It's completely changed how I run my business." },
    { name: "Alison R.", role: "Property Manager · Edinburgh", stars: 5, text: "I've tried every local service imaginable. Nothing comes close. TradeReady is the first platform that feels like it was actually built for how trades work in the UK." },
  ];

  return (
    <section style={{ padding: "100px 24px", background: "var(--navy)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="scroll-reveal" style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="section-label" style={{ marginBottom: 12 }}>Testimonials</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16 }}>
            People love it. Here's why.
          </h2>
          <p style={{ color: "var(--slate-light)", fontSize: 17 }}>Real stories from our beta users.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }}>
          {reviews.map((r, i) => (
            <div key={i} className="card scroll-reveal" style={{ padding: "28px 26px" }}>
              <div className="stars" style={{ fontSize: 14, marginBottom: 14 }}>{"★".repeat(r.stars)}</div>
              <p style={{ color: "var(--slate-light)", fontSize: 15, lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>"{r.text}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: `linear-gradient(135deg, hsl(${i * 60}, 60%, 45%), hsl(${i * 60 + 40}, 70%, 55%))`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="user" size={16} color="white" />
                </div>
                <div>
                  <div style={{ fontFamily: "Syne", fontSize: 14, fontWeight: 700 }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: "var(--slate)" }}>{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── FAQ ───────────────────────────────────────────────────────────────── */
const FAQ = () => {
  const [open, setOpen] = useState(null);

  const faqs = [
    { q: "How does the booking process work?", a: "Search for the trade you need and enter your postcode. You'll see available professionals nearby with their live calendars. Choose a time that suits you, confirm the booking, and you'll receive an instant confirmation. No calls, no waiting — just a confirmed appointment." },
    { q: "Are all tradespeople verified?", a: "Yes. Every tradesperson on TradeReady goes through an identity verification and qualification check before their profile goes live. We also cross-reference relevant trade certifications where applicable, such as Gas Safe registration for plumbers and NICEIC for electricians." },
    { q: "Can tradespeople manage their own availability?", a: "Absolutely. Tradespeople have full control over their calendar through the TradeReady app. They can add working hours, block time off, set specific slots, and update their availability in real-time. Customers will only ever see slots when a tradesperson is genuinely free." },
    { q: "Is TradeReady available across the whole UK?", a: "We're launching with full coverage across England, Scotland, and Wales. Northern Ireland will follow shortly after. Whether you're in central London or a smaller town, TradeReady will help connect you with qualified local tradespeople." },
    { q: "How do reviews work?", a: "Reviews on TradeReady are verified — meaning they can only be submitted by customers who completed a real, paid booking through the platform. This means every review you read is genuine. Tradespeople can also respond to reviews professionally through their dashboard." },
    { q: "Is it free for tradespeople to join?", a: "Yes, creating a profile and receiving bookings is free to start. We believe in growing with you — our pricing model is designed to be fair and transparent, and you'll never be charged before you start earning through the platform." },
    { q: "What trades are covered?", a: "We currently support plumbers, electricians, tilers, carpenters, painters and decorators, plasterers, roofers, general builders, and handypeople. We're continuously adding more trades based on demand — if yours isn't listed, get in touch." },
  ];

  return (
    <section id="faq" style={{ padding: "100px 24px", background: "var(--navy-light)" }}>
      <div style={{ maxWidth: 740, margin: "0 auto" }}>
        <div className="scroll-reveal" style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="section-label" style={{ marginBottom: 12 }}>FAQ</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16 }}>
            Got questions? We've got answers.
          </h2>
        </div>

        <div className="scroll-reveal">
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <button className="faq-btn" onClick={() => setOpen(open === i ? null : i)}>
                <span style={{ fontSize: 15, paddingRight: 20 }}>{faq.q}</span>
                <span className={`faq-icon ${open === i ? "open" : ""}`}>+</span>
              </button>
              <div className="faq-answer" style={{ maxHeight: open === i ? 300 : 0, opacity: open === i ? 1 : 0 }}>
                <p style={{ color: "var(--slate-light)", fontSize: 15, lineHeight: 1.75, paddingBottom: 22 }}>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── FINAL CTA ─────────────────────────────────────────────────────────── */
const FinalCTA = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email.includes("@")) { setSubmitted(true); }
  };

  return (
    <section style={{
      padding: "110px 24px",
      position: "relative",
      overflow: "hidden",
      background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,212,170,0.1) 0%, transparent 65%), var(--navy)"
    }}>
      {/* Decorative ring */}
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: 600, height: 600, borderRadius: "50%",
        border: "1px solid rgba(0,212,170,0.06)", pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: 900, height: 900, borderRadius: "50%",
        border: "1px solid rgba(0,212,170,0.03)", pointerEvents: "none"
      }} />

      <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div className="scroll-reveal">
          <div className="section-label" style={{ marginBottom: 16 }}>Early access</div>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 18, lineHeight: 1.1 }}>
            Be first when we launch.
          </h2>
          <p style={{ color: "var(--slate-light)", fontSize: 18, lineHeight: 1.7, marginBottom: 40 }}>
            Join thousands of homeowners and tradespeople already on the waitlist. Early access members get priority bookings and free premium features at launch.
          </p>

          {!submitted ? (
            <div style={{ display: "flex", gap: 10, maxWidth: 460, margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
                style={{
                  flex: 1, minWidth: 240, padding: "15px 18px", borderRadius: 12,
                  background: "rgba(255,255,255,0.06)", border: "1px solid var(--border-light)",
                  color: "var(--white)", fontSize: 15, fontFamily: "DM Sans",
                  outline: "none"
                }}
              />
              <button className="teal-btn" onClick={handleSubmit} style={{ padding: "15px 26px", borderRadius: 12, fontSize: 15, whiteSpace: "nowrap" }}>
                Get early access
              </button>
            </div>
          ) : (
            <div style={{ background: "rgba(0,212,170,0.1)", border: "1px solid rgba(0,212,170,0.25)", borderRadius: 14, padding: "20px 28px", maxWidth: 420, margin: "0 auto" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>🎉</div>
              <div style={{ fontFamily: "Syne", fontSize: 18, fontWeight: 700, marginBottom: 6 }}>You're on the list!</div>
              <div style={{ color: "var(--slate-light)", fontSize: 14 }}>We'll be in touch with early access details very soon.</div>
            </div>
          )}

          <p style={{ marginTop: 18, fontSize: 13, color: "var(--slate)" }}>No spam, ever. Unsubscribe anytime.</p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 42, flexWrap: "wrap" }}>
            <button className="ghost-btn" style={{ padding: "13px 24px", borderRadius: 12, fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
              <Icon name="briefcase" size={16} color="var(--teal)" /> Join as a tradesperson
            </button>
            <button className="ghost-btn" style={{ padding: "13px 24px", borderRadius: 12, fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
              <Icon name="message" size={16} color="var(--slate-light)" /> Contact the team
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── FOOTER ────────────────────────────────────────────────────────────── */
const Footer = () => (
  <footer style={{ background: "var(--navy-mid)", borderTop: "1px solid var(--border)", padding: "60px 24px 32px" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 50 }}>
        {/* Brand */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg, #00d4aa, #00b4d8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="tool" size={16} color="#0a0f1e" />
            </div>
            <span style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 18, letterSpacing: "-0.02em" }}>
              Trade<span style={{ color: "var(--teal)" }}>Ready</span>
            </span>
          </div>
          <p style={{ color: "var(--slate)", fontSize: 14, lineHeight: 1.7, maxWidth: 260, marginBottom: 20 }}>
            The UK's smartest platform for booking trusted local tradespeople — instantly.
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            {["twitter", "linkedin", "instagram"].map(s => (
              <a key={s} href="#" style={{ width: 36, height: 36, borderRadius: 9, background: "var(--card-bg)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", transition: "all 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "var(--teal)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}>
                <span style={{ fontSize: 11, color: "var(--slate)" }}>{s[0].toUpperCase()}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        {[
          ["Platform", ["How it works", "Features", "Pricing", "For Trades", "Verification"]],
          ["Company", ["About us", "Blog", "Careers", "Press", "Contact"]],
          ["Legal", ["Privacy policy", "Terms of service", "Cookie policy", "Accessibility"]],
        ].map(([heading, links]) => (
          <div key={heading}>
            <div style={{ fontFamily: "Syne", fontSize: 13, fontWeight: 700, marginBottom: 16, color: "var(--white)", letterSpacing: "0.02em" }}>{heading}</div>
            {links.map(l => (
              <a key={l} href="#" style={{ display: "block", color: "var(--slate)", fontSize: 14, textDecoration: "none", marginBottom: 10, transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "var(--white)"}
                onMouseLeave={e => e.target.style.color = "var(--slate)"}>
                {l}
              </a>
            ))}
          </div>
        ))}
      </div>

      <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <span style={{ color: "var(--slate)", fontSize: 13 }}>© 2025 TradeReady Ltd. All rights reserved. Registered in England & Wales.</span>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--teal)", animation: "pulse-ring 2s infinite" }} />
          <span style={{ color: "var(--slate)", fontSize: 13 }}>Launching soon across the UK</span>
        </div>
      </div>
    </div>
  </footer>
);

/* ─── ROOT ──────────────────────────────────────────────────────────────── */
export default function TradeReady() {
  useScrollReveal();

  return (
    <>
      <FontLink />
      <GlobalStyles />
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <HowItWorks />
        <Features />
        <WhyBetter />
        <ForTrades />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
