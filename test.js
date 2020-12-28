
const fs = require('fs')
const path = require('path')
const localeCode = require('locale-code')
const isutf8 = require('isutf8')
const JSON5 = require('json5')

const filenames = fs.readdirSync(path.resolve(__dirname, './lang'))

test('name format', () => {
  for (const filename of filenames) {
    const matches = filename.match(/([a-z][a-z])_([a-z][a-z])\.json5/)
    expect(matches).toBeTruthy()
    const locale = matches[1] + '-' + matches[2].toUpperCase()

    if (filename === 'zz_xx.json5') {
      // control
      expect(localeCode.validate(locale)).toBeFalsy()
    } else {
      if (!localeCode.validate(locale)) {
        throw new Error(filename + ': Your filename is not formatted correctly. Check the README.md for help.')
      }
    }
  }
})

test('file encoding', () => {
  for (const filename of filenames) {
    const buffer = fs.readFileSync(path.resolve(__dirname, './lang', filename), {encoding: null})
    if (filename === 'zz_xx.json5') {
      expect(isutf8(buffer)).toBeFalsy()
    } else {
      if (!isutf8(buffer)) {
        throw new Error(filename + ': Your file is not UTF-8 encoded.')
      }
    }
  }
})

test('json5 syntax', () => {
  for (const filename of filenames) {
    if (filename === 'zz_xx.json5') continue
    const data = fs.readFileSync(path.resolve(__dirname, './lang', filename), {encoding: 'utf-8'})
    try {
      JSON5.parse(data)
    } catch (err) {
      throw new Error(filename + ': Your file is not valid JSON syntax. Reason: ' + err.message)
    }
  }
})