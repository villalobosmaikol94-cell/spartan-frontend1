import React from 'react';

export default function InvoiceGenerator({ isOpen, onClose, cartItems, totalItemsCount }) {
  if (!isOpen) return null;

  // Cálculos matemáticos corporativos exactos
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const impuestoIVA = subtotal * 0.19; // IVA estándar del 19%
  const totalDefinitivo = subtotal + impuestoIVA;

  // Generar un número de factura aleatorio simulando un consecutivo legal
  const numeroFactura = `SP-${Math.floor(100000 + Math.random() * 900000)}`;
  const fechaActual = new Date().toLocaleDateString();

  // Función nativa para mandar la factura directamente a la cola de impresión/PDF del sistema operativo
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 font-sans print:p-0 print:bg-white text-black">
      
      {/* Tarjeta del Documento (Fondo Blanco Puro, Letras Negras, Borde Verde Spartan) */}
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden border-t-8 border-[#72C924] flex flex-col justify-between print:border-0 print:shadow-none">
        
        {/* Cuerpo de la Factura */}
        <div className="p-8 space-y-6 print:p-4">
          
          {/* Encabezado: Logotipo ficticio y metadatos */}
          <div className="flex justify-between items-start border-b border-gray-200 pb-6">
            <div>
              <h2 className="text-3xl font-black tracking-tighter text-black flex items-center gap-2">
                SPARTAN <span className="text-[#72C924] font-mono text-sm tracking-widest font-bold">// SYSTEMS</span>
              </h2>
              <p className="text-xs text-gray-500 font-mono mt-1">DISTRIBUIDORA & SERVICIO TÉCNICO CELULAR</p>
            </div>
            <div className="text-right font-mono text-xs text-gray-600">
              <p className="font-bold text-black text-sm">{numeroFactura}</p>
              <p>FECHA: {fechaActual}</p>
              <p>ESTADO: PAGO REVISADO</p>
            </div>
          </div>

          {/* Información de las partes */}
          <div className="grid grid-cols-2 gap-4 text-xs font-mono border-b border-gray-100 pb-6">
            <div>
              <p className="font-bold text-gray-400 uppercase tracking-wider mb-1">// EMISOR</p>
              <p className="font-black text-black">SPARTAN SYSTEMS CORP.</p>
              <p className="text-gray-600">NIT: 900.123.456-7</p>
              <p className="text-gray-600">Soporte Técnico Especializado</p>
            </div>
            <div>
              <p className="font-bold text-gray-400 uppercase tracking-wider mb-1">// ADQUIRENTE</p>
              <p className="font-black text-black">CLIENTE MOSTRADOR</p>
              <p className="text-gray-600">REGISTRO DE VENTA VIRTUAL</p>
              <p className="text-gray-600">Ecosistema Spartan Core</p>
            </div>
          </div>

          {/* Detalle de Productos Vendidos */}
          <div>
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-black text-[#72C924] font-mono font-black tracking-wider uppercase">
                  <th className="p-2.5">Descripción del Item</th>
                  <th className="p-2.5 text-center">Cant.</th>
                  <th className="p-2.5 text-right">Precio Unit.</th>
                  <th className="p-2.5 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 font-medium">
                {cartItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-2.5 font-black uppercase">{item.name}</td>
                    <td className="p-2.5 text-center font-mono">{item.quantity}</td>
                    <td className="p-2.5 text-right font-mono">${item.price.toFixed(2)}</td>
                    <td className="p-2.5 text-right font-mono">${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Liquidación de Totales */}
          <div className="border-t-2 border-black pt-4 flex justify-end">
            <div className="w-64 font-mono text-xs space-y-1.5 text-right">
              <div className="flex justify-between text-gray-600">
                <span>SUBTOTAL:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>IVA DISPOSITIVOS (19%):</span>
                <span>${impuestoIVA.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-black text-black pt-1.5 border-t border-gray-200">
                <span>TOTAL NETO:</span>
                <span>${totalDefinitivo.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Términos y firma de seguridad */}
          <div className="text-[10px] text-gray-400 font-mono leading-relaxed border-t border-gray-100 pt-4">
            <p>* Los componentes y pantallas cuentan con sello de garantía Spartan. La remoción del mismo anula el soporte técnico.</p>
            <p>* Comprobante fiscal generado en el entorno tecnológico de desarrollo local.</p>
          </div>
        </div>

        {/* Panel de Botones Operacionales (Ocultos al momento de imprimir) */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 flex gap-4 justify-end print:hidden">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 bg-white text-black border border-gray-300 font-mono text-xs font-black rounded hover:bg-gray-100 transition-all duration-300 cursor-pointer"
          >
            [ CERRAR ]
          </button>
          
          {/* Botón de impresión tecnológico: Verde Spartan y Letras Negras */}
          <button 
            onClick={handlePrint}
            className="px-6 py-2.5 bg-[#72C924] text-black font-mono text-xs font-black rounded shadow-md hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
          >
            IMPRIMIR / GUARDAR PDF //
          </button>
        </div>

      </div>
    </div>
  );
}
