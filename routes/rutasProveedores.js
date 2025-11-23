import express from "express";
import {
  obtenerTodosProveedores,
  mostrarFormularioCrear,
  crearProveedor,
  mostrarFormularioEditar,
  actualizarProveedor,
  eliminarProveedor,
} from "../controllers/controladorProveedores.js";
import { proteger, autorizar } from "../middleware/authMiddleware.js";

const router = express.Router();

// Proteger todas las rutas y requerir rol de gerente
router.use(proteger);
router.use(autorizar("gerente"));

// GET /proveedores - Mostrar todos los proveedores
router.get("/", obtenerTodosProveedores);

// GET /proveedores/crear - Mostrar formulario para crear nuevo proveedor
router.get("/crear", mostrarFormularioCrear);

// POST /proveedores - Crear nuevo proveedor
router.post("/", crearProveedor);

// GET /proveedores/:id/editar - Mostrar formulario para editar proveedor
router.get("/:id/editar", mostrarFormularioEditar);

// PUT /proveedores/:id - Actualizar proveedor
router.put("/:id", actualizarProveedor);

// POST /proveedores/:id/eliminar - Eliminar proveedor
router.delete("/:id/eliminar", eliminarProveedor);

export default router;
