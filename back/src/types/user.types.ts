export interface User {
    rut: string,
    nombres: string,
    apellidos: string,
    direccion: string,
    regionId: number,
    nombreRegion: string,
    ciudadId: number,
    nombreCiudad: string,
    telefono: string,
    email: string,
    fechaNacimiento: Date,
    estadoCivilId: number,
    nombreEstadoCivil: string,
    comentarios: string
};


export interface CrearUserDTO {
    rut: string,
    nombres: string,
    apellidos: string,
    direccion: string,
    regionId: number,
    ciudadId: number,
    telefono: string,
    email: string,
    fechaNacimiento: string,
    estadoCivilId: number,
    comentarios: string
};

export interface EstadoCivil {
    id: number,
    estado: string
};