# Cátedra B · Introducción a la Economía

Página de práctica para alumnos. Es un sitio estático: no hay servidor, base de datos ni login para los alumnos.

## Cómo está organizado

| Archivo | Qué tiene |
|---|---|
| `index.html` | La aplicación: diseño, simulaciones, juegos y el motor de preguntas |
| `contenido/config.json` | Nombre del curso, qué unidades están habilitadas y qué actividades se ven (y en qué orden) |
| `contenido/preguntas/*.json` | Los bancos de preguntas de cada actividad |
| `contenido/misiones/U*.json` | Las misiones "tomá la decisión" |
| `contenido/actividades-nuevas.json` | Cuestionarios nuevos que agrega la cátedra, sin tocar código |
| `.pages.yml` | Configuración del panel de administración |

## Editar contenido desde el panel (recomendado)

1. Entrá a <https://app.pagescms.org> con tu cuenta de GitHub y elegí este repositorio.
2. En el menú vas a ver:
   - **⚙ Unidades y actividades**: habilitar o deshabilitar unidades, ocultar actividades, cambiar títulos y el orden.
   - **➕ Actividades nuevas**: crear un cuestionario nuevo en cualquier unidad.
   - **Unidad I … V**: editar las preguntas y misiones existentes.
3. Guardá. El cambio queda registrado en GitHub y Netlify lo publica en alrededor de un minuto.

Sobre las preguntas:
- **Número de la opción correcta** empieza en 1 (la primera opción es 1).
- Si todas las preguntas de una actividad tienen las mismas opciones, se cargan una sola vez en **Opciones comunes** y se deja vacío el campo de opciones de cada pregunta.
- Se puede usar HTML simple en los textos (`<strong>`, `<em>`).
- Si una pregunta queda mal cargada (sin texto, o con un número de respuesta que no existe), la página la saltea y muestra un aviso arriba con el detalle. El resto sigue funcionando.

## Dudas y errores que mandan los alumnos

Al final de cada unidad hay un botón "¿Te quedó una duda?" y en cada actividad uno para "Reportar un error". Los mensajes (con nombre, unidad y actividad) llegan por Netlify Forms: se ven en Netlify → el proyecto → **Forms** y por mail si se configuró la notificación. Las dudas que se repiten se responden en el panel, en **💬 Preguntas de la comisión**, y aparecen al final de la unidad.

## Respuestas cifradas

En cada publicación, Netlify corre `publicar.js`, que arma la carpeta `dist/` con el contenido cifrado. Así, quien mire los archivos de la página no ve las respuestas. En este repositorio el contenido sigue en JSON normal, por eso conviene que el repositorio sea privado.

## Probar en la computadora

```bash
python3 -m http.server 8000
```

y abrir <http://localhost:8000/>. Abriendo el `index.html` con doble clic no carga el contenido, porque el navegador no deja leer los JSON así.
