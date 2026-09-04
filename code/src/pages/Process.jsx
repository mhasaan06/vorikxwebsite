import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Code2, ShieldCheck, CheckCircle2, Layers } from 'lucide-react';
import { processSteps } from '../data/content';
import SEO from '../components/SEO';

export default function Process() {
  const stepRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    stepRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const anchorPillars = [
    {
      num: 'Pillar 01',
      title: 'Discovery & Strategy',
      desc: 'Architectural clarity and scope definition before code is written.',
      icon: <Compass size={18} className="text-teal" />,
    },
    {
      num: 'Pillar 02',
      title: 'Agile Core Engineering',
      desc: 'Rapid 2-week sprint releases with production-grade QA at every step.',
      icon: <Code2 size={18} className="text-teal" />,
    },
    {
      num: 'Pillar 03',
      title: 'Maintenance & SLA',
      desc: 'Continuous uptime, SLA security monitoring, and feature iteration.',
      icon: <ShieldCheck size={18} className="text-teal" />,
    },
  ];

  return (
    <>
      <SEO
        title="Our Engineering Process & Methodology | VORIKX"
        description="Explore how VORIKX delivers digital products — from discovery and system architecture to agile delivery and ongoing maintenance."
        url="https://vorikx.com/process"
      />

      <section className="page-top">
        <div className="container">
          <div className="section-header" style={{ maxWidth: '720px' }}>
            <span className="section-label">Our Engineering Process</span>
            <h1 className="section-title" style={{ fontSize: 'var(--text-5xl)' }}>
              How We Build &amp; Maintain
            </h1>
            <p className="section-subtitle">
              A disciplined, transparent delivery framework engineered to eliminate surprises. 
              We prioritize foundational architecture, iterative delivery, and lifelong maintenance.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          {/* Top 3-Pillars Summary */}
          <div className="process-pillars-banner">
            {anchorPillars.map((p) => (
              <div key={p.num} className="process-pillar-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
                  {p.icon}
                  <span className="process-pillar-card__num">{p.num}</span>
                </div>
                <h2 className="process-pillar-card__title" style={{ fontSize: 'var(--text-base)', margin: 0, paddingBottom: '4px' }}>{p.title}</h2>
                <p className="process-pillar-card__desc">{p.desc}</p>
              </div>
            ))}
          </div>

          <h2 style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0 }}>
            Agile Development &amp; Delivery Lifecycle
          </h2>

          <div className="process-timeline">
            {processSteps.map((step, idx) => {
              const isAnchor = step.isMain;
              return (
                <div
                  key={step.number}
                  ref={(el) => (stepRefs.current[idx] = el)}
                  className={`process-step ${isAnchor ? 'process-step--main' : 'process-step--secondary'}`}
                  style={{ transitionDelay: `${(idx % 3) * 100}ms` }}
                >
                  <div className="process-step__number">{step.number}</div>

                  <div className="process-step__card">
                    {isAnchor ? (
                      <span className="process-step__pill-badge">
                        <CheckCircle2 size={13} /> {step.phaseLabel}
                      </span>
                    ) : (
                      <div className="process-step__phase-label">{step.phaseLabel}</div>
                    )}

                    <h3 className="process-step__title">{step.title}</h3>
                    <p className="process-step__desc">{step.desc}</p>

                    <div className="process-step__deliverables">
                      {step.deliverables.map((d) => (
                        <span key={d} className="process-step__tag">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <h2 className="cta-banner__title">Ready to build something lasting?</h2>
          <p className="cta-banner__subtitle">
            Our process begins with an in-depth conversation. Tell us about your vision,
            and we will architect a delivery roadmap together.
          </p>
          <Link to="/start-project" className="btn btn--primary btn--lg">
            Start a Project <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
