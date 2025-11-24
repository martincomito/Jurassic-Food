import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  productos: [
    {
      producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
        required: true,
      },
      nombre: String,
      cantidad: {
        type: Number,
        required: true,
        min: 1,
      },
      precio: {
        type: Number,
        required: true,
        min: 0,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
    min: 0,
  },
  metodoPago: {
    type: String,
    enum: ["efectivo", "transferencia", "debito", "credito"],
    required: true,
  },
  direccion: {
    type: String,
    required: true,
    trim: true,
  },
  estado: {
    type: String,
    enum: ["pendiente", "en_preparacion", "listo", "entregado", "cancelado"],
    default: "pendiente",
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
});

const Pedido = mongoose.model("Pedido", pedidoSchema);

export default Pedido;
