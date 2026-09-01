import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { services } from '../data/services';

export default function Services() {
  return (
    <>
      <section className="page-top">
        <div className="container">
          <div className="section-header" style={{ maxWidth: '680px' }}>
            <span className="section-label">Services</span>
            <h1 className="section-title" style={{ fontSize: 'var(--text-5xl)' }}>
              What we build
            </h1>
            <p className="section-subtitle">
              End-to-end software development capabilities — from initial concept
              through to production and ongoing support.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="services-grid">
            {services.map((service) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <div className="card card--interactive" style={{ height: '100%' }}>
                  <div className="card__icon">
                    <service.icon size={28} />
                  </div>
                  <h3 className="card__title">{service.title}</h3>
                  <p className="card__text">{service.shortDesc}</p>
                  <span className="card__link">
                    Learn More <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <h2 className="cta-banner__title">Not sure which service you need?</h2>
          <p className="cta-banner__subtitle">
            Tell us about your project and we will recommend the right approach.
          </p>
          <Link to="/start-project" className="btn btn--primary btn--lg">
            Start a Project <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
