import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { projects } from '../data/projects';

const filters = [
  { key: 'all', label: 'All' },
  { key: 'web', label: 'Web' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'software', label: 'Software' },
  { key: 'ai', label: 'AI' },
];

export default function Work() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      <section className="page-top">
        <div className="container">
          <div className="section-header" style={{ maxWidth: '680px' }}>
            <span className="section-label">Our Work</span>
            <h1 className="section-title" style={{ fontSize: 'var(--text-5xl)' }}>
              Projects that deliver results
            </h1>
            <p className="section-subtitle">
              A portfolio of work that demonstrates our engineering capabilities
              across industries and technologies.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="work-filters">
            {filters.map((f) => (
              <button
                key={f.key}
                className={`work-filter-btn${activeFilter === f.key ? ' active' : ''}`}
                onClick={() => setActiveFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="work-grid">
            {filteredProjects.map((project) => (
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

          {filteredProjects.length === 0 && (
            <div style={{ textAlign: 'center', padding: 'var(--space-16) 0' }}>
              <p style={{ color: 'var(--text-secondary)' }}>
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <h2 className="cta-banner__title">Have a project in mind?</h2>
          <p className="cta-banner__subtitle">
            Let's discuss how we can help bring your vision to life.
          </p>
          <Link to="/start-project" className="btn btn--primary btn--lg">
            Start a Project <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
