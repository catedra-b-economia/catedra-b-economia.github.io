# App Cátedra B · Lista de mejoras

Noviembre 2026 · Julio Blanco

Ocho frentes de trabajo para la próxima versión. Las reglas de diseño están en `CLAUDE.md`: el código en un solo `index.html`, el contenido editable en `contenido/*.json` (panel Pages CMS), sin servidor y sin guardar nada. Cada actividad nueva entra con el motor que ya existe (`renderSim`, `grafico()`, `quizConIntro`, `preparar`), una línea en `CONTENIDO_UNIDAD` y su entrada en `contenido/config.json`. Si tiene preguntas, van en un JSON de `contenido/preguntas/` con su entrada en `.pages.yml`.

Los datos y fechas marcados con *(verificar)* son de memoria: chequearlos antes de publicar.

**Orden sugerido:** 7 (correcciones) → 6 (glosario + links con `#unidad-seccion`) → 1 → 2 → 3 → 4 → 5 → 8.

---

## 1. Monopolio vs. competencia: "Sos el regulador"

Unidad III. El alumno ve el daño del monopolio y prueba medidas para corregirlo. Dos de ellas dan al revés de lo que espera: esa sorpresa es el corazón de la actividad.

**Mercado base:** demanda P = 100 − Q, costo marginal constante = 20.

- Competencia: P = 20, Q = 80. Excedente del consumidor = 3.200.
- Monopolio (IMg = 100 − 2Q = CMg): Q = 40, P = 60. Excedente del consumidor = 800, ganancia = 1.600, pérdida de eficiencia = 800.

**Pantalla:** gráfico con demanda, IMg y CMg; áreas pintadas (excedente del consumidor, ganancia, recaudación o gasto del Estado, pérdida). Debajo, `datos()` con los números y una "nota del regulador" según cuánta pérdida eliminó y a qué costo fiscal.

**Medidas** (toggle para elegir, slider para dosificar):

| Medida | Slider | Qué pasa | Qué aprende |
| --- | --- | --- | --- |
| Precio máximo | Tope de 10 a 60 | Entre 20 y 60, Q = 100 − tope. Con tope = 20 la pérdida desaparece. Por debajo de 20 deja de producir. | En competencia un precio máximo crea faltante; en monopolio puede *aumentar* la cantidad. |
| Impuesto por unidad | t de 0 a 40 | CMg + t: Q = (80 − t)/2. La pérdida crece. | El impuesto no arregla el monopolio: lo empeora (contrastar con externalidades). |
| Subsidio por unidad | s de 0 a 80 | Q = (80 + s)/2. Con s = 80, Q = 80, pero cuesta 6.400 y casi todo va a la ganancia. | Se corrige la cantidad pagando caro y beneficiando al monopolista. |
| Abrir a la competencia | Empresas, 1 a 10 | Cournot: Q = 80·N/(N+1), P = 20 + 80/(N+1). Con 4, P = 36. | Más competidores acercan al resultado competitivo sin gasto fiscal. |
| Abrir importaciones | Precio internacional | Si es menor a 60, no puede cobrar más que eso. | La apertura funciona como un precio máximo puesto por el mundo. |
| Impuesto a las ganancias | Alícuota 0 a 60% | Q y P no cambian; el Estado se queda con parte de la ganancia. | Redistribuye pero no corrige la pérdida. |

**Toggle "monopolio natural"** (costo fijo = 1.000, el caso del gas de la actividad de Musgrave): el tope en 20 da pérdidas de 1.000 y la empresa cierra. Salidas: subsidiar la diferencia, o regular a precio = costo medio (P ≈ 35,5, Q ≈ 64,5).

**Cierre tipo misión:** elegir la mejor medida para (1) eliminar la pérdida sin gastar plata pública; (2) bajar el precio rápido donde no pueden entrar competidores; (3) un monopolio natural que no cierre con el precio más bajo posible.

**Implementación:** `SIM_MONOPOLIO` calcado de `SIM_IMPUESTO`, con `toggles` para la medida y `sliders` con `si:`.

---

## 2. Externalidades a lo largo de la historia

Unidad III. Reemplaza y amplía el bloque de fallas.

### Parte A: ¿qué tipo de externalidad es?

Opciones fijas: negativa en la producción, negativa en el consumo, positiva en la producción, positiva en el consumo. Cada explicación cuenta además **cómo se corrigió**. Intro plegable con el cuadro 2×2.

| Caso | Año | Tipo | Cómo se corrigió |
| --- | --- | --- | --- |
| Saladeros y curtiembres del Riachuelo, en la fiebre amarilla de Buenos Aires *(verificar)* | 1871 | Negativa, producción | Traslado y prohibición de saladeros |
| El Gran Hedor: las cloacas desbordan el Támesis | 1858 | Negativa, consumo | Red cloacal de Bazalgette |
| Chispas de las locomotoras incendian campos de trigo (Pigou) | 1920 | Negativa, producción | Origen del impuesto pigouviano; Coase lo discute en 1960 |
| El Gran Smog de Londres: carbón de las estufas hogareñas | 1952 | Negativa, consumo | Ley de Aire Limpio, 1956 |
| El DDT y "Primavera silenciosa" de Rachel Carson | 1962 | Negativa, producción | Prohibiciones en los 70 |
| Los CFC rompen la capa de ozono | 1987 | Negativa, producción | Protocolo de Montreal |
| La nafta con plomo *(verificar año en Argentina)* | 1998 | Negativa, consumo | Prohibición |
| La vacuna contra la viruela de Jenner | 1796 | Positiva, consumo | Vacunación obligatoria; erradicación en 1980 |
| Ley 1420 de educación común, gratuita y obligatoria | 1884 | Positiva, consumo | Provisión pública |
| Las abejas polinizan los manzanos del vecino (Meade) | 1952 | Positiva, producción | Contratos de polinización |
| El INTA difunde variedades que adoptan todos | 1956 | Positiva, producción | Investigación financiada por el Estado |

Trampas: el smog de 1952 tiene parte industrial; los CFC son de producción y de consumo.

### Parte B: "uní con flechas" ampliado

Misma mecánica (6 fallas, 6 casos), pero cada falla tiene un **pozo de 2 o 3 casos** y en cada partida se sortea uno por falla.

| Falla | Casos del pozo |
| --- | --- |
| Bien público | Plaza del barrio · faro de la costa (Coase, 1974) · alumbrado de la cuadra |
| Recurso común | Lago donde pesca cualquiera · merluza del Mar Argentino *(verificar)* · pastoreo comunal (Hardin, 1968) |
| Externalidad negativa | Curtiembre sobre el Riachuelo · boliche que no deja dormir |
| Externalidad positiva | Vecino que se vacuna · vecino que arregla la fachada |
| Información asimétrica | Seguro de salud · auto usado que "anda perfecto" |
| Poder de mercado | Concesión del agua · patente del remedio · única línea de colectivos |

**Implementación:** los casos de la Parte A van en `contenido/preguntas/U3_EXTERNALIDADES.json` (editable desde el panel). `UNIR_FALLAS` pasa a `{ id, falla, casos: [{ caso, por }] }`; `nuevoUnir()` sortea un caso por falla. "¿Falla de mercado o no?" queda como tercera pantalla de esta actividad.

---

## 3. Bienes públicos: "La plaza del barrio"

Unidad III. El alumno es un vecino que, con otros tres, quiere armar una plaza. La plaza se dibuja a medida que llega la plata: el polizón se *ve*.

**Reglas:** 6 rondas, $10 por vecino por ronda. Lo juntado × 1,6 se reparte en partes iguales. Todos ponen todo → $16 cada uno; el que no pone mientras los demás ponen todo → $22.

| Vecino | Cómo juega | Qué dice |
| --- | --- | --- |
| Doña Rosa | Siempre $10 | "La plaza es para los chicos del barrio" |
| El Polizón | Nunca pone | "Si la hacen igual, ¿para qué voy a poner?" |
| Ramiro | Promedio de lo que pusieron los demás la ronda anterior | "Yo pongo lo que pone el resto" |

**Dibujo:** SVG del terreno; por umbrales de plata acumulada aparecen pasto, banco, árboles, hamaca, tobogán, fuente.

**Fases:** (1) rondas 1–4 cada uno por su cuenta: los aportes caen *(citar Fehr y Gächter, 2000; verificar)*; (2) ronda 5, asamblea: multar al que no aporta pagando un costo, tasa municipal obligatoria, o nada; (3) ronda 6 con la regla elegida y comparación. La tasa es la función de asignación de Musgrave.

**Implementación:** renderer propio como `renderDilemaU3` (`state.plaza`) y `plazaSVG(total)` al estilo de `fabricaSVG`. Reusar `retrato()` y `dialogoHTML()`.

---

## 4. "Sos encuestador de la EPH"

Unidad IV. Definiciones *(verificar contra metodología INDEC)*: ocupado = trabajó al menos una hora en la semana de referencia; desocupado = no trabajó, buscó en las últimas cuatro semanas y está disponible; inactivo = ni trabaja ni busca; subocupado = ocupado con menos de 35 h que quiere trabajar más. Tasas: actividad = PEA/población; empleo = ocupados/población; desocupación = desocupados/PEA; subocupación = subocupados/PEA.

**Fase 1: 12 fichas** (ocupado / desocupado / inactivo, + marca de subocupado):

| Persona | Lo que cuenta | Respuesta |
| --- | --- | --- |
| María, 34 | "Hice changas dos horas; quiero algo fijo" | Ocupada y subocupada |
| Juan, 50 | "Dejé de buscar, total no hay nada" | Inactivo (desalentado) |
| Lucía, 20 | "Estudio y no busco" | Inactiva |
| Carlos, 41 | "Trabajo en negro en una obra, 45 h" | Ocupado |
| Ana, 29 | "Me echaron hace un mes y mando CV" | Desocupada |
| Rosa, 67 | "Estoy jubilada" | Inactiva |
| Marta, 38 | "Cuido a mis hijos y la casa" | Inactiva (enlace con trabajo doméstico, Unidad II) |
| Diego, 25 | "Cobro un plan con contraprestación" | Ocupado *(verificar)* |
| Pablo, 33 | "Empiezo un trabajo la semana que viene" | Desocupado *(verificar)* |
| Sofía, 45 | "Tengo un kiosco, 60 h" | Ocupada |
| Tomás, 22 | "Busco, pero no puedo arrancar hasta marzo" | Inactivo: no disponible |
| Elena, 31 | "Trabajo 20 h y no quiero más" | Ocupada, no subocupada |

**Fase 2:** las cuatro tasas con las respuestas del alumno y con las correctas, lado a lado.

**Fase 3: la paradoja del desalentado.** Slider de desalentados 0 a 5: la desocupación baja sin que nadie consiga trabajo y cae la actividad.

**Cierre:** la EPH es trimestral en 31 aglomerados urbanos *(verificar)*; no mide lo rural.

**Implementación:** fase 1 con fichas y chips (como `renderValorU2`); fase 3 con un `SIM_` corto. Las fichas van en `contenido/preguntas/U4_EPH.json` (editable desde el panel).

---

## 5. 16 actividades por unidad

Hoy: 14, 12, 22, 16 y 7. Las actividades parecidas se juntan en secciones "hub" con chips arriba (como Trade-off). Glosario y simulacro no cuentan.

| Unidad | Hoy | Entra | Se fusiona | Total |
| --- | --- | --- | --- | --- |
| I | 14 | +2 | — | 16 |
| II | 12 | +4 | — | 16 |
| III | 22 | +3 | −9 | 16 |
| IV | 16 | +1 | −1 | 16 |
| V | 7 | +9 | — | 16 |

**Unidad I (+2):** Curva de Lorenz y Gini (sliders por quintil, presets); ¿Este hogar es pobre? (adultos equivalentes, CBA y CBT, indigencia y pobreza).

**Unidad II (+4):** La fábrica de alfileres (Smith); La plusvalía (jornada, trabajo necesario y plustrabajo); Jugá a Colbert (mecanismo de Hume contra el mercantilismo); Planificador o mercado (debate del cálculo económico).

**Unidad III (+3 −9):** entran monopolio, externalidades y plaza. Fusiones:

| Hoy separadas | Pasan a ser |
| --- | --- |
| La demanda · La oferta | Demanda y oferta (toggle) |
| Rendimientos del factor · a escala | Rendimientos (toggle corto/largo plazo) |
| Precio máximo · Precio mínimo | Precios máximos y mínimos |
| Uní con flechas · ¿Falla o no? | Dentro de Externalidades |
| Dilema · Ultimátum · Plaza | Juegos: ¿cooperar o no? |
| Aseguradora · Autos usados · Riesgo moral o selección adversa | Información asimétrica |

**Unidad IV (+1 −1):** entra la EPH; se fusionan "Las tres brechas" y "en la vida real".

**Unidad V (+9):** Misiones (Roca-Runciman, Banco Central, IAPI); Test de lectura Ferrer; Términos de intercambio (la lámina CEPAL ya existe); La Caja de Conversión (1899 y 1991); Vivir la hiper de 1989 (formato crisis del 30); Pesificación asimétrica: quién ganó y quién perdió; La puja distributiva (indexación, Rodrigazo); Armá el mapa (arrastrar producciones a regiones); Ordená la cronología.

Cada fusión o actividad nueva se refleja en `contenido/config.json` (ids, títulos, orden) y, si tiene preguntas, en `.pages.yml`.

**A decidir:** si 16 es mucho, alternativa de 14 por unidad.

---

## 6. Glosario buscable

Botón "Glosario" debajo de las unidades (fuera de la cuenta). Buscador que filtra mientras se escribe; en cada término, un link "Practicalo" a la actividad.

- Datos: `contenido/glosario.json` (editable desde el panel) con `{ termino, def, unidad, seccion }` (`seccion` = id de `CONTENIDO_UNIDAD`).
- Búsqueda sin tildes ni mayúsculas (`normalize("NFD")`), en término y definición; chips por unidad.
- "Practicalo" setea `state.unidadActiva` y `state.unidadActivaSeccion` y llama a `render()`. Hacer a la vez los **links directos con hash** (`#III-pmax`): leer `location.hash` al cargar y en `hashchange`.

Términos (unos 80):

- **I:** escasez, costo de oportunidad, FPP, eficiencia de Pareto, equidad, ceteris paribus, positiva/normativa, flujo circular, Laspeyres, Paasche, ventaja absoluta, ventaja comparativa, trade-off, balde de Okun, desigualdad, inequidad, igualdad de oportunidades, instituciones.
- **II:** sistema económico, economía señorial, capitalismo liberal y reglamentario, economía colectivista, mercantilismo, fisiocracia, producto neto, valor de uso, valor de cambio, valor-trabajo, plusvalía, utilidad marginal, paradoja del valor, ley de Say, renta diferencial, ley de hierro, patrón oro.
- **III:** demanda, oferta, equilibrio, elasticidad, bien normal, bien inferior, sustituto, complemento, precio máximo, precio mínimo, excedente del consumidor, pérdida de eficiencia, rendimientos decrecientes, rendimientos a escala, monopolio, externalidad, bien público, recurso común, polizón, selección adversa, riesgo moral, equilibrio de Nash.
- **IV:** PIB, valor agregado, ciclo, tendencia, demanda agregada, multiplicador, propensión marginal a consumir, paradoja del ahorro, tres brechas, desempleo involuntario, tasa de desocupación, inflación, teoría cuantitativa, finanzas funcionales, estanflación, funciones del dinero.
- **V:** economías regionales, densidad nacional, modelo agroexportador, sustitución de importaciones, restricción externa, stop-and-go, estructura productiva desequilibrada, heterogeneidad estructural, convertibilidad, pesificación, corralito.

---

## 7. Detalles a corregir en el index

### Afectan al alumno

Los bancos ahora están en `contenido/preguntas/*.json`: las explicaciones faltantes se escriben ahí (o desde el panel); la mezcla se resuelve en el código.

- [x] **Gasparini y Fanelli se resuelven eligiendo la B:** la correcta es la segunda opción en 6 de 8 (`U1_GASPARINI`) y 5 de 8 (`U1_FANELLI`), sin mezclar. Usar `preparar(..., { opciones: true })` (también en Buchanan).
- [x] **Bancos que nunca se mezclan:** `U1_REPASO`, `U1_LECTURA`, `U2_FRASES`, `U3_ELASTICIDAD`, `U4_BRECHAS` y los V/F de I a IV. Envolver en `preparar(..., { orden: true, opciones: true })`; en V/F alcanza `{ orden: true }`.
- [x] **`U1_POSNORM` no tiene ninguna `explicacion`:** escribir una por afirmación (los adjetivos de valor escondidos).
- [x] **`U4_BRECHAS`: preguntas 4 y 5 sin explicación.**
- [x] **El arrastre del flujo circular se traba en el celular:** falta manejar `pointercancel`; la tarjeta queda flotando con la clase `arrastrando`. Escucharlo y limpiar como en `soltar`, sin evaluar zona.
- [x] **Ultimátum predecible:** umbrales fijos `[25, 45, 15]`; sortearlos por partida (10 a 45).
- [x] **Frase confusa en el cierre del ultimátum:** "ofrecer casi todo para vos" → "quedarte con casi todo".
- [x] **Accesibilidad del flujo circular:** sumar tocar tarjeta y después zona, como en "uní con flechas".

### Limpieza de código

- [x] `bancoActivo()` no hace nada: reemplazar por el banco directo.
- [x] `comoOpcionMultiple.directo` no se usa.
- [x] Comentarios vacíos u huérfanos y el de "en construcción": resuelto al quitar todos los comentarios del `index.html` (las respuestas no deben quedar explicadas en el código).
- [x] CSS sin uso: `.tile`, `.googlebtn`, `.userbar`, `.admin-row`, `.grid-comisiones`, `.ccard*`, `.live`, `.video-wrap`, `.valor-fila`, `.badge-soon`, `.disclaimer`, `.btn.gold`, `.checks`, `label.check`, `.footlink`, y el comentario "Barra de progreso".

---

## 8. Que los alumnos hagan preguntas

Dos cosas: **mandar dudas** y **proponer preguntas para los bancos**.

| Opción | Cómo funciona | A favor | En contra |
| --- | --- | --- | --- |
| Netlify Forms | Formulario oculto en el HTML con `data-netlify="true"`; la app envía con `fetch`. Respuestas en el panel de Netlify y por mail. | Todo adentro de la app; unidad y actividad se mandan solas. | Tope de envíos por mes en el plan gratis *(verificar)*. |
| Google Forms prellenado | Botón que abre un Form con unidad y actividad completadas por URL. | Cero código; planilla compartida. | El alumno sale de la app. |

Si falla, falla solo el formulario. Recomendación: Netlify Forms.

- Botón "¿Te quedó una duda?" al final de cada actividad (anónimo, sin mail).
- En los quizzes, "Proponé una pregunta": pregunta, cuatro opciones, correcta y por qué.
- Las dudas repetidas se responden en "Preguntas de la comisión" (`contenido/dudas.json`, editable desde el panel).
- Las preguntas buenas entran al banco con la marca "propuesta por un alumno de la Comisión 7".

**A decidir:** ¿anónimo o con nombre opcional? ¿Quién revisa y cada cuánto se publica? ¿Netlify o Google Forms?
