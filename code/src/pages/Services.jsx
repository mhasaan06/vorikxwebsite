import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';
import { services } from '../data/services';
import SEO from '../components/SEO';

export default function Services() {
  const availableServices = services.filter((s) => !s.isComingSoon);
  const comingSoonServices = services.filter((s) => s.isComingSoon);

  return (
    <>
      <SEO
        title="Our Services & Engineering Capabilities | VORIKX"
        description="Explore VORIKX engineering solutions: Web Development, Custom Software, UI/UX Design, Video Editing, Social Media Management, and future-ready tech platforms."
        url="https://vorikx.com/services"
      />
      <section className="page-top">
        <div className="container">
          <div className="section-header" style={{ maxWidth: '720px' }}>
            <span className="section-label">Our Capabilities</span>
            <h1 className="section-title" style={{ fontSize: 'var(--text-5xl)' }}>
              Engineered for impact. <br />
              <span className="gradient-text">Built to scale.</span>
            </h1>
            <p className="section-subtitle">
              End-to-end software, design, and media capabilities tailored to transform your business into a high-performance digital product.
            </p>
          </div>
        </div>
      </section>

      {/* ── 1. Available Now Services (5 Core Services) ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge--new" style={{ marginBottom: 'var(--space-2)' }}>
              AVAILABLE NOW
            </span>
            <h2 className="section-title" style={{ fontSize: 'var(--text-3xl)' }}>
              Core Services &amp; Solutions
            </h2>
            <p className="section-subtitle">
              Full-cycle execution available immediately for your digital roadmap.
            </p>
          </div>

          <div className="services-grid">
            {availableServices.map((service) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <div className="card card--interactive" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                      <div className="card__icon" style={{ margin: 0 }}>
                        <service.icon size={28} />
                      </div>
                      <span className="badge badge--new" style={{ fontSize: '0.65rem' }}>Active</span>
                    </div>
                    <span className="section-label" style={{ fontSize: '0.65rem', marginBottom: 'var(--space-1)', display: 'block' }}>
                      {service.category}
                    </span>
                    <h3 className="card__title">{service.title}</h3>
                    <p className="card__text">{service.shortDesc}</p>
                  </div>
                  <span className="card__link" style={{ marginTop: 'var(--space-6)' }}>
                    Learn More <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Coming Soon Subsection (4 Services, Dimmed & Badged) ── */}
      <section className="section section--slate">
        <div className="container">
          <div className="section-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span className="badge badge--coming-soon" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={13} /> COMING SOON
              </span>
            </div>
            <h2 className="section-title" style={{ fontSize: 'var(--text-3xl)' }}>
              Upcoming Capabilities
            </h2>
            <p className="section-subtitle">
              Expanding our engineering horizons — preview what our team is preparing for future releases.
            </p>
          </div>

          <div className="grid grid-2" style={{ gap: 'var(--space-6)' }}>
            {comingSoonServices.map((service) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <div className="card card--coming-soon card--interactive" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                      <div className="card__icon" style={{ margin: 0, color: 'var(--color-silver)' }}>
                        <service.icon size={28} />
                      </div>
                      <span className="badge badge--coming-soon">Coming Soon</span>
                    </div>
                    <span className="section-label" style={{ fontSize: '0.65rem', marginBottom: 'var(--space-1)', display: 'block', color: 'var(--color-silver)' }}>
                      {service.category}
                    </span>
                    <h3 className="card__title">{service.title}</h3>
                    <p className="card__text">{service.shortDesc}</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-6)' }}>
                    <span className="card__link" style={{ color: 'var(--color-silver)' }}>
                      Preview Roadmap <ArrowRight size={14} />
                    </span>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                      In Development
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-banner">
        <div className="container">
          <h2 className="cta-banner__title">Need a tailored solution?</h2>
          <p className="cta-banner__subtitle">
            Tell us about your project requirements and we will design the right technical approach.
          </p>
          <Link to="/start-project" className="btn btn--primary btn--lg">
            Start a Project <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
