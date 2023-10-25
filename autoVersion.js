import * as fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filenameNew = fileURLToPath(import.meta.url)

const __dirnameNew = path.dirname(__filenameNew)
// 使用执行命令行时的参数
function changeVersion() {
  const packJson = JSON.parse(fs.readFileSync(path.resolve(__dirnameNew, 'package.json')))
  const handleVersion = (version) => {
    const arr = version.split('.')
    arr[2] = ++arr[2]
    return arr.join('.')
  }
  const version = process.argv[2]
  packJson.version = version || handleVersion(packJson.version)
  fs.writeFileSync(path.resolve(__dirnameNew, 'package.json'), JSON.stringify(packJson, null, 4))
}
changeVersion()