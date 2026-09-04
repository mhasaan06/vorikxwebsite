import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { projects as fallbackProjects } from '../data/projects';
import SEO from '../components/SEO';

export default function CaseStudy() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const { data, error } = await supabase
          .from('portfolio_projects')
          .select('id, title, slug, category, summary, case_study_content, cover_image_url, gallery_urls, is_featured, display_order, live_url, is_concept')
          .eq('slug', slug)
          .single();

        if (data) {
          setProject(data);
        } else {
          if (error) console.warn('[VORIKX] Note on project fetch:', error.message);
          const local = fallbackProjects.find((p) => p.slug === slug);
          setProject(local || null);
        }
      } catch (err) {
        console.error('[VORIKX] Error fetching case study:', err);
        const local = fallbackProjects.find((p) => p.slug === slug);
        setProject(local || null);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="loading-page">
        <div className="spinner" />
      </div>
    );
  }

  if (!project) return <Navigate to="/work" replace />;

  const challengeText = project.case_study_content || project.challenge || project.summary;
  const solutionText = project.solution || project.summary || 'Engineered custom solution with high-scale architecture.';
  const techList = project.technologies || ['React', 'Node.js', 'PostgreSQL', 'Cloud Engine'];

  return (
    <>
      <SEO
        title={`${project.title} — Case Study | VORIKX Engineering Portfolio`}
        description={project.summary || project.shortDesc}
        url={`https://vorikx.com/work/${project.slug}`}
        image={project.cover_image_url || '/og-image.png'}
      />

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
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <span className="section-label" style={{ marginBottom: 0 }}>{project.categoryLabel || project.category}</span>
            {project.is_concept && (
              <span className="badge badge--concept">Concept Project</span>
            )}
          </div>
          <h1 className="section-title" style={{ fontSize: 'var(--text-5xl)', marginTop: 'var(--space-3)' }}>
            {project.title}
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '100%' }}>
            {project.summary || project.shortDesc}
          </p>
          <div className="case-study__meta" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-6)' }}>
            <div className="case-study__meta-item">
              <span className="case-study__meta-label">Category:</span>
              {project.categoryLabel || project.category}
            </div>
            <div className="case-study__meta-item">
              <span className="case-study__meta-label">Tech:</span>
              {techList.slice(0, 4).join(', ')}
            </div>
            {project.live_url && (
              <div className="case-study__meta-item" style={{ marginLeft: 'auto' }}>
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary btn--sm"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  Visit live site <ExternalLink size={14} />
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Cover Image / Screenshot ── */}
      <section style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          {project.cover_image_url ? (
            <img
              src={project.cover_image_url}
              alt={`Full case study screenshot of ${project.title}`}
              loading="lazy"
              style={{
                width: '100%',
                maxHeight: '500px',
                objectFit: 'cover',
                borderRadius: 'var(--radius-lg)',
                marginBottom: 'var(--space-12)',
                border: '1px solid var(--border-color)',
              }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '350px',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-3)',
                color: 'var(--text-secondary)',
                marginBottom: 'var(--space-12)',
                border: '1px solid var(--border-color)',
              }}
            >
              <span style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--weight-semibold)', color: 'var(--text-primary)' }}>
                {project.title}
              </span>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                {project.categoryLabel || project.category}
              </span>
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--secondary btn--sm"
                  style={{ marginTop: 'var(--space-2)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  Visit live site <ExternalLink size={13} />
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── Case Study Content ── */}
      <section className="section">
        <div className="container container--narrow">
          <div className="section-header" style={{ marginBottom: 'var(--space-8)' }}>
            <span className="section-label">Case Study Deep Dive</span>
            <h2 className="section-title">Engineering Overview &amp; Execution</h2>
          </div>

          <div className="case-study__section">
            <span className="section-label">The Challenge</span>
            <h3>Problem Statement</h3>
            <p>{challengeText}</p>
          </div>

          <hr className="divider" />

          <div className="case-study__section">
            <span className="section-label">Our Approach</span>
            <h3>Engineering Solution</h3>
            <p>{solutionText}</p>
          </div>

          {/* Results if present */}
          {project.results?.length > 0 && (
            <>
              <hr className="divider" />
              <div className="case-study__section">
                <span className="section-label">Impact</span>
                <h3>Results &amp; Measurable Outcomes</h3>
                <div className="grid grid-2" style={{ marginTop: 'var(--space-6)', gap: 'var(--space-4)' }}>
                  {project.results.map((res, i) => (
                    <div key={i} className="card" style={{ padding: 'var(--space-4) var(--space-6)' }}>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', margin: 0 }}>
                        ✓ {res}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Gallery if present */}
          {project.gallery_urls?.length > 0 && (
            <>
              <hr className="divider" />
              <div className="case-study__section">
                <span className="section-label">Gallery</span>
                <h3>Project Showcase</h3>
                <div className="grid grid-2" style={{ marginTop: 'var(--space-6)' }}>
                  {project.gallery_urls.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt={`Interface showcase screenshot ${i + 1} for ${project.title}`}
                      loading="lazy"
                      style={{ width: '100%', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Testimonial if present */}
          {project.testimonial && (
            <>
              <hr className="divider" />
              <div className="testimonial-card" style={{ marginTop: 'var(--space-8)' }}>
                <p className="testimonial-card__quote">
                  "{project.testimonial.quote}"
                </p>
                <div className="testimonial-card__author" style={{ marginTop: 'var(--space-4)' }}>
                  <div className="testimonial-card__avatar">
                    {project.testimonial.author.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <div className="testimonial-card__name">{project.testimonial.author}</div>
                    <div className="testimonial-card__role">{project.testimonial.role}</div>
                  </div>
                </div>
              </div>
            </>
          )}

          <hr className="divider" />

          {/* ── Technologies ── */}
          <div className="case-study__section">
            <span className="section-label">Tech Stack</span>
            <h3>Technologies Used</h3>
            <div className="case-study__tech-tags">
              {techList.map((tech) => (
                <span key={tech} className="process-step__tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="cta-banner">
        <div className="container">
          <h2 className="cta-banner__title">Want results like these?</h2>
          <p className="cta-banner__subtitle">
            Let's discuss your project and how we can deliver measurable impact.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', marginTop: 'var(--space-6)', flexWrap: 'wrap' }}>
            <Link to="/start-project" className="btn btn--primary btn--lg">
              Start a Project <ArrowRight size={18} />
            </Link>
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--secondary btn--lg"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                Visit live site <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
