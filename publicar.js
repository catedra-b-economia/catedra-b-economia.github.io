// Lo corre Netlify en cada publicación (ver netlify.toml).
// Arma la carpeta dist/ con index.html y el contenido cifrado, para que las
// respuestas no se puedan leer mirando el código o los archivos de la página.
// En el repositorio el contenido sigue en JSON normal, editable desde el panel.
const fs = require("fs");
const path = require("path");

const CLAVE = "c4t3dr4-B·intro-econ";
const ORIGEN = "contenido";
const DESTINO = "dist";

function cifrar(texto) {
  const bytes = Buffer.from(texto, "utf8");
  const clave = Buffer.from(CLAVE, "utf8");
  for (let i = 0; i < bytes.length; i++) bytes[i] ^= clave[(i * 7 + 13) % clave.length] ^ (i & 0xff);
  return bytes.toString("base64");
}

fs.rmSync(DESTINO, { recursive: true, force: true });
fs.mkdirSync(DESTINO);
fs.copyFileSync("index.html", path.join(DESTINO, "index.html"));
fs.cpSync("iconos", path.join(DESTINO, "iconos"), { recursive: true });

let n = 0;
(function recorrer(dir) {
  for (const nombre of fs.readdirSync(dir)) {
    const ruta = path.join(dir, nombre);
    if (fs.statSync(ruta).isDirectory()) { recorrer(ruta); continue; }
    if (!nombre.endsWith(".json")) continue;
    const salida = path.join(DESTINO, ruta);
    fs.mkdirSync(path.dirname(salida), { recursive: true });
    fs.writeFileSync(salida, cifrar(fs.readFileSync(ruta, "utf8")));
    n++;
  }
})(ORIGEN);
console.log(`Listo: ${n} archivos de contenido cifrados en ${DESTINO}/`);
