import express from "express";
import {
  listarMisPedidos,
  formularioCrearPedido,
  crearPedido,
  cancelarPedido,
  listarPedidosPendientes,
  marcarPedidoListo,
} from "../controllers/controladorPedidos.js";
import { proteger, autorizar } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(proteger);

router.get("/mis-pedidos", listarMisPedidos);
router.get("/crear", formularioCrearPedido);
router.post("/crear", crearPedido);
router.delete("/:id", cancelarPedido);

router.get(
  "/pendientes",
  autorizar("gerente", "cocinero", "personal_salon"),
  listarPedidosPendientes
);
router.put(
  "/:id/listo",
  autorizar("gerente", "cocinero", "personal_salon"),
  marcarPedidoListo
);

export default router;
