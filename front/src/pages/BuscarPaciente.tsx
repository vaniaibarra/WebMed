// src/pages/BuscarPaciente.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsuarios } from '../context/UserContext';
import PacienteCard from '../components/PacienteCard';

const BuscarPaciente = () => {
  const navigate = useNavigate();
  
  
  const [apellido, setApellido] = useState('');

  
  const { 
    usuarios, 
    cargando, 
    error, 
    cargarTodos, 
    buscarApellido,
    limpiarErrores 
  } = useUsuarios();

  
  useEffect(() => {
    cargarTodos();
    
    
    return () => limpiarErrores();
  }, []);

  
  const handleBuscar = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (apellido.trim() === '') {
      cargarTodos();
    } else {
      buscarApellido(apellido);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">Directorio de Pacientes</h2>
        <button 
          onClick={() => navigate('/')} 
          className="text-gray-500 hover:text-blue-600 transition-colors text-sm font-medium"
        >
          &larr; Volver al inicio
        </button>
      </div>
      
      
      <form onSubmit={handleBuscar} className="flex gap-3 mb-6">
        <input 
          type="text" 
          value={apellido}
          onChange={(e) => {
            setApellido(e.target.value);
            if (error) limpiarErrores(); 
          }}
          placeholder="Buscar por apellido..."
          className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        />
        <button 
          type="submit"
          disabled={cargando}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm disabled:bg-blue-400"
        >
          {cargando ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      
      {error && <p className="text-red-600 bg-red-50 p-3 rounded-lg mb-4 text-center">{error}</p>}
      {cargando && <p className="text-blue-600 text-center py-8 font-medium">Cargando pacientes...</p>}

      
      {!cargando && (
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {usuarios.map((paciente) => (
            <PacienteCard key={paciente.rut} paciente={paciente} />
          ))}
          
          {usuarios.length === 0 && !error && (
            <p className="text-center text-gray-500 py-8">No hay registros para mostrar.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BuscarPaciente;