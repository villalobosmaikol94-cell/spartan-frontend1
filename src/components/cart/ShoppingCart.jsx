import React from 'react';

export default function ShoppingCart({ isOpen, onClose, cartItems, onClearCart, onCheckout }) {
  if (!isOpen) return null;

  const totalCartPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
        <div className="w-screen max-w-md bg-white text-black shadow-2xl flex flex-col justify-between border-l-4 border-l-[#72C924]">
          
          <div className="p-6 bg-black text-white flex justify-between items-center border-b-2 border-[#72C924]">
            <h2 className="text-lg font-mono font-black tracking-widest text-[#72C924]">
              // MI_CARRITO ({cartItems.length})
            </h2>
            <button onClick={onClose} className="text-white hover:text-[#72C924] font-mono text-xs font-bold cursor-pointer">[ CERRAR X ]</button>
          </div>

          <div className="flex-1 py-6 overflow-y-auto px-6 divide-y divide-gray-200">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col justify-center items-center text-gray-400 font-mono text-sm py-20">
                <p>[ EL CARRITO ESTÁ VACÍO ]</p>
                <p className="text-xs text-gray-300 mt-2">Agrega insumos desde la tienda</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex py-4 justify-between items-center">
                  <div className="flex-1 pr-4">
                    <h3 className="font-black text-sm uppercase tracking-tight text-black leading-tight mb-1">
                      {item.name}
                    </h3>
                    <p className="text-xs font-mono text-gray-500">CANTIDAD: {item.quantity}</p>
                  </div>
                  <p className="text-lg font-mono font-black text-black">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex justify-between text-base font-black text-black uppercase tracking-tight mb-4">
              <p>Total Estimado</p>
              <p className="font-mono text-xl">${totalCartPrice.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center mb-6">
              <p className="text-xs text-gray-500 font-mono">// ENVÍO LOGÍSTICO ASEGURADO</p>
              {cartItems.length > 0 && (
                <button onClick={onClearCart} className="text-xs font-mono text-red-600 font-bold hover:underline cursor-pointer">
                  [Vaciar]
                </button>
              )}
            </div>
            
            {/* Vinculamos el click al disparador del generador de facturas */}
            <button 
              onClick={onCheckout}
              className="w-full py-4 bg-[#72C924] text-black text-center font-black font-mono text-sm uppercase tracking-widest rounded shadow-lg hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
            >
              PROCESAR COMPRA //
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
