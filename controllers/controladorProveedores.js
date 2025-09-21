import ProveedorModelo from "../models/ProveedorModelo.js";

// Obtener todos los proveedores
export const obtenerTodosProveedores = async (req, res) => {
  try {
    const proveedores = await ProveedorModelo.obtenerTodos();
    res.render("proveedores/index", {
      proveedores,
    });
  } catch (error) {
    console.error("Error al obtener proveedores:", error);
    res.status(500).json({
      mensaje: "Error al obtener los proveedores",
      error: error.message,
    });
  }
};

// Mostrar formulario para crear nuevo proveedor
export const mostrarFormularioCrear = (req, res) => {
  res.render("proveedores/crear", {
    proveedor: {},
  });
};

// Crear nuevo proveedor
export const crearProveedor = async (req, res) => {
  try {
    const datosProveedor = {
      nombre: req.body.nombre,
      contacto: req.body.contacto,
      telefono: req.body.telefono,
      email: req.body.email,
    };

    const nuevoProveedor = await ProveedorModelo.crear(datosProveedor);
    res.redirect("/proveedores");
  } catch (error) {
    console.error("Error al crear proveedor:", error);
    res.status(500).json({
      mensaje: "Error al crear el proveedor",
      error: error.message,
    });
  }
};

// Mostrar formulario para editar proveedor
export const mostrarFormularioEditar = async (req, res) => {
  try {
    const proveedor = await ProveedorModelo.obtenerPorId(req.params.id);
    if (!proveedor) {
      return res.status(404).json({
        mensaje: "Proveedor no encontrado",
        error: "El proveedor solicitado no existe",
      });
    }

    res.render("proveedores/editar", {
      proveedor,
    });
  } catch (error) {
    console.error("Error al obtener proveedor:", error);
    res.status(500).json({
      mensaje: "Error al obtener el proveedor",
      error: error.message,
    });
  }
};

// Actualizar proveedor
export const actualizarProveedor = async (req, res) => {
  try {
    const datosProveedor = {
      nombre: req.body.nombre,
      contacto: req.body.contacto,
      telefono: req.body.telefono,
      email: req.body.email,
    };

    const proveedorActualizado = await ProveedorModelo.actualizar(
      req.params.id,
      datosProveedor
    );
    if (!proveedorActualizado) {
      return res.status(404).json({
        mensaje: "Proveedor no encontrado",
        error: "El proveedor solicitado no existe",
      });
    }

    res.redirect("/proveedores");
  } catch (error) {
    console.error("Error al actualizar proveedor:", error);
    res.status(500).json({
      mensaje: "Error al actualizar el proveedor",
      error: error.message,
    });
  }
};

// Eliminar proveedor
export const eliminarProveedor = async (req, res) => {
  try {
    const eliminado = await ProveedorModelo.eliminar(req.params.id);
    if (!eliminado) {
      return res.status(404).json({
        mensaje: "Proveedor no encontrado",
        error: "El proveedor solicitado no existe",
      });
    }

    res.redirect("/proveedores");
  } catch (error) {
    console.error("Error al eliminar proveedor:", error);
    res.status(500).json({
      mensaje: "Error al eliminar el proveedor",
      error: error.message,
    });
  }
};
