import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-12 space-y-6">
      <h2 className="text-3xl font-semibold text-gray-700">Bienvenido al Sistema</h2>
      <p className="text-gray-500">¿Qué deseas hacer hoy?</p>
      
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <Link to="/agregar" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-3 px-6 rounded-lg shadow transition-colors font-medium">
          Añadir Nuevo Registro
        </Link>
        <Link to="/buscar" className="flex-1 bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 text-center py-3 px-6 rounded-lg shadow transition-colors font-medium">
          Buscar Pacientes
        </Link>
      </div>
    </div>
  );
};

export default Home;