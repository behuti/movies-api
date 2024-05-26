const fs = require("node:fs");
const { promisify } = require("node:util");

const readFilePromise = promisify(fs.readFile);

console.log("1. Leyendo el primer archivo...");
// Devuelve por defecto es un buffer
readFilePromise("archivo.txt", "utf-8").then((text) => {
  console.log("Primer Texto: ", text);
});

console.log("2. Hacer cosas mientras lee el archivo");

console.log("3. Leyendo el segundo archivo...");
// Devuelve por defecto es un buffer
fs.readFile("archivo2.txt", "utf-8", (err, text) => {
  console.log("Segundo texto: ", text);
});
