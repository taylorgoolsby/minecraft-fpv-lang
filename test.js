
const fs = require('fs')
const path = require('path')
const localeCode = require('locale-code')
const isutf8 = require('isutf8')

const filenames = fs.readdirSync(path.resolve(__dirname, './lang'))

test('name format', () => {
  for (const filename of filenames) {
    const matches = filename.match(/([a-z][a-z])_([a-z][a-z])\.json/)
    expect(matches).toBeTruthy()
    const locale = matches[1] + '-' + matches[2].toUpperCase()

    if (filename === 'zz_xx.json') {
      // control
      expect(localeCode.validate(locale)).toBeFalsy()
    } else {
      expect(localeCode.validate(locale)).toBeTruthy()
    }
  }
})

test('file encoding', () => {
  for (const filename of filenames) {
    const buffer = fs.readFileSync(path.resolve(__dirname, './lang', filename), {encoding: null})
    if (filename === 'zz_xx.json') {
      expect(isutf8(buffer)).toBeFalsy()
    } else {
      expect(isutf8(buffer)).toBeTruthy()
    }
  }
})