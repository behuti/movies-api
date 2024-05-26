const path = require("node:path");

// separador de directorios según sistema operativo
console.log(path.sep);
// unir rutas con path join
// -> unix /
// -> windows \

const filePath = path.join(".", "/content/", "subfolder", "test.txt");

console.log(filePath);

// conseguir de una ruta el nombre del archivo
const base = path.basename('/content/subfolder/test.txt');
console.log(base);

// conseguir de una ruta el nombre del archivo sin extension
const filename = path.basename('/content/subfolder/test.txt', '.txt');
console.log(filename);

// conseguir la extension de un archivo
const extension = path.extname('My.Super.image.jpg');
console.log(extension);