import Producto from "../models/ProductoModelo.js";

export const obtenerTodosProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.render("productos/index", { productos });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .render("error", { mensaje: "Error al obtener los productos" });
  }
};

export const mostrarFormularioCrear = (req, res) => {
  res.render("productos/crear");
};

export const crearProducto = async (req, res) => {
  const { nombre, precio, descripcion, disponible } = req.body;

  try {
    await Producto.create({
      nombre,
      precio,
      descripcion,
      disponible: disponible === "on",
    });
    res.redirect("/productos");
  } catch (error) {
    console.error(error);
    res.render("productos/crear", {
      error: "Error al crear el producto",
      producto: req.body,
    });
  }
};

export const mostrarFormularioEditar = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Producto.findById(id);
    if (!producto) {
      return res.redirect("/productos");
    }
    res.render("productos/editar", { producto });
  } catch (error) {
    console.error(error);
    res.redirect("/productos");
  }
};

export const actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, descripcion, disponible } = req.body;

  try {
    await Producto.findByIdAndUpdate(id, {
      nombre,
      precio,
      descripcion,
      disponible: disponible === "on",
    });
    res.redirect("/productos");
  } catch (error) {
    console.error(error);
    const producto = { _id: id, ...req.body };
    res.render("productos/editar", {
      error: "Error al actualizar el producto",
      producto,
    });
  }
};

export const eliminarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    await Producto.findByIdAndDelete(id);
    res.redirect("/productos");
  } catch (error) {
    console.error(error);
    res.redirect("/productos");
  }
};
