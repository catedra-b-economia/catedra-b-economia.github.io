# App Cátedra B · Introducción a la Economía (FCE-UNLP)

App de práctica para alumnos de Introducción a la Economía, Cátedra B, Comisión 7. Se publica en Netlify desde este repositorio: https://catedra-b-intro-economia-unlp.netlify.app

El plan de trabajo está en `PLAN.md`. Trabajar de a un punto por vez y no tocar lo que no se pidió.

## Cómo está armado el repositorio

| Archivo | Qué tiene |
| --- | --- |
| `index.html` | Todo el código: markup, estilos y script (un solo archivo, sin JS/CSS aparte ni imágenes; las ilustraciones son SVG en código). |
| `contenido/config.json` | Curso, unidades habilitadas, y orden / título / visibilidad de cada actividad. |
| `contenido/preguntas/*.json` | Bancos de preguntas de opción múltiple (uno por actividad). |
| `contenido/misiones/U*.json` | Misiones "tomá la decisión". |
| `contenido/glosario.json` | Términos del glosario. |
| `contenido/actividades-nuevas.json` | Cuestionarios que agrega la cátedra desde el panel, sin código. |
| `.pages.yml` | Panel de administración (Pages CMS). Cada JSON de `contenido/` tiene que tener su entrada acá. |
| `publicar.js` | Lo corre Netlify al publicar: copia `index.html` a `dist/` y cifra los JSON. |
| `netlify.toml` | `command = "node publicar.js"`, `publish = "dist"`. |

## Reglas de diseño (no negociables)

- **El código vive en un solo `index.html`.** El contenido editable (preguntas, misiones, glosario, configuración) vive en `contenido/` como JSON y se edita desde el panel (https://app.pagescms.org).
- **Todo banco de preguntas nuevo va como JSON en `contenido/preguntas/`**, con su nombre en `NOMBRES_BANCOS` (index.html) y su entrada en `.pages.yml`. Toda actividad nueva se suma también a `contenido/config.json` en la unidad que corresponda.
- **Sin servidor, sin login, sin base de datos.** Se sacaron a propósito en septiembre de 2026 (Firebase fallaba). Los JSON se publican junto con la página.
- **No se guarda nada:** ni `localStorage`, ni progreso, ni cuentas. El estado vive en el objeto `state` mientras la pestaña está abierta.
- **Las unidades se habilitan desde el panel** (`habilitada` en `config.json`). Una deshabilitada se ve como "Próximamente".
- **Respuestas protegidas:** el contenido se publica cifrado y `index.html` no lleva comentarios. No escribir respuestas de bancos en el código; van en los JSON.
- **Celular primero:** probar a 380 px de ancho. Los sliders no deben redibujar la sección entera (le arrancan el control al dedo); solo se actualiza el dibujo y el número (ver `actualizarSim`, `actualizarFPP`).

## Cómo está armado el código

- Al cargar, el script lee los JSON (`leerJSON`, que descifra si hace falta) y arma `BANCOS`, `MISIONES`, `UNIDADES`, `CURSO`. Si un archivo falla o una pregunta está mal cargada, se saltea y se muestra un aviso arriba (`PROBLEMAS`); el resto sigue funcionando.
- En los JSON, `correcta` empieza en **1** (así lo carga el docente). Al leerlos pasa a índice desde **0**: en el código los bancos son arrays `{ texto, opciones, correcta, explicacion }` con `correcta` desde 0.
- Si todas las preguntas de un banco comparten opciones, van una sola vez en `opciones_comunes`.
- Bancos con formato especial (`FORMATO_BANCO`): vf, posnorm, efeq, igualdad. Se guardan como opción múltiple y se convierten al formato que usan los adaptadores de `comoOpcionMultiple`.
- `UNIDADES` y `CONTENIDO_UNIDAD`: cada unidad tiene `secciones`, y cada sección tiene `render` (pantalla propia) o `quiz` (banco). `aplicarConfig()` ordena, renombra y oculta según `config.json` y suma las actividades nuevas.
- `preparar(items, { orden, opciones, sinRachas })` mezcla preguntas y opciones. Usarlo en todo banco.
- `quizConIntro(key, generar, intro, titulo)`: banco con recuadro de teoría plegable.
- Simuladores: un objeto `SIM_X` con `id`, `intro`, `inicial`, `toggles`, `sliders` (con `si:` para mostrarlos condicionalmente), `acciones`/`accion`, `dibujar(v)` y `pie`. Se muestra con `renderSim(SIM_X)`. Ejemplo de referencia: `SIM_IMPUESTO`.
- `grafico(o)`: gráficos SVG (series, puntos, áreas, barras, guías).
- `datos([[etiqueta, valor, "malo"?]])`: tarjetas de resultado.
- `retrato()`, `dialogoHTML()`, `lamina()`, `ILUS`: personajes y láminas de época.
- Cada actividad con renderer propio necesita su `bindX()` llamado al final de `bindUnidad()`.
- Links directos: `#I-vf` abre la unidad I en la actividad `vf`.

## Contenido y estilo

- Castellano rioplatense, con voseo ("elegí", "probá"). Tono cercano pero preciso.
- Las explicaciones de cada pregunta dicen por qué, no solo cuál es la correcta.
- Datos históricos y estadísticos: si no hay certeza, marcarlo con *(verificar)* para que Julio lo chequee; no inventar cifras ni citas.
- Ninguna opción correcta debe ser reconocible por largo o posición: opciones de largo parecido y mezcladas.
- Paleta: variables CSS de `:root` (azul `--blue` #3272B9 de la página del CEFIP). No sumar colores sueltos.

## Probar

Servir la carpeta y abrir en el navegador (lee los JSON sin cifrar):

```
python3 -m http.server 8000
```

y entrar a http://localhost:8000/. Para probar la versión publicada: `node publicar.js` y servir `dist/`.

Antes de dar algo por terminado: abrir la actividad, jugarla entera, mirar la consola sin errores (ni aviso naranja de contenido) y revisar a ancho de celular.
