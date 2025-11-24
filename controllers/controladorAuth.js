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
      const token = generarToken(usuario._id, usuario.rol);

      // mandar token como cookie httpOnly
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000, // 1 día
      });

      // redirigir a inicio
      res.redirect("/");
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
      const token = generarToken(usuario._id, usuario.rol);

      // mandar token como cookie httpOnly
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000, // 1 día
      });

      // redirigir a inicio
      res.redirect("/");
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

// lógica para clientes

export const mostrarFormularioRegistroCliente = (req, res) => {
  res.render("auth/registro-cliente");
};

export const mostrarFormularioLoginCliente = (req, res) => {
  res.render("auth/login-cliente");
};

export const registrarCliente = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    const usuarioExiste = await Usuario.findOne({ email });

    if (usuarioExiste) {
      return res.render("auth/registro-cliente", {
        mensaje: "El usuario ya existe",
        tipo: "error",
      });
    }

    const usuario = await Usuario.create({
      nombre,
      email,
      password,
      rol: "cliente",
    });

    if (usuario) {
      // redirigir al login de cliente con mensaje de éxito
      res.render("auth/login-cliente", {
        mensaje: "Registro exitoso. Por favor iniciá sesión",
        tipo: "exito",
      });
    } else {
      res.render("auth/registro-cliente", {
        mensaje: "Datos de usuario inválidos",
        tipo: "error",
      });
    }
  } catch (error) {
    console.error(error);
    res.render("auth/registro-cliente", {
      mensaje: "Error en el servidor",
      tipo: "error",
    });
  }
};

export const loginCliente = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (usuario && (await usuario.compararPassword(password))) {
      if (usuario.rol !== "cliente") {
        return res.render("auth/login-cliente", {
          mensaje: "Esta cuenta no es de cliente.",
          tipo: "error",
        });
      }

      // mandar token como cookie httpOnly
      const token = generarToken(usuario._id, usuario.rol);
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000, // 1 día
      });

      // redirigir directamente a mis pedidos
      res.redirect("/pedidos/mis-pedidos");
    } else {
      res.render("auth/login-cliente", {
        mensaje: "Credenciales inválidas",
        tipo: "error",
      });
    }
  } catch (error) {
    console.error(error);
    res.render("auth/login-cliente", {
      mensaje: "Error en el servidor",
      tipo: "error",
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};
