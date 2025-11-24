import Pedido from "../models/PedidoModelo.js";
import Producto from "../models/ProductoModelo.js";

export const listarMisPedidos = async (req, res) => {
  try {
    // El middleware de auth debe poner el usuario en req.usuario
    const pedidos = await Pedido.find({ usuario: req.usuario.id })
      .sort({ fechaCreacion: -1 })
      .populate("productos.producto");

    res.render("pedidos/mis-pedidos", { pedidos });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .render("error", { mensaje: "Error al obtener los pedidos" });
  }
};

export const formularioCrearPedido = async (req, res) => {
  try {
    const productos = await Producto.find({ disponible: true });
    res.render("pedidos/crear", { productos });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .render("error", { mensaje: "Error al cargar el formulario" });
  }
};

export const crearPedido = async (req, res) => {
  try {
    const { productos, metodoPago, direccion } = req.body;

    let productosProcesados = [];
    let total = 0;

    let productosInput = productos;
    if (!Array.isArray(productos)) {
      return res
        .status(400)
        .json({ mensaje: "Formato de productos no válido" });
    }

    for (const item of productosInput) {
      const productoDb = await Producto.findById(item.productoId);
      if (!productoDb) {
        return res
          .status(400)
          .json({ mensaje: `Producto no encontrado: ${item.productoId}` });
      }

      const cantidad = parseInt(item.cantidad);
      const subtotal = productoDb.precio * cantidad;

      productosProcesados.push({
        producto: productoDb._id,
        nombre: productoDb.nombre,
        cantidad: cantidad,
        precio: productoDb.precio,
      });

      total += subtotal;
    }

    const nuevoPedido = new Pedido({
      usuario: req.usuario.id,
      productos: productosProcesados,
      total,
      metodoPago,
      direccion,
    });

    await nuevoPedido.save();

    res.status(201).json({
      mensaje: "Pedido creado exitosamente",
      pedidoId: nuevoPedido._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear el pedido" });
  }
};

export const cancelarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await Pedido.findById(id);

    if (!pedido) {
      return res.status(404).json({ mensaje: "Pedido no encontrado" });
    }

    if (pedido.usuario.toString() !== req.usuario.id) {
      return res
        .status(403)
        .json({ mensaje: "No tenés permiso para cancelar este pedido" });
    }

    if (pedido.estado !== "pendiente") {
      return res.status(400).json({
        mensaje: "No se puede cancelar un pedido que no está pendiente",
      });
    }

    await Pedido.findByIdAndDelete(id);

    res.json({ mensaje: "Pedido cancelado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al cancelar el pedido" });
  }
};

// listar pedidos pendientes (para empleados)
export const listarPedidosPendientes = async (req, res) => {
  try {
    const pedidos = await Pedido.find({ estado: "pendiente" })
      .sort({ fechaCreacion: -1 })
      .populate("productos.producto")
      .populate("usuario", "nombre email");

    res.render("pedidos/pendientes", { pedidos });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .render("error", { mensaje: "Error al obtener los pedidos pendientes" });
  }
};

// marcar pedido como listo
export const marcarPedidoListo = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await Pedido.findById(id);

    if (!pedido) {
      return res.status(404).json({ mensaje: "Pedido no encontrado" });
    }

    if (pedido.estado !== "pendiente") {
      return res.status(400).json({
        mensaje: "Solo se pueden marcar como listos los pedidos pendientes",
      });
    }

    pedido.estado = "listo";
    await pedido.save();

    res.json({ mensaje: "Pedido marcado como listo", pedido });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar el pedido" });
  }
};
