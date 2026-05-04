import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import POSLayout from './pages/POS/POSLayout';

// Simple Auth Context
const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const AppContent = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isPOS = location.pathname.startsWith('/pos');
  const isMinimal = ['/login', '/admin'].includes(location.pathname);

  return (
    <div className="app-shell">
      {!isPOS && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          
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
      {!isPOS && <Footer minimal={isMinimal} />}
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(null); // { role: 'admin', name: 'Admin' }

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Router>
        <AppContent />
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
