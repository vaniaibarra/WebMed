export interface Regiones {
    id: number,
    nombre: string
};

export interface Ciudades {
    id: number,
    regionId: number,
    nombre: string
};