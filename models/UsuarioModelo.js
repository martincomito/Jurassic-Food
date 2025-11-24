import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    enum: ["gerente", "cocinero", "personal_salon", "cliente"],
    default: "personal_salon",
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
});

// hashear la contraseña antes de guardar
usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    // agregamos un valor aleatorio en la contraseña antes de hashearla para que sea más segura
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// método para comparar contraseñas
usuarioSchema.methods.compararPassword = async function (passwordIngresada) {
  return await bcrypt.compare(passwordIngresada, this.password);
};

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;
