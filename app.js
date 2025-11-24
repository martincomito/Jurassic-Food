import path from "path";
import { fileURLToPath } from "url";
import methodOverride from "method-override";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import conectarDB from "./database/db.js";

// Importar rutas
import rutasIngredientes from "./routes/rutasIngredientes.js";
import rutasProveedores from "./routes/rutasProveedores.js";
import rutasAuth from "./routes/rutasAuth.js";
import rutasUsuarios from "./routes/rutasUsuarios.js";
import rutasPedidos from "./routes/rutasPedidos.js";
import rutasProductos from "./routes/rutasProductos.js";

// Cargar variables de entorno
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PUERTO = process.env.PORT || 3000;

// Configurar motor de plantillas Pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method")); // Para usar métodos PUT y DELETE
app.use(express.static("public"));

import { identificarUsuario } from "./middleware/authMiddleware.js";

// Rutas
app.get("/", identificarUsuario, (req, res) => {
  res.render("index");
});

app.use("/ingredientes", rutasIngredientes);
app.use("/proveedores", rutasProveedores);
app.use("/auth", rutasAuth);
app.use("/usuarios", rutasUsuarios);
app.use("/pedidos", rutasPedidos);
app.use("/productos", rutasProductos);

// Función para conectar a la base de datos e iniciar servidor
const iniciarServidor = async () => {
  try {
    // Conectar a MongoDB
    await conectarDB();

    // Iniciar servidor
    app.listen(PUERTO, () => {
      console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1);
  }
};

// Iniciar la aplicación
iniciarServidor();
