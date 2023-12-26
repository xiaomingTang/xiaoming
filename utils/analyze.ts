import { glob } from 'glob'
import * as fs from 'fs'
import * as path from 'path'

const pattern = path
  .resolve(process.cwd(), './@zimi/*/dist/*.js')
  .replace(/\\/g, '/')

const map: Record<
  string,
  {
    [key in string]: string
  }
> = {}

async function main() {
  const matches = glob.sync(pattern)

  matches.forEach((p) => {
    const matchArr = /@zimi\/([^/\\]+)\/dist\/(\w+)\.js$/.exec(p)
    if (matchArr) {
      const [, libName, libType] = matchArr
      const size = `${(fs.statSync(p).size / 1000).toFixed(2)}kb`
      map[libName] = map[libName] || {
        [libType]: size,
      }
      map[libName][libType] = size
    }
  })
  console.log(map)
}

main()
