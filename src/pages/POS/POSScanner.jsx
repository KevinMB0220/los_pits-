import React, { useState, useEffect, useRef } from 'react';
import { usePOS } from './POSLayout';
import {
  ScanBarcode,
  Camera,
  CameraOff,
  Search,
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  CreditCard,
  Banknote,
  Receipt,
  X,
  CheckCircle2,
  User,
  Printer,
  AlertCircle,
  Box,
  Droplets,
  Zap,
  Shield,
  Disc,
  Layers,
  Tag,
} from 'lucide-react';

const POSScanner = () => {
  const {
    products,
    cart,
    addToCart,
    removeFromCart,
    updateCartQty,
    clearCart,
    generateInvoice,
    findProductByBarcode,
  } = usePOS();

  const [scanning, setScanning] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Efectivo');
  const [customerName, setCustomerName] = useState('');
  const [lastInvoice, setLastInvoice] = useState(null);
  const [showInvoicePreview, setShowInvoicePreview] = useState(false);

  const scannerRef = useRef(null);
  const html5QrCodeRef = useRef(null);

  const iconOptions = [
    { id: 'box', icon: <Box size={24} /> },
    { id: 'droplets', icon: <Droplets size={24} /> },
    { id: 'zap', icon: <Zap size={24} /> },
    { id: 'shield', icon: <Shield size={24} /> },
    { id: 'disc', icon: <Disc size={24} /> },
    { id: 'layers', icon: <Layers size={24} /> },
    { id: 'tag', icon: <Tag size={24} /> },
  ];

  const renderProductIcon = (iconId) => {
    const opt = iconOptions.find(o => o.id === iconId);
    return opt ? opt.icon : <Box size={24} />;
  };

  const showNotif = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // QR/Barcode Scanner
  const startScanner = async () => {
    try {
      const { Html5Qrcode } = await import('html5-qrcode');
      
      // Ensure any existing instance is cleaned up
      if (html5QrCodeRef.current) {
        try { await html5QrCodeRef.current.stop(); } catch(e) {}
      }

      const scanner = new Html5Qrcode('pos-qr-reader');
      html5QrCodeRef.current = scanner;

      const config = {
        fps: 15,
        qrbox: (viewfinderWidth, viewfinderHeight) => {
          const minEdge = Math.min(viewfinderWidth, viewfinderHeight);
          const boxSize = Math.floor(minEdge * 0.7);
          return { width: boxSize, height: boxSize };
        },
        aspectRatio: 1.0,
      };

      // Try starting with environment (back) camera
      await scanner.start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
          handleBarcodeScanned(decodedText);
          // Optional: sound feedback here
        },
        () => {} // Ignore errors
      );
      
      setScanning(true);
    } catch (err) {
      console.error('Scanner error:', err);
      showNotif('No se pudo abrir la cámara trasera. Verifica los permisos.', 'error');
      setScanning(false);
    }
  };

  const stopScanner = async () => {
    if (html5QrCodeRef.current) {
      try {
        await html5QrCodeRef.current.stop();
        html5QrCodeRef.current.clear();
      } catch (e) {}
      html5QrCodeRef.current = null;
    }
    setScanning(false);
  };

  useEffect(() => {
    return () => {
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current.stop().catch(() => {});
      }
    };
  }, []);

  const handleBarcodeScanned = (code) => {
    const product = findProductByBarcode(code);
    if (product) {
      if (product.stock <= 0) {
        showNotif(`"${product.name}" está agotado`, 'error');
        return;
      }
      addToCart(product);
      showNotif(`"${product.name}" agregado`, 'success');
    } else {
      showNotif(`Código "${code}" no encontrado`, 'error');
    }
  };

  const handleManualSearch = (e) => {
    e.preventDefault();
    if (manualCode.trim()) {
      handleBarcodeScanned(manualCode.trim());
      setManualCode('');
    }
  };

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = Math.round(subtotal * 0.13);
  const total = subtotal + tax;

  const formatCurrency = (amount) => '₡' + amount.toLocaleString('es-CR');

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.barcode.includes(searchTerm)
  );

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setShowCheckout(true);
  };

  const handleConfirmPayment = () => {
    const invoice = generateInvoice(paymentMethod, customerName);
    setLastInvoice(invoice);
    setShowCheckout(false);
    setShowInvoicePreview(true);
    setCustomerName('');
  };

  const printInvoice = () => {
    window.print();
  };

  return (
    <div className="pos-scanner-page">
      <div className="pos-page-header">
        <div>
          <h1>Punto de Venta</h1>
          <p>Gestión de ventas y facturación rápida</p>
        </div>
      </div>

      {notification && (
        <div className={`pos-notification ${notification.type}`}>
          {notification.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{notification.message}</span>
        </div>
      )}

      <div className="pos-scanner-layout">
        <div className="pos-scanner-left">
          <div className="pos-card scanner-section">
            <div className="scanner-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3><ScanBarcode size={20} /> Escáner de Código</h3>
              <button
                className={`pos-btn ${scanning ? 'pos-btn-danger' : 'pos-btn-primary'}`}
                onClick={scanning ? stopScanner : startScanner}
                style={{ borderRadius: '12px', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                {scanning ? <><CameraOff size={16} /> Detener</> : <><Camera size={16} /> Activar Cámara</>}
              </button>
            </div>

            <div className="scanner-area" style={{ height: '300px' }}>
              <div id="pos-qr-reader" ref={scannerRef} className={scanning ? 'scanner-active' : 'scanner-inactive'}>
                {!scanning && (
                  <div className="scanner-placeholder" style={{ background: '#080808' }}>
                    <ScanBarcode size={48} color="rgba(255,255,255,0.1)" />
                    <p style={{ color: '#555', marginTop: '15px' }}>Cámara Desactivada</p>
                  </div>
                )}
              </div>
            </div>

            <form className="manual-code-form" onSubmit={handleManualSearch} style={{ marginTop: '20px' }}>
              <input
                type="text"
                placeholder="Ingresa código manualmente..."
                value={manualCode}
                onChange={e => setManualCode(e.target.value)}
              />
              <button type="submit" className="pos-btn pos-btn-primary">
                Buscar
              </button>
            </form>
          </div>

          <div className="pos-card quick-products-section">
            <div className="pos-card-header">
              <h3>Selección Rápida</h3>
            </div>
            <div className="pos-search-wrap compact">
              <Search size={16} />
              <input
                type="text"
                placeholder="Filtrar catálogo..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="quick-products-grid">
              {filteredProducts.map(p => (
                <button
                  key={p.id}
                  className={`quick-product-btn ${p.stock <= 0 ? 'out-of-stock' : ''}`}
                  onClick={() => {
                    if (p.stock <= 0) return;
                    addToCart(p);
                    showNotif(`${p.name} agregado`, 'success');
                  }}
                  disabled={p.stock <= 0}
                >
                  <div className="qp-icon-wrap" style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '12px', color: 'var(--pos-text-muted)' }}>
                    {renderProductIcon(p.icon)}
                  </div>
                  <span className="qp-name" style={{ marginTop: '10px' }}>{p.name}</span>
                  <span className="qp-price">{formatCurrency(p.price)}</span>
                  <span className={`qp-stock ${p.stock <= 5 ? 'low' : ''}`}>{p.stock} uds</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pos-scanner-right">
          <div className="pos-card cart-section">
            <div className="cart-header" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--pos-border)', paddingBottom: '15px' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><ShoppingCart size={20} /> Carrito</h3>
              {cart.length > 0 && (
                <button className="pos-btn-text danger" onClick={clearCart}>
                  Limpiar Todo
                </button>
              )}
            </div>

            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="empty-state">
                  <ShoppingCart size={40} />
                  <p>Carrito de Ventas Vacío</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.productId} className="cart-item">
                    <div className="cart-item-info">
                      <span className="cart-item-name">{item.name}</span>
                      <span className="cart-item-unit-price">{formatCurrency(item.price)}</span>
                    </div>
                    <div className="cart-item-controls">
                      <div className="qty-control">
                        <button onClick={() => updateCartQty(item.productId, item.qty - 1)}>-</button>
                        <span>{item.qty}</span>
                        <button onClick={() => updateCartQty(item.productId, item.qty + 1)}>+</button>
                      </div>
                      <span className="cart-item-total">{formatCurrency(item.price * item.qty)}</span>
                      <button className="cart-item-remove" onClick={() => removeFromCart(item.productId)}><X size={14} /></button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-summary" style={{ background: '#080808', padding: '25px', borderRadius: '16px', marginTop: '20px' }}>
                <div className="cart-summary-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#888' }}>
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="cart-summary-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: '#888' }}>
                  <span>Impuestos (13%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <div className="cart-summary-row cart-total" style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #222', paddingTop: '15px', marginBottom: '25px' }}>
                  <span style={{ fontWeight: 800 }}>TOTAL</span>
                  <span style={{ fontWeight: 900, fontSize: '1.5rem', color: 'var(--pos-primary)' }}>{formatCurrency(total)}</span>
                </div>

                <button className="pos-btn pos-btn-primary pos-btn-lg checkout-btn" onClick={handleCheckout} style={{ width: '100%' }}>
                  <Receipt size={20} />
                  PROCEDER AL PAGO
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="pos-modal-overlay" onClick={() => setShowCheckout(false)}>
          <div className="pos-modal checkout-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <div className="pos-modal-header" style={{ borderBottom: '1px solid var(--pos-border)', paddingBottom: '20px' }}>
              <h2>Confirmación de Pago</h2>
              <button className="pos-icon-btn" onClick={() => setShowCheckout(false)}><X size={20} /></button>
            </div>

            <div className="pos-modal-body" style={{ paddingTop: '30px' }}>
              <div className="checkout-total-display" style={{ background: '#080808', padding: '30px', borderRadius: '16px', marginBottom: '30px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#666', letterSpacing: '2px' }}>Total a cobrar</span>
                <h1 style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--pos-primary)', marginTop: '10px' }}>{formatCurrency(total)}</h1>
              </div>

              <div className="pos-form-group">
                <label>Nombre del Cliente (Opcional)</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  placeholder="Cliente General"
                  style={{ background: '#111', border: '1px solid #222' }}
                />
              </div>

              <div className="pos-form-group">
                <label>Método de Pago</label>
                <div className="payment-methods" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginTop: '10px' }}>
                  <button className={`payment-method-btn ${paymentMethod === 'Efectivo' ? 'active' : ''}`} onClick={() => setPaymentMethod('Efectivo')}>
                    <Banknote size={20} /> Efectivo
                  </button>
                  <button className={`payment-method-btn ${paymentMethod === 'Tarjeta' ? 'active' : ''}`} onClick={() => setPaymentMethod('Tarjeta')}>
                    <CreditCard size={20} /> Tarjeta
                  </button>
                  <button className={`payment-method-btn ${paymentMethod === 'Sinpe' ? 'active' : ''}`} onClick={() => setPaymentMethod('Sinpe')}>
                    <Receipt size={20} /> SINPE
                  </button>
                </div>
              </div>
            </div>

            <div className="pos-modal-footer">
              <button className="pos-btn pos-btn-ghost" onClick={() => setShowCheckout(false)}>Cancelar</button>
              <button className="pos-btn pos-btn-primary" onClick={handleConfirmPayment} style={{ flex: 1 }}>
                <CheckCircle2 size={18} /> CONFIRMAR VENTA
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Preview Modal */}
      {showInvoicePreview && lastInvoice && (
        <div className="pos-modal-overlay" onClick={() => setShowInvoicePreview(false)}>
          <div className="pos-modal invoice-preview-modal" onClick={e => e.stopPropagation()}>
            <div className="pos-modal-header">
              <h2 style={{ fontWeight: 800 }}>Comprobante de Venta</h2>
              <button className="pos-icon-btn" onClick={() => setShowInvoicePreview(false)}><X size={20} /></button>
            </div>

            <div className="pos-modal-body" style={{ background: 'white', padding: '40px', color: '#111' }}>
              <div id="invoice-print-area">
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                  <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-1.5px', margin: 0 }}>LOS PITS</h1>
                  <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '5px' }}>ESTÉTICA AUTOMOTRIZ PREMIUM</p>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontSize: '0.85rem', marginBottom: '30px', borderTop: '2px solid #eee', paddingTop: '20px' }}>
                  <div>
                    <span style={{ color: '#888' }}>Factura Nº:</span>
                    <strong style={{ display: 'block' }}>{lastInvoice.id}</strong>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ color: '#888' }}>Fecha:</span>
                    <strong style={{ display: 'block' }}>{new Date(lastInvoice.date).toLocaleString()}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#888' }}>Cliente:</span>
                    <strong style={{ display: 'block' }}>{lastInvoice.customerName || 'Cliente General'}</strong>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ color: '#888' }}>Método:</span>
                    <strong style={{ display: 'block' }}>{lastInvoice.paymentMethod}</strong>
                  </div>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #111' }}>
                      <th style={{ textAlign: 'left', padding: '10px 0' }}>Detalle</th>
                      <th style={{ textAlign: 'center', padding: '10px 0' }}>Cant.</th>
                      <th style={{ textAlign: 'right', padding: '10px 0' }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lastInvoice.items.map((item, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '12px 0' }}>{item.name}</td>
                        <td style={{ textAlign: 'center' }}>{item.qty}</td>
                        <td style={{ textAlign: 'right' }}>{formatCurrency(item.price * item.qty)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div style={{ width: '220px', marginLeft: 'auto' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
                    <span>Subtotal:</span>
                    <strong>{formatCurrency(lastInvoice.subtotal)}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
                    <span>IVA (13%):</span>
                    <strong>{formatCurrency(lastInvoice.tax)}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', marginTop: '10px', borderTop: '2px solid #111', fontSize: '1.2rem' }}>
                    <span style={{ fontWeight: 900 }}>TOTAL:</span>
                    <strong style={{ fontWeight: 900 }}>{formatCurrency(lastInvoice.total)}</strong>
                  </div>
                </div>
                
                <div style={{ textAlign: 'center', marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '20px', color: '#999', fontSize: '0.8rem' }}>
                  <p>¡Gracias por confiar en Los Pits!</p>
                  <p>San José, Costa Rica</p>
                </div>
              </div>
            </div>

            <div className="pos-modal-footer">
              <button className="pos-btn pos-btn-ghost" onClick={() => setShowInvoicePreview(false)}>Cerrar</button>
              <button className="pos-btn pos-btn-primary" onClick={printInvoice}>
                <Printer size={18} /> IMPRIMIR COMPROBANTE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default POSScanner;
