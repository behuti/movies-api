const net = require('node:net') // Protocolo TCP

function findFreePort(desiredPort) {
  return new Promise((resolve, reject) => {
    const server = net.createServer()

    server.listen(desiredPort, () => {
      // If it's free this callback is gonna be executed
      const { port } = server.address()
      server.close(() => {
        resolve(port)
      })
    })

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        findFreePort(0).then((port) => resolve(port))
      } else {
        reject(err)
      }
    })
  })
}

module.exports = { findFreePort }
