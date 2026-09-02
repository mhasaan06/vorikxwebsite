import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { projects as fallbackProjects } from '../data/projects';

export default function CaseStudy() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const { data, error } = await supabase
          .from('portfolio_projects')
          .select('id, title, slug, category, summary, case_study_content, cover_image_url, gallery_urls, is_featured, display_order')
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
          <span className="section-label">{project.categoryLabel || project.category}</span>
          <h1 className="section-title" style={{ fontSize: 'var(--text-5xl)', marginTop: 'var(--space-3)' }}>
            {project.title}
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '100%' }}>
            {project.summary || project.shortDesc}
          </p>
          <div className="case-study__meta">
            <div className="case-study__meta-item">
              <span className="case-study__meta-label">Category:</span>
              {project.categoryLabel || project.category}
            </div>
            <div className="case-study__meta-item">
              <span className="case-study__meta-label">Tech:</span>
              {techList.slice(0, 3).join(', ')}
            </div>
          </div>
        </div>
      </section>

      {/* ── Cover Image / Screenshot ── */}
      <section style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          {project.cover_image_url ? (
            <img
              src={project.cover_image_url}
              alt={project.title}
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
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                marginBottom: 'var(--space-12)',
                border: '1px solid var(--border-color)',
              }}
            >
              Project Screenshot — {project.title}
            </div>
          )}
        </div>
      </section>

      {/* ── Case Study Content ── */}
      <section className="section">
        <div className="container container--narrow">
          <div className="case-study__section">
            <span className="section-label">Case Study &amp; Challenge</span>
            <h3>Overview &amp; Problem Statement</h3>
            <p>{challengeText}</p>
          </div>

          <hr className="divider" />

          <div className="case-study__section">
            <span className="section-label">Engineering Solution</span>
            <h3>Architecture &amp; Implementation</h3>
            <p>{solutionText}</p>
          </div>

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
                      alt={`Gallery ${i}`}
                      style={{ width: '100%', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
                    />
                  ))}
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
          <Link to="/start-project" className="btn btn--primary btn--lg">
            Start a Project <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
