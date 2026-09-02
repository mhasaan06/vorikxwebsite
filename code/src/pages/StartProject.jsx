import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { services as availableServices } from '../data/services';

const steps = [
  'Your Info',
  'Services',
  'Project Details',
  'Budget & Timeline',
  'Additional',
  'Review',
];

const budgetRanges = [
  'Under $10,000',
  '$10,000 – $25,000',
  '$25,000 – $50,000',
  '$50,000 – $100,000',
  '$100,000+',
  'Not sure yet',
];

const timelines = [
  'Less than 1 month',
  '1 – 3 months',
  '3 – 6 months',
  '6 – 12 months',
  '12+ months',
  'Flexible',
];

export default function StartProject() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Exact 1:1 state mapping to project_requests schema
  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    client_phone: '',
    company_name: '',
    selectedServices: [], // Joined into comma-separated service_type string upon submit
    project_details: '',
    budget_range: '',
    timeline: '',
    additional_info: '',
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleService = (title) => {
    setFormData((prev) => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(title)
        ? prev.selectedServices.filter((s) => s !== title)
        : [...prev.selectedServices, title],
    }));
  };

  // Validation according to NOT NULL schema rules
  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.client_name.trim() !== '' && formData.client_email.trim() !== '';
      case 1:
        return formData.selectedServices.length > 0;
      case 2:
        return formData.project_details.trim() !== '';
      case 3:
        return Boolean(formData.budget_range && formData.timeline);
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');

    try {
      // service_type is a single TEXT string (joining selected services cleanly)
      const serviceType = formData.selectedServices.join(', ');

      const payload = {
        client_name: formData.client_name.trim(),
        client_email: formData.client_email.trim(),
        client_phone: formData.client_phone.trim() || null,
        company_name: formData.company_name.trim() || null,
        service_type: serviceType,
        project_details: formData.project_details.trim(),
        budget_range: formData.budget_range || null,
        timeline: formData.timeline || null,
        additional_info: formData.additional_info.trim() || null,
        status: 'new',
      };

      console.log('[VORIKX] Inserting payload to project_requests:', payload);

      const { error: insertError } = await supabase
        .from('project_requests')
        .insert(payload);

      if (insertError) throw insertError;

      setSubmitted(true);
    } catch (err) {
      console.error('[VORIKX] Project request submission error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
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
            <h2 className="section-title">Project request submitted!</h2>
            <p className="section-subtitle" style={{ margin: 'var(--space-4) auto 0', maxWidth: '480px' }}>
              Thank you, {formData.client_name}. We have received your project details
              and will be in touch within 1–2 business days.
            </p>
            <div style={{ marginTop: 'var(--space-8)', display: 'flex', gap: 'var(--space-4)', justifyContent: 'center' }}>
              <Link to="/" className="btn btn--secondary">
                Back to Home
              </Link>
              <Link to="/work" className="btn btn--primary">
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-top">
      <div className="container container--narrow">
        <div className="section-header">
          <span className="section-label">Start a Project</span>
          <h1 className="section-title">Tell us about your project</h1>
          <p className="section-subtitle">
            Fill in the details below and we will get back to you within
            1–2 business days with a tailored proposal.
          </p>
        </div>

        {/* Step indicator */}
        <div className="form-steps">
          {steps.map((label, i) => (
            <div key={label} className="form-step-indicator" style={{ flex: i < steps.length - 1 ? 1 : 'none', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <div
                className={`form-step-dot${
                  i === currentStep ? ' active' : ''
                }${i < currentStep ? ' completed' : ''}`}
              >
                {i < currentStep ? <Check size={14} /> : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={`form-step-line${i < currentStep ? ' completed' : ''}`} />
              )}
            </div>
          ))}
        </div>

        {error && (
          <div className="login-error" style={{ marginBottom: 'var(--space-6)' }}>
            {error}
          </div>
        )}

        {/* Step 0: Your Info */}
        {currentStep === 0 && (
          <div>
            <h3 style={{ marginBottom: 'var(--space-6)' }}>Your Information</h3>
            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="John Doe"
                  value={formData.client_name}
                  onChange={(e) => updateField('client_name', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input
                  className="form-input"
                  type="email"
                  placeholder="john@company.com"
                  value={formData.client_email}
                  onChange={(e) => updateField('client_email', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Company</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Company name"
                  value={formData.company_name}
                  onChange={(e) => updateField('company_name', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  className="form-input"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.client_phone}
                  onChange={(e) => updateField('client_phone', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Services */}
        {currentStep === 1 && (
          <div>
            <h3 style={{ marginBottom: 'var(--space-2)' }}>What do you need?</h3>
            <p className="text-silver text-sm" style={{ marginBottom: 'var(--space-6)' }}>
              Select all services that apply to your project.
            </p>
            <div className="grid grid-2">
              {availableServices.map((service) => (
                <label
                  key={service.slug}
                  className="form-checkbox"
                  style={{
                    padding: 'var(--space-4)',
                    border: `1px solid ${
                      formData.selectedServices.includes(service.title)
                        ? 'var(--accent)'
                        : 'var(--border-color)'
                    }`,
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'border-color var(--transition-fast)',
                    backgroundColor: formData.selectedServices.includes(service.title)
                      ? 'var(--color-deep-teal-muted)'
                      : 'transparent',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.selectedServices.includes(service.title)}
                    onChange={() => toggleService(service.title)}
                  />
                  <div>
                    <div style={{ fontWeight: 'var(--weight-medium)', color: 'var(--text-primary)' }}>
                      {service.title}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Project Details */}
        {currentStep === 2 && (
          <div>
            <h3 style={{ marginBottom: 'var(--space-6)' }}>Project Details</h3>
            <div className="form-group">
              <label className="form-label">Project Description *</label>
              <textarea
                className="form-textarea"
                placeholder="Describe your project, its purpose, requirements, and what you're looking to build..."
                value={formData.project_details}
                onChange={(e) => updateField('project_details', e.target.value)}
                style={{ minHeight: '180px' }}
              />
            </div>
          </div>
        )}

        {/* Step 3: Budget & Timeline */}
        {currentStep === 3 && (
          <div>
            <h3 style={{ marginBottom: 'var(--space-6)' }}>Budget & Timeline</h3>
            <div className="form-group">
              <label className="form-label">Budget Range *</label>
              <div className="grid grid-2">
                {budgetRanges.map((range) => (
                  <label
                    key={range}
                    className="form-checkbox"
                    style={{
                      padding: 'var(--space-3) var(--space-4)',
                      border: `1px solid ${
                        formData.budget_range === range
                          ? 'var(--accent)'
                          : 'var(--border-color)'
                      }`,
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      backgroundColor: formData.budget_range === range
                        ? 'var(--color-deep-teal-muted)'
                        : 'transparent',
                    }}
                  >
                    <input
                      type="radio"
                      name="budget"
                      style={{ display: 'none' }}
                      checked={formData.budget_range === range}
                      onChange={() => updateField('budget_range', range)}
                    />
                    {range}
                  </label>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Timeline *</label>
              <div className="grid grid-2">
                {timelines.map((t) => (
                  <label
                    key={t}
                    className="form-checkbox"
                    style={{
                      padding: 'var(--space-3) var(--space-4)',
                      border: `1px solid ${
                        formData.timeline === t
                          ? 'var(--accent)'
                          : 'var(--border-color)'
                      }`,
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      backgroundColor: formData.timeline === t
                        ? 'var(--color-deep-teal-muted)'
                        : 'transparent',
                    }}
                  >
                    <input
                      type="radio"
                      name="timeline"
                      style={{ display: 'none' }}
                      checked={formData.timeline === t}
                      onChange={() => updateField('timeline', t)}
                    />
                    {t}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Additional Info */}
        {currentStep === 4 && (
          <div>
            <h3 style={{ marginBottom: 'var(--space-6)' }}>Additional Information</h3>
            <div className="form-group">
              <label className="form-label">Anything else we should know?</label>
              <textarea
                className="form-textarea"
                placeholder="Links to references, existing systems, design files, or any other relevant details..."
                value={formData.additional_info}
                onChange={(e) => updateField('additional_info', e.target.value)}
                style={{ minHeight: '140px' }}
              />
            </div>
          </div>
        )}

        {/* Step 5: Review */}
        {currentStep === 5 && (
          <div>
            <h3 style={{ marginBottom: 'var(--space-6)' }}>Review Your Details</h3>

            <div className="request-detail__field">
              <div className="request-detail__field-label">Name</div>
              <div className="request-detail__field-value">{formData.client_name}</div>
            </div>
            <div className="request-detail__field">
              <div className="request-detail__field-label">Email</div>
              <div className="request-detail__field-value">{formData.client_email}</div>
            </div>
            {formData.company_name && (
              <div className="request-detail__field">
                <div className="request-detail__field-label">Company</div>
                <div className="request-detail__field-value">{formData.company_name}</div>
              </div>
            )}
            {formData.client_phone && (
              <div className="request-detail__field">
                <div className="request-detail__field-label">Phone</div>
                <div className="request-detail__field-value">{formData.client_phone}</div>
              </div>
            )}
            <div className="request-detail__field">
              <div className="request-detail__field-label">Service Type</div>
              <div className="request-detail__field-value">{formData.selectedServices.join(', ')}</div>
            </div>
            <div className="request-detail__field">
              <div className="request-detail__field-label">Project Details</div>
              <div className="request-detail__field-value">{formData.project_details}</div>
            </div>
            <div className="request-detail__field">
              <div className="request-detail__field-label">Budget</div>
              <div className="request-detail__field-value">{formData.budget_range}</div>
            </div>
            <div className="request-detail__field">
              <div className="request-detail__field-label">Timeline</div>
              <div className="request-detail__field-value">{formData.timeline}</div>
            </div>
            {formData.additional_info && (
              <div className="request-detail__field">
                <div className="request-detail__field-label">Additional Information</div>
                <div className="request-detail__field-value">{formData.additional_info}</div>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="form-navigation">
          {currentStep > 0 ? (
            <button
              className="btn btn--secondary"
              onClick={() => setCurrentStep((s) => s - 1)}
            >
              <ArrowLeft size={16} /> Back
            </button>
          ) : (
            <span />
          )}

          {currentStep < steps.length - 1 ? (
            <button
              className="btn btn--primary"
              onClick={() => setCurrentStep((s) => s + 1)}
              disabled={!canProceed()}
              style={{ opacity: canProceed() ? 1 : 0.5 }}
            >
              Next <ArrowRight size={16} />
            </button>
          ) : (
            <button
              className="btn btn--primary btn--lg"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className="spinner" style={{ width: 18, height: 18 }} />
                  Submitting...
                </>
              ) : (
                <>Submit Project Request <ArrowRight size={18} /></>
              )}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
