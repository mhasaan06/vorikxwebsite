import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { projects as fallbackProjects } from '../data/projects';
import SEO from '../components/SEO';

const filters = [
  { key: 'all', label: 'All' },
  { key: 'software', label: 'Software' },
  { key: 'web', label: 'Web' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'design', label: 'UI/UX' },
  { key: 'ai', label: 'AI & Automation' },
  { key: 'backend', label: 'Backend/API' },
  { key: 'cloud', label: 'Cloud/DevOps' },
  { key: 'media', label: 'Video' },
  { key: 'growth', label: 'Social Media' },
];

export default function Work() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [projectsList, setProjectsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const { data, error } = await supabase
          .from('portfolio_projects')
          .select('id, title, slug, category, summary, case_study_content, cover_image_url, gallery_urls, is_featured, display_order, live_url, is_concept')
          .order('display_order', { ascending: true });

        if (data && data.length > 0) {
          setProjectsList(data);
        } else {
          if (error) console.warn('[VORIKX] Note on portfolio_projects table:', error.message);
          // Fallback to local static items
          setProjectsList(fallbackProjects);
        }
      } catch (err) {
        console.error('[VORIKX] Portfolio fetch error:', err);
        setProjectsList(fallbackProjects);
      } finally {
        setLoading(false);
      }
    }
    fetchPortfolio();
  }, []);

  const filteredProjects =
    activeFilter === 'all'
      ? projectsList
      : projectsList.filter(
          (p) =>
            p.category?.toLowerCase() === activeFilter.toLowerCase() ||
            p.categoryLabel?.toLowerCase() === activeFilter.toLowerCase()
        );

  return (
    <>
      <SEO
        title="Our Work & Case Studies | VORIKX Engineering Portfolio"
        description="Explore digital products and scalable systems engineered by VORIKX, including Bin Hayat Dollar Store (BHDS), SkillSwap, and AI automation platforms."
        url="https://vorikx.com/work"
      />

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
          <h2 style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0 }}>
            Featured Engineering Projects
          </h2>
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

          {loading ? (
            <div className="loading-page">
              <div className="spinner" />
            </div>
          ) : (
            <div className="work-grid">
              {filteredProjects.map((project) => (
                <div key={project.slug} className="project-card" style={{ textDecoration: 'none' }}>
                  <Link
                    to={`/work/${project.slug}`}
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <div className="project-card__image">
                      {project.cover_image_url ? (
                        <img
                          src={project.cover_image_url}
                          alt={`Case study cover preview for ${project.title}`}
                          width="600"
                          height="340"
                          loading="lazy"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <span className="project-card__placeholder">
                          {project.title}
                        </span>
                      )}
                    </div>
                  </Link>
                  <div className="project-card__body">
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                        <span className="project-card__category" style={{ marginBottom: 0 }}>
                          {project.categoryLabel || project.category}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                          {project.is_concept && (
                            <span className="badge badge--concept">
                              Concept Project
                            </span>
                          )}
                          {project.live_url && (
                            <a
                              href={project.live_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="badge badge--new"
                              style={{ fontSize: '0.65rem', display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
                            >
                              Live Site <ExternalLink size={10} />
                            </a>
                          )}
                        </div>
                      </div>
                      <Link to={`/work/${project.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <h3 className="project-card__title">{project.title}</h3>
                      </Link>
                      <p className="project-card__desc">
                        {project.summary || project.shortDesc}
                      </p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-4)', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--border-color)' }}>
                      <Link to={`/work/${project.slug}`} className="card__link" style={{ margin: 0 }}>
                        Case Study <ArrowRight size={14} />
                      </Link>
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontSize: 'var(--text-xs)', color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 'var(--weight-medium)', textDecoration: 'none' }}
                        >
                          Visit live site →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredProjects.length === 0 && (
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
