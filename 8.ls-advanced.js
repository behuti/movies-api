const fs = require('node:fs/promises')
const path = require('node:path')
const pc = require('picocolors')

const folder = process.argv[2] ?? '.'

async function ls(folder) {
  let files

  try {
    files = await fs.readdir(folder)
  } catch {
    console.error(pc.red(`❌ Error al leer el directorio ${folder}`))
    process.exit(1)
  }

  const filePromises = files.map(async (file) => {
    const filePath = path.join(folder, file)

    let stats
    try {
      stats = await fs.stat(filePath) // status -> información del archivo
    } catch {
      console.error('Error al leer el directorio', filePath)
      process.exit(1) // El 1 es para que no se siga ejecutando el programa pero indicar un error
    }

    const isDirectory = stats.isDirectory()
    const fileType = isDirectory ? 'd' : 'f'
    const fileSize = stats.size.toString().padStart(10, ' ')
    const fileModified = stats.mtime.toLocaleString()

    return `${fileType} - ${pc.blue(file.padEnd(30))} - ${pc.green(
      fileSize
    )} - ${pc.magenta(fileModified)} `
  })

  const filesInfo = await Promise.all(filePromises)
  console.log('File Type - Name - Size - Modified')
  filesInfo.forEach((fileInfo) => console.log(fileInfo))
}

ls(folder)
