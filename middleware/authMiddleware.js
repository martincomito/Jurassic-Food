import jwt from "jsonwebtoken";
import Usuario from "../models/UsuarioModelo.js";

export const proteger = async (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    try {
      // verificar el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.usuario = await Usuario.findById(decoded.id).select("-password");
      req.token = token;

      // hacer disponibles el token y el usuario en las vistas
      res.locals.token = token;
      res.locals.usuario = req.usuario;

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

export const identificarUsuario = async (req, res, next) => {
  let token;

  if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.usuario = await Usuario.findById(decoded.id).select("-password");
      res.locals.usuario = req.usuario;
    } catch (error) {
      console.log("Token inválido o expirado");
    }
  }
  next();
};
