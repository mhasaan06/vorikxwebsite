import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Users, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminLayout() {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="loading-page">
        <div className="spinner" />
      </div>
    );
  }

  if (!user) return <Navigate to="/admin/login" replace />;

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__section">Dashboard</div>
        <nav className="admin-sidebar__nav">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `admin-sidebar__link${isActive ? ' active' : ''}`
            }
          >
            <LayoutDashboard size={18} />
            Overview
          </NavLink>
          <NavLink
            to="/admin/requests"
            className={({ isActive }) =>
              `admin-sidebar__link${isActive ? ' active' : ''}`
            }
          >
            <FolderKanban size={18} />
            Project Requests
          </NavLink>
          <NavLink
            to="/admin/clients"
            className={({ isActive }) =>
              `admin-sidebar__link${isActive ? ' active' : ''}`
            }
          >
            <Users size={18} />
            Clients
          </NavLink>
        </nav>

        <div style={{ position: 'absolute', bottom: 'var(--space-6)', left: 0, right: 0, padding: '0 var(--space-3)' }}>
          <button
            className="admin-sidebar__link"
            onClick={signOut}
            style={{ width: '100%' }}
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}
