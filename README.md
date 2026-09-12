# CHEQ — sitio estático listo para GitHub Pages

Landing page responsive de CHEQ, sin dependencias externas y preparada para publicarse como sitio estático.

## Publicación en GitHub Pages

1. Sube **todo el contenido de esta carpeta** a la raíz del repositorio.
2. En GitHub: **Settings → Pages**.
3. En **Build and deployment**, selecciona **Deploy from a branch**.
4. Selecciona la rama `main` y la carpeta `/ (root)`.
5. Guarda. GitHub publicará `index.html` automáticamente.

El sitio utiliza rutas relativas, por lo que funciona tanto en un dominio raíz como en una URL tipo `usuario.github.io/repositorio/`.

## Estructura

- `index.html` — página principal.
- `404.html` — página de error para GitHub Pages.
- `assets/css/styles.css` — estilos responsive.
- `assets/js/app.js` — canonical dinámico, Schema.org y generador de solicitud.
- `assets/images/` — imágenes locales optimizadas.
- `assets/icons/favicon.svg` — favicon.
- `site.webmanifest` — manifiesto web.
- `robots.txt` — acceso de buscadores.
- `.nojekyll` — evita procesado Jekyll innecesario.

## Datos y privacidad

La web no depende de APIs, CDNs, fuentes externas, analítica ni formularios de terceros. El formulario genera una solicitud local que el visitante puede copiar o descargar. No transmite ni almacena datos en un servidor.

## Antes de convertirlo en un negocio operativo

Para recibir solicitudes automáticamente deberá conectarse el formulario a un email o backend real. No se ha incluido ningún correo, dominio o teléfono ficticio. Esta decisión evita publicar datos inventados o endpoints que no funcionen.

## Imágenes

Las imágenes incluidas son assets locales del prototipo visual de CHEQ. Todas las rutas han sido verificadas.
