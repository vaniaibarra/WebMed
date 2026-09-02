interface PacienteProps {
  paciente: {
    rut: string;
    nombres: string;
    apellidos: string;
    telefono: string;
    email: string;
  };
}

const PacienteCard = ({ paciente }: PacienteProps) => {
  return (
    <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h3 className="text-lg font-bold text-gray-800">
          {paciente.nombres} {paciente.apellidos}
        </h3>
        <div className="text-sm text-gray-500 mt-1 space-y-1">
          <p><span className="font-medium text-gray-700">RUT:</span> {paciente.rut}</p>
          <p><span className="font-medium text-gray-700">Email:</span> {paciente.email}</p>
        </div>
      </div>
      
      <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium border border-blue-100 whitespace-nowrap">
        📞 {paciente.telefono}
      </div>
    </div>
  );
};

export default PacienteCard;