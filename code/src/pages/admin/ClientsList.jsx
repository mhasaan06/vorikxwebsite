import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../../lib/supabase';

export default function ClientsList() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClients = useCallback(async () => {
    try {
      const { data } = await supabase
        .from('project_requests')
        .select('full_name, email, company, phone, created_at')
        .order('created_at', { ascending: false });

      if (data) {
        // De-duplicate by email
        const seen = new Set();
        const unique = data.filter((d) => {
          if (seen.has(d.email)) return false;
          seen.add(d.email);
          return true;
        });
        setClients(unique);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

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
          <h1 className="admin-header__title">Clients</h1>
          <p className="admin-header__subtitle">{clients.length} unique clients</p>
        </div>
      </div>

      <div className="admin-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Phone</th>
              <th>First Contact</th>
            </tr>
          </thead>
          <tbody>
            {clients.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--text-secondary)' }}>
                  No clients yet.
                </td>
              </tr>
            ) : (
              clients.map((client, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 'var(--weight-medium)' }}>{client.full_name}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{client.email}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{client.company || '—'}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{client.phone || '—'}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>
                    {new Date(client.created_at).toLocaleDateString()}
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
