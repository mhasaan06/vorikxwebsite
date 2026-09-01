import { Link } from 'react-router-dom';
import {
  ExternalLink, MessageCircle, Code2, Camera, Mail, Phone, MapPin, ShieldCheck
} from 'lucide-react';

const serviceLinks = [
  { to: '/services/web-development', label: 'Web Development' },
  { to: '/services/mobile-development', label: 'Mobile Development' },
  { to: '/services/custom-software', label: 'Custom Software' },
  { to: '/services/ai-automation', label: 'AI & Automation' },
  { to: '/services/ui-ux-design', label: 'UI/UX Design' },
  { to: '/services/backend-api', label: 'Backend & API' },
  { to: '/services/cloud-devops', label: 'Cloud & DevOps' },
];

const companyLinks = [
  { to: '/about', label: 'About Us' },
  { to: '/work', label: 'Our Work' },
  { to: '/process', label: 'Process' },
  { to: '/contact', label: 'Contact' },
  { to: '/start-project', label: 'Start a Project' },
];

const socialLinks = [
  { icon: ExternalLink, href: '#', label: 'LinkedIn' },
  { icon: MessageCircle, href: '#', label: 'Twitter' },
  { icon: Code2, href: '#', label: 'GitHub' },
  { icon: Camera, href: '#', label: 'Instagram' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Column 1: Brand & Socials */}
          <div className="footer__brand">
            <Link to="/" className="flex items-center gap-4" style={{ textDecoration: 'none' }}>
              <img
                src="/vorikxlogo.png"
                alt="VORIKX Logo"
                className="footer__logo"
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
              Helping businesses turn ideas into scalable digital products with enterprise engineering discipline.
            </p>
            <div className="flex items-center gap-2 text-xs text-teal" style={{ marginTop: 'var(--space-1)' }}>
              <ShieldCheck size={14} />
              <span>SOC2 &amp; HIPAA Compliant Engineering</span>
            </div>
            <div className="footer__social">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="footer__social-icon"
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="footer__heading">Services</h4>
            {serviceLinks.map((link) => (
              <Link key={link.to} to={link.to} className="footer__link">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="footer__heading">Company</h4>
            {companyLinks.map((link) => (
              <Link key={link.to} to={link.to} className="footer__link">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="footer__heading">Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                <Mail size={16} style={{ color: 'var(--accent)', marginTop: '3px', flexShrink: 0 }} />
                <span className="footer__link" style={{ marginBottom: 0 }}>hello@vorikx.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                <Phone size={16} style={{ color: 'var(--accent)', marginTop: '3px', flexShrink: 0 }} />
                <span className="footer__link" style={{ marginBottom: 0 }}>+1 (555) 000-0000</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                <MapPin size={16} style={{ color: 'var(--accent)', marginTop: '3px', flexShrink: 0 }} />
                <span className="footer__link" style={{ marginBottom: 0 }}>
                  123 Tech Avenue<br />
                  San Francisco, CA 94105
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <span className="footer__copyright">
            &copy; {new Date().getFullYear()} VORIKX Software &amp; Technologies. All rights reserved.
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)' }}>
            <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
              <a href="#" className="footer__link" style={{ marginBottom: 0 }}>Privacy Policy</a>
              <a href="#" className="footer__link" style={{ marginBottom: 0 }}>Terms of Service</a>
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
