import express from "express";
import {
  obtenerTodosIngredientes,
  mostrarFormularioCrear,
  crearIngrediente,
  mostrarFormularioEditar,
  actualizarIngrediente,
  eliminarIngrediente,
} from "../controllers/controladorIngredientes.js";
import { proteger, autorizar } from "../middleware/authMiddleware.js";

const router = express.Router();

// Proteger todas las rutas y requerir rol de gerente
router.use(proteger);
router.use(autorizar("gerente"));

// GET /ingredientes - Mostrar todos los ingredientes
router.get("/", obtenerTodosIngredientes);

// GET /ingredientes/create - Mostrar formulario para crear nuevo ingrediente
router.get("/crear", mostrarFormularioCrear);

// POST /ingredientes - Crear nuevo ingrediente
router.post("/", crearIngrediente);

// GET /ingredientes/:id/editar - Mostrar formulario para editar ingrediente
router.get("/:id/editar", mostrarFormularioEditar);

// PUT /ingredientes/:id - Actualizar ingrediente
router.put("/:id", actualizarIngrediente);

// DELETE /ingredientes/:id/eliminar - Eliminar ingrediente
router.delete("/:id/eliminar", eliminarIngrediente);

export default router;
