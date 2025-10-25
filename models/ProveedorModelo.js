import mongoose from "mongoose";

// Esquema de Mongoose para Proveedor
const proveedorSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    contacto: {
      type: String,
      required: true,
      trim: true,
    },
    telefono: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true, // Esto agrega los campos createdAt y updatedAt por si se necesita tener un historial de cambios del proveedor
  }
);

// Crear y exportar el modelo usando el esquema
const Proveedor = mongoose.model("Proveedor", proveedorSchema);

export default Proveedor;
