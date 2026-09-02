import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, new: 0, inProgress: 0, completed: 0 });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const { data: requests } = await supabase
        .from('project_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (requests) {
        setStats({
          total: requests.length,
          new: requests.filter((r) => r.status === 'new').length,
          inProgress: requests.filter((r) => r.status === 'in_progress' || r.status === 'proposal_sent').length,
          completed: requests.filter((r) => r.status === 'completed').length,
        });
        setRecent(requests.slice(0, 5));
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
          <h1 className="admin-header__title">Dashboard</h1>
          <p className="admin-header__subtitle">Overview of project requests</p>
        </div>
      </div>

      <div className="admin-stats">
        <div className="admin-stat-card">
          <div className="admin-stat-card__label">Total Requests</div>
          <div className="admin-stat-card__value">{stats.total}</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card__label">New</div>
          <div className="admin-stat-card__value" style={{ color: 'var(--accent)' }}>
            {stats.new}
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card__label">In Progress</div>
          <div className="admin-stat-card__value" style={{ color: '#4285F4' }}>
            {stats.inProgress}
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card__label">Completed</div>
          <div className="admin-stat-card__value" style={{ color: '#34A853' }}>
            {stats.completed}
          </div>
        </div>
      </div>

      <div className="admin-table-wrapper">
        <div className="admin-table-header">
          <h3 className="admin-table-header__title">Recent Requests</h3>
          <Link to="/admin/requests" className="btn btn--ghost">
            View All
          </Link>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Email</th>
              <th>Service Type</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recent.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--text-secondary)' }}>
                  No project requests yet.
                </td>
              </tr>
            ) : (
              recent.map((req) => (
                <tr key={req.id} onClick={() => navigate(`/admin/requests/${req.id}`)}>
                  <td style={{ fontWeight: 'var(--weight-medium)' }}>{req.client_name}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{req.client_email}</td>
                  <td>
                    <span className="process-step__tag">
                      {req.service_type || 'Custom'}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${statusColors[req.status] || ''}`}>
                      {statusLabels[req.status] || req.status}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>
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
