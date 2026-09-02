import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../../lib/supabase';

export default function ClientsList() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClients = useCallback(async () => {
    try {
      // 1. Primary: Fetch from 'clients' table
      const { data: clientsData, error: clientsError } = await supabase
        .from('clients')
        .select('id, created_at, name, email, company_name, phone, notes')
        .order('created_at', { ascending: false });

      if (clientsData && clientsData.length > 0) {
        setClients(clientsData);
      } else {
        if (clientsError) console.warn('[VORIKX] Note on clients table:', clientsError.message);

        // 2. Fallback: Aggregate unique clients from project_requests table using client_email/client_name
        const { data: reqData } = await supabase
          .from('project_requests')
          .select('client_name, client_email, company_name, client_phone, created_at')
          .order('created_at', { ascending: false });

        if (reqData) {
          const seen = new Set();
          const unique = reqData
            .filter((d) => {
              if (seen.has(d.client_email)) return false;
              seen.add(d.client_email);
              return true;
            })
            .map((d) => ({
              name: d.client_name,
              email: d.client_email,
              company_name: d.company_name,
              phone: d.client_phone,
              notes: null,
              created_at: d.created_at,
            }));
          setClients(unique);
        }
      }
    } catch (err) {
      console.error('[VORIKX] Error fetching clients:', err);
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
              <th>Notes</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {clients.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--text-secondary)' }}>
                  No clients recorded yet.
                </td>
              </tr>
            ) : (
              clients.map((client, i) => (
                <tr key={client.id || i}>
                  <td style={{ fontWeight: 'var(--weight-medium)' }}>{client.name}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{client.email}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{client.company_name || '—'}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{client.phone || '—'}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{client.notes || '—'}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>
                    {client.created_at ? new Date(client.created_at).toLocaleDateString() : '—'}
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
