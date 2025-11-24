import express from "express";
import {
  registrar,
  login,
  mostrarFormularioRegistro,
  mostrarFormularioLogin,
  mostrarFormularioRegistroCliente,
  mostrarFormularioLoginCliente,
  registrarCliente,
  loginCliente,
  logout,
} from "../controllers/controladorAuth.js";

const router = express.Router();

router.get("/registro", mostrarFormularioRegistro);
router.post("/registro", registrar);
router.get("/login", mostrarFormularioLogin);
router.post("/login", login);

router.get("/registro-cliente", mostrarFormularioRegistroCliente);
router.post("/registro-cliente", registrarCliente);
router.get("/login-cliente", mostrarFormularioLoginCliente);
router.post("/login-cliente", loginCliente);

router.post("/logout", logout);

export default router;
