# Sistema de Gestión de Restaurante - Jurassic Food

Sistema web para gestionar el stock de ingredientes y proveedores de un restaurante.

## Características

- **Módulo de stock de ingredientes**: Gestión de inventario con CRUD
- **Módulo de proveedores**: Administración de proveedores con CRUD
- **Interfaz**: Plantillas Pug para las vistas
- **Base de datos**: MongoDB con Mongoose
- **Validación**: Esquemas de datos con validaciones automáticas
- **Timestamps**: Registro automático de fechas de creación y modificación

## Estructura del Proyecto

```
Jurassic-Food/
├── app.js                 # Archivo principal de la aplicación
├── package.json           # Configuración y dependencias
├── .env                   # Variables de entorno
├── database/              # Configuración de base de datos
│   └── db.js              # Conexión a MongoDB
├── models/                # Modelos de datos (Mongoose)
│   ├── IngredienteModelo.js     # Esquema para ingredientes
│   └── ProveedorModelo.js       # Esquema para proveedores
├── controllers/           # Controladores
│   ├── controladorIngredientes.js
│   └── controladorProveedores.js
├── routes/                # Rutas de la aplicación
│   ├── rutasIngredientes.js
│   └── rutasProveedores.js
└── views/                 # Plantillas Pug
    ├── layout.pug         # Layout base
    ├── index.pug          # Página principal
    ├── ingredientes/      # Vistas de ingredientes
    │   ├── index.pug
    │   ├── crear.pug
    │   └── editar.pug
    └── proveedores/       # Vistas de proveedores
        ├── index.pug
        ├── crear.pug
        └── editar.pug
```

## Instalación

1. **Instalar MongoDB**:

   - Descargar e instalar MongoDB desde [mongodb.com](https://www.mongodb.com/try/download/community)

2. **Configurar variables de entorno**:
   Crear archivo `.env` en la raíz del proyecto:

   ```env
   MONGODB_URI=mongodb://localhost:27017/jurassic-food
   PORT=3000
   ```

3. **Instalar dependencias**:

   ```bash
   npm install
   ```

4. **Iniciar MongoDB** (instalación local):

   ```bash
   mongod
   ```

5. **Ejecutar la aplicación**:

   ```bash
   npm start
   # o para desarrollo con auto-recarga:
   npm run dev
   ```

6. **Acceder a la aplicación**:
   Abrir navegador en `http://localhost:3000`

## Funcionalidades

### Stock de Ingredientes

- **Ver lista**: Visualizar todos los ingredientes con nombre, cantidad, unidad y precio
- **Agregar**: Crear nuevos ingredientes con toda la información necesaria
- **Editar**: Modificar datos de ingredientes existentes
- **Eliminar**: Remover ingredientes del inventario

### Proveedores

- **Ver lista**: Listar todos los proveedores con información de contacto
- **Agregar**: Registrar nuevos proveedores
- **Editar**: Actualizar información de proveedores
- **Eliminar**: Remover proveedores del sistema

## Estructura de Datos

### Ingredientes (Esquema de Mongoose)

```javascript
{
  _id: ObjectId,           // ID único generado por MongoDB
  nombre: String,
  cantidad: Number,
  unidad: String,
  precio: Number,
  createdAt: Date,         // Fecha de creación (automático)
  updatedAt: Date          // Fecha de última modificación (automático)
}
```

### Proveedores (Esquema de Mongoose)

```javascript
{
  _id: ObjectId,           // ID único generado por MongoDB
  nombre: String,
  contacto: String,
  telefono: String,
  email: String,
  createdAt: Date,       // Fecha de creación (automático)
  updatedAt: Date        // Fecha de última modificación (automático)
}
```

### Características de los Esquemas

- **Validaciones automáticas**: Los campos requeridos se validan automáticamente
- **Timestamps**: Se registran automáticamente las fechas de creación y modificación por si son necesarios posteriormente
- **Trim**: Se eliminan espacios en blanco al inicio y final de los strings
- **Transformaciones**: El email se convierte automáticamente a minúsculas
- **Validaciones numéricas**: Los valores numéricos tienen validaciones de mínimo

## Rutas Disponibles

### Página Principal

- `GET /` - Página de inicio con enlaces a los módulos

### Ingredientes

- `GET /ingredientes` - Lista de ingredientes
- `GET /ingredientes/crear` - Formulario para crear ingrediente
- `POST /ingredientes` - Crear nuevo ingrediente
- `GET /ingredientes/:id/editar` - Formulario para editar ingrediente
- `PUT /ingredientes/:id` - Actualizar ingrediente
- `DELETE /ingredientes/:id/eliminar` - Eliminar ingrediente

### Proveedores

- `GET /proveedores` - Lista de proveedores
- `GET /proveedores/crear` - Formulario para crear proveedor
- `POST /proveedores` - Crear nuevo proveedor
- `GET /proveedores/:id/editar` - Formulario para editar proveedor
- `PUT /proveedores/:id` - Actualizar proveedor
- `DELETE /proveedores/:id/eliminar` - Eliminar proveedor

## Tecnologías Utilizadas

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **Pug**
- **dotenv**
- **method-override** - Para utilizar métodos HTTP PUT y DELETE
- **ESM** - Módulos ECMAScript para importación y async/await

## Notas

- Los datos se almacenan en MongoDB con esquemas de Mongoose
- Los esquemas incluyen validaciones automáticas y timestamps
- El sistema maneja conexiones a la base de datos con manejo de errores
- Las plantillas incluyen estilos CSS básicos
