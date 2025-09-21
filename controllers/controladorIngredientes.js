import IngredienteModelo from "../models/IngredienteModelo.js";

// Obtener todos los ingredientes
export const obtenerTodosIngredientes = async (req, res) => {
  try {
    const ingredientes = await IngredienteModelo.obtenerTodos();

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

    await IngredienteModelo.crear(datosIngrediente);
    res.redirect("/ingredientes");
  } catch (error) {
    console.error("Error al crear ingrediente:", error);
    res.status(500).json({
      mensaje: "Error al crear el ingrediente",
      error: error.message,
    });
  }
};

// Mostrar formulario para editar ingrediente
export const mostrarFormularioEditar = async (req, res) => {
  try {
    const ingrediente = await IngredienteModelo.obtenerPorId(req.params.id);
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

    const ingredienteActualizado = await IngredienteModelo.actualizar(
      req.params.id,
      datosIngrediente
    );
    if (!ingredienteActualizado) {
      return res.status(404).json({
        mensaje: "Ingrediente no encontrado",
        error: "El ingrediente solicitado no existe",
      });
    }

    res.redirect("/ingredientes");
  } catch (error) {
    console.error("Error al actualizar ingrediente:", error);
    res.status(500).json({
      mensaje: "Error al actualizar el ingrediente",
      error: error.message,
    });
  }
};

// Eliminar ingrediente
export const eliminarIngrediente = async (req, res) => {
  try {
    const eliminado = await IngredienteModelo.eliminar(req.params.id);
    if (!eliminado) {
      return res.status(404).json({
        mensaje: "Ingrediente no encontrado",
        error: "El ingrediente solicitado no existe",
      });
    }

    res.redirect("/ingredientes");
  } catch (error) {
    console.error("Error al eliminar ingrediente:", error);
    res.status(500).json({
      mensaje: "Error al eliminar el ingrediente",
      error: error.message,
    });
  }
};
