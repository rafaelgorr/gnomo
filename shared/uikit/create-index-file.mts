import * as fs from 'fs'

type IndexConfig = {
  include: string
  exclude?: string
  output: string
}

const indexes: IndexConfig[] = [
  {
    include: './src',
    output: '.',
  },
] as const

function mapFileOrDirToPath(path: string) {
  const excludedFileTypes = ['.d.ts', '.md', '.css', '.svg', '.png', '/prisma/', '/animations/']
  if (excludedFileTypes.some((searchString) => path.includes(searchString))) {
    return ''
  }

  return path
}

function getDirectoryPaths(fileOrDirPath: string): string[] {
  const isDirectory = fs.lstatSync(fileOrDirPath).isDirectory()

  if (!isDirectory) {
    return [mapFileOrDirToPath(fileOrDirPath)]
  }

  return fs
    .readdirSync(fileOrDirPath)
    .flatMap((fileOrDir: string) => getDirectoryPaths(`${fileOrDirPath}/${fileOrDir}`))
    .filter(Boolean)
}

function extractNamedExports(filePath: string): string[] {
  const isDirectory = fs.lstatSync(filePath).isDirectory()
  if (isDirectory) {
    return []
  }
  const content = fs.readFileSync(filePath, 'utf-8')

  const directExports = [
    ...content.matchAll(/export\s+(?:const|function|class|enum)\s+(\w+)/g),
  ].map((m) => m.at(1)) as string[]

  const typesInterfaces = [...content.matchAll(/export\s+(?:interface|type)\s+(\w+)/g)].map(
    (m) => `type ${m.at(1)}`,
  ) as string[]

  const namedExportMatches = [...content.matchAll(/export\s*{\s*([^}]+)\s*}/g)]

  const blockExports = namedExportMatches
    .flatMap((match) => match.at(1)?.split(' , '))
    .map((name) => name?.trim().split(/\s+as\s+/)[0])
    .filter(Boolean) as string[]

  return [...directExports, ...typesInterfaces, ...blockExports]
}

async function createIndexFile(config: IndexConfig) {
  const importStatements = getDirectoryPaths(config.include)
    .filter((path) => (config.exclude ? !path.includes(config.exclude) : true))
    .map((path) => {
      const cleanPath = path.replace(config.output, '.')

      return cleanPath !== './' ? cleanPath : ''
    })
    .filter(Boolean)
    .map((path) => {
      const exports = extractNamedExports(path)
      const fromPath = path.replace(/\.tsx?$/g, '')
      if (exports.length) {
        return `export { ${exports} } from '${fromPath}';\n`
      }
      return ''
    })

  await fs.promises.writeFile(`${config.output}/index.ts`, importStatements)
}

indexes.forEach(createIndexFile)
