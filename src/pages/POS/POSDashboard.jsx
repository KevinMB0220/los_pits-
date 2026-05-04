import React from 'react';
import { usePOS } from './POSLayout';
import {
  TrendingUp,
  Package,
  DollarSign,
  AlertTriangle,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Box,
  Droplets,
  Zap,
  Shield,
  Disc,
  Layers,
  Tag,
} from 'lucide-react';

const POSDashboard = () => {
  const { products, invoices, cart } = usePOS();

  const totalInventoryValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  const totalProducts = products.length;
  const lowStockProducts = products.filter(p => p.stock <= 15);
  const todayInvoices = invoices.filter(inv => {
    const invDate = new Date(inv.date);
    const today = new Date();
    return invDate.toDateString() === today.toDateString();
  });
  const todayRevenue = todayInvoices.reduce((sum, inv) => sum + inv.total, 0);

  const formatCurrency = (amount) => {
    return '₡' + amount.toLocaleString('es-CR');
  };

  const iconOptions = [
    { id: 'box', icon: <Box size={18} /> },
    { id: 'droplets', icon: <Droplets size={18} /> },
    { id: 'zap', icon: <Zap size={18} /> },
    { id: 'shield', icon: <Shield size={18} /> },
    { id: 'disc', icon: <Disc size={18} /> },
    { id: 'layers', icon: <Layers size={18} /> },
    { id: 'tag', icon: <Tag size={18} /> },
  ];

  const renderProductIcon = (iconId) => {
    const opt = iconOptions.find(o => o.id === iconId);
    return opt ? opt.icon : <Box size={18} />;
  };

  const stats = [
    {
      label: 'Ventas de Hoy',
      value: formatCurrency(todayRevenue),
      icon: <DollarSign size={24} />,
      color: '#00c853',
      change: '+12%',
      positive: true,
    },
    {
      label: 'Facturas Emitidas',
      value: todayInvoices.length,
      icon: <ShoppingCart size={24} />,
      color: '#2979ff',
      change: `${invoices.length} total`,
      positive: true,
    },
    {
      label: 'Productos en Stock',
      value: totalProducts,
      icon: <Package size={24} />,
      color: '#ff9100',
      change: formatCurrency(totalInventoryValue),
      positive: true,
    },
    {
      label: 'Stock Bajo',
      value: lowStockProducts.length,
      icon: <AlertTriangle size={24} />,
      color: lowStockProducts.length > 0 ? '#ff1744' : '#00c853',
      change: 'productos',
      positive: lowStockProducts.length === 0,
    },
  ];

  return (
    <div className="pos-dashboard">
      <div className="pos-page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Resumen general del sistema de inventario y ventas</p>
        </div>
        <div className="pos-header-time">
          <Clock size={18} />
          <span>{new Date().toLocaleDateString('es-CR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="pos-stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="pos-stat-card" style={{ '--accent': stat.color }}>
            <div className="stat-card-header">
              <div className="stat-icon-wrap" style={{ background: stat.color + '15', color: stat.color }}>
                {stat.icon}
              </div>
              <div className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
                {stat.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                <span>{stat.change}</span>
              </div>
            </div>
            <div className="stat-card-body">
              <h2>{stat.value}</h2>
              <p>{stat.label}</p>
            </div>
            <div className="stat-glow" style={{ background: stat.color }}></div>
          </div>
        ))}
      </div>

      {/* Content Row */}
      <div className="pos-dashboard-row">
        {/* Recent Invoices */}
        <div className="pos-card pos-recent-invoices">
          <div className="pos-card-header">
            <h3>Facturas Recientes</h3>
            <span className="pos-card-badge">{invoices.length}</span>
          </div>
          <div className="pos-card-body">
            {invoices.slice(0, 5).map(inv => (
              <div key={inv.id} className="invoice-row">
                <div className="invoice-row-left">
                  <span className="invoice-id">{inv.id}</span>
                  <span className="invoice-customer">{inv.customerName || 'Cliente General'}</span>
                </div>
                <div className="invoice-row-right">
                  <span className="invoice-total">{formatCurrency(inv.total)}</span>
                  <span className={`invoice-status ${inv.status}`}>
                    {inv.status === 'paid' ? 'Pagada' : 'Pendiente'}
                  </span>
                </div>
              </div>
            ))}
            {invoices.length === 0 && (
              <div className="empty-state">
                <ShoppingCart size={40} />
                <p>No hay facturas aún</p>
              </div>
            )}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="pos-card pos-low-stock">
          <div className="pos-card-header">
            <h3>Alerta de Stock</h3>
            <span className="pos-card-badge danger">{lowStockProducts.length}</span>
          </div>
          <div className="pos-card-body">
            {lowStockProducts.map(p => (
              <div key={p.id} className="stock-alert-row">
                <div className="stock-product-info">
                  <div className="stock-icon-wrap" style={{ 
                    width: '36px', 
                    height: '36px', 
                    background: 'rgba(255,255,255,0.03)', 
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#888',
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}>
                    {renderProductIcon(p.icon)}
                  </div>
                  <div>
                    <span className="stock-name">{p.name}</span>
                    <span className="stock-category">{p.category}</span>
                  </div>
                </div>
                <div className="stock-level">
                  <div className="stock-bar-bg">
                    <div
                      className="stock-bar-fill"
                      style={{
                        width: `${Math.min((p.stock / 50) * 100, 100)}%`,
                        background: p.stock <= 5 ? '#ff1744' : p.stock <= 10 ? '#ff9100' : '#ffea00',
                      }}
                    ></div>
                  </div>
                  <span className={`stock-count ${p.stock <= 5 ? 'critical' : p.stock <= 10 ? 'warning' : ''}`}>
                    {p.stock} uds
                  </span>
                </div>
              </div>
            ))}
            {lowStockProducts.length === 0 && (
              <div className="empty-state success">
                <Package size={40} />
                <p>Todo el inventario está bien</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="pos-card">
        <div className="pos-card-header">
          <h3>Resumen de Inventario</h3>
          <span className="pos-card-badge">{products.length} ítems</span>
        </div>
        <div className="pos-card-body">
          <div className="pos-products-mini-grid">
            {products.slice(0, 8).map(p => (
              <div key={p.id} className="product-mini-card">
                  <div className="product-mini-icon" style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--pos-primary)',
                  marginBottom: '10px'
                }}>
                  {renderProductIcon(p.icon)}
                </div>
                <div className="product-mini-info">
                  <span className="product-mini-name">{p.name}</span>
                  <div className="product-mini-meta">
                    <span className="product-mini-price">{formatCurrency(p.price)}</span>
                    <span className="product-mini-stock">{p.stock} uds</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default POSDashboard;
