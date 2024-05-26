import { readFile } from 'node:fs/promises'

console.log('1. Leyendo el primer archivo...')
// Devuelve por defecto es un buffer
const text = await readFile('archivo.txt', 'utf-8')
console.log('Primer texto: ', text)

console.log('2. Hacer cosas mientras lee el archivo')

console.log('3. Leyendo el segundo archivo...')
// Devuelve por defecto es un buffer
const secondText = await readFile('archivo2.txt', 'utf-8')
console.log('Segundo texto: ', secondText)
