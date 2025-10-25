import Ingrediente from "../models/IngredienteModelo.js";

// Obtener todos los ingredientes
export const obtenerTodosIngredientes = async (req, res) => {
  try {
    const ingredientes = await Ingrediente.find();

    res.render("ingredientes/index", {
      ingredientes: ingredientes,
    });
  } catch (error) {
    console.error("Error al obtener ingredientes:", error);
    res.status(500).json({
      mensaje: "Error al obtener los ingredientes",
      error: error.message,
    });
  }
};

// Mostrar formulario para crear nuevo ingrediente
export const mostrarFormularioCrear = (req, res) => {
  res.render("ingredientes/crear", {
    ingrediente: {},
  });
};

// Crear nuevo ingrediente
export const crearIngrediente = async (req, res) => {
  try {
    const datosIngrediente = {
      nombre: req.body.nombre,
      cantidad: parseInt(req.body.cantidad),
      unidad: req.body.unidad,
      precio: parseFloat(req.body.precio),
    };

    await Ingrediente.create(datosIngrediente);
    res.redirect("/ingredientes");
  } catch (error) {
    console.error("Error al crear ingrediente:", error);
    res.render("ingredientes/crear", {
      ingrediente: req.body,
      error: "Error al crear el ingrediente. Por favor, intente de nuevo.",
    });
  }
};

// Mostrar formulario para editar ingrediente
export const mostrarFormularioEditar = async (req, res) => {
  try {
    const ingrediente = await Ingrediente.findById(req.params.id);
    if (!ingrediente) {
      return res.status(404).json({
        mensaje: "Ingrediente no encontrado",
        error: "El ingrediente solicitado no existe",
      });
    }

    res.render("ingredientes/editar", {
      ingrediente: ingrediente,
    });
  } catch (error) {
    console.error("Error al obtener ingrediente:", error);
    res.status(500).json({
      mensaje: "Error al obtener el ingrediente",
      error: error.message,
    });
  }
};

// Actualizar ingrediente
export const actualizarIngrediente = async (req, res) => {
  try {
    const datosIngrediente = {
      nombre: req.body.nombre,
      cantidad: parseInt(req.body.cantidad),
      unidad: req.body.unidad,
      precio: parseFloat(req.body.precio),
    };

    const ingredienteActualizado = await Ingrediente.findByIdAndUpdate(
      req.params.id,
      datosIngrediente,
      { new: true, runValidators: true } // Esto asegura que se devuelva el documento actualizado y se validen los datos
    );
    if (!ingredienteActualizado) {
      return res.render("ingredientes/editar", {
        ingrediente: req.body,
        error: "Ingrediente no encontrado",
      });
    }

    res.redirect("/ingredientes");
  } catch (error) {
    console.error("Error al actualizar ingrediente:", error);
    res.render("ingredientes/editar", {
      ingrediente: req.body,
      error: "Error al actualizar el ingrediente. Por favor, intente de nuevo.",
    });
  }
};

// Eliminar ingrediente
export const eliminarIngrediente = async (req, res) => {
  try {
    const eliminado = await Ingrediente.findByIdAndDelete(req.params.id);
    if (!eliminado) {
      const ingredientes = await Ingrediente.find();
      return res.render("ingredientes/index", {
        ingredientes: ingredientes,
        error: "Ingrediente no encontrado",
      });
    }

    res.redirect("/ingredientes");
  } catch (error) {
    console.error("Error al eliminar ingrediente:", error);
    const ingredientes = await Ingrediente.find();
    res.render("ingredientes/index", {
      ingredientes: ingredientes,
      error: "Error al eliminar el ingrediente. Por favor, intente de nuevo.",
    });
  }
};
