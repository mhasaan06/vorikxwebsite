import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found | VORIKX</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <section className="page-top">
        <div className="container container--narrow" style={{ textAlign: 'center', padding: 'var(--space-24) 0' }}>
          <div style={{ fontSize: 'var(--text-6xl)', fontWeight: 'var(--weight-bold)', color: 'var(--accent)', marginBottom: 'var(--space-4)' }}>
            404
          </div>
          <h1 className="section-title">Page not found</h1>
          <p className="section-subtitle" style={{ margin: 'var(--space-4) auto var(--space-8)', maxWidth: '400px' }}>
            The page you are looking for does not exist or has been moved.
          </p>
          <Link to="/" className="btn btn--primary btn--lg">
            <ArrowLeft size={18} /> Back to Home
          </Link>
        </div>
      </section>
    </>
  );
}
