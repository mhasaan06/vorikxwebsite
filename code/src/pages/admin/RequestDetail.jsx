import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const statusOptions = [
  { value: 'new', label: 'New' },
  { value: 'reviewing', label: 'Reviewing' },
  { value: 'proposal_sent', label: 'Proposal Sent' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'declined', label: 'Declined' },
];

const statusColors = {
  new: 'badge--new',
  reviewing: 'badge--review',
  proposal_sent: 'badge--progress',
  in_progress: 'badge--progress',
  completed: 'badge--completed',
  declined: 'badge--archived',
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
      console.log('[VORIKX] Updating project_request status:', { id, status: newStatus });
      const { error } = await supabase
        .from('project_requests')
        .update({ status: newStatus })
        .eq('id', id);
      if (!error) {
        setRequest((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      console.error('Error updating status:', err);
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
          <h1 className="admin-header__title">{request.client_name}</h1>
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
            value={request.status || 'new'}
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
          <div className="request-detail__field-value">{request.client_email}</div>
        </div>
        <div className="request-detail__field">
          <div className="request-detail__field-label">Phone</div>
          <div className="request-detail__field-value">{request.client_phone || '—'}</div>
        </div>
        <div className="request-detail__field">
          <div className="request-detail__field-label">Company</div>
          <div className="request-detail__field-value">{request.company_name || '—'}</div>
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
        <div className="request-detail__field-label">Service Type</div>
        <div className="request-detail__field-value">
          <span className="process-step__tag">{request.service_type || 'Custom'}</span>
        </div>
      </div>

      <hr className="divider" />

      <div className="request-detail__field">
        <div className="request-detail__field-label">Project Details</div>
        <div className="request-detail__field-value">{request.project_details}</div>
      </div>

      {request.additional_info && (
        <div className="request-detail__field">
          <div className="request-detail__field-label">Additional Information</div>
          <div className="request-detail__field-value">{request.additional_info}</div>
        </div>
      )}
    </div>
  );
}
