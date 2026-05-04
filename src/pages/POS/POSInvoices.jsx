import React, { useState } from 'react';
import { usePOS } from './POSLayout';
import {
  Search,
  Eye,
  Printer,
  FileText,
  X,
  Calendar,
  Filter,
  Download,
} from 'lucide-react';

const POSInvoices = () => {
  const { invoices } = usePOS();
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const formatCurrency = (amount) => '₡' + amount.toLocaleString('es-CR');
  const formatDate = (dateStr) => new Date(dateStr).toLocaleString('es-CR');
  const formatDateShort = (dateStr) => new Date(dateStr).toLocaleDateString('es-CR');

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch =
      inv.id.toLowerCase().includes(search.toLowerCase()) ||
      inv.customerName.toLowerCase().includes(search.toLowerCase());

    if (dateFilter === 'all') return matchesSearch;

    const invDate = new Date(inv.date);
    const today = new Date();

    if (dateFilter === 'today') {
      return matchesSearch && invDate.toDateString() === today.toDateString();
    }
    if (dateFilter === 'week') {
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);
      return matchesSearch && invDate >= weekAgo;
    }
    if (dateFilter === 'month') {
      return matchesSearch &&
        invDate.getMonth() === today.getMonth() &&
        invDate.getFullYear() === today.getFullYear();
    }
    return matchesSearch;
  });

  const totalRevenue = filteredInvoices.reduce((sum, inv) => sum + inv.total, 0);
  const totalTax = filteredInvoices.reduce((sum, inv) => sum + inv.tax, 0);

  const printInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setTimeout(() => window.print(), 200);
  };

  return (
    <div className="pos-invoices">
      <div className="pos-page-header">
        <div>
          <h1>Facturas</h1>
          <p>Historial completo de facturación</p>
        </div>
        <div className="header-actions">
          <button className="pos-btn pos-btn-ghost">
            <Download size={16} />
            Exportar
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="pos-filters-bar">
        <div className="pos-search-wrap" style={{ flex: '1' }}>
          <Search size={18} />
          <input
            type="text"
            placeholder="Buscar por número o cliente..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="date-filter-group">
          <div className="date-filter-label">
            <Calendar size={16} />
            <span>Filtrar:</span>
          </div>
          <div className="date-filter-options">
            {['all', 'today', 'week', 'month'].map(f => (
              <button
                key={f}
                className={`date-filter-btn ${dateFilter === f ? 'active' : ''}`}
                onClick={() => setDateFilter(f)}
              >
                {f === 'all' ? 'Todas' : f === 'today' ? 'Hoy' : f === 'week' ? 'Semana' : 'Mes'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Section - Redesigned */}
      <div className="pos-stats-grid">
        <div className="pos-stat-card">
          <div className="stat-card-body">
            <h2>{filteredInvoices.length}</h2>
            <p>Facturas Emitidas</p>
          </div>
          <div className="stat-glow" style={{ background: 'var(--pos-secondary)' }}></div>
        </div>
        <div className="pos-stat-card">
          <div className="stat-card-body">
            <h2>{formatCurrency(totalRevenue)}</h2>
            <p>Ingresos Totales</p>
          </div>
          <div className="stat-glow" style={{ background: 'var(--pos-success)' }}></div>
        </div>
        <div className="pos-stat-card">
          <div className="stat-card-body">
            <h2 style={{ color: 'var(--pos-secondary)' }}>{formatCurrency(totalTax)}</h2>
            <p>IVA Recaudado</p>
          </div>
          <div className="stat-glow" style={{ background: 'var(--pos-secondary)' }}></div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="pos-card">
        <div className="pos-table-wrap">
          <table className="pos-table">
            <thead>
              <tr>
                <th>No. Factura</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Productos</th>
                <th>Método</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map(inv => (
                <tr key={inv.id}>
                  <td data-label="No. Factura"><strong>{inv.id}</strong></td>
                  <td data-label="Fecha">{formatDateShort(inv.date)}</td>
                  <td data-label="Cliente">{inv.customerName}</td>
                  <td data-label="Productos">{inv.items.length} productos</td>
                  <td data-label="Método">
                    <span className={`payment-badge ${inv.paymentMethod.toLowerCase()}`}>
                      {inv.paymentMethod}
                    </span>
                  </td>
                  <td data-label="Total" className="price-cell"><strong>{formatCurrency(inv.total)}</strong></td>
                  <td data-label="Estado">
                    <span className={`badge ${inv.status}`}>
                      {inv.status === 'paid' ? 'Pagada' : 'Pendiente'}
                    </span>
                  </td>
                  <td data-label="Acciones">
                    <div className="action-buttons">
                      <button
                        className="pos-icon-btn"
                        onClick={() => setSelectedInvoice(inv)}
                        title="Ver detalle"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="pos-icon-btn"
                        onClick={() => printInvoice(inv)}
                        title="Imprimir"
                      >
                        <Printer size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredInvoices.length === 0 && (
            <div className="empty-state">
              <FileText size={48} />
              <p>No se encontraron facturas</p>
            </div>
          )}
        </div>
      </div>

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div className="pos-modal-overlay" onClick={() => setSelectedInvoice(null)}>
          <div className="pos-modal invoice-preview-modal" onClick={e => e.stopPropagation()}>
            <div className="pos-modal-header">
              <h2>Factura {selectedInvoice.id}</h2>
              <button className="pos-icon-btn" onClick={() => setSelectedInvoice(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="pos-modal-body">
              <div className="invoice-preview" id="invoice-print-area">
                <div className="invoice-preview-header">
                  <h2>LOS PITS</h2>
                  <p>Estética Automotriz de Élite</p>
                  <div className="invoice-meta">
                    <span>Factura: <strong>{selectedInvoice.id}</strong></span>
                    <span>Fecha: <strong>{formatDate(selectedInvoice.date)}</strong></span>
                    <span>Cliente: <strong>{selectedInvoice.customerName}</strong></span>
                    <span>Pago: <strong>{selectedInvoice.paymentMethod}</strong></span>
                  </div>
                </div>

                <table className="invoice-table">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cant.</th>
                      <th>Precio</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedInvoice.items.map((item, i) => (
                      <tr key={i}>
                        <td>{item.name}</td>
                        <td>{item.qty}</td>
                        <td>{formatCurrency(item.price)}</td>
                        <td>{formatCurrency(item.price * item.qty)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="invoice-totals">
                  <div className="invoice-total-row">
                    <span>Subtotal</span>
                    <span>{formatCurrency(selectedInvoice.subtotal)}</span>
                  </div>
                  <div className="invoice-total-row">
                    <span>IVA (13%)</span>
                    <span>{formatCurrency(selectedInvoice.tax)}</span>
                  </div>
                  <div className="invoice-total-row grand-total">
                    <span>TOTAL</span>
                    <span>{formatCurrency(selectedInvoice.total)}</span>
                  </div>
                </div>

                <div className="invoice-footer-note">
                  <p>¡Gracias por su compra!</p>
                  <p>Los Pits — Donde tu auto recibe el trato que merece</p>
                </div>
              </div>
            </div>

            <div className="pos-modal-footer">
              <button className="pos-btn pos-btn-ghost" onClick={() => setSelectedInvoice(null)}>
                Cerrar
              </button>
              <button className="pos-btn pos-btn-primary" onClick={() => printInvoice(selectedInvoice)}>
                <Printer size={16} />
                Imprimir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default POSInvoices;
