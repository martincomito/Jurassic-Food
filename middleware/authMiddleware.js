import jwt from "jsonwebtoken";
import Usuario from "../models/UsuarioModelo.js";

export const proteger = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.query.token) {
    // Permitir token en query params para vistas GET
    token = req.query.token;
  } else if (req.body.token) {
    // Permitir token en body para formularios POST/PUT/DELETE
    token = req.body.token;
  }

  if (token) {
    try {
      // Verificar el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Obtener el usuario del token (sin password)
      req.usuario = await Usuario.findById(decoded.id).select("-password");
      req.token = token; // Adjuntar token al request para usarlo en controladores

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ mensaje: "No autorizado, token fallido" });
    }
  } else {
    res.status(401).render("error-autorizacion");
  }
};

export const autorizar = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.usuario.rol)) {
      return res.status(403).render("error-autorizacion");
    }
    next();
  };
};
