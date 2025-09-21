import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rutaDatos = path.join(__dirname, "../data/ingredientes.json");

class IngredienteModelo {
  // Leer todos los ingredientes
  static async obtenerTodos() {
    try {
      const datos = await fs.readFile(rutaDatos, "utf8");
      return JSON.parse(datos);
    } catch (error) {
      console.error("Error al leer ingredientes:", error);
      return [];
    }
  }

  // Obtener ingrediente por ID
  static async obtenerPorId(id) {
    const ingredientes = await this.obtenerTodos();
    return ingredientes.find((ingrediente) => ingrediente.id === parseInt(id));
  }

  // Crear nuevo ingrediente
  static async crear(datosIngrediente) {
    const ingredientes = await this.obtenerTodos();
    const nuevoId =
      ingredientes.length > 0
        ? Math.max(...ingredientes.map((ingrediente) => ingrediente.id)) + 1
        : 1;

    const nuevoIngrediente = {
      id: nuevoId,
      ...datosIngrediente,
    };

    ingredientes.push(nuevoIngrediente);
    await this.guardarTodos(ingredientes);
    return nuevoIngrediente;
  }

  // Actualizar ingrediente
  static async actualizar(id, datosIngrediente) {
    const ingredientes = await this.obtenerTodos();
    const indice = ingredientes.findIndex(
      (ingrediente) => ingrediente.id === parseInt(id)
    );

    if (indice === -1) {
      return null;
    }

    ingredientes[indice] = { ...ingredientes[indice], ...datosIngrediente };
    await this.guardarTodos(ingredientes);
    return ingredientes[indice];
  }

  // Eliminar ingrediente
  static async eliminar(id) {
    const ingredientes = await this.obtenerTodos();
    const idNumerico = parseInt(id);

    const ingredientesFiltrados = ingredientes.filter(
      (ingrediente) => ingrediente.id !== idNumerico
    );

    if (ingredientes.length === ingredientesFiltrados.length) {
      console.log("Ingrediente no encontrado");
      return false; // Ingrediente no encontrado
    }

    const resultado = await this.guardarTodos(ingredientesFiltrados);
    return resultado;
  }

  // Guardar todos los ingredientes en el archivo
  static async guardarTodos(ingredientes) {
    try {
      const jsonString = JSON.stringify(ingredientes, null, 2);

      await fs.writeFile(rutaDatos, jsonString, "utf8");
      return true;
    } catch (error) {
      console.error("Error al guardar ingredientes:", error);
      return false;
    }
  }
}

export default IngredienteModelo;
