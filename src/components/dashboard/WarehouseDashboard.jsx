import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

export default function WarehouseDashboard() {
  const [inventory, setInventory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Estado para el producto que estamos editando o creando
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'MICROPARTES',
    price: '',
    stock: '',
    image: ''
  });

  // 📥 Cargar inventario real desde el Backend/Supabase al iniciar
  const fetchInventory = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/inventario');
      if (!response.ok) throw new Error("Error en respuesta");
      const data = await response.json();
      setInventory(data);
    } catch (error) {
      console.error("Fallo al conectar backend, cargando locales:", error.message);
      // Datos de respaldo por si el servidor local se desconecta temporalmente
      setInventory([
        { id: 1, name: "PANTALLA OLED IPHONE 14 PRO MAX", category: "MICROPARTES", price: 149.00, stock: 15, image: "https://unsplash.com" },
        { id: 4, name: "PLANCHA DE CALOR REPARACIÓN RF4", category: "ELECTRÓNICA", price: 85.00, stock: 8, image: "https://unsplash.com" }
      ]);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({ name: '', category: 'MICROPARTES', price: '', stock: '', image: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price.toString(),
      stock: item.stock.toString(),
      image: item.image || ''
    });
    setIsModalOpen(true);
  };

  // 🚀 Enviar datos al Servidor (Guardar o Actualizar)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = editingItem 
      ? `http://localhost:5000/api/v1/inventario/editar/${editingItem.id}`
      : 'http://localhost:5000/api/v1/inventario/crear';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.toUpperCase(),
          category: formData.category,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          image: formData.image
        })
      });

      if (!response.ok) throw new Error("Fallo en persistencia");
      
      alert(editingItem ? "¡Ítem modificado con éxito en la nube!" : "Nuevo producto registrado con éxito");
      setIsModalOpen(false);
      
      // Forzar recarga inmediata de la base de datos para pintar los nuevos valores
      await fetchInventory();
    } catch (error) {
      alert("Error físico al sincronizar cambios con el backend.");
    } finally {
      setLoading(false);
    }
  };

  // Métricas logísticas en tiempo real
  const totalArticulos = inventory.reduce((acc, item) => acc + Number(item.stock), 0);
  const alertasStock = inventory.filter(item => Number(item.stock) < 10).length;
  return (
    <section id="bodega" className="w-full py-8 px-4 max-w-7xl mx-auto">
      
      {/* 📊 Bloques de Resumen Responsivos */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-5 rounded-lg shadow text-black border-l-8 border-[#72C924]">
          <p className="text-xs font-mono tracking-wider text-gray-400">// TOTAL EXISTENCIAS</p>
          <p className="text-3xl font-black font-mono mt-1">{totalArticulos} U.</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow text-black border-l-8 border-yellow-500">
          <p className="text-xs font-mono tracking-wider text-gray-400">// ALERTAS CRÍTICAS (&lt;10 U.)</p>
          <p className="text-3xl font-black font-mono mt-1 text-yellow-600">{alertasStock} Referencias</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow text-black border-l-8 border-black">
          <p className="text-xs font-mono tracking-wider text-gray-400">// CONTROL REMOTO ACCESIBLE</p>
          <p className="text-sm font-black font-mono mt-2 uppercase text-green-600">// MOVIL & PC READY</p>
        </div>
      </div>

      {/* 🧾 Contenedor de la Tabla Principal */}
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden text-black border-2 border-white">
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="font-black font-mono text-xs tracking-wider">// MONITOREO DE STOCK BODEGA</h3>
          <button 
            onClick={openCreateModal}
            className="w-full sm:w-auto px-5 py-2.5 bg-black text-[#72C924] font-mono text-xs font-black rounded hover:bg-[#72C924] hover:text-black transition-all duration-300 cursor-pointer text-center"
          >
            + AGREGAR ITEM
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-black text-[#72C924] font-mono text-[10px] tracking-widest uppercase">
                <th className="p-3">PRODUCTO / CATEGORÍA</th>
                <th className="p-3 text-center">PRECIO</th>
                <th className="p-3 text-center">STOCK</th>
                <th className="p-3 text-center">ACCIONES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 font-medium">
              {inventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3">
                    <span className="block font-black text-sm uppercase">{item.name}</span>
                    <span className="text-[10px] font-mono text-gray-400 font-bold">CAT: {item.category}</span>
                  </td>
                  <td className="p-3 text-center font-mono font-bold text-sm">${(() => {
                    const num = Number(item.price);
                    return isNaN(num) ? "0.00" : num.toFixed(2);
                  })()}</td>
                  <td className="p-3 text-center font-mono text-sm">
                    <span className={`px-2 py-0.5 rounded font-black ${Number(item.stock) < 10 ? 'bg-red-100 text-red-700' : 'text-black'}`}>
                      {item.stock} U.
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <button 
                      onClick={() => openEditModal(item)}
                      className="px-3 py-1 bg-gray-100 text-black font-mono text-[10px] font-black rounded border border-gray-300 hover:bg-black hover:text-white transition-all cursor-pointer"
                    >
                      [ EDITAR ]
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* 🎛️ MODAL RESPONSIVO MÓVIL / PC DE EDICIÓN Y CREACIÓN */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white text-black w-full max-w-md rounded-lg shadow-2xl overflow-hidden border-t-8 border-t-[#72C924] my-auto">
            <div className="p-4 bg-black text-white flex justify-between items-center">
              <h4 className="font-mono text-xs font-black text-[#72C924]">
                {editingItem ? '// MODIFICAR_PRODUCTO' : '// REGISTRAR_NUEVO_ITEM'}
              </h4>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-white hover:text-red-500 font-mono text-xs font-bold">[X]</button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-mono font-bold text-gray-500 mb-1">NOMBRE DEL COMPONENTE / HERRAMIENTA</label>
                <input 
                  type="text" required
                  className="w-full p-2.5 border-2 border-gray-200 rounded font-sans uppercase text-sm font-bold focus:border-[#72C924] outline-none text-black bg-white"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono font-bold text-gray-500 mb-1">PRECIO (USD)</label>
                  <input 
                    type="number" step="0.01" required
                    className="w-full p-2.5 border-2 border-gray-200 rounded font-mono font-bold focus:border-[#72C924] outline-none text-black bg-white"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block font-mono font-bold text-gray-500 mb-1">CANTIDAD EN BODEGA</label>
                  <input 
                    type="number" required
                    className="w-full p-2.5 border-2 border-gray-200 rounded font-mono font-bold focus:border-[#72C924] outline-none text-black bg-white"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono font-bold text-gray-500 mb-1">APARTADO / CATEGORÍA</label>
                <select 
                  className="w-full p-2.5 border-2 border-gray-200 rounded font-mono font-black focus:border-[#72C924] outline-none text-black bg-white"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="MICROPARTES">MICROPARTES (PANTALLAS, ETC.)</option>
                  <option value="ELECTRÓNICA">ELECTRÓNICA (ESTACIONES, PLANCHAS)</option>
                  <option value="ACCESORIOS">ACCESORIOS (FORROS, KITS)</option>
                </select>
              </div>

              <div>
                <label className="block font-mono font-bold text-gray-500 mb-1">IMAGEN DEL PRODUCTO (GALERÍA MÓVIL / PC)</label>
                <div className="flex flex-col gap-2">
                  <input 
                    type="file"
                    accept="image/*"
                    className="w-full p-2 border-2 border-dashed border-gray-300 rounded font-mono text-xs cursor-pointer bg-gray-50 text-black file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-black file:bg-black file:text-[#72C924] file:cursor-pointer"
                    onChange={async (e) => {
                      const files = e.target.files;
                      if (!files || files.length === 0) return;

                      // TOMAR EL ARCHIVO EXACTO MEDIANTE ÍNDICE [0]
                      const archivoFoto = files[0];

                      const fileFormData = new FormData();
                      fileFormData.append('foto', archivoFoto);

                      alert("Subiendo imagen al Storage de Spartan Systems...");

                      try {
                        const uploadResponse = await fetch('http://localhost:5000/api/v1/inventario/upload', {
                          method: 'POST',
                          body: fileFormData
                        });
                        
                        if (!uploadResponse.ok) throw new Error("Fallo subida");
                        
                        const uploadData = await uploadResponse.json();
                        
                        if (uploadData.publicUrl) {
                          setFormData({ ...formData, image: uploadData.publicUrl });
                          alert("¡Imagen almacenada y vinculada con éxito!");
                        } else {
                          alert("Error al procesar la respuesta del almacenamiento.");
                        }
                      } catch (error) {
                        alert("Error físico al conectar el cargador con el servidor backend.");
                      }
                    }}
                  />
                  {formData.image && (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="w-2 h-2 bg-[#72C924] rounded-full animate-pulse"></span>
                      <p className="text-[10px] font-mono text-green-700 truncate max-w-[250px]">Imagen vinculada con éxito</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button 
                  type="button" onClick={() => setIsModalOpen(false)}
                  className="w-1/3 py-3 border border-gray-300 font-mono font-black rounded hover:bg-gray-100 transition cursor-pointer text-center bg-white"
                >
                  CANCELAR
                </button>
                <button 
                  type="submit" disabled={loading}
                  className="w-2/3 py-3 bg-[#72C924] text-black font-mono font-black tracking-widest rounded shadow hover:bg-black hover:text-white transition cursor-pointer text-center"
                >
                  {loading ? 'PROCESANDO...' : 'GUARDAR CAMBIOS //'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
}
