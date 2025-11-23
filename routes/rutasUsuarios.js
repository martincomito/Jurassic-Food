import express from "express";
import {
  obtenerTodosUsuarios,
  mostrarFormularioCrear,
  crearUsuario,
  mostrarFormularioEditar,
  actualizarUsuario,
  eliminarUsuario,
} from "../controllers/controladorUsuarios.js";
import { proteger, autorizar } from "../middleware/authMiddleware.js";

const router = express.Router();

// Todas las rutas requieren ser gerente
router.use(proteger);
router.use(autorizar("gerente"));

router.get("/", obtenerTodosUsuarios);
router.get("/crear", mostrarFormularioCrear);
router.post("/", crearUsuario);
router.get("/:id/editar", mostrarFormularioEditar);
router.put("/:id", actualizarUsuario);
router.delete("/:id/eliminar", eliminarUsuario);

export default router;
