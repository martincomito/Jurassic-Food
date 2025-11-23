import Usuario from "../models/UsuarioModelo.js";

// Obtener todos los usuarios
export const obtenerTodosUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select("-password");
    res.render("usuarios/index", {
      usuarios,
      token: req.token,
    });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).render("error", { mensaje: "Error al obtener usuarios" });
  }
};

// Mostrar formulario para crear nuevo usuario
export const mostrarFormularioCrear = (req, res) => {
  res.render("usuarios/crear", { token: req.token });
};

// Crear nuevo usuario
export const crearUsuario = async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  try {
    const usuarioExiste = await Usuario.findOne({ email });

    if (usuarioExiste) {
      return res.render("usuarios/crear", {
        error: "El usuario ya existe",
        usuario: req.body,
        token: req.token,
      });
    }

    await Usuario.create({
      nombre,
      email,
      password,
      rol,
    });

    res.redirect(`/usuarios?token=${req.token}`);
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.render("usuarios/crear", {
      error: "Error al crear usuario",
      usuario: req.body,
      token: req.token,
    });
  }
};

// Mostrar formulario para editar usuario
export const mostrarFormularioEditar = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select("-password");
    if (!usuario) {
      return res.redirect(`/usuarios?token=${req.token}`);
    }
    res.render("usuarios/editar", { usuario, token: req.token });
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.redirect(`/usuarios?token=${req.token}`);
  }
};

// Actualizar usuario
export const actualizarUsuario = async (req, res) => {
  const { nombre, email, rol } = req.body;
  // Nota: No actualizamos password aquí por simplicidad, se podría agregar lógica extra

  try {
    const usuario = await Usuario.findById(req.params.id);

    if (!usuario) {
      return res.redirect(`/usuarios?token=${req.token}`);
    }

    usuario.nombre = nombre || usuario.nombre;
    usuario.email = email || usuario.email;
    usuario.rol = rol || usuario.rol;

    await usuario.save();

    res.redirect(`/usuarios?token=${req.token}`);
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.render("usuarios/editar", {
      error: "Error al actualizar usuario",
      usuario: { _id: req.params.id, ...req.body },
      token: req.token,
    });
  }
};

// Eliminar usuario
export const eliminarUsuario = async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.redirect(`/usuarios?token=${req.token}`);
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.redirect(`/usuarios?token=${req.token}`);
  }
};
