# Sistema de Gestión de Restaurante - Jurassic Food

Sistema web para gestionar el stock de ingredientes y proveedores de un restaurante.

## Características

- **Módulo de stock de ingredientes**: Gestión de inventario con CRUD
- **Módulo de proveedores**: Administración de proveedores con CRUD
- **Interfaz**: Plantillas Pug para las vistas
- **Base de datos**: Almacenamiento en archivos JSON

## Estructura del Proyecto

```
grupo10-restaurante/
├── app.js                 # Archivo principal de la aplicación
├── package.json           # Configuración y dependencias
├── .env                   # Variables de entorno
├── data/                  # Base de datos JSON
│   ├── ingredientes.json  # Datos de ingredientes
│   └── proveedores.json   # Datos de proveedores
├── models/                # Modelos de datos
│   ├── IngredienteModelo.js     # Modelo para ingredientes
│   └── ProveedorModelo.js       # Modelo para proveedores
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

1. **Instalar dependencias**:

   ```bash
   npm install
   ```

2. **Acceder a la aplicación**:
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

### Ingredientes

```json
{
  "id": 1,
  "nombre": "Tomate",
  "cantidad": 50,
  "unidad": "kg",
  "precio": 2.5
}
```

### Proveedores

```json
{
  "id": 1,
  "nombre": "Distribuidora Comida Fresca",
  "contacto": "Juan Pérez",
  "telefono": "+54 11 1234-5678",
  "email": "juan@distribuidora.com"
}
```

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
- **Pug**
- **dotenv**
- **method-override** - Para utilizar métodos HTTP PUT y DELETE
- **ESM** - Módulos ECMAScript para importación y async/await

## Notas

- Los datos se almacenan en archivos JSON en la carpeta `data/`
- El sistema incluye validación básica en los formularios
- Las plantillas incluyen estilos CSS básicos
