import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { useAuth } from './useAuth';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import POSLayout from './pages/POS/POSLayout';

import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import ScrollToTop from './components/ScrollToTop';

const AppContent = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isPOS = location.pathname.startsWith('/pos');
  const isMinimal = ['/login', '/admin'].includes(location.pathname);
  const isLegal = ['/legal/privacy', '/legal/terms'].includes(location.pathname);

  return (
    <div className="app-shell">
      <div className="global-pattern-overlay"></div>
      {!isPOS && !isLegal && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/legal/privacy" element={<Privacy />} />
          <Route path="/legal/terms" element={<Terms />} />
          
          {/* Protected User Route */}
          <Route 
            path="/booking" 
            element={
              user ? <UserDashboard /> : <Navigate to="/login" replace />
            } 
          />
          
          {/* Protected Admin Route */}
          <Route 
            path="/admin" 
            element={
              user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" replace />
            } 
          />

          {/* POS Route - Protected for Admins/Cashiers */}
          <Route 
            path="/pos" 
            element={
              user?.role === 'admin' ? <POSLayout /> : <Navigate to="/login" replace />
            } 
          />
        </Routes>
      </main>
      {!isPOS && <Footer minimal={isMinimal || isLegal} />}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
