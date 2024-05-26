const ditto = require('./pokemon/ditto.json')
const express = require('express')
const app = express()

app.disable('x-powered-by')

app.use(express.json())

// app.use((req, res, next) => {
//   if (req.method !== 'POST') return next()
//   if (req.headers['content-type'] !== 'application/json') return next()

//   // Solo llegan request con POST y que tienen el header content-type: application/json

//   let body = ''

//   // Escuchar el evento data
//   req.on('data', (chunk) => {
//     body += chunk.toString()
//   })

//   req.on('end', () => {
//     const data = JSON.parse(body)
//     data.timestamp = Date.now()
//     // Mudar el request y meter la información en el req.body
//     req.body = data
//     next()
//   })
// })

const PORT = process.env.PORT ?? 1234

app.get('/', (req, res) => {
  res.json({ message: 'Hola mundo' })
})

app.get('/pokemon/ditto', (req, res) => {
  res.json(ditto)
})

app.post('/pokemon', (req, res) => {
  // req.body deberíamos guardar en bbdd
  res.status(201).json(req.body) // Se extrae todo lo del middleware
})

// Manejo del 404 con un "middleware"
app.use((req, res) => {
  res.status(404).send('<h1>404 - Recurso no encontrado</h1>')
})

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
