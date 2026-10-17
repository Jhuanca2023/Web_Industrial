# KRONO Industrial

Plantilla industrial completa migrada a **Astro 7**. Sitio estático responsive con catálogo de 15 productos, búsqueda, categorías, ordenamiento, detalle, galería, especificaciones, biblioteca de documentos y solicitudes descargables. Identidad conceptual de portafolio con fotografía industrial y animación GSAP.

## Desarrollo

Requiere **Node.js 24** y npm. La versión también está indicada en `.nvmrc`.

```sh
npm ci
npm run dev -- --background
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
- Cotización con selección persistida en el navegador y descarga de solicitud TXT con validación nativa.
- Formulario de proyecto con descarga local de la consulta, sin envío ni almacenamiento de sus campos.
- Hero fotográfico, revelados y parallax con GSAP ScrollTrigger; Lenis solo con puntero preciso.
- Fuentes locales y botón de regreso al inicio con progreso de lectura.
- Soporte de movimiento reducido y navegación por teclado.

## Identidad y alcance

KRONO Industrial es una marca conceptual para un proyecto de portafolio. El logotipo K es SVG original. No se presentan clientes, valoraciones ni estadísticas ficticias. La fotografía de contexto ilustra procesos industriales y no representa instalaciones propias de KRONO.

Los formularios descargan documentos TXT para compartir manualmente; no envían correos ni requieren backend. La selección de productos se conserva en localStorage, pero los datos personales del formulario no se guardan. Antes de un lanzamiento comercial se debe conectar un canal de atención real y confirmar disponibilidad y especificaciones con el proveedor.

El diseño utiliza grafito, piedra y naranja, fotos grandes, composiciones asimétricas y una biblioteca técnica. Las animaciones respetan movimiento reducido. El único indicador de lectura es el anillo del botón de volver arriba. Fuentes de imágenes y documentación en docs/REFERENCIAS.md.
