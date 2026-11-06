import fs from 'fs'

const entitiesDir = './entities'
const servicesDir = './routes'
const outputFile = './main.tsp'

function getDirectoryPaths(fileOrDirPath: string): string[] {
  const isDirectory = fs.lstatSync(fileOrDirPath).isDirectory()

  if (!isDirectory) {
    return [fileOrDirPath]
  }

  return fs
    .readdirSync(fileOrDirPath)
    .flatMap((fileOrDir: string) => getDirectoryPaths(`${fileOrDirPath}/${fileOrDir}`))
    .filter(Boolean)
}

async function createMainFile() {
  const importStatements = [
    '// This file is auto generated with create-main-file.ts, do not change it manually\n\n',
    '// entities imports\n',
    getDirectoryPaths(entitiesDir).map((path) => `import "${path}";\n`),
    '// services imports\n',
    getDirectoryPaths(servicesDir).map((path) => `import "${path}";\n`),
  ]

  await fs.promises.writeFile(outputFile, importStatements.flat())
}

createMainFile()
