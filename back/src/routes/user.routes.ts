import { Router } from "express";
import { getUsuarioPorApellido, getUsuarios, nuevoUsuario, getUsuarioPorRut, getEstadoCivil } from "../controllers/user.controller.js";

const router = Router();

router.post('/new', nuevoUsuario);
router.get('/all', getUsuarios);
router.get('/buscar', getUsuarioPorApellido);
router.get('/rut/:rut', getUsuarioPorRut);

router.get('/estado', getEstadoCivil);

export default router;


