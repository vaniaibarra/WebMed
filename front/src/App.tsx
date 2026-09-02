import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AgregarPaciente from './pages/AgregarPaciente';
import BuscarPaciente from './pages/BuscarPaciente';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen font-sans text-gray-800">
        <header className="bg-blue-600 text-white p-4 shadow-md">
          <h1 className="text-2xl font-bold text-center">WebMed - Fichas Médicas</h1>
        </header>
        <main className="p-6 max-w-4xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/agregar" element={<AgregarPaciente />} />
            <Route path="/buscar" element={<BuscarPaciente />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;