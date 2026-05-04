import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePOS } from './POSLayout';
import {
  LayoutDashboard,
  Package,
  ScanBarcode,
  FileText,
  ChevronLeft,
  ChevronRight,
  Car,
  LogOut,
  ShoppingCart,
} from 'lucide-react';

const POSSidebar = () => {
  const { activeTab, setActiveTab, cart, isMobileMenuOpen, setIsMobileMenuOpen } = usePOS();
  const [collapsed, setCollapsed] = useState(false);

  const handleTabChange = (id) => {
    setActiveTab(id);
    if (window.innerWidth <= 1024) {
      setIsMobileMenuOpen(false);
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={22} /> },
    { id: 'scanner', label: 'Punto de Venta', icon: <ScanBarcode size={22} /> },
    { id: 'inventory', label: 'Inventario', icon: <Package size={22} /> },
    { id: 'invoices', label: 'Facturas', icon: <FileText size={22} /> },
  ];

  return (
    <aside className={`pos-sidebar ${collapsed ? 'collapsed' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
      <div className="pos-sidebar-header">
        <Link to="/" className="pos-logo">
          <div className="pos-logo-icon">
            <Car size={20} fill="white" />
          </div>
          {(!collapsed || isMobileMenuOpen) && (
            <div className="pos-logo-text">
              <span>LOS <span className="text-red">PITS</span></span>
              <small>Sistema POS</small>
            </div>
          )}
        </Link>
        <button
          className="sidebar-toggle desk-only"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="pos-sidebar-nav">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`pos-nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => handleTabChange(item.id)}
            title={collapsed ? item.label : undefined}
          >
            <span className="nav-icon">{item.icon}</span>
            {(!collapsed || isMobileMenuOpen) && <span className="nav-label">{item.label}</span>}
            {item.id === 'scanner' && cart.length > 0 && (
              <span className={`cart-badge ${collapsed && !isMobileMenuOpen ? 'badge-collapsed' : ''}`}>
                {cart.length}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="pos-sidebar-footer">
        <Link to="/" className="pos-nav-item pos-exit-btn" title="Volver al sitio">
          <span className="nav-icon"><LogOut size={22} /></span>
          {(!collapsed || isMobileMenuOpen) && <span className="nav-label">Salir al Sitio</span>}
        </Link>
      </div>
    </aside>
  );
};

export default POSSidebar;
