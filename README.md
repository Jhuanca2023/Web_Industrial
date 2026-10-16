# Web Industrial · PruebaWeb

Plantilla industrial completa migrada a **Astro 7**. Sitio estático responsive con catálogo de 15 productos, búsqueda, categorías, ordenamiento, detalle, galería, especificaciones, biblioteca de documentos y cotización de prueba.

## Desarrollo

Requiere **Node.js 24** y npm. La versión también está indicada en `.nvmrc`.

```sh
npm ci
npm run dev
```

Para comprobar la versión de producción:

```sh
npm run build
npm run check:build
npm run preview
```

## Despliegue en Netlify

Importar el repositorio `Jhuanca2023/Web_Industrial` y elegir la rama `main`. La configuración se lee automáticamente de `netlify.toml`:

| Ajuste | Valor |
| --- | --- |
| Base directory | Vacío (raíz del repositorio) |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node.js | `24` |

No requiere variables de entorno, adaptador SSR, funciones ni base de datos. Cada push a `main` inicia el despliegue si el repositorio ya está conectado al sitio de Netlify. No configurar `site` ni `red-rotation` como directorio base: el proyecto Astro está en la raíz del repositorio remoto.

## Estructura

```text
src/
  components/     Cabecera, hero, tarjetas, catálogo, detalle, contacto, pie y cotización
  data/           Datos compartidos de categorías y productos
  layouts/        Documento HTML y fuentes locales
  pages/          Página principal Astro
  scripts/        Interacciones, cotización y animaciones
  styles/         Sistema visual y estilos responsive
public/
  img/            Fotografías e imágenes de producto locales
  docs/           Tres fichas PDF oficiales y catálogo de Euroheaters
scripts/          Validación de archivos de producción
docs/             Notas y referencias
```

## Funcionalidades

- Catálogo renderizado en HTML durante la compilación, visible antes de ejecutar JavaScript.
- Búsqueda tolerante a acentos, filtros por categoría y ordenamiento.
- Galería de producto con miniaturas, flechas y navegación por teclado.
- Pestañas accesibles: presentación, especificaciones y documentos.
- Filtros y búsqueda de documentos, apertura y descarga de PDF locales.
- Descarga de un resumen técnico TXT de cada producto, distinguido de los PDF oficiales.
- Cotización con selección persistida en el navegador y formulario de demostración con validación nativa.
- Formulario de contacto de prueba, sin envío ni almacenamiento de sus campos.
- Carrusel principal, animaciones GSAP y desplazamiento Lenis, incluidos en el bundle.
- Fuentes locales y botón de regreso al inicio con progreso de lectura.
- Soporte de movimiento reducido y navegación por teclado.

## Alcance de la prueba

Los formularios **no envían datos** y no requieren backend. Los datos de contacto, valoraciones y cifras de demostración no deben interpretarse como afirmaciones comerciales verificadas. Las imágenes y documentos originales tienen sus propias condiciones; las referencias están en `docs/REFERENCIAS.md`.

La propuesta conserva el diseño aprobado: fondos neutros para mostrar los equipos, naranja para acciones, una ficha de producto con datos prioritarios y documentación organizada en pestañas. No se utilizó un prototipo adicional en esta migración. El tiempo total de la prueba debe incluir el trabajo previo de diseño y la revisión posterior.
