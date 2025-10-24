import mongoose from "mongoose";
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

const conectarDB = async () => {
  try {
    // usamos la variable de entorno MONGODB_URI si está definida, sino usamos un valor por defecto
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/jurassic-food";

    const connect = await mongoose.connect(mongoURI);

    console.log(`MongoDB conectado a: ${connect.connection.host}`);
  } catch (error) {
    console.error("Error de conexion a la base de datos:", error.message);
    process.exit(1); // Salir con codigo de error 1
  }
};

// Manejo de eventos de conexión a la base de datos
mongoose.connection.on("connected", () => {
  console.log("Mongoose conectado a la base de datos");
});

mongoose.connection.on("error", (err) => {
  console.error("Error de conexion a la base de datos:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose desconectado de la base de datos");
});

// Cierre de la conexion a la base de datos cuando se detiene la aplicacion
// buena práctica para evitar uso excesivo de recursos
// SIGINT es un código de señal que se envía al proceso cuando se detiene la aplicación, por ejemplo, cuando se presiona Ctrl+C en la consola.
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Conexión cerrada, aplicación detenida");
  process.exit(0);
});

export default conectarDB;
