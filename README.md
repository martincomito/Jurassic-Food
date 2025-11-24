# Jurassic Food

Sistema web para Jurassic Food, un local gastronómico ficticio para la materia Desarrollo de Sistemas web back-end. El sistema gestiona el stock de ingredientes, productos, proveedores, pedidos y usuarios (tanto empleados como clientes), con sistema de autenticación basada en roles. Autentica con JWT, manteniendo la sesión en cookies. Se renderizan las diferentes vistas con Pug, haciendo que a través de los middlewares se vean diferentes niveles de información y se puedan hacer diferentes acciones según el tipo de usuario.

## Características Principales

- **Sistema de Autenticación**: Control de acceso basado en roles con JWT
- **Gestión de Usuarios**: CRUD completo de usuarios (solo para gerentes)
- **Módulo de Productos**: Administración del menú del restaurante
- **Módulo de Ingredientes**: Gestión de inventario con CRUD
- **Módulo de Proveedores**: Administración de proveedores con CRUD
- **Módulo de Pedidos**: Sistema de gestión de pedidos
- **Control de Acceso**: Autorización basada en roles (gerente, cocinero, personal de salón, cliente)
- **Interfaz Moderna**: Plantillas Pug con estilos CSS personalizados
- **Base de Datos**: MongoDB con Mongoose
- **Seguridad**: Contraseñas hasheadas con bcrypt, tokens JWT en cookies HTTP-only

## Estructura del proyecto:

```
Jurassic-Food/
├── app.js
├── package.json
├── .env
├── database/
│   └── db.js
├── models/
│   ├── UsuarioModelo.js
│   ├── ProductoModelo.js
│   ├── IngredienteModelo.js
│   ├── ProveedorModelo.js
│   └── PedidoModelo.js
├── middleware/
│   └── authMiddleware.js
├── controllers/
│   ├── controladorAuth.js
│   ├── controladorUsuarios.js
│   ├── controladorProductos.js
│   ├── controladorIngredientes.js
│   ├── controladorProveedores.js
│   └── controladorPedidos.js
├── routes/
│   ├── rutasAuth.js
│   ├── rutasUsuarios.js
│   ├── rutasProductos.js
│   ├── rutasIngredientes.js
│   ├── rutasProveedores.js
│   └── rutasPedidos.js
├── public/
│   └── css/
│       └── styles.css
└── views/
    ├── layout.pug
    ├── index.pug
    ├── error-autorizacion.pug
    ├── auth/
    │   ├── login.pug
    │   ├── registro.pug
    │   └── perfil.pug
    ├── usuarios/
    │   ├── index.pug
    │   ├── crear.pug
    │   └── editar.pug
    ├── productos/
    │   ├── index.pug
    │   ├── crear.pug
    │   └── editar.pug
    ├── ingredientes/
    │   ├── index.pug
    │   ├── crear.pug
    │   └── editar.pug
    ├── proveedores/
    │   ├── index.pug
    │   ├── crear.pug
    │   └── editar.pug
    └── pedidos/
        ├── index.pug
        ├── crear.pug
        └── editar.pug
```

## Funcionalidades por módulo:

### Autenticación y Usuarios

- **Registro**: Crear nuevas cuentas de usuario
- **Login**: Inicio de sesión con email y contraseña
- **Logout**: Cierre de sesión seguro
- **Gestión de Usuarios** (solo gerentes):
  - Ver lista de todos los usuarios
  - Crear nuevos usuarios con roles específicos
  - Editar información de usuarios existentes
  - Eliminar usuarios del sistema

### Productos

- **Ver lista**: Visualizar todos los productos del menú
- **Agregar**: Crear nuevos productos con nombre, descripción, precio, etc.
- **Editar**: Modificar datos de productos existentes
- **Eliminar**: Remover productos del catálogo

### Stock de Ingredientes

- **Ver lista**: Visualizar todos los ingredientes con nombre, cantidad, unidad y precio
- **Agregar**: Crear nuevos ingredientes (requiere rol de gerente)
- **Editar**: Modificar datos de ingredientes existentes (requiere rol de gerente)
- **Eliminar**: Remover ingredientes del inventario (requiere rol de gerente)

### Proveedores

- **Ver lista**: Listar todos los proveedores con información de contacto
- **Agregar**: Registrar nuevos proveedores (requiere rol de gerente)
- **Editar**: Actualizar información de proveedores (requiere rol de gerente)
- **Eliminar**: Remover proveedores del sistema (requiere rol de gerente)

### Pedidos

- **Ver lista**: Visualizar todos los pedidos
- **Crear**: Registrar nuevos pedidos
- **Editar**: Actualizar estado y detalles de pedidos
- **Eliminar**: Cancelar pedidos

## Estructura de Datos

### Usuarios (Esquema de Mongoose)

```javascript
{
  _id: ObjectId,
  nombre: String,
  email: String,
  password: String,
  rol: String,
  fechaCreacion: Date
}
```

### Productos (Esquema de Mongoose)

```javascript
{
  _id: ObjectId,
  nombre: String,
  descripcion: String,
  precio: Number,
  categoria: String,
  disponible: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Ingredientes (Esquema de Mongoose)

```javascript
{
  _id: ObjectId,
  nombre: String,
  cantidad: Number,
  unidad: String,
  precio: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Proveedores (Esquema de Mongoose)

```javascript
{
  _id: ObjectId,
  nombre: String,
  contacto: String,
  telefono: String,
  email: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Pedidos (Esquema de Mongoose)

```javascript
{
  _id: ObjectId,
  cliente: String,
  productos: Array,
  total: Number,
  estado: String,
  fecha: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Rutas Disponibles

### Autenticación

- `GET /auth/login` - Formulario de inicio de sesión
- `POST /auth/login` - Procesar inicio de sesión
- `GET /auth/registro` - Formulario de registro
- `POST /auth/registro` - Crear nueva cuenta
- `GET /auth/logout` - Cerrar sesión
- `GET /auth/perfil` - Ver perfil del usuario (requiere autenticación)

### Usuarios (solo gerentes)

- `GET /usuarios` - Lista de usuarios
- `GET /usuarios/crear` - Formulario para crear usuario
- `POST /usuarios` - Crear nuevo usuario
- `GET /usuarios/:id/editar` - Formulario para editar usuario
- `PUT /usuarios/:id` - Actualizar usuario
- `DELETE /usuarios/:id/eliminar` - Eliminar usuario

### Productos

- `GET /productos` - Lista de productos
- `GET /productos/crear` - Formulario para crear producto
- `POST /productos` - Crear nuevo producto
- `GET /productos/:id/editar` - Formulario para editar producto
- `PUT /productos/:id` - Actualizar producto
- `DELETE /productos/:id/eliminar` - Eliminar producto

### Ingredientes (gerentes solo para modificaciones)

- `GET /ingredientes` - Lista de ingredientes
- `GET /ingredientes/crear` - Formulario para crear ingrediente (solo gerentes)
- `POST /ingredientes` - Crear nuevo ingrediente (solo gerentes)
- `GET /ingredientes/:id/editar` - Formulario para editar ingrediente (solo gerentes)
- `PUT /ingredientes/:id` - Actualizar ingrediente (solo gerentes)
- `DELETE /ingredientes/:id/eliminar` - Eliminar ingrediente (solo gerentes)

### Proveedores

- `GET /proveedores` - Lista de proveedores
- `GET /proveedores/crear` - Formulario para crear proveedor (solo gerentes)
- `POST /proveedores` - Crear nuevo proveedor (solo gerentes)
- `GET /proveedores/:id/editar` - Formulario para editar proveedor (solo gerentes)
- `PUT /proveedores/:id` - Actualizar proveedor (solo gerentes)
- `DELETE /proveedores/:id/eliminar` - Eliminar proveedor (solo gerentes)

### Pedidos

- `GET /pedidos` - Lista de pedidos
- `GET /pedidos/crear` - Formulario para crear pedido
- `POST /pedidos` - Crear nuevo pedido
- `GET /pedidos/:id/editar` - Formulario para editar pedido
- `PUT /pedidos/:id` - Actualizar pedido
- `DELETE /pedidos/:id/eliminar` - Eliminar pedido

### Página Principal

- `GET /` - Página de inicio con navegación adaptada al rol del usuario

## Tecnologías Utilizadas

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **Pug**
- **bcryptjs**
- **jsonwebtoken**
- **cookie-parser**
- **dotenv**
- **method-override**
- **ESM**

## Seguridad

- **Contraseñas hasheadas**: Uso de bcrypt con salt para hashear contraseñas
- **JWT tokens**: Autenticación basada en tokens JSON Web Tokens
- **HTTP-only cookies**: Los tokens se almacenan en cookies seguras no accesibles desde JavaScript
- **Validación de roles**: Middleware de autorización para proteger rutas sensibles
- **Validación de datos**: Esquemas de Mongoose con validaciones automáticas

## Notas Importantes

- Los datos se almacenan en MongoDB con esquemas de Mongoose
- Los esquemas incluyen validaciones automáticas y timestamps
- El sistema implementa control de acceso granular basado en roles
- Las contraseñas se hashean automáticamente antes de guardarlas en la base de datos
- El sistema usa cookies HTTP-only para almacenar tokens JWT de forma segura
- La navegación y las opciones disponibles se adaptan dinámicamente según el rol del usuario
- Solo los gerentes pueden gestionar usuarios, ingredientes y proveedores
- Las plantillas incluyen estilos CSS modernos y responsivos
