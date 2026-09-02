export interface Usuario {
    rut: string;
    nombres: string;
    apellidos: string;
    direccion: string;
    regionId: number;
    ciudadId: number;
    telefono: string;
    email: string;
    fechaNacimiento: string;
    estadoCivilId: number;
    comentarios?: string;
};

export interface EstadoCivil {
    id: number,
    estado: string
};