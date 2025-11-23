import express from "express";
import {
  registrar,
  login,
  mostrarFormularioRegistro,
  mostrarFormularioLogin,
} from "../controllers/controladorAuth.js";
import { proteger, autorizar } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/registro",
  proteger,
  autorizar("gerente"),
  mostrarFormularioRegistro
);
router.post("/registro", proteger, autorizar("gerente"), registrar);

router.get("/login", mostrarFormularioLogin);
router.post("/login", login);

router.get("/logout", (req, res) => {
  res.redirect("/auth/login");
});

export default router;
