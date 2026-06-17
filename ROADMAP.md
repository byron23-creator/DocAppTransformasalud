# 🗺️ Hoja de Ruta — DocApp (Clínica)

## Stack Tecnológico
- **Frontend:** React
- **Backend:** Node.js (Express)
- **Base de Datos:** PostgreSQL
- **Autenticación:** JSON Web Tokens (JWT)
- **Integración externa:** Google Calendar API

---

## Lineamientos de Diseño UI
- **Estilo:** Minimalismo estricto, limpio y profesional
- **Color de fondo principal:** `#fffcfd`
- **Color de líneas, bordes y acentos:** `#844c62`
- **Inputs:** Bordes redondeados, comportamiento interactivo estilo Google

---

## Vistas Principales
1. **Dashboard / Resumen**
   - Citas del día y próximas (local + Google Calendar)
   - Seguimientos: cards con Nombre, Fecha, Motivo, Teléfono

2. **Crear Citas**
   - Formulario sincronizado con Google Calendar

3. **Documentación Médica**
   - Datos demográficos: Nombre, Edad, Sexo, Fecha de nacimiento, Teléfono
   - Texto libre: Motivo de consulta, Historia de enfermedad, Antecedentes, Tratamiento actual
   - Signos vitales: Presión arterial, Frecuencia cardíaca, Temperatura, Saturación O₂, Peso, Talla
   - Plan: Tratamiento a seguir, Fecha de próximo seguimiento

---

## Requerimientos de Base de Datos
- Llaves primarias y foráneas
- Restricciones de seguridad (NOT NULL, UNIQUE donde aplique)
- Campos `created_at` y `updated_at` (timestamps)
- `ON DELETE CASCADE` donde sea técnicamente necesario

---

## 🚦 Pasos Macro del Proyecto

### Paso 1 — Inicialización y Estructura del Proyecto
Crear la carpeta raíz con dos subcarpetas: `client/` (React) y `server/` (Express).
Inicializar ambos proyectos con sus respectivos `package.json`.
Definir un `.gitignore` global.

### Paso 2 — Diseño e Implementación de la Base de Datos (PostgreSQL)
Diseñar el esquema: tablas `users`, `patients`, `appointments`, `documentations`.
Escribir el script SQL con PKs, FKs, timestamps y CASCADE.
Conectar el servidor Express a PostgreSQL mediante un pool de conexiones.

### Paso 3 — Autenticación (Backend + Frontend)
Implementar el endpoint de login en Express.
Generar y validar JWT.
Proteger rutas del backend con middleware de autenticación.
Crear la pantalla de Login en React con el diseño "Bienvenido".

---

## ✅ Estado del Proyecto
- [ ] Paso 1: Inicialización y estructura
- [ ] Paso 2: Base de datos PostgreSQL
- [ ] Paso 3: Autenticación JWT
- [ ] Vista: Dashboard
- [ ] Vista: Crear Citas (+ Google Calendar)
- [ ] Vista: Documentación Médica
