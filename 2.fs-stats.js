const fs = require('node:fs') // a partir de Node16, se recomienda poner los dos puntos

const stats = fs.statSync('./archivo.txt')

console.log(
  stats.isFile(),
  stats.isDirectory(),
  stats.isSymbolicLink(),
  stats.size
)
