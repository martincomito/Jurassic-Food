import express from "express";
import {
  obtenerTodosProductos,
  mostrarFormularioCrear,
  crearProducto,
  mostrarFormularioEditar,
  actualizarProducto,
  eliminarProducto,
} from "../controllers/controladorProductos.js";
import { proteger, autorizar } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(proteger);
router.use(autorizar("gerente"));

router.get("/", obtenerTodosProductos);
router.get("/crear", mostrarFormularioCrear);
router.post("/", crearProducto);
router.get("/:id/editar", mostrarFormularioEditar);
router.put("/:id", actualizarProducto);
router.delete("/:id/eliminar", eliminarProducto);

export default router;
