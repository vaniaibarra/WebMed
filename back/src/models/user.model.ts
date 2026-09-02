import { pool } from "../database/db.js";
import type { User, CrearUserDTO, EstadoCivil } from "../types/user.types.js";

export const crearUsuario = async (userData: CrearUserDTO):Promise<User> => {
    console.log(userData.regionId);
    const query = `
    INSERT INTO users (rut, nombres, apellidos, direccion, region_id, ciudad_id, telefono, email, fecha_nacimiento, estado_civil_id, comentarios)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *
    `

    const values = [
        userData.rut, 
        userData.nombres, 
        userData.apellidos, 
        userData.direccion, 
        userData.regionId, 
        userData.ciudadId, 
        userData.telefono, 
        userData.email, 
        userData.fechaNacimiento, 
        userData.estadoCivilId, 
        userData.comentarios
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
};

export const obtenerUsuarios = async ():Promise<User[]> => {
    const query = `SELECT * FROM users`;
    const result = await pool.query(query);
    

    return result.rows;
};

export const buscarUsuarioPorApellido = async (apellidos: string):Promise<User[]> => {
    const query = `SELECT * FROM users WHERE apellidos ILIKE $1`;
    const values = [`%${apellidos}%`];

    const result = await pool.query(query, values);

    return result.rows;
};

export const buscarUsuarioPorRutModel = async (rut: string): Promise<User | null> => {
    const query = `SELECT * FROM users WHERE rut = $1`;
    const values = [rut];

    const result = await pool.query(query, values);

    return result.rows[0] || null;
};

export const estadoCivil = async (): Promise<EstadoCivil[]> => {
    const query = `SELECT * FROM estado_civil`;
    const result = await pool.query(query);

    return result.rows;
};