// .js -> por defecto utiliza CommonJS
// .mjs -> para utilizar ES modules
// .cjs -> para utilizar CommonJS

import { sum, sub, mul } from './sum.mjs'

console.log(sum(1, 2))
console.log(sub(1, 2))
console.log(mul(1, 2))
