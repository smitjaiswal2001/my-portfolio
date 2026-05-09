import React, { useState, useEffect, useCallback } from 'react';

/* ─── CONSTANTS ─────────────────────────────────── */
const RESUME_FILE = '/Smit Jaiswal Resume Bi Projects.docx';
const LINKEDIN    = 'https://www.linkedin.com/in/smit-jaiswal-988360238/';
const GITHUB      = 'https://github.com/smitjaiswal2001';
const EMAIL       = 'smitjaiswal2001@gmail.com';

const NAV_LINKS = [
  { label: 'About',      href: '#about'      },
  { label: 'Experience', href: '#experience' },
  { label: 'Work',       href: '#work'        },
  { label: 'Contact',    href: '#contact'    },
];

const SKILLS = [
  'Power BI', 'DAX', 'Power Query', 'SQL', 'Python',
  'Microsoft Dataverse', 'Excel', 'Data Modeling',
  'ETL Pipelines', 'ERD Design', 'Data Storytelling',
];

const EXPERIENCES = [
  {
    role: 'Data Engineer Intern',
    company: 'Mayk Ideas',
    period: 'Internship',
    highlight: true,
    bullets: [
      'Led the "Inventory Tracking Asset & Service Modernization Project" — delivered end-to-end Power BI dashboards with dedicated Team & Manager views.',
      'Integrated real-time data using Microsoft Dataverse, ensuring seamless connectivity across enterprise systems.',
      'Built DAX-based KPIs and advanced analytics models to power data-driven executive decision-making.',
      'Created wireframes, Entity Relationship Diagrams (ERD), and full structured technical documentation.',
      'Resolved complex data connectivity and system integration challenges in a live production environment.',
    ],
  },
  {
    role: 'Software Application Developer',
    company: 'Tax Tech India Pvt Ltd.',
    period: 'Jan 2022 — Dec 2024',
    highlight: false,
    bullets: [
      'Designed, coded, tested, and debugged software applications while adhering to industry best practices.',
      'Conducted thorough project requirement analyses and proposed effective technical solutions.',
      'Collaborated with cross-functional teams including designers, project managers, and QA engineers.',
      'Identified and resolved technical issues promptly, minimizing disruption to project timelines.',
      'Maintained proficiency across multiple development platforms, staying current with industry trends.',
    ],
  },
];

const PROJECTS = [
  {
    platform: 'Power BI · Financial Analytics',
    title: 'Credit Card Analysis',
    desc: 'Executive-level analysis of credit card data revealing spending patterns, risk factors, and customer segmentation for strategic financial decisions.',
    href: 'https://app.powerbi.com/reportEmbed?reportId=cdafcf5c-4404-4232-9c97-73711834704c&autoAuth=true&embeddedDemo=true',
    cta: 'View Dashboard',
    external: true,
  },
  {
    platform: 'Power BI · Operations',
    title: 'Warehouse Inventory Tracker',
    desc: 'Real-time operations dashboard monitoring inventory levels, stock movement, and supply chain KPIs — optimizing efficiency for Warehouse A2.',
    href: 'https://app.powerbi.com/reportEmbed?reportId=a5abbf0f-cde7-46c4-a629-5e11ab20e9b6&autoAuth=true&embeddedDemo=true',
    cta: 'View Dashboard',
    external: true,
  },
  {
    platform: 'Microsoft Dataverse · Power BI',
    title: 'Inventory & Asset Modernization',
    desc: 'Enterprise solution with Team & Manager views, real-time Dataverse integration, DAX KPIs, and full ERD documentation — built at Mayk Ideas.',
    href: null,
    cta: 'Internal Project',
    external: false,
  },
  {
    platform: 'Open to Opportunities',
    title: 'Your Next Data Challenge',
    desc: "Looking for a data analyst who delivers clarity from complexity? Let's discuss how I can add value to your team.",
    href: `mailto:${EMAIL}`,
    cta: 'Start a Conversation →',
    external: false,
    highlight: true,
  },
];

/* ─── TYPEWRITER ─────────────────────────────────── */
function Typewriter({ words, speed = 110, pause = 1800 }) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let timeout;
    if (!deleting && charIdx < word.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === word.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
    }
    setDisplay(word.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return (
    <span>
      {display}
      <span style={{ opacity: 0.7, animation: 'blink 1s step-end infinite' }}>|</span>
      <style>{`@keyframes blink { 0%,100%{opacity:0.7} 50%{opacity:0} }`}</style>
    </span>
  );
}

/* ─── NAV ────────────────────────────────────────── */
function Nav({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 900) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <a href="#home" className="nav-logo" onClick={e => handleNavClick(e, '#home')}>
          Smit<span>.</span>
        </a>

        {/* Desktop links */}
        <div className="nav-links">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={activeSection === href.slice(1) ? 'active' : ''}
              onClick={e => handleNavClick(e, href)}
            >
              {label}
            </a>
          ))}
        </div>

        <a
          href={RESUME_FILE}
          download="Smit_Jaiswal_Resume.docx"
          className="nav-cta"
          aria-label="Download resume"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
          </svg>
          Download CV
        </a>

        <button
          className={`nav-hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`nav-drawer${menuOpen ? ' open' : ''}`} role="navigation">
        {NAV_LINKS.map(({ label, href }) => (
          <a key={href} href={href} onClick={e => handleNavClick(e, href)}>{label}</a>
        ))}
        <a
          href={RESUME_FILE}
          download="Smit_Jaiswal_Resume.docx"
          className="nav-cta"
          onClick={() => setMenuOpen(false)}
        >
          Download CV
        </a>
      </div>
    </>
  );
}

/* ─── HERO ───────────────────────────────────────── */
function Hero() {
  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <section id="home" className="hero">
      <div className="hero-left">
        <div className="hero-eyebrow">
          <div className="ln" />
          <span>
            <Typewriter words={['Senior Data Analyst', 'Power BI Specialist', 'Data Engineer', 'BI Storyteller']} />
          </span>
        </div>
        <h1 className="hero-name">
          <strong>Smit</strong>
          Jaiswal
        </h1>
        <p className="hero-subtitle">
          Power BI · DAX · Data Engineering<br />
          Business Intelligence · Storytelling
        </p>
        <p className="hero-desc">
          Transforming complex datasets into decisive insights. Specializing in
          Power BI dashboards, advanced DAX analytics, and enterprise-grade data pipelines
          that empower organizations to move faster.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => scrollTo('#work')}>
            View My Work
          </button>
          <button className="btn-ghost" onClick={() => scrollTo('#contact')}>
            Get in Touch
          </button>
        </div>
      </div>

      <div className="hero-right">
        <svg className="hero-chart" viewBox="0 0 600 500" preserveAspectRatio="none">
          <polyline points="0,400 60,340 120,370 180,190 240,240 300,110 360,170 420,70 480,130 540,55 600,90"
            fill="none" stroke="#C4943A" strokeWidth="1.5"/>
          <polyline points="0,470 60,440 120,455 180,310 240,360 300,230 360,280 420,170 480,230 540,140 600,180"
            fill="none" stroke="#00BFA5" strokeWidth="1"/>
        </svg>

        <div className="stat-card">
          <div className="stat-num">3+</div>
          <div className="stat-lbl">Years of Industry Experience</div>
        </div>
        <div className="stat-row">
          <div className="stat-card sm">
            <div className="stat-num">10+</div>
            <div className="stat-lbl">Dashboards Built</div>
          </div>
          <div className="stat-card sm">
            <div className="stat-num">5+</div>
            <div className="stat-lbl">Tools Mastered</div>
          </div>
        </div>
        <div className="stat-card stack">
          <div className="stat-num">Power BI · SQL · Python<br />Dataverse · DAX</div>
          <div className="stat-lbl" style={{ marginTop: 10 }}>Core Technology Stack</div>
        </div>
      </div>
    </section>
  );
}

/* ─── ABOUT ──────────────────────────────────────── */
function About() {
  const [imgError, setImgError] = useState(false);
  return (
    <section id="about" className="about-section">
      <div className="section-inner">
        <div className="section-label" style={{ marginBottom: 56 }}>
          <div className="ln" /><span>About</span>
        </div>
        <h2 className="section-title" style={{ marginBottom: 64 }}>
          Turning data into<br /><em>clarity</em>
        </h2>
        <div className="about-grid">
          <div className="about-img-wrap">
            {imgError ? (
              <div className="about-img-placeholder">Photo Unavailable</div>
            ) : (
              <img
                src="/Profile_photo.JPG"
                alt="Smit Jaiswal"
                className="about-img"
                onError={() => setImgError(true)}
              />
            )}
            <div className="about-tag">Smit Jaiswal · Data Analyst</div>
          </div>
          <div className="about-text">
            <p>
              I'm a results-driven Data Analyst with a strong foundation in transforming raw,
              complex data into actionable business intelligence. My work centers on Power BI,
              DAX, and data modeling — building solutions that empower organizations to make
              faster, smarter decisions.
            </p>
            <p>
              From designing interactive dashboards to architecting real-time data pipelines
              using Microsoft Dataverse, I bring both technical depth and a strategic mindset
              to every project.
            </p>
            <p>
              My background in software development gives me a rare ability to bridge the gap
              between engineering and analytics — understanding both the data infrastructure
              and the business impact it drives.
            </p>
            <div className="skills-wrap">
              <div className="skills-label">Technical Stack</div>
              <div className="skills-grid">
                {SKILLS.map(s => <span key={s} className="skill">{s}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── EXPERIENCE ─────────────────────────────────── */
function Experience() {
  return (
    <section id="experience" className="exp-section">
      <div className="section-inner">
        <div className="section-label" style={{ marginBottom: 56 }}>
          <div className="ln" /><span>Experience</span>
        </div>
        <h2 className="section-title" style={{ marginBottom: 64 }}>
          Where I've<br /><em>made impact</em>
        </h2>
        <div className="exp-list">
          {EXPERIENCES.map((exp) => (
            <div key={exp.role} className={`exp-card${exp.highlight ? ' highlight' : ''}`}>
              <div className="exp-head">
                <div>
                  <div className="exp-period">{exp.period}</div>
                  <h3 className="exp-role">{exp.role}</h3>
                  <div className="exp-company">{exp.company}</div>
                </div>
              </div>
              <ul className="exp-bullets">
                {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PROJECTS ───────────────────────────────────── */
function Projects() {
  return (
    <section id="work" className="projects-section">
      <div className="section-inner">
        <div className="section-label" style={{ marginBottom: 56 }}>
          <div className="ln" /><span>Portfolio</span>
        </div>
        <h2 className="section-title" style={{ marginBottom: 64 }}>
          Dashboards built<br /><em>to decide</em>
        </h2>
        <div className="projects-grid">
          {PROJECTS.map((p) => (
            <div key={p.title} className={`proj-card${p.highlight ? ' highlight-card' : ''}`}>
              <div className="proj-platform">{p.platform}</div>
              <h3 className={`proj-title${p.highlight ? ' dim' : ''}`}>{p.title}</h3>
              <p className="proj-desc">{p.desc}</p>
              {p.href ? (
                <a
                  href={p.href}
                  className="proj-link"
                  target={p.external ? '_blank' : undefined}
                  rel={p.external ? 'noopener noreferrer' : undefined}
                >
                  {p.cta}
                </a>
              ) : (
                <span className="proj-link dim">{p.cta}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT ────────────────────────────────────── */
function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="section-inner">
        <div className="contact-inner">
          <div className="section-label">
            <div className="ln" /><span>Contact</span><div className="ln" />
          </div>
          <h2 className="section-title" style={{ marginTop: 20 }}>
            Let's build<br /><em>something great</em>
          </h2>
          <p className="contact-desc">
            Open to full-time roles, freelance projects, and collaborations in
            data analytics and business intelligence.
          </p>
          <a href={`mailto:${EMAIL}`} className="contact-email">{EMAIL}</a>
          <div className="social-row">
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="social-link">
              LinkedIn ↗
            </a>
            <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="social-link">
              GitHub ↗
            </a>
            <a href={RESUME_FILE} download="Smit_Jaiswal_Resume.docx" className="social-link">
              Download CV ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SCROLL TOP ─────────────────────────────────── */
function ScrollTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      className={`scroll-top${visible ? ' visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
}

/* ─── ROOT APP ───────────────────────────────────── */
export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Track active section with IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="grid-bg" aria-hidden="true" />
      <Nav activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <footer>
        <p>© {new Date().getFullYear()} Smit Jaiswal. All rights reserved.</p>
        <p>Power BI · Data Analytics · Business Intelligence</p>
      </footer>
      <ScrollTop />
    </>
  );
}
