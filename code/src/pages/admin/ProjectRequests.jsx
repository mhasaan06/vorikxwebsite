import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const statusColors = {
  new: 'badge--new',
  reviewing: 'badge--review',
  proposal_sent: 'badge--progress',
  in_progress: 'badge--progress',
  completed: 'badge--completed',
  declined: 'badge--archived',
};

const statusLabels = {
  new: 'New',
  reviewing: 'Reviewing',
  proposal_sent: 'Proposal Sent',
  in_progress: 'In Progress',
  completed: 'Completed',
  declined: 'Declined',
};

export default function ProjectRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchRequests = useCallback(async () => {
    try {
      const { data } = await supabase
        .from('project_requests')
        .select('*')
        .order('created_at', { ascending: false });
      setRequests(data || []);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const filtered = filter === 'all'
    ? requests
    : requests.filter((r) => r.status === filter);

  if (loading) {
    return (
      <div className="loading-page">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-header__title">Project Requests</h1>
          <p className="admin-header__subtitle">{requests.length} total requests</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-6)', flexWrap: 'wrap' }}>
        {['all', 'new', 'reviewing', 'proposal_sent', 'in_progress', 'completed', 'declined'].map((f) => (
          <button
            key={f}
            className={`work-filter-btn${filter === f ? ' active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All' : statusLabels[f]}
          </button>
        ))}
      </div>

      <div className="admin-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Company</th>
              <th>Service Type</th>
              <th>Budget</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--text-secondary)' }}>
                  No requests found.
                </td>
              </tr>
            ) : (
              filtered.map((req) => (
                <tr key={req.id}>
                  <td>
                    <Link
                      to={`/admin/requests/${req.id}`}
                      style={{ fontWeight: 'var(--weight-medium)', color: 'var(--text-primary)' }}
                    >
                      {req.client_name}
                    </Link>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                      {req.client_email}
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{req.company_name || '—'}</td>
                  <td>
                    <span className="process-step__tag">
                      {req.service_type || 'Custom'}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{req.budget_range || '—'}</td>
                  <td>
                    <span className={`badge ${statusColors[req.status] || ''}`}>
                      {statusLabels[req.status] || req.status}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                    {new Date(req.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
