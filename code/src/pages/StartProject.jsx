import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Check, Upload } from 'lucide-react';
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

  // State keys map 1-to-1 with PostgreSQL column names
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    company: '',
    phone: '',
    services: [], // TEXT[] Array of selected service slugs
    description: '',
    goals: '',
    budget_range: '',
    timeline: '',
    additional_info: '',
    files: [],
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleService = (slug) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(slug)
        ? prev.services.filter((s) => s !== slug)
        : [...prev.services, slug],
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.full_name.trim() !== '' && formData.email.trim() !== '';
      case 1:
        return Array.isArray(formData.services) && formData.services.length > 0;
      case 2:
        return formData.description.trim() !== '';
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
      // 1. Upload files to Supabase Storage if present
      let fileUrls = [];
      if (formData.files && formData.files.length > 0) {
        for (const file of formData.files) {
          const fileName = `${Date.now()}-${file.name}`;
          const { data, error: uploadError } = await supabase.storage
            .from('project-files')
            .upload(fileName, file);
          if (uploadError) {
            console.warn('File upload skipped or storage bucket not initialized:', uploadError.message);
          } else if (data) {
            const { data: urlData } = supabase.storage
              .from('project-files')
              .getPublicUrl(data.path);
            if (urlData?.publicUrl) {
              fileUrls.push(urlData.publicUrl);
            }
          }
        }
      }

      // 2. Construct payload matching exact PostgreSQL schema types & NOT NULL constraints
      const payload = {
        full_name: formData.full_name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim() || null,
        phone: formData.phone.trim() || null,
        services: Array.isArray(formData.services) ? formData.services : [], // TEXT[] NOT NULL
        description: formData.description.trim(), // TEXT NOT NULL
        goals: formData.goals.trim() || null,
        budget_range: formData.budget_range || null,
        timeline: formData.timeline || null,
        additional_info: formData.additional_info.trim() || null,
        file_urls: fileUrls, // TEXT[] DEFAULT '{}'
      };

      console.log('[VORIKX] Complete payload for project_requests insert:', JSON.stringify(payload, null, 2));

      const { error: insertError } = await supabase
        .from('project_requests')
        .insert(payload);

      if (insertError) throw insertError;

      setSubmitted(true);
    } catch (err) {
      console.error('[VORIKX] Submission failure:', err);
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
              Thank you, {formData.full_name}. We have received your project details
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
                  value={formData.full_name}
                  onChange={(e) => updateField('full_name', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input
                  className="form-input"
                  type="email"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Company</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Company name"
                  value={formData.company}
                  onChange={(e) => updateField('company', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  className="form-input"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Services (Multi-Select Array) */}
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
                      formData.services.includes(service.slug)
                        ? 'var(--accent)'
                        : 'var(--border-color)'
                    }`,
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'border-color var(--transition-fast)',
                    backgroundColor: formData.services.includes(service.slug)
                      ? 'var(--color-deep-teal-muted)'
                      : 'transparent',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.services.includes(service.slug)}
                    onChange={() => toggleService(service.slug)}
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
                placeholder="Describe your project, its purpose, and what you're looking to build..."
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                style={{ minHeight: '160px' }}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Goals & Success Metrics</label>
              <textarea
                className="form-textarea"
                placeholder="What does success look like for this project?"
                value={formData.goals}
                onChange={(e) => updateField('goals', e.target.value)}
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
              />
            </div>
            <div className="form-group">
              <label className="form-label">Attachments</label>
              <div
                style={{
                  border: '1px dashed var(--border-color-strong)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-8)',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => document.getElementById('file-upload').click()}
              >
                <Upload size={24} style={{ color: 'var(--text-secondary)', margin: '0 auto var(--space-3)' }} />
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                  Click to upload files (PDF, images, documents)
                </p>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  style={{ display: 'none' }}
                  onChange={(e) => updateField('files', Array.from(e.target.files))}
                />
              </div>
              {formData.files.length > 0 && (
                <div style={{ marginTop: 'var(--space-3)' }}>
                  {formData.files.map((f, i) => (
                    <div key={i} style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', padding: 'var(--space-1) 0' }}>
                      {f.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 5: Review */}
        {currentStep === 5 && (
          <div>
            <h3 style={{ marginBottom: 'var(--space-6)' }}>Review Your Details</h3>

            <div className="request-detail__field">
              <div className="request-detail__field-label">Name</div>
              <div className="request-detail__field-value">{formData.full_name}</div>
            </div>
            <div className="request-detail__field">
              <div className="request-detail__field-label">Email</div>
              <div className="request-detail__field-value">{formData.email}</div>
            </div>
            {formData.company && (
              <div className="request-detail__field">
                <div className="request-detail__field-label">Company</div>
                <div className="request-detail__field-value">{formData.company}</div>
              </div>
            )}
            {formData.phone && (
              <div className="request-detail__field">
                <div className="request-detail__field-label">Phone</div>
                <div className="request-detail__field-value">{formData.phone}</div>
              </div>
            )}
            <div className="request-detail__field">
              <div className="request-detail__field-label">Services</div>
              <div className="request-detail__services">
                {formData.services.map((slug) => {
                  const s = availableServices.find((sv) => sv.slug === slug);
                  return (
                    <span key={slug} className="process-step__tag">
                      {s?.title || slug}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="request-detail__field">
              <div className="request-detail__field-label">Project Description</div>
              <div className="request-detail__field-value">{formData.description}</div>
            </div>
            {formData.goals && (
              <div className="request-detail__field">
                <div className="request-detail__field-label">Goals</div>
                <div className="request-detail__field-value">{formData.goals}</div>
              </div>
            )}
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
            {formData.files.length > 0 && (
              <div className="request-detail__field">
                <div className="request-detail__field-label">Attachments</div>
                <div className="request-detail__field-value">
                  {formData.files.map((f, i) => (
                    <div key={i}>{f.name}</div>
                  ))}
                </div>
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
