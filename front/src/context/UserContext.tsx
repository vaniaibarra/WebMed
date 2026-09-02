import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Usuario, EstadoCivil } from '../types/user';
import { 
    obtenerUsuarios, 
    buscarPorApellido, 
    buscarPorRut, 
    crearUsuario, 
    actualizarUsuario,
    obtenerEstadoCivil 
} from '../services/usuarioServices'; 

interface UserContextType {
    usuarios: Usuario[];
    estadosCiviles: EstadoCivil[]; 
    cargando: boolean;
    error: string | null;
    cargarTodos: () => Promise<void>;
    buscarApellido: (apellido: string) => Promise<void>;
    buscarRut: (rut: string) => Promise<Usuario | null>;
    crear: (datos: Usuario) => Promise<void>;
    actualizar: (rut: string, datos: Usuario) => Promise<void>;
    limpiarErrores: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [estadosCiviles, setEstadosCiviles] = useState<EstadoCivil[]>([]); 
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const limpiarErrores = () => setError(null);

   
    const cargarEstados = async () => {
        try {
            const response = await obtenerEstadoCivil();
            setEstadosCiviles(response.data);
        } catch (error) {
            console.error("Error al cargar estados civiles", error);
        }
    };

    
    useEffect(() => {
        cargarEstados();
    }, []);

    const cargarTodos = async () => {
        setCargando(true);
        setError(null);
        try {
            const response = await obtenerUsuarios();
            setUsuarios(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al cargar los usuarios');
            setUsuarios([]);
        } finally {
            setCargando(false);
        }
    };

    const buscarApellido = async (apellido: string) => {
        setCargando(true);
        setError(null);
        try {
            const response = await buscarPorApellido(apellido);
            setUsuarios(response.data);
            if (response.data.length === 0) {
                setError('No se encontraron pacientes con ese apellido.');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al buscar pacientes');
            setUsuarios([]);
        } finally {
            setCargando(false);
        }
    };

    const buscarRut = async (rut: string): Promise<Usuario | null> => {
        setError(null);
        try {
            const response = await buscarPorRut(rut);
            return response.data;
        } catch (err: any) {
            if (err.response?.status !== 404) {
                setError(err.response?.data?.message || 'Error al buscar el RUT');
            }
            return null;
        }
    };

    const crear = async (datos: Usuario) => {
        setCargando(true);
        setError(null);
        try {
            await crearUsuario(datos);
            await cargarTodos();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al crear usuario');
            throw err;
        } finally {
            setCargando(false);
        }
    };

    const actualizar = async (rut: string, datos: Usuario) => {
        setCargando(true);
        setError(null);
        try {
            await actualizarUsuario(rut, datos);
            await cargarTodos();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al actualizar usuario');
            throw err;
        } finally {
            setCargando(false);
        }
    };

    return (
        <UserContext.Provider value={{
            usuarios,
            estadosCiviles, 
            cargando,
            error,
            cargarTodos,
            buscarApellido,
            buscarRut,
            crear,
            actualizar,
            limpiarErrores
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUsuarios = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUsuarios debe ser usado dentro de un UserProvider');
    }
    return context;
};