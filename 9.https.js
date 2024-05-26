// PROTOCOLO HTTP
const http = require('node:http')
const { findFreePort } = require('./10.free-port.js')

const server = http.createServer((req, res) => {
  console.log('request received')
  res.end('Hola mundo')
})

const desiredPort = process.env.PORT ?? 3000

findFreePort(desiredPort).then((port) => {
  server.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}`)
  })
})
