import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';

// Eagerly loaded primary landing
import Home from './pages/Home';

// Code-split Public Pages
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Work = lazy(() => import('./pages/Work'));
const CaseStudy = lazy(() => import('./pages/CaseStudy'));
const Process = lazy(() => import('./pages/Process'));
const StartProject = lazy(() => import('./pages/StartProject'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

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
