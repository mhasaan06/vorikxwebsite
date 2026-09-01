import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, ArrowRight, Building2, Rocket, ShieldCheck, Cpu } from 'lucide-react';
import { services } from '../data/services';
import { industries } from '../data/content';

const industryIcons = {
  startups: Rocket,
  smb: Building2,
  enterprise: ShieldCheck,
  'fintech-healthtech': Cpu,
};

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null); // 'services' | 'industries' | null
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

  // Close menus on route change
  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
  }, [location]);

  // Handle click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* Dimmed backdrop overlay when mega menu is open */}
      {activeMenu && (
        <div
          className="mega-menu-overlay"
          onClick={() => setActiveMenu(null)}
        />
      )}

      <nav className="navbar" ref={navRef}>
        <div className="navbar__inner">
          {/* Brand logo & live text wordmark */}
          <Link to="/" className="navbar__brand" onClick={() => setActiveMenu(null)}>
            <img
              src="/vorikxlogo.png"
              alt="VORIKX Logo"
              className="navbar__logo"
            />
            <div className="navbar__wordmark-group">
              <span className="navbar__wordmark">
                VORIK<span className="x-letter">X</span>
              </span>
              <span className="navbar__tagline">Software &amp; Technologies</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar__links">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}
              onClick={() => setActiveMenu(null)}
            >
              Home
            </NavLink>

            {/* Services Mega Menu Dropdown */}
            <div
              className="navbar__dropdown-wrapper"
              onMouseEnter={() => setActiveMenu('services')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button
                className={`navbar__dropdown-trigger${activeMenu === 'services' || location.pathname.startsWith('/services') ? ' active' : ''}`}
                onClick={() => setActiveMenu(activeMenu === 'services' ? null : 'services')}
                aria-expanded={activeMenu === 'services'}
              >
                Services
                <ChevronDown size={15} className={`dropdown-arrow${activeMenu === 'services' ? ' open' : ''}`} />
              </button>

              {activeMenu === 'services' && (
                <div className="mega-menu">
                  <div className="mega-menu__header">
                    <div>
                      <span className="mega-menu__label">OUR CAPABILITIES</span>
                      <h4 className="mega-menu__title">End-to-End Digital Engineering</h4>
                    </div>
                    <Link to="/services" className="mega-menu__all-link" onClick={() => setActiveMenu(null)}>
                      View All Services <ArrowRight size={14} />
                    </Link>
                  </div>
                  <div className="mega-menu__grid">
                    {services.map((service) => {
                      const Icon = service.icon;
                      return (
                        <Link
                          key={service.slug}
                          to={`/services/${service.slug}`}
                          className="mega-menu__card"
                          onClick={() => setActiveMenu(null)}
                        >
                          <div className="mega-menu__card-icon">
                            <Icon size={20} />
                          </div>
                          <div className="mega-menu__card-body">
                            <span className="mega-menu__card-category">{service.category}</span>
                            <h5 className="mega-menu__card-title">{service.title}</h5>
                            <p className="mega-menu__card-desc">{service.shortDesc}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Industries Dropdown */}
            <div
              className="navbar__dropdown-wrapper"
              onMouseEnter={() => setActiveMenu('industries')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button
                className={`navbar__dropdown-trigger${activeMenu === 'industries' ? ' active' : ''}`}
                onClick={() => setActiveMenu(activeMenu === 'industries' ? null : 'industries')}
                aria-expanded={activeMenu === 'industries'}
              >
                Who We Build For
                <ChevronDown size={15} className={`dropdown-arrow${activeMenu === 'industries' ? ' open' : ''}`} />
              </button>

              {activeMenu === 'industries' && (
                <div className="dropdown-menu dropdown-menu--industries">
                  <div className="dropdown-menu__header">
                    <span className="mega-menu__label">TARGET CLIENTS &amp; USE CASES</span>
                    <h4 className="mega-menu__title">Built for Modern Organizations</h4>
                  </div>
                  <div className="dropdown-menu__grid">
                    {industries.map((ind) => {
                      const Icon = industryIcons[ind.slug] || Building2;
                      return (
                        <div key={ind.slug} className="dropdown-menu__card">
                          <div className="dropdown-menu__card-header">
                            <Icon size={18} className="dropdown-menu__card-icon" />
                            <h5 className="dropdown-menu__card-title">{ind.title}</h5>
                            <span className="badge badge--new">{ind.badge}</span>
                          </div>
                          <p className="dropdown-menu__card-desc">{ind.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <NavLink
              to="/work"
              className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}
              onClick={() => setActiveMenu(null)}
            >
              Work
            </NavLink>

            <NavLink
              to="/process"
              className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}
              onClick={() => setActiveMenu(null)}
            >
              Process
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}
              onClick={() => setActiveMenu(null)}
            >
              About
            </NavLink>
          </div>

          {/* CTA & Mobile Hamburger */}
          <div className="navbar__actions">
            <Link to="/start-project" className="btn btn--white">
              Start a Project <ArrowRight size={14} />
            </Link>
            <button
              className={`navbar__hamburger${mobileOpen ? ' open' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div className={`navbar__mobile${mobileOpen ? ' open' : ''}`}>
          <NavLink to="/" end className="navbar__mobile-link">
            Home
          </NavLink>

          {/* Mobile Services Accordion */}
          <div className="navbar__mobile-accordion">
            <button
              className="navbar__mobile-link navbar__mobile-accordion-btn"
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
            >
              Services <ChevronDown size={18} className={`dropdown-arrow${mobileServicesOpen ? ' open' : ''}`} />
            </button>
            {mobileServicesOpen && (
              <div className="navbar__mobile-sublinks">
                {services.map((service) => (
                  <NavLink
                    key={service.slug}
                    to={`/services/${service.slug}`}
                    className="navbar__mobile-sublink"
                  >
                    {service.title}
                  </NavLink>
                ))}
                <NavLink to="/services" className="navbar__mobile-sublink text-teal">
                  View All Services →
                </NavLink>
              </div>
            )}
          </div>

          {/* Mobile Industries Accordion */}
          <div className="navbar__mobile-accordion">
            <button
              className="navbar__mobile-link navbar__mobile-accordion-btn"
              onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
            >
              Who We Build For <ChevronDown size={18} className={`dropdown-arrow${mobileIndustriesOpen ? ' open' : ''}`} />
            </button>
            {mobileIndustriesOpen && (
              <div className="navbar__mobile-sublinks">
                {industries.map((ind) => (
                  <div key={ind.slug} className="navbar__mobile-subitem">
                    <strong>{ind.title}</strong> — {ind.badge}
                  </div>
                ))}
              </div>
            )}
          </div>

          <NavLink to="/work" className="navbar__mobile-link">
            Work
          </NavLink>
          <NavLink to="/process" className="navbar__mobile-link">
            Process
          </NavLink>
          <NavLink to="/about" className="navbar__mobile-link">
            About
          </NavLink>

          <div style={{ marginTop: 'var(--space-4)' }}>
            <Link to="/start-project" className="btn btn--white btn--full btn--lg">
              Start a Project <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
