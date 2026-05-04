import React, { useState } from 'react';
import { usePOS } from './POSLayout';
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  Package,
  X,
  Save,
  Filter,
  ArrowUpDown,
  Tag,
  Box,
  Layers,
  Droplets,
  Zap,
  Shield,
  Disc,
} from 'lucide-react';

const POSInventory = () => {
  const { products, addProduct, updateProduct, deleteProduct } = usePOS();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todos');
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    barcode: '',
    icon: 'box',
  });

  const categories = ['Todos', ...new Set(products.map(p => p.category))];

  const iconOptions = [
    { id: 'box', icon: <Box size={20} /> },
    { id: 'droplets', icon: <Droplets size={20} /> },
    { id: 'zap', icon: <Zap size={20} /> },
    { id: 'shield', icon: <Shield size={20} /> },
    { id: 'disc', icon: <Disc size={20} /> },
    { id: 'layers', icon: <Layers size={20} /> },
    { id: 'tag', icon: <Tag size={20} /> },
  ];

  const renderProductIcon = (iconId) => {
    const opt = iconOptions.find(o => o.id === iconId);
    return opt ? opt.icon : <Box size={20} />;
  };

  const filteredProducts = products
    .filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.id.toLowerCase().includes(search.toLowerCase()) ||
        p.barcode.includes(search);
      const matchesCategory = categoryFilter === 'Todos' || p.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      let comp = 0;
      switch (sortBy) {
        case 'name': comp = a.name.localeCompare(b.name); break;
        case 'price': comp = a.price - b.price; break;
        case 'stock': comp = a.stock - b.stock; break;
        default: comp = 0;
      }
      return sortDir === 'asc' ? comp : -comp;
    });

  const formatCurrency = (amount) => '₡' + amount.toLocaleString('es-CR');

  const openAddModal = () => {
    setEditingProduct(null);
    setForm({ name: '', category: '', price: '', stock: '', barcode: '', icon: 'box' });
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      stock: String(product.stock),
      barcode: product.barcode,
      icon: product.icon || 'box',
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name || !form.category || !form.price || !form.stock) return;

    const productData = {
      name: form.name,
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock),
      barcode: form.barcode,
      icon: form.icon,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }

    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      deleteProduct(id);
    }
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDir('asc');
    }
  };

  return (
    <div className="pos-inventory">
      <div className="pos-page-header">
        <div>
          <h1>Inventario</h1>
          <p>Gestión completa de productos y stock</p>
        </div>
        <button className="pos-btn pos-btn-primary" onClick={openAddModal}>
          <Plus size={18} />
          Nuevo Producto
        </button>
      </div>

      {/* Summary Cards */}
      <div className="pos-stats-grid">
        <div className="pos-stat-card">
          <div className="stat-card-body">
            <h2>{products.length}</h2>
            <p>Productos</p>
          </div>
          <div className="stat-glow" style={{ background: 'var(--pos-primary)' }}></div>
        </div>
        <div className="pos-stat-card">
          <div className="stat-card-body">
            <h2>{products.reduce((s, p) => s + p.stock, 0)}</h2>
            <p>Unidades Total</p>
          </div>
          <div className="stat-glow" style={{ background: 'var(--pos-secondary)' }}></div>
        </div>
        <div className="pos-stat-card">
          <div className="stat-card-body">
            <h2>{formatCurrency(products.reduce((s, p) => s + p.price * p.stock, 0))}</h2>
            <p>Valor Inventario</p>
          </div>
          <div className="stat-glow" style={{ background: 'var(--pos-success)' }}></div>
        </div>
        <div className="pos-stat-card">
          <div className="stat-card-body">
            <h2 style={{ color: 'var(--pos-danger)' }}>{products.filter(p => p.stock <= 15).length}</h2>
            <p>Stock Bajo</p>
          </div>
          <div className="stat-glow" style={{ background: 'var(--pos-danger)' }}></div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="pos-filters-bar">
        <div className="pos-search-wrap">
          <Search size={18} />
          <input
            type="text"
            placeholder="Buscar por nombre, ID o código..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="pos-filter-group">
          <Filter size={16} />
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="pos-select"
          >
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="pos-card">
        <div className="pos-table-wrap">
          <table className="pos-table">
            <thead>
              <tr>
                <th>Ítem</th>
                <th onClick={() => toggleSort('name')} className="sortable" style={{ cursor: 'pointer' }}>
                  Nombre <ArrowUpDown size={14} />
                </th>
                <th>Categoría</th>
                <th>Código</th>
                <th onClick={() => toggleSort('price')} className="sortable" style={{ cursor: 'pointer' }}>
                  Precio <ArrowUpDown size={14} />
                </th>
                <th onClick={() => toggleSort('stock')} className="sortable" style={{ cursor: 'pointer' }}>
                  Stock <ArrowUpDown size={14} />
                </th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(p => (
                <tr key={p.id}>
                  <td data-label="Icono">
                    <div className="product-table-icon">
                      {renderProductIcon(p.icon)}
                    </div>
                  </td>
                  <td data-label="Producto">
                    <div className="product-name-cell">
                      <span className="product-name">{p.name}</span>
                      <span className="product-id">{p.id}</span>
                    </div>
                  </td>
                  <td data-label="Categoría"><span className="category-pill">{p.category}</span></td>
                  <td data-label="Código"><code className="barcode-code">{p.barcode}</code></td>
                  <td data-label="Precio" className="price-cell" style={{ fontWeight: 800, color: 'white' }}>{formatCurrency(p.price)}</td>
                  <td data-label="Stock">
                    <div className="stock-cell">
                      <div className="stock-indicator">
                        <div
                          className="stock-indicator-fill"
                          style={{
                            width: `${Math.min((p.stock / 100) * 100, 100)}%`,
                            background: p.stock <= 5 ? 'var(--pos-danger)' : p.stock <= 15 ? 'var(--pos-warning)' : 'var(--pos-success)',
                          }}
                        />
                      </div>
                      <span style={{ fontWeight: 700, minWidth: '25px', textAlign: 'right' }}>
                        {p.stock}
                      </span>
                    </div>
                  </td>
                  <td data-label="Acciones">
                    <div className="action-buttons" style={{ display: 'flex', gap: '8px' }}>
                      <button className="pos-icon-btn" onClick={() => openEditModal(p)}>
                        <Edit3 size={16} />
                      </button>
                      <button className="pos-icon-btn" style={{ color: 'var(--pos-danger)' }} onClick={() => handleDelete(p.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredProducts.length === 0 && (
            <div className="empty-state">
              <Package size={48} />
              <p>No hay productos que coincidan</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="pos-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="pos-modal" onClick={e => e.stopPropagation()}>
            <div className="pos-modal-header">
              <h2>{editingProduct ? 'Configurar Producto' : 'Nuevo Producto'}</h2>
              <button className="pos-icon-btn" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="pos-modal-body">
              <div className="pos-form-group">
                <label>Identificador Visual</label>
                <div className="icon-selector" style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                  {iconOptions.map(opt => (
                    <button
                      key={opt.id}
                      className={`icon-option-btn ${form.icon === opt.id ? 'active' : ''}`}
                      onClick={() => setForm({ ...form, icon: opt.id })}
                    >
                      {opt.icon}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pos-form-group">
                <label>Nombre del Producto *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Ej: Cera Carnauba"
                />
              </div>

              <div className="pos-form-row">
                <div className="pos-form-group">
                  <label>Categoría *</label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                    placeholder="Limpieza, Protección..."
                    list="categories-list"
                  />
                  <datalist id="categories-list">
                    {categories.filter(c => c !== 'Todos').map(c => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </div>
                <div className="pos-form-group">
                  <label>Código de Barras</label>
                  <input
                    type="text"
                    value={form.barcode}
                    onChange={e => setForm({ ...form, barcode: e.target.value })}
                    placeholder="Ej: 750100..."
                  />
                </div>
              </div>

              <div className="pos-form-row">
                <div className="pos-form-group">
                  <label>Precio Unitario (₡) *</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={e => setForm({ ...form, price: e.target.value })}
                    placeholder="0"
                  />
                </div>
                <div className="pos-form-group">
                  <label>Stock Disponible *</label>
                  <input
                    type="number"
                    value={form.stock}
                    onChange={e => setForm({ ...form, stock: e.target.value })}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <div className="pos-modal-footer">
              <button className="pos-btn pos-btn-ghost" onClick={() => setShowModal(false)}>
                Cancelar
              </button>
              <button className="pos-btn pos-btn-primary" onClick={handleSave}>
                <Save size={16} />
                <span>{editingProduct ? 'Guardar Cambios' : 'Registrar Producto'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .product-table-icon {
          width: 44px;
          height: 44px;
          background: rgba(255,255,255,0.03);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--pos-text-muted);
          border: 1px solid var(--pos-border);
        }
        
        .icon-option-btn {
          width: 48px;
          height: 48px;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--pos-border);
          border-radius: 12px;
          color: var(--pos-text-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.3s;
        }
        .icon-option-btn.active {
          background: var(--pos-primary);
          color: white;
          border-color: var(--pos-primary);
          box-shadow: 0 4px 15px rgba(230,0,0,0.3);
        }
        .icon-option-btn:hover:not(.active) {
          border-color: rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.08);
        }
      `}} />
    </div>
  );
};

export default POSInventory;
