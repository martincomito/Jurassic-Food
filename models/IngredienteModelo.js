import mongoose from "mongoose";

// Esquema de Mongoose para Ingrediente
const ingredienteSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    cantidad: {
      type: Number,
      required: true,
      min: 0,
    },
    unidad: {
      type: String,
      required: true,
      trim: true,
    },
    precio: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt por si se necesita tener un historial de cambios del ingrediente
  }
);

// Crear y exportar el modelo usando el esquema
const Ingrediente = mongoose.model("Ingrediente", ingredienteSchema);

export default Ingrediente;
