import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { services } from '../data/services';
import { projects } from '../data/projects';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) return <Navigate to="/services" replace />;

  const currentIndex = services.indexOf(service);
  const prevService = currentIndex > 0 ? services[currentIndex - 1] : null;
  const nextService = currentIndex < services.length - 1 ? services[currentIndex + 1] : null;

  // Find related projects based on category mapping
  const categoryMap = {
    'web-development': 'web',
    'mobile-development': 'mobile',
    'custom-software': 'software',
    'ai-automation': 'ai',
  };
  const relatedProjects = projects.filter(
    (p) => p.category === categoryMap[slug]
  ).slice(0, 2);

  return (
    <>
      {/* ── Hero ── */}
      <section className="service-detail__hero">
        <div className="container">
          <Link
            to="/services"
            className="btn btn--ghost"
            style={{ marginBottom: 'var(--space-6)', display: 'inline-flex' }}
          >
            <ArrowLeft size={16} /> All Services
          </Link>
          <div style={{ maxWidth: '680px' }}>
            <div className="card__icon" style={{ marginBottom: 'var(--space-4)' }}>
              <service.icon size={36} />
            </div>
            <h1 className="section-title" style={{ fontSize: 'var(--text-5xl)' }}>
              {service.title}
            </h1>
            <p className="section-subtitle" style={{ maxWidth: '100%' }}>
              {service.fullDesc}
            </p>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Capabilities</span>
            <h2 className="section-title">What we deliver</h2>
          </div>
          <div className="service-detail__features">
            {service.features.map((feature) => (
              <div key={feature.title} className="card">
                <h4 className="card__title" style={{ fontSize: 'var(--text-lg)' }}>
                  {feature.title}
                </h4>
                <p className="card__text">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Technologies ── */}
      <section className="section section--slate">
        <div className="container">
          <div className="section-header section-header--center">
            <span className="section-label">Tech Stack</span>
            <h2 className="section-title">Technologies</h2>
          </div>
          <div className="tech-strip">
            {service.technologies.map((tech) => (
              <div key={tech} className="tech-item">
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)' }}>
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related Projects ── */}
      {relatedProjects.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Related Work</span>
              <h2 className="section-title">Projects using {service.title}</h2>
            </div>
            <div className="grid grid-2">
              {relatedProjects.map((project) => (
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
          </div>
        </section>
      )}

      {/* ── Navigation + CTA ── */}
      <section className="section section--slate">
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 'var(--space-12)',
            }}
          >
            {prevService ? (
              <Link to={`/services/${prevService.slug}`} className="btn btn--ghost">
                <ArrowLeft size={16} /> {prevService.title}
              </Link>
            ) : <span />}
            {nextService ? (
              <Link to={`/services/${nextService.slug}`} className="btn btn--ghost">
                {nextService.title} <ArrowRight size={16} />
              </Link>
            ) : <span />}
          </div>
          <div className="cta-banner" style={{ borderTop: 'none', padding: 'var(--space-8) 0' }}>
            <h2 className="cta-banner__title">Need {service.title.toLowerCase()}?</h2>
            <p className="cta-banner__subtitle">
              Tell us about your project and let's see how we can help.
            </p>
            <Link to="/start-project" className="btn btn--primary btn--lg">
              Start a Project <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
