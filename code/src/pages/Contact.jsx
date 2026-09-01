import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Mail, Phone, MapPin } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    setError('');

    try {
      const { error: insertError } = await supabase
        .from('contact_messages')
        .insert({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || null,
          message: formData.message,
        });

      if (insertError) throw insertError;
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="page-top">
        <div className="container container--narrow">
          <div className="success-message">
            <div className="success-message__icon">
              <Check size={32} />
            </div>
            <h2 className="section-title">Message sent!</h2>
            <p className="section-subtitle" style={{ margin: 'var(--space-4) auto 0' }}>
              Thank you for reaching out. We will get back to you within 24 hours.
            </p>
            <Link to="/" className="btn btn--primary" style={{ marginTop: 'var(--space-8)' }}>
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="page-top">
        <div className="container">
          <div className="section-header" style={{ maxWidth: '680px' }}>
            <span className="section-label">Contact</span>
            <h1 className="section-title" style={{ fontSize: 'var(--text-5xl)' }}>
              Get in touch
            </h1>
            <p className="section-subtitle">
              Have a question or want to learn more? Drop us a message and
              we will respond within 24 hours.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div>
              {error && (
                <div className="login-error" style={{ marginBottom: 'var(--space-6)' }}>
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="grid grid-2">
                  <div className="form-group">
                    <label className="form-label">Name *</label>
                    <input
                      className="form-input"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input
                      className="form-input"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="What is this about?"
                    value={formData.subject}
                    onChange={(e) => updateField('subject', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Tell us what you need..."
                    value={formData.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    required
                    style={{ minHeight: '160px' }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn--primary btn--lg"
                  disabled={submitting}
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>

            <div>
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="contact-info-label">Email</div>
                  <div className="contact-info-value">hello@vorikx.com</div>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="contact-info-label">Phone</div>
                  <div className="contact-info-value">+1 (555) 000-0000</div>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="contact-info-label">Office</div>
                  <div className="contact-info-value">
                    123 Tech Avenue<br />
                    San Francisco, CA 94105
                  </div>
                </div>
              </div>

              <hr className="divider" />

              <div>
                <h4 style={{ marginBottom: 'var(--space-3)' }}>
                  Prefer to start a project directly?
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
                  Use our detailed project form to give us all the information
                  we need to get started.
                </p>
                <Link to="/start-project" className="btn btn--secondary">
                  Start a Project <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
