import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Eye, Award, Lightbulb, ShieldCheck, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { team } from '../data/content';
import SEO from '../components/SEO';

function TeamAvatar({ member }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="team-card__avatar">
      {!imgError && member.photo ? (
        <img
          src={member.photo}
          alt={`Portrait photo of ${member.name}, ${member.role} at VORIKX`}
          className="team-card__img"
          width="80"
          height="80"
          loading="lazy"
          onError={() => setImgError(true)}
        />
      ) : (
        <span>{member.initials}</span>
      )}
    </div>
  );
}

export default function About() {
  return (
    <>
      <SEO
        title="About Us | VORIKX — Software & Technologies"
        description="Learn about VORIKX, our vision, leadership team, and our commitment to building and maintaining high-quality digital products throughout their lifecycle."
        url="https://vorikx.com/about"
      />

      {/* ── Hero ── */}
      <section className="page-top">
        <div className="container">
          <div className="section-header" style={{ maxWidth: '720px' }}>
            <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}>
              <span className="badge badge--new" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={13} /> Founded 2026
              </span>
              <span className="badge badge--new" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={13} /> Lahore, Pakistan
              </span>
              <span className="badge badge--completed" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={13} /> +75 products built this year
              </span>
            </div>
            <h1 className="section-title" style={{ fontSize: 'var(--text-5xl)' }}>
              Turning businesses into <span className="gradient-text">professional digital products</span>.
            </h1>
            <p className="section-subtitle">
              We exist to empower businesses in the world of technology — and we believe in quality and maintenance throughout, not just a one-time launch.
            </p>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="section">
        <div className="container">
          <div className="section-header section-header--center">
            <span className="section-label">Core Philosophy</span>
            <h2 className="section-title">Our mission &amp; vision</h2>
          </div>
          <div className="grid grid-2" style={{ gap: 'var(--space-12)' }}>
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', border: '1px solid var(--border-color-strong)' }}>
              <div className="card__icon">
                <Target size={28} />
              </div>
              <h3 className="card__title">Our Mission</h3>
              <p className="card__text" style={{ fontSize: 'var(--text-base)', lineHeight: 1.7 }}>
                Our mission is to turn your business into a professional digital product. We exist to empower businesses in the world of technology — and we believe in quality and maintenance throughout, not just a one-time launch.
              </p>
            </div>
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', border: '1px solid var(--border-color-strong)' }}>
              <div className="card__icon">
                <Eye size={28} />
              </div>
              <h3 className="card__title">Our Vision</h3>
              <p className="card__text" style={{ fontSize: 'var(--text-base)', lineHeight: 1.7 }}>
                To become the most dependable software and technology partner for emerging businesses and enterprises globally — recognized for engineering discipline, seamless communication, and proactive long-term support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Company Stats ── */}
      <section className="section section--slate">
        <div className="container">
          <div className="grid grid-3" style={{ gap: 'var(--space-8)' }}>
            <div className="card" style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
              <div style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--weight-bold)', color: 'var(--accent)', marginBottom: 'var(--space-2)' }}>
                +75
              </div>
              <div style={{ fontWeight: 'var(--weight-semibold)', color: 'var(--text-primary)', marginBottom: 'var(--space-1)' }}>
                Products Built This Year
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                High-performance platforms, inventory systems, and web apps delivered across industries.
              </p>
            </div>
            <div className="card" style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
              <div style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--weight-bold)', color: 'var(--accent)', marginBottom: 'var(--space-2)' }}>
                2026
              </div>
              <div style={{ fontWeight: 'var(--weight-semibold)', color: 'var(--text-primary)', marginBottom: 'var(--space-1)' }}>
                Founded in Lahore, Pakistan
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                Established with a foundational commitment to craftsmanship, integrity, and client growth.
              </p>
            </div>
            <div className="card" style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
              <div style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--weight-bold)', color: 'var(--accent)', marginBottom: 'var(--space-2)' }}>
                100%
              </div>
              <div style={{ fontWeight: 'var(--weight-semibold)', color: 'var(--text-primary)', marginBottom: 'var(--space-1)' }}>
                Continuous Maintenance
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                Dedicated ongoing maintenance and support packages, not just a one-off software handoff.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── What Sets Us Apart ── */}
      <section className="section">
        <div className="container">
          <div className="section-header section-header--center">
            <span className="section-label">Why Vorikx</span>
            <h2 className="section-title">What sets us apart</h2>
          </div>
          <div className="grid grid-3">
            {[
              {
                icon: Award,
                title: 'Quality Throughout',
                text: 'We do not build minimum disposable prototypes. Every line of code is structured for maintainability, security, and long-term production stability.',
              },
              {
                icon: ShieldCheck,
                title: 'Long-Term Maintenance',
                text: 'Our engagement begins before launch and extends far beyond it. We actively monitor, update, and support your systems so they never degrade.',
              },
              {
                icon: Lightbulb,
                title: 'Transparent Collaboration',
                text: 'Direct communication with founders and engineers. Clear sprint demos, actionable progress updates, and transparent deliverables.',
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

      {/* ── Team Section ── */}
      <section className="section section--slate">
        <div className="container">
          <div className="section-header section-header--center">
            <span className="section-label">Leadership</span>
            <h2 className="section-title">The team behind VORIKX</h2>
            <p className="section-subtitle">
              Engineers and product creators dedicated to your digital success.
            </p>
          </div>
          <div className="team-grid">
            {team.map((member) => (
              <div key={member.name} className="team-card card" style={{ padding: 'var(--space-8)' }}>
                <TeamAvatar member={member} />
                <h3 className="team-card__name">{member.name}</h3>
                <p className="team-card__role">{member.role}</p>
                <p className="team-card__bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-banner">
        <div className="container">
          <h2 className="cta-banner__title">Ready to build your digital product?</h2>
          <p className="cta-banner__subtitle">
            Let us turn your business vision into a scalable, maintainable reality.
          </p>
          <Link to="/start-project" className="btn btn--primary btn--lg">
            Start a Project <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
