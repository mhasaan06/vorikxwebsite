import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

// 1. Web Dev SVG Illustration
function WebDevIllustration() {
  return (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-slider__svg">
      {/* Browser Window Outer Frame */}
      <rect x="20" y="20" width="360" height="200" rx="10" fill="#151B1E" stroke="#BEC7C9" strokeWidth="1.5" strokeOpacity="0.3" />
      {/* Browser Header Bar */}
      <rect x="20" y="20" width="360" height="32" rx="10" fill="#0B0E10" />
      <circle cx="40" cy="36" r="4" fill="#BEC7C9" fillOpacity="0.4" />
      <circle cx="54" cy="36" r="4" fill="#BEC7C9" fillOpacity="0.4" />
      <circle cx="68" cy="36" r="4" fill="#BEC7C9" fillOpacity="0.4" />
      <rect x="90" y="29" width="180" height="14" rx="4" fill="#151B1E" stroke="#BEC7C9" strokeWidth="1" strokeOpacity="0.2" />

      {/* Code Editor & UI Mockup Split */}
      {/* Code Panel */}
      <rect x="36" y="66" width="160" height="138" rx="6" fill="#0B0E10" stroke="#168C88" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="50" y1="84" x2="110" y2="84" stroke="#168C88" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="98" x2="160" y2="98" stroke="#BEC7C9" strokeWidth="2" strokeOpacity="0.6" strokeLinecap="round" />
      <line x1="64" y1="112" x2="140" y2="112" stroke="#168C88" strokeWidth="2" strokeOpacity="0.8" strokeLinecap="round" />
      <line x1="64" y1="126" x2="120" y2="126" stroke="#BEC7C9" strokeWidth="2" strokeOpacity="0.4" strokeLinecap="round" />
      <line x1="50" y1="140" x2="170" y2="140" stroke="#168C88" strokeWidth="2" strokeLinecap="round" />
      <line x1="50" y1="154" x2="100" y2="154" stroke="#BEC7C9" strokeWidth="2" strokeOpacity="0.5" strokeLinecap="round" />
      <line x1="50" y1="174" x2="145" y2="174" stroke="#168C88" strokeWidth="2.5" strokeLinecap="round" />

      {/* Live Preview Panel */}
      <rect x="208" y="66" width="156" height="138" rx="6" fill="#151B1E" stroke="#BEC7C9" strokeWidth="1" strokeOpacity="0.2" />
      <rect x="220" y="78" width="132" height="40" rx="4" fill="#168C88" fillOpacity="0.15" stroke="#168C88" strokeWidth="1" />
      <circle cx="238" cy="98" r="10" fill="#168C88" />
      <rect x="256" y="90" width="70" height="6" rx="3" fill="#F2F5F5" />
      <rect x="256" y="100" width="45" height="5" rx="2.5" fill="#BEC7C9" fillOpacity="0.6" />

      {/* Grid Cards in Preview */}
      <rect x="220" y="126" width="60" height="64" rx="4" fill="#0B0E10" stroke="#BEC7C9" strokeWidth="1" strokeOpacity="0.2" />
      <rect x="228" y="134" width="44" height="24" rx="2" fill="#168C88" fillOpacity="0.2" />
      <rect x="228" y="164" width="36" height="4" rx="2" fill="#BEC7C9" />

      <rect x="292" y="126" width="60" height="64" rx="4" fill="#0B0E10" stroke="#BEC7C9" strokeWidth="1" strokeOpacity="0.2" />
      <rect x="300" y="134" width="44" height="24" rx="2" fill="#168C88" fillOpacity="0.2" />
      <rect x="300" y="164" width="36" height="4" rx="2" fill="#BEC7C9" />
    </svg>
  );
}

// 2. Mobile Apps SVG Illustration
function MobileAppsIllustration() {
  return (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-slider__svg">
      {/* Background Grid Accent Lines */}
      <line x1="60" y1="40" x2="340" y2="40" stroke="#BEC7C9" strokeWidth="1" strokeOpacity="0.1" strokeDasharray="4 4" />
      <line x1="60" y1="120" x2="340" y2="120" stroke="#BEC7C9" strokeWidth="1" strokeOpacity="0.1" strokeDasharray="4 4" />
      <line x1="60" y1="200" x2="340" y2="200" stroke="#BEC7C9" strokeWidth="1" strokeOpacity="0.1" strokeDasharray="4 4" />

      {/* Primary Mobile Phone Frame */}
      <rect x="135" y="16" width="130" height="210" rx="16" fill="#151B1E" stroke="#168C88" strokeWidth="2" />
      {/* Notch */}
      <rect x="175" y="22" width="50" height="8" rx="4" fill="#0B0E10" />

      {/* App Header */}
      <rect x="147" y="40" width="106" height="28" rx="6" fill="#0B0E10" />
      <circle cx="161" cy="54" r="6" fill="#168C88" />
      <rect x="173" y="51" width="50" height="6" rx="3" fill="#F2F5F5" />

      {/* App Main Card */}
      <rect x="147" y="76" width="106" height="60" rx="6" fill="#168C88" fillOpacity="0.15" stroke="#168C88" strokeWidth="1" />
      <rect x="157" y="86" width="40" height="8" rx="4" fill="#168C88" />
      <rect x="157" y="98" width="70" height="5" rx="2.5" fill="#BEC7C9" fillOpacity="0.8" />
      <rect x="157" y="107" width="55" height="5" rx="2.5" fill="#BEC7C9" fillOpacity="0.5" />
      <rect x="157" y="120" width="86" height="10" rx="5" fill="#168C88" />

      {/* Bottom List Skeleton */}
      <rect x="147" y="144" width="106" height="20" rx="4" fill="#0B0E10" stroke="#BEC7C9" strokeWidth="1" strokeOpacity="0.2" />
      <circle cx="157" cy="154" r="4" fill="#168C88" />
      <rect x="167" y="152" width="60" height="4" rx="2" fill="#BEC7C9" />

      <rect x="147" y="170" width="106" height="20" rx="4" fill="#0B0E10" stroke="#BEC7C9" strokeWidth="1" strokeOpacity="0.2" />
      <circle cx="157" cy="180" r="4" fill="#BEC7C9" />
      <rect x="167" y="178" width="50" height="4" rx="2" fill="#BEC7C9" />

      {/* Navigation Bar */}
      <rect x="147" y="196" width="106" height="20" rx="4" fill="#0B0E10" />
      <circle cx="165" cy="206" r="3" fill="#168C88" />
      <circle cx="200" cy="206" r="3" fill="#BEC7C9" fillOpacity="0.5" />
      <circle cx="235" cy="206" r="3" fill="#BEC7C9" fillOpacity="0.5" />
    </svg>
  );
}

// 3. Custom Software SVG Illustration
function CustomSoftwareIllustration() {
  return (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-slider__svg">
      {/* Node Flowchart Architecture */}
      {/* Connector Lines */}
      <path d="M90 120 L160 70 L240 70 L310 120" stroke="#168C88" strokeWidth="2" strokeDasharray="4 4" />
      <path d="M90 120 L160 170 L240 170 L310 120" stroke="#168C88" strokeWidth="2" />
      <path d="M160 70 L160 170" stroke="#BEC7C9" strokeWidth="1.5" strokeOpacity="0.3" />
      <path d="M240 70 L240 170" stroke="#168C88" strokeWidth="1.5" strokeOpacity="0.6" />

      {/* Left Input Node */}
      <rect x="40" y="96" width="90" height="48" rx="8" fill="#151B1E" stroke="#BEC7C9" strokeWidth="1.5" />
      <rect x="52" y="110" width="40" height="6" rx="3" fill="#F2F5F5" />
      <rect x="52" y="122" width="60" height="4" rx="2" fill="#168C88" />

      {/* Top Processing Node */}
      <rect x="140" y="46" width="100" height="48" rx="8" fill="#0B0E10" stroke="#168C88" strokeWidth="1.5" />
      <rect x="154" y="60" width="50" height="6" rx="3" fill="#168C88" />
      <rect x="154" y="72" width="70" height="4" rx="2" fill="#BEC7C9" fillOpacity="0.6" />

      {/* Bottom Processing Node */}
      <rect x="140" y="146" width="100" height="48" rx="8" fill="#0B0E10" stroke="#BEC7C9" strokeWidth="1.5" strokeOpacity="0.4" />
      <rect x="154" y="160" width="55" height="6" rx="3" fill="#F2F5F5" />
      <rect x="154" y="172" width="40" height="4" rx="2" fill="#BEC7C9" fillOpacity="0.5" />

      {/* Right Output Engine Node */}
      <rect x="270" y="96" width="90" height="48" rx="8" fill="#151B1E" stroke="#168C88" strokeWidth="2" />
      <rect x="282" y="110" width="45" height="6" rx="3" fill="#168C88" />
      <rect x="282" y="122" width="60" height="4" rx="2" fill="#F2F5F5" />

      {/* Pulse Dots */}
      <circle cx="160" cy="70" r="4" fill="#168C88" />
      <circle cx="240" cy="170" r="4" fill="#168C88" />
      <circle cx="310" cy="120" r="5" fill="#F2F5F5" stroke="#168C88" strokeWidth="2" />
    </svg>
  );
}

// 4. AI & Automation SVG Illustration
function AIAutomationIllustration() {
  return (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-slider__svg">
      {/* Central AI Brain Core */}
      <circle cx="200" cy="120" r="45" fill="#151B1E" stroke="#168C88" strokeWidth="2" />
      <circle cx="200" cy="120" r="30" fill="#168C88" fillOpacity="0.15" stroke="#168C88" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="200" cy="120" r="14" fill="#168C88" />
      <circle cx="200" cy="120" r="6" fill="#F2F5F5" />

      {/* Orbiting Radial Neural Nodes */}
      {/* Top Left */}
      <line x1="200" y1="120" x2="110" y2="60" stroke="#168C88" strokeWidth="1.5" />
      <circle cx="110" cy="60" r="16" fill="#0B0E10" stroke="#BEC7C9" strokeWidth="1.5" />
      <circle cx="110" cy="60" r="5" fill="#168C88" />

      {/* Top Right */}
      <line x1="200" y1="120" x2="290" y2="60" stroke="#168C88" strokeWidth="1.5" />
      <circle cx="290" cy="60" r="16" fill="#0B0E10" stroke="#168C88" strokeWidth="1.5" />
      <circle cx="290" cy="60" r="5" fill="#F2F5F5" />

      {/* Bottom Left */}
      <line x1="200" y1="120" x2="100" y2="175" stroke="#BEC7C9" strokeWidth="1.5" strokeOpacity="0.5" />
      <circle cx="100" cy="175" r="16" fill="#0B0E10" stroke="#BEC7C9" strokeWidth="1.5" strokeOpacity="0.5" />
      <circle cx="100" cy="175" r="5" fill="#BEC7C9" />

      {/* Bottom Right */}
      <line x1="200" y1="120" x2="300" y2="175" stroke="#168C88" strokeWidth="1.5" />
      <circle cx="300" cy="175" r="16" fill="#0B0E10" stroke="#168C88" strokeWidth="1.5" />
      <circle cx="300" cy="175" r="5" fill="#168C88" />

      {/* Inter-Node Mesh Connections */}
      <line x1="110" y1="60" x2="290" y2="60" stroke="#BEC7C9" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 4" />
      <line x1="100" y1="175" x2="300" y2="175" stroke="#BEC7C9" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 4" />

      {/* Outer Pulse Rings */}
      <circle cx="200" cy="120" r="70" stroke="#168C88" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="6 6" />
    </svg>
  );
}

// 5. UI/UX Design SVG Illustration
function UIUXIllustration() {
  return (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-slider__svg">
      {/* Overlapping Canvas Artboards */}
      {/* Back Canvas */}
      <rect x="70" y="30" width="200" height="150" rx="8" fill="#0B0E10" stroke="#BEC7C9" strokeWidth="1.5" strokeOpacity="0.3" />
      <rect x="85" y="45" width="100" height="8" rx="4" fill="#BEC7C9" fillOpacity="0.4" />
      <rect x="85" y="60" width="170" height="4" rx="2" fill="#BEC7C9" fillOpacity="0.2" />

      {/* Front Primary Canvas Artboard */}
      <rect x="130" y="60" width="210" height="150" rx="8" fill="#151B1E" stroke="#168C88" strokeWidth="2" />
      <rect x="146" y="76" width="120" height="10" rx="5" fill="#F2F5F5" />
      <rect x="146" y="94" width="70" height="6" rx="3" fill="#168C88" />

      {/* UI Elements on Front Canvas */}
      <rect x="146" y="112" width="80" height="48" rx="4" fill="#0B0E10" stroke="#168C88" strokeWidth="1" strokeOpacity="0.6" />
      <rect x="154" y="120" width="40" height="6" rx="3" fill="#168C88" />
      <rect x="154" y="132" width="64" height="4" rx="2" fill="#BEC7C9" />

      <rect x="238" y="112" width="86" height="48" rx="4" fill="#168C88" fillOpacity="0.15" stroke="#168C88" strokeWidth="1" />
      <rect x="246" y="120" width="50" height="6" rx="3" fill="#F2F5F5" />
      <rect x="246" y="132" width="70" height="4" rx="2" fill="#168C88" />

      {/* Selection Box & Transform Controls */}
      <rect x="232" y="106" width="98" height="60" fill="none" stroke="#168C88" strokeWidth="1.5" strokeDasharray="3 3" />
      <rect x="229" y="103" width="6" height="6" fill="#168C88" />
      <rect x="327" y="103" width="6" height="6" fill="#168C88" />
      <rect x="229" y="163" width="6" height="6" fill="#168C88" />
      <rect x="327" y="163" width="6" height="6" fill="#168C88" />

      {/* Vector Cursor */}
      <path d="M290 145 L306 168 L298 171 L293 182 L287 179 L292 168 L283 166 Z" fill="#F2F5F5" stroke="#0B0E10" strokeWidth="1.5" />
    </svg>
  );
}

const slides = [
  {
    id: 'web-development',
    title: 'Web Development',
    category: 'WEB PLATFORMS',
    caption: 'High-performance SPAs and web apps engineered for scale.',
    Illustration: WebDevIllustration,
    slug: 'web-development',
  },
  {
    id: 'mobile-development',
    title: 'Mobile Apps',
    category: 'NATIVE & CROSS-PLATFORM',
    caption: 'Seamless iOS and Android experiences built with Flutter & React Native.',
    Illustration: MobileAppsIllustration,
    slug: 'mobile-development',
  },
  {
    id: 'custom-software',
    title: 'Custom Software',
    category: 'ENTERPRISE SYSTEMS',
    caption: 'Bespoke architectures and workflow engines built for your business.',
    Illustration: CustomSoftwareIllustration,
    slug: 'custom-software',
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    category: 'INTELLIGENT SYSTEMS',
    caption: 'Workflows that optimize, extract insights, and run themselves.',
    Illustration: AIAutomationIllustration,
    slug: 'ai-automation',
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    category: 'PRODUCT DESIGN',
    caption: 'Intuitive user experiences grounded in design systems and research.',
    Illustration: UIUXIllustration,
    slug: 'ui-ux-design',
  },
];

export default function HeroServiceSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto advance slide every 4 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const currentSlide = slides[currentIndex];
  const CurrentIllustration = currentSlide.Illustration;

  return (
    <div
      className="hero-slider-panel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="hero-slider__frame">
        {/* Top Header Label */}
        <div className="hero-slider__header">
          <span className="badge badge--new">{currentSlide.category}</span>
          <div className="hero-slider__controls">
            <button
              className="hero-slider__nav-btn"
              onClick={() => setCurrentIndex((currentIndex - 1 + slides.length) % slides.length)}
              aria-label="Previous service"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              className="hero-slider__nav-btn"
              onClick={() => setCurrentIndex((currentIndex + 1) % slides.length)}
              aria-label="Next service"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Custom Vector SVG Illustration */}
        <div className="hero-slider__svg-wrapper">
          <CurrentIllustration />
        </div>

        {/* Footer Info & Caption */}
        <div className="hero-slider__footer">
          <div>
            <div className="hero-slider__title">{currentSlide.title}</div>
            <p className="hero-slider__caption">{currentSlide.caption}</p>
          </div>
          <Link
            to={`/services/${currentSlide.slug}`}
            className="hero-slider__link"
            aria-label={`Explore ${currentSlide.title}`}
          >
            Explore <ArrowRight size={14} />
          </Link>
        </div>

        {/* Slide Indicator Dots */}
        <div className="hero-slider__dots">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              className={`hero-slider__dot${idx === currentIndex ? ' active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
