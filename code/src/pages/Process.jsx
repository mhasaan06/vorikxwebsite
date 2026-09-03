import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { processSteps } from '../data/content';
import SEO from '../components/SEO';

export default function Process() {
  return (
    <>
      <SEO
        title="Our Engineering Process & Methodology | VORIKX"
        description="Explore how VORIKX delivers digital products — from discovery and system architecture to agile delivery and ongoing maintenance."
        url="https://vorikx.com/process"
      />

      <section className="page-top">
        <div className="container">
          <div className="section-header" style={{ maxWidth: '680px' }}>
            <span className="section-label">Our Process</span>
            <h1 className="section-title" style={{ fontSize: 'var(--text-5xl)' }}>
              How we work
            </h1>
            <p className="section-subtitle">
              A structured, transparent process that keeps you in control and
              delivers predictable outcomes — from first call to ongoing support.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0 }}>
            Agile Development &amp; Delivery Lifecycle
          </h2>
          <div className="process-timeline">
            {processSteps.map((step) => (
              <div key={step.number} className="process-step">
                <div className="process-step__number">{step.number}</div>
                <h3 className="process-step__title">{step.title}</h3>
                <p className="process-step__desc">{step.desc}</p>
                <div className="process-step__deliverables">
                  {step.deliverables.map((d) => (
                    <span key={d} className="process-step__tag">{d}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <h2 className="cta-banner__title">Ready to get started?</h2>
          <p className="cta-banner__subtitle">
            Our process begins with a conversation. Tell us about your project
            and we will take it from there.
          </p>
          <Link to="/start-project" className="btn btn--primary btn--lg">
            Start a Project <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
