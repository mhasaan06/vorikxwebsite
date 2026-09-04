import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';

const serviceLinks = [
  { to: '/services/web-development', label: 'Web Development' },
  { to: '/services/custom-software', label: 'Custom Software' },
  { to: '/services/ui-ux-design', label: 'UI/UX Design' },
  { to: '/services/video-editing', label: 'Video Editing' },
  { to: '/services/social-media-management', label: 'Social Media Management' },
  { to: '/services/mobile-development', label: 'Mobile App Development' },
  { to: '/services/ai-automation', label: 'AI & Automation' },
  { to: '/services/backend-api', label: 'Backend & API Development' },
  { to: '/services/cloud-devops', label: 'Cloud & DevOps' },
];

const companyLinks = [
  { to: '/about', label: 'About Us' },
  { to: '/work', label: 'Our Work' },
  { to: '/process', label: 'Process' },
  { to: '/contact', label: 'Contact' },
  { to: '/start-project', label: 'Start a Project' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Column 1: Brand */}
          <div className="footer__brand">
            <Link to="/" className="flex items-center gap-4" style={{ textDecoration: 'none' }}>
              <img
                src="/vorikxlogo.png"
                alt="VORIKX Software & Technologies brand emblem"
                className="footer__logo"
                width="40"
                height="40"
                loading="lazy"
              />
              <div>
                <div className="wordmark" style={{ fontSize: '1.25rem' }}>
                  VORIK<span className="x-letter">X</span>
                </div>
                <div className="tagline" style={{ marginTop: '4px' }}>
                  Software &amp; Technologies
                </div>
              </div>
            </Link>
            <p className="footer__desc">
              Empowering businesses in the world of technology — turning your business into a professional digital product with quality and maintenance throughout.
            </p>
            <div className="flex items-center gap-2 text-xs text-teal" style={{ marginTop: 'var(--space-1)' }}>
              <ShieldCheck size={14} />
              <span>Founded 2026 · Lahore, Pakistan</span>
            </div>
            {/* Social links are hidden until real verified company profiles exist to prevent dead link clicks */}
          </div>

          {/* Column 2: Services */}
          <div>
            <div className="footer__heading">Services</div>
            {serviceLinks.map((link) => (
              <Link key={link.to} to={link.to} className="footer__link">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Column 3: Company */}
          <div>
            <div className="footer__heading">Company</div>
            {companyLinks.map((link) => (
              <Link key={link.to} to={link.to} className="footer__link">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Column 4: Contact */}
          <div>
            <div className="footer__heading">Contact</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                <Mail size={16} style={{ color: 'var(--accent)', marginTop: '3px', flexShrink: 0 }} />
                <a href="mailto:info@vorikx.com" className="footer__link" style={{ marginBottom: 0, color: 'inherit', textDecoration: 'none' }}>
                  info@vorikx.com
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                <Phone size={16} style={{ color: 'var(--accent)', marginTop: '3px', flexShrink: 0 }} />
                <a href="tel:+923405488826" className="footer__link" style={{ marginBottom: 0, color: 'inherit', textDecoration: 'none' }}>
                  +92 340 5488826
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                <MapPin size={16} style={{ color: 'var(--accent)', marginTop: '3px', flexShrink: 0 }} />
                <span className="footer__link" style={{ marginBottom: 0 }}>
                  Lahore, Pakistan
                </span>
              </div>
              <div style={{ marginTop: 'var(--space-3)' }}>
                <Link
                  to="/contact"
                  className="btn btn--secondary btn--sm"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    borderRadius: '100px',
                    padding: 'var(--space-2) var(--space-4)',
                    fontSize: 'var(--text-xs)',
                  }}
                >
                  Contact Us <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <span className="footer__copyright">
            &copy; 2026 VORIKX Software &amp; Technologies. All rights reserved.
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)' }}>
            <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
              <Link to="/about" className="footer__link" style={{ marginBottom: 0 }}>About</Link>
              <Link to="/contact" className="footer__link" style={{ marginBottom: 0 }}>Contact</Link>
            </div>
            {/* Decorative colored dot row */}
            <div className="footer__dots">
              <span className="footer__dot footer__dot--active" />
              <span className="footer__dot" />
              <span className="footer__dot footer__dot--active" />
              <span className="footer__dot" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
