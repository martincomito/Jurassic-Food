import Usuario from "../models/UsuarioModelo.js";
import jwt from "jsonwebtoken";

const generarToken = (id, rol) => {
  return jwt.sign({ id, rol }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const registrar = async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  try {
    const usuarioExiste = await Usuario.findOne({ email });

    if (usuarioExiste) {
      return res.status(400).json({ mensaje: "El usuario ya existe" });
    }

    const usuario = await Usuario.create({
      nombre,
      email,
      password,
      rol,
    });

    if (usuario) {
      res.status(201).json({
        _id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        token: generarToken(usuario._id, usuario.rol),
      });
    } else {
      res.status(400).json({ mensaje: "Datos de usuario inválidos" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (usuario && (await usuario.compararPassword(password))) {
      res.json({
        _id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        token: generarToken(usuario._id, usuario.rol),
      });
    } else {
      res.status(401).json({ mensaje: "Credenciales inválidas" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};

export const mostrarFormularioRegistro = (req, res) => {
  res.render("auth/registro");
};

export const mostrarFormularioLogin = (req, res) => {
  res.render("auth/login");
};
