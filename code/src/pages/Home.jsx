import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ChevronDown, Shield, Zap, Users, Headphones, Building, Rocket, Building2, ShieldCheck, Cpu, Sparkles
} from 'lucide-react';
import { services } from '../data/services';
import { projects } from '../data/projects';
import { clients, industries, stats, testimonials, faq } from '../data/content';

import HeroServiceSlider from '../components/HeroServiceSlider';

const industryIcons = {
  startups: Rocket,
  smb: Building2,
  enterprise: ShieldCheck,
  'fintech-healthtech': Cpu,
};

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`accordion-item${open ? ' item-open' : ''}`}>
      <button
        className="accordion-trigger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {question}
        <ChevronDown size={20} />
      </button>
      <div className={`accordion-content${open ? ' open' : ''}`}>
        <p>{answer}</p>
      </div>
    </div>
  );
}

function AnimatedStatNumber({ value }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);

  const numericPart = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
  const prefix = value.startsWith('+') ? '+' : '';
  const suffix = value.includes('%') ? '%' : (value.includes('+') && !value.startsWith('+')) ? '+' : '';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const duration = 1600;
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentNumber = Math.floor(easeProgress * numericPart);
            setDisplayValue(currentNumber);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [numericPart]);

  return (
    <div ref={ref} className="stat-value">
      {prefix}{displayValue}<span>{suffix}</span>
    </div>
  );
}

export default function Home() {
  const featuredProjects = projects.slice(0, 3);
  const marqueeClients = [...clients, ...clients];

  return (
    <>
      {/* ── 1. Hero Section with Radial Glow, Gradient Headline & Service Slider Panel ── */}
      <section className="hero glow-bg">
        <div className="container">
          <div className="hero__grid">
            {/* Left Content */}
            <div className="hero__content" style={{ position: 'relative', zIndex: 1 }}>
              <span className="badge badge--new" style={{ marginBottom: 'var(--space-6)' }}>
                SOFTWARE DEVELOPMENT &amp; DIGITAL AGENCY
              </span>
              <h1 className="hero__title">
                <span className="hero-animate-word" style={{ animationDelay: '0ms' }}>Turn&nbsp;</span>
                <span className="hero-animate-word" style={{ animationDelay: '80ms' }}>ideas&nbsp;</span>
                <span className="hero-animate-word" style={{ animationDelay: '160ms' }}>into&nbsp;</span>
                <span className="hero-animate-word" style={{ animationDelay: '240ms' }}>scalable</span>
                <br />
                <span className="gradient-text">
                  <span className="hero-animate-word" style={{ animationDelay: '320ms' }}>digital&nbsp;</span>
                  <span className="hero-animate-word" style={{ animationDelay: '400ms' }}>products</span>
                </span>
              </h1>
              <p className="hero__subtitle">
                We partner with ambitious startups and enterprises to design, engineer, and deploy high-performance web platforms, mobile apps, custom software, and AI automation.
              </p>
              <div className="hero__actions">
                <Link to="/start-project" className="btn btn--white btn--lg">
                  Start a Project <ArrowRight size={18} />
                </Link>
                <Link to="/services" className="btn btn--secondary btn--lg">
                  Explore Services
                </Link>
              </div>

              {/* Small trust indicator line */}
              <div style={{ marginTop: 'var(--space-8)', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <Sparkles size={14} className="text-teal" />
                <span>+150 businesses building with VORIKX engineering</span>
              </div>
            </div>

            {/* Right Service Slider Panel with Custom Vector SVG Illustrations */}
            <HeroServiceSlider />
          </div>
        </div>
      </section>

      {/* ── 2. Client Logo Marquee Strip (Infinite Auto-Scroll) ── */}
      <section className="logo-strip">
        <div className="logo-strip__intro">
          TRUSTED BY TEAMS BUILDING WITH VORIKX
        </div>
        <div className="marquee-container">
          <div className="marquee-track">
            {marqueeClients.map((c, i) => (
              <div key={`${c.name}-${i}`} className="logo-strip__item">
                <Building size={16} className="text-teal" />
                <div>
                  <div className="logo-strip__name">{c.name}</div>
                  <div className="logo-strip__label">{c.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Services Catalog Grid ── */}
      <section className="section section--slate">
        <div className="container">
          <div className="section-header section-header--center">
            <span className="section-label">Our Capabilities</span>
            <h2 className="section-title">Our services</h2>
            <p className="section-subtitle">
              End-to-end capabilities tailored to take your digital product from initial concept to high-throughput scale.
            </p>
          </div>
          <div className="grid grid-3">
            {services.map((service, idx) => {
              const Icon = service.icon;
              const isFeatured = idx === 0; // Flagship Web Development featured wider/first
              return (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  style={{
                    textDecoration: 'none',
                    gridColumn: isFeatured ? 'span 1' : 'span 1',
                  }}
                >
                  <div className="card card--interactive" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div className="card__icon">
                        <Icon size={28} />
                      </div>
                      <span className="section-label" style={{ fontSize: '0.65rem', marginBottom: 'var(--space-2)', display: 'block' }}>
                        {service.category}
                      </span>
                      <h3 className="card__title">{service.title}</h3>
                      <p className="card__text">{service.shortDesc}</p>
                    </div>
                    <span className="card__link">
                      Learn more <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
            <Link to="/services" className="btn btn--secondary btn--lg">
              View All Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4. Who We Build For (Industry/Use-Case Cards) ── */}
      <section className="section">
        <div className="container">
          <div className="section-header section-header--center">
            <span className="section-label">Target Clients</span>
            <h2 className="section-title">Who we build for</h2>
            <p className="section-subtitle">
              Tailored engineering strategies designed around your company's stage and technical maturity.
            </p>
          </div>
          <div className="grid grid-2">
            {industries.map((ind) => {
              const Icon = industryIcons[ind.slug] || Building2;
              return (
                <div key={ind.slug} className="card card--interactive" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 'var(--space-10)' }}>
                  {/* Faint background icon watermark bleeding off edge */}
                  <Icon
                    size={180}
                    style={{
                      position: 'absolute',
                      right: '-30px',
                      bottom: '-30px',
                      color: 'rgba(22, 140, 136, 0.04)',
                      pointerEvents: 'none',
                    }}
                  />
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
                      <div className="card__icon" style={{ margin: 0 }}>
                        <Icon size={32} />
                      </div>
                      <span className="badge badge--new">{ind.badge}</span>
                    </div>
                    <h3 className="card__title" style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>
                      {ind.title}
                    </h3>
                    <p className="card__text" style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-6)' }}>
                      {ind.desc}
                    </p>
                  </div>
                  <Link to="/start-project" className="card__link" style={{ position: 'relative', zIndex: 1 }}>
                    Start a Project for {ind.title} <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* "We also work with:" Pill Tags Row */}
          <div style={{ marginTop: 'var(--space-12)', textAlign: 'center' }}>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginRight: 'var(--space-4)' }}>
              We also work with:
            </span>
            <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
              {['SaaS Platforms', 'E-Commerce Platforms', 'Logistics & Supply Chain', 'AI Startups', 'B2B Marketplaces'].map((tag) => (
                <span key={tag} className="badge badge--archived" style={{ textTransform: 'none', fontSize: 'var(--text-xs)' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Track Record Stats Band with Count-Up Animation ── */}
      <section className="stats-band">
        <div className="container">
          <div className="section-header section-header--center" style={{ marginBottom: 'var(--space-12)' }}>
            <h2 className="section-title">A track record that backs us up</h2>
          </div>
          <div className="stats-grid">
            {stats.map((s) => (
              <div key={s.label} className="stat-item">
                <AnimatedStatNumber value={s.value} />
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Why Choose Us ── */}
      <section className="section section--slate">
        <div className="container">
          <div className="section-header section-header--center">
            <span className="section-label">Why Vorikx</span>
            <h2 className="section-title">Engineered for long-term scale</h2>
            <p className="section-subtitle">
              We go beyond standard development — focusing on architectural integrity, clean code maintainability, and business impact.
            </p>
          </div>
          <div className="grid grid-4">
            {[
              {
                icon: Zap,
                title: 'Scalable Architecture',
                text: 'Systems engineered to scale seamlessly from day one to millions of active daily requests.',
              },
              {
                icon: Users,
                title: 'Agile Transparency',
                text: 'Two-week sprint demos and direct engineer access keep your product vision on track.',
              },
              {
                icon: Shield,
                title: 'Enterprise Security',
                text: 'Strict compliance, role-based access control, and automated security checks built in.',
              },
              {
                icon: Headphones,
                title: 'Dedicated Support',
                text: 'Post-launch maintenance, SLAs, and continuous optimization for long-term product success.',
              },
            ].map((item) => (
              <div key={item.title} className="card">
                <div className="card__icon">
                  <item.icon size={28} />
                </div>
                <h3 className="card__title">{item.title}</h3>
                <p className="card__text">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Featured Work ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Case Studies</span>
            <h2 className="section-title">Featured projects</h2>
            <p className="section-subtitle">
              Real-world digital products delivered for high-growth tech teams.
            </p>
          </div>
          <div className="work-grid">
            {featuredProjects.map((project) => (
              <Link
                key={project.slug}
                to={`/work/${project.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <div className="project-card">
                  <div className="project-card__image">
                    <span className="project-card__placeholder">
                      {project.title}
                    </span>
                  </div>
                  <div className="project-card__body">
                    <span className="project-card__category">
                      {project.categoryLabel}
                    </span>
                    <h3 className="project-card__title">{project.title}</h3>
                    <p className="project-card__desc">{project.shortDesc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
            <Link to="/work" className="btn btn--secondary">
              View All Projects <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 8. Testimonials Section (3-Column Grid, Middle Featured) ── */}
      <section className="section section--slate">
        <div className="container">
          <div className="section-header section-header--center">
            <span className="section-label">Client Feedback</span>
            <h2 className="section-title">What technology leaders say</h2>
          </div>
          <div className="grid grid-3">
            {testimonials.map((t, idx) => {
              const isMiddleFeatured = idx === 1;
              return (
                <div
                  key={t.author}
                  className="testimonial-card"
                  style={{
                    backgroundColor: isMiddleFeatured ? 'var(--bg-primary)' : 'var(--bg-secondary)',
                    border: isMiddleFeatured ? '1px solid var(--accent)' : '1px solid var(--border-color)',
                    boxShadow: isMiddleFeatured ? '0 12px 24px rgba(22, 140, 136, 0.12)' : 'none',
                  }}
                >
                  <p className="testimonial-card__quote">"{t.quote}"</p>
                  <div className="testimonial-card__author">
                    <div className="testimonial-card__avatar">{t.initials}</div>
                    <div>
                      <div className="testimonial-card__name">{t.author}</div>
                      <div className="testimonial-card__role">{t.role}</div>
                    </div>
                  </div>
                  {t.servicesUsed && (
                    <div className="testimonial-card__tags">
                      {t.servicesUsed.map((svc) => (
                        <span key={svc} className="testimonial-card__tag">
                          {svc}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 9. FAQ Accordion ── */}
      <section className="section">
        <div className="container container--narrow">
          <div className="section-header section-header--center">
            <span className="section-label">FAQ</span>
            <h2 className="section-title">Frequently asked questions</h2>
          </div>
          {faq.map((item) => (
            <FAQItem key={item.question} {...item} />
          ))}
        </div>
      </section>

      {/* ── 10. Final High-Contrast CTA Band with Radial Glow ── */}
      <section className="section section--slate">
        <div className="container">
          <div
            className="cta-banner glow-bg"
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color-strong)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-20) var(--space-8)',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 className="cta-banner__title">Ready to build your digital product?</h2>
              <p className="cta-banner__subtitle">
                Let's discuss your technical goals and formulate a clear roadmap for execution.
              </p>
              <Link to="/start-project" className="btn btn--white btn--lg">
                Start a Project <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
