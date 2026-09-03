import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Work from './pages/Work';
import CaseStudy from './pages/CaseStudy';
import Process from './pages/Process';
import StartProject from './pages/StartProject';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Code-split Admin Pages
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const ProjectRequests = lazy(() => import('./pages/admin/ProjectRequests'));
const RequestDetail = lazy(() => import('./pages/admin/RequestDetail'));
const ClientsList = lazy(() => import('./pages/admin/ClientsList'));

function LoadingFallback() {
  return (
    <div className="loading-page">
      <div className="spinner" />
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Admin login — outside main layout */}
              <Route path="/admin/login" element={<AdminLogin />} />

              <Route element={<Layout />}>
                {/* Public pages */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:slug" element={<ServiceDetail />} />
                <Route path="/work" element={<Work />} />
                <Route path="/work/:slug" element={<CaseStudy />} />
                <Route path="/process" element={<Process />} />
                <Route path="/start-project" element={<StartProject />} />
                <Route path="/contact" element={<Contact />} />

                {/* Admin — gated by auth in AdminLayout */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="requests" element={<ProjectRequests />} />
                  <Route path="requests/:id" element={<RequestDetail />} />
                  <Route path="clients" element={<ClientsList />} />
                </Route>

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}
