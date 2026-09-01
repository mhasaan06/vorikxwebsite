import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { projects } from '../data/projects';

export default function CaseStudy() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/work" replace />;

  const currentIndex = projects.indexOf(project);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <>
      {/* ── Hero ── */}
      <section className="case-study__hero">
        <div className="container">
          <Link
            to="/work"
            className="btn btn--ghost"
            style={{ marginBottom: 'var(--space-6)', display: 'inline-flex' }}
          >
            <ArrowLeft size={16} /> All Projects
          </Link>
          <span className="section-label">{project.categoryLabel}</span>
          <h1 className="section-title" style={{ fontSize: 'var(--text-5xl)', marginTop: 'var(--space-3)' }}>
            {project.title}
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '100%' }}>
            {project.shortDesc}
          </p>
          <div className="case-study__meta">
            <div className="case-study__meta-item">
              <span className="case-study__meta-label">Category:</span>
              {project.categoryLabel}
            </div>
            <div className="case-study__meta-item">
              <span className="case-study__meta-label">Tech:</span>
              {project.technologies.slice(0, 3).join(', ')}
            </div>
          </div>
        </div>
      </section>

      {/* ── Project image placeholder ── */}
      <section style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div
            style={{
              width: '100%',
              height: '400px',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              marginBottom: 'var(--space-12)',
              border: '1px solid var(--border-color)',
            }}
          >
            Project Screenshot — {project.title}
          </div>
        </div>
      </section>

      {/* ── Challenge ── */}
      <section className="section">
        <div className="container container--narrow">
          <div className="case-study__section">
            <span className="section-label">The Challenge</span>
            <h3>Problem</h3>
            <p>{project.challenge}</p>
          </div>

          <hr className="divider" />

          <div className="case-study__section">
            <span className="section-label">Our Approach</span>
            <h3>Solution</h3>
            <p>{project.solution}</p>
          </div>

          <hr className="divider" />

          {/* ── Results ── */}
          <div className="case-study__section">
            <span className="section-label">Impact</span>
            <h3>Results</h3>
            <div className="grid grid-2" style={{ marginTop: 'var(--space-6)' }}>
              {project.results.map((result, i) => (
                <div
                  key={i}
                  className="card"
                  style={{ textAlign: 'center', padding: 'var(--space-6)' }}
                >
                  <p style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--weight-medium)' }}>
                    {result}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <hr className="divider" />

          {/* ── Technologies ── */}
          <div className="case-study__section">
            <span className="section-label">Tech Stack</span>
            <h3>Technologies Used</h3>
            <div className="case-study__tech-tags">
              {project.technologies.map((tech) => (
                <span key={tech} className="process-step__tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* ── Testimonial ── */}
          {project.testimonial && (
            <>
              <hr className="divider" />
              <div className="testimonial-card">
                <p className="testimonial-card__quote">
                  "{project.testimonial.quote}"
                </p>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">
                    {project.testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="testimonial-card__name">
                      {project.testimonial.author}
                    </div>
                    <div className="testimonial-card__role">
                      {project.testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── Prev / Next ── */}
      <section className="section section--slate">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {prevProject ? (
              <Link to={`/work/${prevProject.slug}`} className="btn btn--ghost">
                <ArrowLeft size={16} /> {prevProject.title}
              </Link>
            ) : <span />}
            {nextProject ? (
              <Link to={`/work/${nextProject.slug}`} className="btn btn--ghost">
                {nextProject.title} <ArrowRight size={16} />
              </Link>
            ) : <span />}
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <h2 className="cta-banner__title">Want results like these?</h2>
          <p className="cta-banner__subtitle">
            Let's discuss your project and how we can deliver measurable impact.
          </p>
          <Link to="/start-project" className="btn btn--primary btn--lg">
            Start a Project <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
