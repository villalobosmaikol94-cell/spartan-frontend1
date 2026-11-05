import React, { useState } from 'react'
import ProductCatalog from "./components/catalogo/ProductCatalog.jsx";
import WarehouseDashboard from './components/dashboard/WarehouseDashboard.jsx';
import SalesAnalytics from './components/dashboard/SalesAnalytics.jsx';
import ShoppingCart from './components/cart/ShoppingCart.jsx';
import InvoiceGenerator from './components/cart/InvoiceGenerator.jsx'; // 1. Importamos el generador de facturas

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  
  // 📝 ESTADO PARA CONTROLAR LA APERTURA DE LA FACTURA DIGITAL
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const clearCart = () => setCart([]);
  
  // Acción activada al dar click en "Procesar Compra" en el carrito lateral
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("El carrito está vacío. Agrega repuestos o herramientas.");
      return;
    }
    setIsCartOpen(false);      // Cerramos el carrito lateral
    setIsInvoiceOpen(true);    // Desplegamos la factura premium central
  };

  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleAdminAccess = () => {
    if (isAdmin) {
      setIsAdmin(false);
      alert("Sesión de administrador cerrada.");
      return;
    }
    const password = prompt("SISTEMA SPARTAN CORE: Ingrese la clave de autenticación de administrador:");
    if (password === "spartan2026") {
      setIsAdmin(true);
      alert("ACCESO CONCEDIDO. Panel financiero y logística desbloqueados.");
    } else if (password !== null) {
      alert("ACCESO DENEGADO. Intento registrado en el sistema.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white selection:bg-[#72C924] selection:text-black flex flex-col justify-between">
      
      <div>
        {/* 🎬 NAVBAR ULTRA-ANCHO CON VIDEO EN BUCLE PROTEGIDO */}
        <nav className="relative w-full h-56 border-b-4 border-[#72C924] overflow-hidden sticky top-0 z-50 bg-black flex items-center">
          <video autoPlay loop muted playsInline key="spartan-core-video" preload="auto" className="absolute top-0 left-0 w-full h-full object-cover opacity-100 z-0 pointer-events-none">
            <source src="/nav-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] z-10" />
          
          <div className="relative w-full max-w-7xl mx-auto px-8 flex justify-between items-center z-20">
            <div className="flex items-center">
              <img src="/logo.png" alt="Spartan Logo" className="h-40 w-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]" />
            </div>

            <div className="hidden md:flex items-center gap-4">
              {!isAdmin ? (
                <>
                  <a href="#catalogo" className="px-5 py-3 bg-white text-black hover:bg-[#72C924] font-mono text-xs font-black tracking-widest rounded-md transition-all duration-300 shadow-xl border-2 border-black/10">// MICROPARTES</a>
                  <a href="#catalogo" className="px-5 py-3 bg-white text-black hover:bg-[#72C924] font-mono text-xs font-black tracking-widest rounded-md transition-all duration-300 shadow-xl border-2 border-black/10">// ELECTRÓNICA</a>
                  <a href="#catalogo" className="px-5 py-3 bg-white text-black hover:bg-[#72C924] font-mono text-xs font-black tracking-widest rounded-md transition-all duration-300 shadow-xl border-2 border-black/10">// ACCESORIOS</a>
                </>
              ) : (
                <>
                  <a href="#catalogo" className="px-5 py-3 bg-white text-black hover:bg-[#72C924] font-mono text-xs font-black tracking-widest rounded-md transition-all duration-300 shadow-xl border-2 border-black/10">// VER TIENDA</a>
                  <a href="#bodega" className="px-5 py-3 bg-[#72C924] text-black hover:bg-white font-mono text-xs font-black tracking-widest rounded-md transition-all duration-300 shadow-xl border-2 border-black/10 animate-pulse">// CONTROL BODEGA [ADMIN]</a>
                  <a href="#dashboard" className="px-5 py-3 bg-[#72C924] text-black hover:bg-white font-mono text-xs font-black tracking-widest rounded-md transition-all duration-300 shadow-xl border-2 border-black/10 animate-pulse">// REPORTE VENTAS [ADMIN]</a>
                </>
              )}
            </div>

            <div className="flex items-center">
              <button onClick={() => setIsCartOpen(true)} className="flex items-center gap-3 px-8 py-4 bg-[#72C924] text-black font-black text-sm font-mono rounded-md tracking-widest shadow-[0_0_30px_rgba(114,201,36,0.7)] hover:bg-white transition-all duration-300 cursor-pointer border-2 border-black/20">
                <span className="w-3 h-3 bg-black rounded-full flex items-center justify-center text-[9px] font-bold text-[#72C924]">{totalItemsCount > 0 ? totalItemsCount : ""}</span>
                CARRITO {totalItemsCount > 0 ? `(${totalItemsCount})` : ""}
              </button>
            </div>
          </div>
        </nav>

        {/* 💻 CONTENIDO GENERAL */}
        <main className="bg-[#0B0F19]">
          <div className="max-w-7xl mx-auto px-6 py-12 text-center relative z-10">
            <span className="text-[#72C924] font-mono text-sm tracking-widest block mb-4 font-bold">// SYSTEM CORE EXPANDED //</span>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-4 text-white">SISTEMA VIRTUAL <span className="text-[#72C924]">SPARTAN</span></h1>
          </div>

          <ProductCatalog onAddToCart={addToCart} />

          {isAdmin && (
            <div className="bg-black/50 border-t-2 border-b-2 border-[#72C924]/30 py-12 space-y-12 transition-all duration-500">
              <div className="max-w-7xl mx-auto px-6 text-center">
                <span className="bg-red-600 text-white font-mono text-xs font-black tracking-widest px-4 py-1.5 rounded shadow-lg animate-pulse">CONSOLA DE CONTROL CRÍTICO ACTIVA</span>
              </div>
              <WarehouseDashboard />
              <SalesAnalytics />
            </div>
          )}
        </main>
      </div>

      {/* PIE DE PÁGINA */}
      <footer className="w-full bg-black py-8 px-6 border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-500 font-mono text-xs">
          <p>© 2026 SPARTAN SYSTEMS. TODOS LOS DERECHOS RESERVADOS.</p>
          <button onClick={handleAdminAccess} className="text-gray-600 hover:text-[#72C924] transition-all duration-200 cursor-pointer font-bold tracking-widest hover:underline">
            {isAdmin ? "[// CLOSE_ADMIN_SESSION]" : "[// SYSTEM_CONSOLE_AUTH]"}
          </button>
        </div>
      </footer>

      {/* CARRITO DE COMPRAS CON ACCIÓN DE CHECKOUT REAL ENLAZADA */}
      <ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cart} onClearCart={clearCart} onCheckout={handleCheckout} />

      {/* GENERADOR DE FACTURA DIGITAL (MODAL CENTRAL) */}
      <InvoiceGenerator isOpen={isInvoiceOpen} onClose={() => setIsInvoiceOpen(false)} cartItems={cart} totalItemsCount={totalItemsCount} />

    </div>
  )
}

export default App
