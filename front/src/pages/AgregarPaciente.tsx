// src/pages/AgregarPaciente.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsuarios } from '../context/UserContext';
import { useDireccion } from '../context/DireccionContext'; 
import type { Ciudad } from '../types/direccion';

const AgregarPaciente = () => {
  const navigate = useNavigate();
  
  
  const { buscarRut, crear, actualizar, cargando, estadosCiviles } = useUsuarios();
  const { regiones, ciudades, cargandoDirecciones } = useDireccion(); 
  
  const estadoInicial = { 
    rut: '', 
    nombres: '', 
    apellidos: '', 
    direccion: '',
    telefono: '', 
    email: '', 
    fechaNacimiento: '', 
    regionId: 0, 
    ciudadId: 0, 
    estadoCivilId: 0, 
    comentarios: ''
  };
  
  const [formData, setFormData] = useState(estadoInicial);
  const [esEdicion, setEsEdicion] = useState(false);
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
  const [ciudadesFiltradas, setCiudadesFiltradas] = useState<Ciudad[]>([]);

  
  useEffect(() => {
    if (formData.regionId) {
      const filtradas = ciudades.filter(c => c.region_id === Number(formData.regionId));
      setCiudadesFiltradas(filtradas);
    } else {
      setCiudadesFiltradas([]);
    }
  }, [formData.regionId, ciudades]);

  const handleRutBlur = async () => {
    if (!formData.rut) return;
    
    
    const paciente: any = await buscarRut(formData.rut);
    
    if (paciente) {
      const confirmar = window.confirm('Este paciente ya existe. ¿Deseas cargar sus datos para sobrescribirlos?');
      if (confirmar) {
        
        
        const fechaDB = paciente.fecha_nacimiento || paciente.fechaNacimiento;
        const fechaFormateada = fechaDB ? String(fechaDB).split('T')[0] : '';
        
        
        setFormData({ 
          rut: paciente.rut || '',
          nombres: paciente.nombres || '',
          apellidos: paciente.apellidos || '',
          direccion: paciente.direccion || '',
          telefono: paciente.telefono || '',
          email: paciente.email || '',
          comentarios: paciente.comentarios || '',
          
          fechaNacimiento: fechaFormateada,
          regionId: Number(paciente.region_id || paciente.regionId || 0),
          ciudadId: Number(paciente.ciudad_id || paciente.ciudadId || 0),
          estadoCivilId: Number(paciente.estado_civil_id || paciente.estadoCivilId || 0)
        });
        
        setEsEdicion(true);
        setMensaje({ texto: 'Modo edición activado', tipo: 'exito' });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje({ texto: '', tipo: '' });

    try {
      if (esEdicion) {
        await actualizar(formData.rut, formData as any);
        setMensaje({ texto: 'Registro sobrescrito con éxito', tipo: 'exito' });
      } else {
        await crear(formData as any);
        setMensaje({ texto: 'Registro guardado con éxito', tipo: 'exito' });
      }
    } catch (error: any) {
      setMensaje({ texto: error.response?.data?.message || 'Error al guardar los datos', tipo: 'error' });
    }
  };

  const handleLimpiar = () => {
    setFormData(estadoInicial);
    setEsEdicion(false);
    setMensaje({ texto: '', tipo: '' });
  };

  
  const bloqueado = cargando || cargandoDirecciones;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 border-b pb-2">
        {esEdicion ? 'Sobrescribir Ficha Médica' : 'Nueva Ficha Médica'}
      </h2>

      {mensaje.texto && (
        <div className={`p-3 mb-4 rounded ${mensaje.tipo === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {mensaje.texto}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">RUT</label>
            <input 
              type="text" 
              value={formData.rut}
              onChange={(e) => setFormData({...formData, rut: e.target.value})}
              onBlur={handleRutBlur}
              disabled={esEdicion || bloqueado}
              placeholder="Ej: 12345678-9"
              className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100" 
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Nacimiento</label>
            <input 
              type="date" 
              value={formData.fechaNacimiento}
              onChange={(e) => setFormData({...formData, fechaNacimiento: e.target.value})}
              disabled={bloqueado}
              className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100" 
              required
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombres</label>
            <input 
              type="text" 
              value={formData.nombres}
              onChange={(e) => setFormData({...formData, nombres: e.target.value})}
              disabled={bloqueado}
              className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100" 
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
            <input 
              type="text" 
              value={formData.apellidos}
              onChange={(e) => setFormData({...formData, apellidos: e.target.value})}
              disabled={bloqueado}
              className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100" 
              required
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              disabled={bloqueado}
              placeholder="correo@ejemplo.com"
              className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100" 
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
            <input 
              type="text" 
              maxLength={9} 
              value={formData.telefono}
              onChange={(e) => setFormData({...formData, telefono: e.target.value})}
              disabled={bloqueado}
              placeholder="912345678"
              className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100" 
              required
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dirección (Calle y Número)</label>
            <input 
              type="text" 
              value={formData.direccion}
              onChange={(e) => setFormData({...formData, direccion: e.target.value})}
              disabled={bloqueado}
              className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100" 
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado Civil</label>
            <select
              value={formData.estadoCivilId}
              onChange={(e) => setFormData({...formData, estadoCivilId: Number(e.target.value)})}
              disabled={bloqueado}
              className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white disabled:bg-gray-100"
              required
            >
              <option value={0} disabled>Seleccione estado civil</option>
              {estadosCiviles.map((estado) => (
                <option key={estado.id} value={estado.id}>{estado.estado}</option>
              ))}
            </select>
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Región</label>
            <select
              value={formData.regionId}
              onChange={(e) => setFormData({...formData, regionId: Number(e.target.value), ciudadId: 0})}
              disabled={bloqueado}
              className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white disabled:bg-gray-100"
              required
            >
              <option value={0} disabled>Seleccione una región</option>
              {regiones.map((region) => (
                <option key={region.id} value={region.id}>{region.nombre}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
            <select
              value={formData.ciudadId}
              onChange={(e) => setFormData({...formData, ciudadId: Number(e.target.value)})}
              disabled={!formData.regionId || bloqueado}
              className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white disabled:bg-gray-100"
              required
            >
              <option value={0} disabled>Seleccione una ciudad</option>
              {ciudadesFiltradas.map((ciudad) => (
                <option key={ciudad.id} value={ciudad.id}>{ciudad.nombre}</option>
              ))}
            </select>
          </div>

          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Comentarios (Opcional)</label>
            <textarea 
              value={formData.comentarios}
              onChange={(e) => setFormData({...formData, comentarios: e.target.value})}
              disabled={bloqueado}
              rows={3}
              placeholder="Alergias, observaciones médicas, etc."
              className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 resize-none"
            />
          </div>

        </div>

        
        <div className="flex justify-end gap-3 pt-6 border-t mt-6">
          <button 
            type="button" 
            onClick={handleLimpiar} 
            disabled={bloqueado}
            className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50"
          >
            Limpiar
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/')} 
            disabled={bloqueado}
            className="px-4 py-2 text-red-600 bg-red-50 rounded-md hover:bg-red-100 border border-red-200 transition-colors disabled:opacity-50"
          >
            Cerrar
          </button>
          <button 
            type="submit" 
            disabled={bloqueado}
            className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 disabled:bg-blue-400"
          >
            {cargando ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgregarPaciente;