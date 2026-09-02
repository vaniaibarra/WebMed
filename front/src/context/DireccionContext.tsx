import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { obtenerRegiones, obtenerCiudades } from '../services/direccionService'; 
import type { Region, Ciudad } from '../types/direccion'; 

interface DireccionContextType {
    regiones: Region[];
    ciudades: Ciudad[];
    cargandoDirecciones: boolean;
    errorDirecciones: string | null;
    recargarDirecciones: () => Promise<void>;
}

const DireccionContext = createContext<DireccionContextType | undefined>(undefined);

export const DireccionProvider = ({ children }: { children: ReactNode }) => {
    const [regiones, setRegiones] = useState<Region[]>([]);
    const [ciudades, setCiudades] = useState<Ciudad[]>([]);
    const [cargandoDirecciones, setCargandoDirecciones] = useState(false);
    const [errorDirecciones, setErrorDirecciones] = useState<string | null>(null);

    const cargarDirecciones = async () => {
        setCargandoDirecciones(true);
        setErrorDirecciones(null);
        try {
            
            const [regionesRes, ciudadesRes] = await Promise.all([
                obtenerRegiones(),
                obtenerCiudades()
            ]);
            
            setRegiones(regionesRes.data);
            setCiudades(ciudadesRes.data);
        } catch (err: any) {
            setErrorDirecciones(err.response?.data?.message || 'Error al cargar los datos geográficos');
        } finally {
            setCargandoDirecciones(false);
        }
    };

    
    useEffect(() => {
        cargarDirecciones();
    }, []);

    return (
        <DireccionContext.Provider value={{
            regiones,
            ciudades,
            cargandoDirecciones,
            errorDirecciones,
            recargarDirecciones: cargarDirecciones 
        }}>
            {children}
        </DireccionContext.Provider>
    );
};


export const useDireccion = () => {
    const context = useContext(DireccionContext);
    if (context === undefined) {
        throw new Error('useDireccion debe ser usado dentro de un DireccionProvider');
    }
    return context;
};