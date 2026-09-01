import { Link } from 'react-router-dom';
import { ArrowRight, Target, Eye, Award, Lightbulb } from 'lucide-react';
import { team } from '../data/content';

export default function About() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="page-top">
        <div className="container">
          <div className="section-header" style={{ maxWidth: '680px' }}>
            <span className="section-label">About Us</span>
            <h1 className="section-title" style={{ fontSize: 'var(--text-5xl)' }}>
              Engineering excellence,<br />delivered.
            </h1>
            <p className="section-subtitle">
              We are a team of engineers, designers, and strategists who build
              digital products that scale. Founded on the belief that great
              software requires both technical rigor and deep business understanding.
            </p>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ gap: 'var(--space-12)' }}>
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div className="card__icon">
                <Target size={28} />
              </div>
              <h3 className="card__title">Our Mission</h3>
              <p className="card__text" style={{ fontSize: 'var(--text-base)' }}>
                To empower businesses with technology that works — software that
                is reliable, performant, and built to last. We believe every
                organization deserves engineering excellence, regardless of size.
              </p>
            </div>
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div className="card__icon">
                <Eye size={28} />
              </div>
              <h3 className="card__title">Our Vision</h3>
              <p className="card__text" style={{ fontSize: 'var(--text-base)' }}>
                To be the technology partner businesses trust for their most
                critical digital initiatives. We aim to set the standard for
                quality, transparency, and impact in custom software development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Vorikx ── */}
      <section className="section section--slate">
        <div className="container">
          <div className="section-header section-header--center">
            <span className="section-label">Why Vorikx</span>
            <h2 className="section-title">What sets us apart</h2>
          </div>
          <div className="grid grid-3">
            {[
              {
                icon: Award,
                title: 'Engineering-First Culture',
                text: 'We hire senior engineers and give them the autonomy to make the right technical decisions. No shortcuts, no technical debt by default.',
              },
              {
                icon: Lightbulb,
                title: 'Business-Minded Approach',
                text: 'We do not just write code — we understand your market, users, and growth trajectory to build software that serves your business goals.',
              },
              {
                icon: Target,
                title: 'Transparent Communication',
                text: 'Weekly progress reports, bi-weekly demos, and direct access to your development team. No surprises, no black boxes.',
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

      {/* ── Team ── */}
      <section className="section">
        <div className="container">
          <div className="section-header section-header--center">
            <span className="section-label">Our Team</span>
            <h2 className="section-title">The people behind the code</h2>
            <p className="section-subtitle">
              A small, senior team that punches above its weight.
            </p>
          </div>
          <div className="team-grid">
            {team.map((member) => (
              <div key={member.name} className="team-card">
                <div className="team-card__avatar">{member.initials}</div>
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
          <h2 className="cta-banner__title">Want to work with us?</h2>
          <p className="cta-banner__subtitle">
            We are always looking for challenging projects and talented people.
          </p>
          <Link to="/start-project" className="btn btn--primary btn--lg">
            Start a Project <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
