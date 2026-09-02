import type { Request, Response } from "express";
import { getRegiones, getCiudades } from "../models/direccion.model.js";

export const regionesController = async (req: Request, res: Response) => {
    try {
        const regiones = await getRegiones();

        return res.status(200).json(regiones)
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
};

export const ciudadesController = async (req: Request, res: Response) => {
    try {
        const ciudades = await getCiudades();

        return res.status(200).json(ciudades);
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
};