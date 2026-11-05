import React from 'react';

// Historial estadístico de ventas simulado para la empresa de tecnología celular
const SALES_DATA = [
  { mes: "Ene", ventas: 12000 },
  { mes: "Feb", ventas: 19000 },
  { mes: "Mar", ventas: 15000 },
  { mes: "Abr", ventas: 28000 },
  { mes: "May", ventas: 22000 },
  { mes: "Jun", ventas: 35000 },
];

export default function SalesAnalytics() {
  const maxVentas = Math.max(...SALES_DATA.map(d => d.ventas));
  const totalPeriodo = SALES_DATA.reduce((acc, d) => acc + d.ventas, 0);

  return (
    <section id="dashboard" className="w-full py-12 px-6 max-w-7xl mx-auto">
      
      {/* Encabezado del Módulo de Ventas */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-[#72C924] pb-6 mb-12">
        <div>
          <span className="text-[#72C924] font-mono text-xs tracking-widest block mb-1">// ANALÍTICA FINANCIERA CORE</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">REPORTE DE VENTAS</h2>
        </div>
        <p className="text-gray-400 font-mono text-xs mt-4 md:mt-0">// FILTRO: ÚLTIMOS 6 MESES</p>
      </div>

      {/* Bloque Informativo Principal (Cajas Blancas, Letras Negras, Borde de Impacto) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-xl text-black border-l-8 border-[#72C924]">
          <p className="text-xs font-mono tracking-wider text-gray-500">// INGRESOS BRUTOS TOTALES</p>
          <p className="text-4xl font-black font-mono mt-2">${totalPeriodo.toLocaleString()}.00</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-xl text-black border-l-8 border-black">
          <p className="text-xs font-mono tracking-wider text-gray-500">// PRODUCTO MÁS DESPACHADO</p>
          <p className="text-2xl font-black uppercase mt-3 leading-none">Plancha RF4</p>
          <span className="text-xs font-mono text-gray-400">84 unidades este mes</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-xl text-black border-l-8 border-[#72C924]">
          <p className="text-xs font-mono tracking-wider text-gray-500">// RENDIMIENTO COMERCIAL</p>
          <p className="text-4xl font-black font-mono mt-2 text-green-600">+24.8%</p>
        </div>
      </div>

      {/* Gráfica de Barras Corporativa Nativa (Contenedor Blanco, Barras Negras y Verdes) */}
      <div className="bg-white rounded-lg shadow-2xl p-8 border-2 border-white text-black">
        <h3 className="font-black font-mono text-sm tracking-wider uppercase mb-8 border-b border-gray-100 pb-4">
          // CURVA DE CRECIMIENTO MENSUAL (USD)
        </h3>

        {/* Renderizado de la gráfica de barras escalable */}
        <div className="flex justify-between items-end h-64 gap-2 pt-4 px-2 bg-gray-50 rounded border border-gray-200">
          {SALES_DATA.map((data, index) => {
            // Calcular el porcentaje de altura respecto al valor máximo de ventas
            const alturaPorcentaje = (data.ventas / maxVentas) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center h-full justify-end">
                {/* Etiqueta de valor flotante */}
                <span className="text-[10px] font-mono font-black mb-1 text-gray-600">
                  ${(data.ventas / 1000).toFixed(0)}K
                </span>
                
                {/* Barra Estilo Spartan: Negra que cambia a Verde brillante con hover */}
                <div 
                  style={{ height: `${alturaPorcentaje * 0.8}%` }}
                  className="w-full max-w-[50px] bg-black hover:bg-[#72C924] rounded-t transition-all duration-500 cursor-pointer shadow-md group relative"
                >
                  {/* Tooltip interactivo flotante incorporado */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black text-[#72C924] font-mono text-[10px] font-black py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl z-30">
                    Monto: ${data.ventas.toLocaleString()}
                  </div>
                </div>

                {/* Eje X: Nombre del Mes */}
                <span className="text-xs font-mono font-black mt-3 text-black uppercase tracking-wider">
                  {data.mes}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
