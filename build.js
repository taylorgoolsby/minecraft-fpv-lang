
const fs = require('fs')
const path = require('path')
const JSON5 = require('json5')

const srcFolder = path.resolve(__dirname, './lang')
const destFolder = path.resolve(__dirname, './build')

if (fs.existsSync(destFolder)) {
  fs.rmdirSync(destFolder, {recursive: true})
}
fs.mkdirSync(destFolder)

const filenames = fs.readdirSync(srcFolder).filter(filename => filename !== 'zz_xx.json5')

for (const filename of filenames) {
  if (filename === 'zz_xx.json5') continue

  const contents = fs.readFileSync(path.resolve(srcFolder, filename), {encoding: 'utf-8'})
  const obj = JSON5.parse(contents)
  const json = JSON.stringify(obj, null, '  ')
  fs.writeFileSync(path.resolve(destFolder, filename.slice(0, -1)), json, {encoding: 'utf-8'})
}
