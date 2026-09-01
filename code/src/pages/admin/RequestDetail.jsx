import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const statusOptions = [
  { value: 'new', label: 'New' },
  { value: 'in_review', label: 'In Review' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'archived', label: 'Archived' },
];

const statusColors = {
  new: 'badge--new',
  in_review: 'badge--review',
  in_progress: 'badge--progress',
  completed: 'badge--completed',
  archived: 'badge--archived',
};

export default function RequestDetail() {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchRequest = useCallback(async () => {
    try {
      const { data } = await supabase
        .from('project_requests')
        .select('*')
        .eq('id', id)
        .single();
      setRequest(data);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchRequest();
  }, [fetchRequest]);

  const updateStatus = async (newStatus) => {
    setUpdating(true);
    try {
      const { error } = await supabase
        .from('project_requests')
        .update({ status: newStatus })
        .eq('id', id);
      if (!error) {
        setRequest((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-page">
        <div className="spinner" />
      </div>
    );
  }

  if (!request) {
    return (
      <div>
        <p>Request not found.</p>
        <Link to="/admin/requests" className="btn btn--ghost">
          Back to Requests
        </Link>
      </div>
    );
  }

  return (
    <div className="request-detail">
      <Link
        to="/admin/requests"
        className="btn btn--ghost"
        style={{ marginBottom: 'var(--space-6)', display: 'inline-flex' }}
      >
        <ArrowLeft size={16} /> Back to Requests
      </Link>

      <div className="request-detail__header">
        <div>
          <h1 className="admin-header__title">{request.full_name}</h1>
          <p className="admin-header__subtitle">
            Submitted {new Date(request.created_at).toLocaleDateString()} at{' '}
            {new Date(request.created_at).toLocaleTimeString()}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <span className={`badge ${statusColors[request.status] || ''}`}>
            {statusOptions.find((s) => s.value === request.status)?.label || request.status}
          </span>
          <select
            className="form-select"
            value={request.status}
            onChange={(e) => updateStatus(e.target.value)}
            disabled={updating}
            style={{ width: 'auto', minWidth: '150px' }}
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <hr className="divider" />

      <div className="grid grid-2" style={{ gap: 'var(--space-8)' }}>
        <div className="request-detail__field">
          <div className="request-detail__field-label">Email</div>
          <div className="request-detail__field-value">{request.email}</div>
        </div>
        <div className="request-detail__field">
          <div className="request-detail__field-label">Phone</div>
          <div className="request-detail__field-value">{request.phone || '—'}</div>
        </div>
        <div className="request-detail__field">
          <div className="request-detail__field-label">Company</div>
          <div className="request-detail__field-value">{request.company || '—'}</div>
        </div>
        <div className="request-detail__field">
          <div className="request-detail__field-label">Budget Range</div>
          <div className="request-detail__field-value">{request.budget_range || '—'}</div>
        </div>
      </div>

      <div className="request-detail__field">
        <div className="request-detail__field-label">Timeline</div>
        <div className="request-detail__field-value">{request.timeline || '—'}</div>
      </div>

      <div className="request-detail__field">
        <div className="request-detail__field-label">Services Requested</div>
        <div className="request-detail__services">
          {request.services?.map((s, i) => (
            <span key={i} className="process-step__tag">
              {s.replace(/-/g, ' ')}
            </span>
          ))}
        </div>
      </div>

      <hr className="divider" />

      <div className="request-detail__field">
        <div className="request-detail__field-label">Project Description</div>
        <div className="request-detail__field-value">{request.description}</div>
      </div>

      {request.goals && (
        <div className="request-detail__field">
          <div className="request-detail__field-label">Goals & Success Metrics</div>
          <div className="request-detail__field-value">{request.goals}</div>
        </div>
      )}

      {request.additional_notes && (
        <div className="request-detail__field">
          <div className="request-detail__field-label">Additional Notes</div>
          <div className="request-detail__field-value">{request.additional_notes}</div>
        </div>
      )}

      {request.file_urls?.length > 0 && (
        <div className="request-detail__field">
          <div className="request-detail__field-label">Attachments</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {request.file_urls.map((url, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--accent)', fontSize: 'var(--text-sm)' }}
              >
                Attachment {i + 1}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
