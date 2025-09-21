import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rutaDatos = path.join(__dirname, "../data/proveedores.json");

class ProveedorModelo {
  // Leer todos los proveedores
  static async obtenerTodos() {
    try {
      const datos = await fs.readFile(rutaDatos, "utf8");
      return JSON.parse(datos);
    } catch (error) {
      console.error("Error al leer proveedores:", error);
      return [];
    }
  }

  // Obtener proveedor por ID
  static async obtenerPorId(id) {
    const proveedores = await this.obtenerTodos();
    return proveedores.find((proveedor) => proveedor.id === parseInt(id));
  }

  // Crear nuevo proveedor
  static async crear(datosProveedor) {
    const proveedores = await this.obtenerTodos();
    const nuevoId =
      proveedores.length > 0
        ? Math.max(...proveedores.map((proveedor) => proveedor.id)) + 1
        : 1;

    const nuevoProveedor = {
      id: nuevoId,
      ...datosProveedor,
    };

    proveedores.push(nuevoProveedor);
    await this.guardarTodos(proveedores);
    return nuevoProveedor;
  }

  // Actualizar proveedor
  static async actualizar(id, datosProveedor) {
    const proveedores = await this.obtenerTodos();
    const indice = proveedores.findIndex(
      (proveedor) => proveedor.id === parseInt(id)
    );

    if (indice === -1) {
      return null;
    }

    proveedores[indice] = { ...proveedores[indice], ...datosProveedor };
    await this.guardarTodos(proveedores);
    return proveedores[indice];
  }

  // Eliminar proveedor
  static async eliminar(id) {
    const proveedores = await this.obtenerTodos();
    const proveedoresFiltrados = proveedores.filter(
      (proveedor) => proveedor.id !== parseInt(id)
    );

    if (proveedores.length === proveedoresFiltrados.length) {
      return false; // Proveedor no encontrado
    }

    await this.guardarTodos(proveedoresFiltrados);
    return true;
  }

  // Guardar todos los proveedores en el archivo
  static async guardarTodos(proveedores) {
    try {
      await fs.writeFile(rutaDatos, JSON.stringify(proveedores, null, 2));
      return true;
    } catch (error) {
      console.error("Error al guardar proveedores:", error);
      return false;
    }
  }
}

export default ProveedorModelo;
