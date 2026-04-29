import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';


// Simple Auth Context
const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const App = () => {
  const [user, setUser] = useState(null); // { role: 'user' | 'admin', name: string }

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Router>
        <div className="app-shell">
          <Navbar />
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
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
