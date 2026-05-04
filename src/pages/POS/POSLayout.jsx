import React, { useState, createContext, useContext } from 'react';
import POSSidebar from './POSSidebar';
import POSDashboard from './POSDashboard';
import POSInventory from './POSInventory';
import POSScanner from './POSScanner';
import POSInvoices from './POSInvoices';
import './pos.css';

// POS Context for shared state
const POSContext = createContext(null);
export const usePOS = () => useContext(POSContext);

const POSLayout = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([
    { id: 'PROD-001', name: 'Shampoo Automotriz Premium', category: 'Limpieza', price: 8500, stock: 45, barcode: '7501001001', icon: 'shampoo' },
    { id: 'PROD-002', name: 'Cera Carnauba Gold', category: 'Protección', price: 15000, stock: 22, barcode: '7501001002', icon: 'wax' },
    { id: 'PROD-003', name: 'Microfibra Ultra Suave 40x40', category: 'Accesorios', price: 3500, stock: 120, barcode: '7501001003', icon: 'cloth' },
    { id: 'PROD-004', name: 'Ceramic Spray Coating', category: 'Protección', price: 22000, stock: 18, barcode: '7501001004', icon: 'shield' },
    { id: 'PROD-005', name: 'Interior Cleaner All-Purpose', category: 'Limpieza', price: 6500, stock: 38, barcode: '7501001005', icon: 'liquid' },
    { id: 'PROD-006', name: 'Tire Gel Brillo', category: 'Llantas', price: 5500, stock: 55, barcode: '7501001006', icon: 'tire' },
    { id: 'PROD-007', name: 'Clay Bar Kit', category: 'Corrección', price: 12000, stock: 15, barcode: '7501001007', icon: 'box' },
    { id: 'PROD-008', name: 'Ambientador Premium', category: 'Accesorios', price: 4000, stock: 80, barcode: '7501001008', icon: 'scent' },
    { id: 'PROD-009', name: 'Compound Pulidora', category: 'Corrección', price: 18000, stock: 10, barcode: '7501001009', icon: 'tool' },
    { id: 'PROD-010', name: 'Glass Cleaner Pro', category: 'Limpieza', price: 4500, stock: 60, barcode: '7501001010', icon: 'glass' },
  ]);

  const [cart, setCart] = useState([]);
  const [invoices, setInvoices] = useState([
    {
      id: 'INV-0001',
      date: '2026-05-03T14:30:00',
      items: [
        { productId: 'PROD-001', name: 'Shampoo Automotriz Premium', qty: 2, price: 8500 },
        { productId: 'PROD-003', name: 'Microfibra Ultra Suave 40x40', qty: 5, price: 3500 },
      ],
      subtotal: 34500,
      tax: 4485,
      total: 38985,
      paymentMethod: 'Efectivo',
      customerName: 'Juan Pérez',
      status: 'paid'
    },
    {
      id: 'INV-0002',
      date: '2026-05-03T16:15:00',
      items: [
        { productId: 'PROD-004', name: 'Ceramic Spray Coating', qty: 1, price: 22000 },
      ],
      subtotal: 22000,
      tax: 2860,
      total: 24860,
      paymentMethod: 'Tarjeta',
      customerName: 'María García',
      status: 'paid'
    }
  ]);

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.productId === product.id);
      if (existing) {
        return prev.map(i =>
          i.productId === product.id
            ? { ...i, qty: Math.min(i.qty + qty, product.stock) }
            : i
        );
      }
      return [...prev, { productId: product.id, name: product.name, qty, price: product.price }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(i => i.productId !== productId));
  };

  const updateCartQty = (productId, qty) => {
    const product = products.find(p => p.id === productId);
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(i =>
        i.productId === productId
          ? { ...i, qty: Math.min(qty, product?.stock || qty) }
          : i
      )
    );
  };

  const clearCart = () => setCart([]);

  const generateInvoice = (paymentMethod, customerName) => {
    const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    const tax = Math.round(subtotal * 0.13);
    const total = subtotal + tax;

    const newInvoice = {
      id: `INV-${String(invoices.length + 1).padStart(4, '0')}`,
      date: new Date().toISOString(),
      items: [...cart],
      subtotal,
      tax,
      total,
      paymentMethod,
      customerName: customerName || 'Cliente General',
      status: 'paid'
    };

    // Update stock
    setProducts(prev =>
      prev.map(p => {
        const cartItem = cart.find(c => c.productId === p.id);
        if (cartItem) {
          return { ...p, stock: p.stock - cartItem.qty };
        }
        return p;
      })
    );

    setInvoices(prev => [newInvoice, ...prev]);
    clearCart();
    return newInvoice;
  };

  const addProduct = (product) => {
    const id = `PROD-${String(products.length + 1).padStart(3, '0')}`;
    setProducts(prev => [...prev, { ...product, id }]);
  };

  const updateProduct = (id, updates) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const findProductByBarcode = (barcode) => {
    return products.find(p => p.barcode === barcode);
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const contextValue = {
    products,
    cart,
    invoices,
    addToCart,
    removeFromCart,
    updateCartQty,
    clearCart,
    generateInvoice,
    addProduct,
    updateProduct,
    deleteProduct,
    findProductByBarcode,
    activeTab,
    setActiveTab,
    isMobileMenuOpen,
    setIsMobileMenuOpen
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard': return <POSDashboard />;
      case 'inventory': return <POSInventory />;
      case 'scanner': return <POSScanner />;
      case 'invoices': return <POSInvoices />;
      default: return <POSDashboard />;
    }
  };

  return (
    <POSContext.Provider value={contextValue}>
      <div className={`pos-app ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        <button 
          className="pos-mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {isMobileMenuOpen && (
          <div className="pos-mobile-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>
        )}

        <POSSidebar />
        <main className="pos-main">
          {renderTab()}
        </main>
      </div>
    </POSContext.Provider>
  );
};

// Import missing icons
import { Menu, X } from 'lucide-react';

export default POSLayout;
