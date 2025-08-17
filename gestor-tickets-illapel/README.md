# Gestor de Tickets - Municipalidad de Illapel

Sistema de gestión de tickets de soporte informático para la Municipalidad de Illapel.

## Características

- **Interfaz de Usuario**: Los funcionarios pueden crear tickets de soporte
- **Panel de Administrador**: Los informáticos pueden gestionar y resolver tickets
- **Sistema de Chat**: Comunicación en tiempo real entre usuarios y administradores
- **Almacenamiento Local**: Los datos se guardan en el navegador (localStorage)
- **Diseño Responsivo**: Funciona en dispositivos móviles y de escritorio

## Usuarios Predefinidos

### Usuarios Funcionarios:
- **Email**: usuario1@illapel.cl
- **Contraseña**: 123456
- **Nombre**: Juan Pérez

- **Email**: usuario2@illapel.cl
- **Contraseña**: 123456
- **Nombre**: María González

### Administrador IT:
- **Email**: admin@illapel.cl
- **Contraseña**: admin123
- **Nombre**: Administrador IT

## Funcionalidades

### Para Usuarios:
1. **Crear Tickets**: Formulario para reportar problemas informáticos
2. **Ver Mis Tickets**: Lista de tickets creados con estado actualizado
3. **Chat de Soporte**: Comunicación directa con el equipo IT
4. **Ver Detalles**: Información completa de cada ticket

### Para Administradores:
1. **Gestión de Tickets**: Vista de tickets pendientes y resueltos
2. **Cambiar Estado**: Mover tickets entre pendiente y resuelto
3. **Ver Detalles**: Información completa de cada ticket
4. **Chat de Soporte**: Responder consultas de usuarios

## Instalación y Uso

1. **Descargar archivos**: Todos los archivos deben estar en la misma carpeta
2. **Abrir en navegador**: Hacer doble clic en `index.html`
3. **Iniciar sesión**: Usar las credenciales de los usuarios predefinidos
4. **Probar funcionalidades**: Crear tickets, chatear, cambiar estados

## Estructura de Archivos

```
gestor-tickets-illapel/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Lógica JavaScript
└── README.md           # Este archivo
```

## Tecnologías Utilizadas

- **HTML5**: Estructura de la aplicación
- **CSS3**: Estilos y diseño responsivo
- **JavaScript**: Lógica de la aplicación
- **LocalStorage**: Almacenamiento de datos local
- **Font Awesome**: Iconos

## Documentación del Código

El código está completamente comentado en español para facilitar la comprensión por parte de todo el equipo:

### **JavaScript (script.js):**
- **Comentarios de sección**: Dividido en secciones claras con separadores visuales
- **Comentarios de función**: Cada función tiene documentación JSDoc explicando su propósito y parámetros
- **Comentarios de línea**: Explicaciones detalladas de cada línea importante
- **Variables globales**: Documentadas con su propósito y uso

### **CSS (styles.css):**
- **Comentarios de sección**: Organizado por componentes de la interfaz
- **Comentarios de propiedad**: Explicación de cada propiedad CSS importante
- **Estructura clara**: Separación visual entre diferentes secciones

### **HTML (index.html):**
- **Comentarios de estructura**: Explicación de cada sección del documento
- **Comentarios de funcionalidad**: Descripción del propósito de cada elemento
- **Organización clara**: Estructura fácil de seguir

## Notas Importantes

- Los datos se almacenan localmente en el navegador
- Al cerrar el navegador, los datos se mantienen
- Para limpiar todos los datos, usar la función "Limpiar datos de navegación"
- La aplicación funciona completamente offline

## Próximas Mejoras

- Base de datos real (MySQL, PostgreSQL)
- Autenticación segura
- Notificaciones por email
- Adjuntar archivos a tickets
- Historial de cambios
- Reportes y estadísticas
- API REST para integración con otros sistemas
