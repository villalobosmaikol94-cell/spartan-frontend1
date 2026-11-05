import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
export default function ProductCatalog({ onAddToCart }) {
  // Estado reactivo para almacenar los productos reales de Supabase
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("TODOS");
  const categories = ["TODOS", "MICROPARTES", "ELECTRÓNICA", "ACCESORIOS"];

  // 📥 PETICIÓN EN TIEMPO REAL AL BACKEND (Pide los datos de Supabase)
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/inventario');
      if (!response.ok) throw new Error("Fallo en la respuesta del servidor");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error cargando productos de la base de datos:", error.message);
    }
  };

  // Se ejecuta automáticamente al abrir o refrescar la página
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filtrado inteligente según el apartado seleccionado por el usuario
  const filteredProducts = activeCategory === "TODOS" 
  ? products 
  : products.filter(p => p.category?.toUpperCase() === activeCategory.toUpperCase());

  return (
    <section id="catalogo" className="w-full py-12 px-6 max-w-7xl mx-auto">
      
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-[#72C924] pb-6 mb-8">
        <div>
          <span className="text-[#72C924] font-mono text-xs tracking-widest block mb-1">// DISTRIBUIDORA COMPONENTES CELULARES</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">CATÁLOGO VIRTUAL</h2>
        </div>
        <p className="text-gray-400 font-mono text-xs mt-4 md:mt-0">// ITEMS DISPONIBLES: {filteredProducts.length}</p>
      </div>

      {/* Botones de Categorías (Apartados Oficiales) */}
      <div className="flex flex-wrap gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-3 font-mono text-xs font-black tracking-widest rounded transition-all duration-300 shadow-md cursor-pointer border-2 border-black/10 ${
              activeCategory === cat 
                ? 'bg-[#72C924] text-black shadow-[0_0_15px_rgba(114,201,36,0.5)]' 
                : 'bg-white text-black hover:bg-[#72C924]'
            }`}
          >
            // {cat}
          </button>
        ))}
      </div>

      {/* 🚀 GRID DE TARJETAS CONECTADAS EN TIEMPO REAL A SUPABASE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className="bg-white rounded-lg overflow-hidden flex flex-col justify-between shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-[#72C924]"
          >
            {/* Imagen Dinámica (Si no tiene imagen en Supabase, coloca una de respaldo) */}
            <div className="relative bg-gray-100 h-52 w-full flex items-center justify-center overflow-hidden border-b border-gray-100">
              <img 
                src={product.image || "https://unsplash.com"} 
                alt={product.name} 
                className="w-full h-full object-cover" 
              />
              <span className="absolute top-3 left-3 px-2 py-1 bg-black text-[#72C924] font-mono text-[10px] font-black tracking-widest rounded">
                {product.category}
              </span>
            </div>

            {/* Detalles de la herramienta/repuesto */}
            <div className="p-5 flex-1 flex flex-col justify-between bg-white text-black">
              <div className="mb-4">
                <h3 className="font-black text-base tracking-tight uppercase leading-tight mb-2 min-h-[48px] text-black">
                  {product.name}
                </h3>
                <p className="text-2xl font-black text-black font-mono tracking-tight">
                  ${Number(product.price).toFixed(2)}
                </p>
              </div>

              {/* Botón de compra */}
              <button 
                onClick={() => onAddToCart(product)}
                className="w-full py-3 bg-[#72C924] text-black font-black font-mono text-xs uppercase tracking-widest rounded transition-all duration-300 hover:bg-black hover:text-white cursor-pointer shadow-md"
              >
                AÑADIR AL CARRITO
              </button>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
