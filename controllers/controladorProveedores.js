import Proveedor from "../models/ProveedorModelo.js";

// Obtener todos los proveedores
export const obtenerTodosProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedor.find();
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

    await Proveedor.create(datosProveedor);
    res.redirect("/proveedores");
  } catch (error) {
    console.error("Error al crear proveedor:", error);
    res.render("proveedores/crear", {
      proveedor: req.body,
      error: "Error al crear el proveedor. Por favor, intente de nuevo.",
    });
  }
};

// Mostrar formulario para editar proveedor
export const mostrarFormularioEditar = async (req, res) => {
  try {
    const proveedor = await Proveedor.findById(req.params.id);
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

    const proveedorActualizado = await Proveedor.findByIdAndUpdate(
      req.params.id,
      datosProveedor,
      { new: true, runValidators: true } // Esto asegura que se devuelva el documento actualizado y se validen los datos
    );
    if (!proveedorActualizado) {
      return res.render("proveedores/editar", {
        proveedor: req.body,
        error: "Proveedor no encontrado",
      });
    }

    res.redirect("/proveedores");
  } catch (error) {
    console.error("Error al actualizar proveedor:", error);
    res.render("proveedores/editar", {
      proveedor: req.body,
      error: "Error al actualizar el proveedor. Por favor, intente de nuevo.",
    });
  }
};

// Eliminar proveedor
export const eliminarProveedor = async (req, res) => {
  try {
    const eliminado = await Proveedor.findByIdAndDelete(req.params.id);
    if (!eliminado) {
      const proveedores = await Proveedor.find();
      return res.render("proveedores/index", {
        proveedores: proveedores,
        error: "Proveedor no encontrado",
      });
    }

    res.redirect("/proveedores");
  } catch (error) {
    console.error("Error al eliminar proveedor:", error);
    const proveedores = await Proveedor.find();
    res.render("proveedores/index", {
      proveedores: proveedores,
      error: "Error al eliminar el proveedor. Por favor, intente de nuevo.",
    });
  }
};
