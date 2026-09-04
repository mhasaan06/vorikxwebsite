import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { services } from '../data/services';
import SEO from '../components/SEO';

export default function Services() {
  return (
    <>
      <SEO
        title="Our Services & Engineering Capabilities | VORIKX"
        description="Explore VORIKX's 9 core engineering solutions: Web Development, Custom Software, UI/UX Design, Video Editing, Social Media Management, Mobile Apps, AI & Automation, Backend/API, and Cloud/DevOps."
        url="https://vorikx.com/services"
      />
      <section className="page-top">
        <div className="container">
          <div className="section-header" style={{ maxWidth: '760px' }}>
            <span className="section-label">Our Capabilities</span>
            <h1 className="section-title" style={{ fontSize: 'var(--text-5xl)' }}>
              Engineered for impact. <br />
              <span className="gradient-text">Built to scale.</span>
            </h1>
            <p className="section-subtitle">
              End-to-end software engineering, product design, and creative media solutions tailored to transform your business into a high-performance digital product.
            </p>
          </div>
        </div>
      </section>

      {/* ── All 9 Core Services ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title" style={{ fontSize: 'var(--text-3xl)' }}>
              Core Services &amp; Solutions
            </h2>
            <p className="section-subtitle">
              Full-cycle engineering and creative delivery across modern software stacks.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service) => (
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
