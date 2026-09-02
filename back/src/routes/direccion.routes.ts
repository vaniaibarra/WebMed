import { Router } from "express";
import { regionesController, ciudadesController } from "../controllers/direccion.controller.js";

const router = Router();

router.get('/regiones', regionesController);
router.get('/ciudades', ciudadesController);

export default router;