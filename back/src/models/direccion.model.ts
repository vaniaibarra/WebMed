import { pool } from "../database/db.js";
import type { Regiones, Ciudades } from "../types/direccion.types.js";

export const getRegiones = async ():Promise<Regiones[]> => {
    const query = `SELECT * FROM regiones`;
    const result = await pool.query(query);

    return result.rows;
};

export const getCiudades = async ():Promise<Ciudades[]> => {
    const query = `SELECT * FROM ciudades`;
    const result = await pool.query(query);
    
    return result.rows;
};