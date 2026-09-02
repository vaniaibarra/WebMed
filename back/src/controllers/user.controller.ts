import { estadoCivil, obtenerUsuarios } from "../models/user.model.js";
import { crearUserService, buscarUserPorApellidoService, buscarUsuarioPorRutService } from "../services/user.service.js";
import type { Request, Response } from "express";

export const nuevoUsuario = async (req: Request, res: Response) => {
    try {
        const user = await crearUserService(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({
            message: error instanceof Error
                ? error.message
                : "Error al crear usuario"
        });
    }
};

export const getUsuarios = async (req: Request, res: Response) => {
    try {
        const users = await obtenerUsuarios();
        console.log(users);

        return res.status(200).json(users);

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal server error'});
    }
};

export const getUsuarioPorApellido = async (req: Request, res: Response) => {
    try {
        const { apellido } = req.query as { apellido: string };
        const result = await buscarUserPorApellidoService(apellido);

        return res.status(200).json(result);

    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }

        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getUsuarioPorRut = async (req: Request, res: Response) => {
    try {
        
        const { rut } = req.params as { rut: string };

        const result = await buscarUsuarioPorRutService(rut);

        
        if (!result) {
            return res.status(404).json({ message: 'Usuario no registrado' });
        }
        
        return res.status(200).json(result);

    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getEstadoCivil = async (req: Request, res: Response) => {
    try {
        const response = await estadoCivil();
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal server error'});
    }
}