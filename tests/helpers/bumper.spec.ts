import { bumpVersion } from './../../src/helpers/bumper'
const fs = require('fs')

test('Replace works properly', async () => {
  const replace = '0.1.204'

  await bumpVersion('./tests/test.json', { replace })
  const newVersion = JSON.parse(fs.readFileSync('./tests/test.json', 'utf8')).version

  expect(newVersion).toBe(replace)
})

test('Patches properly', async () => {
  const oldVersion = JSON.parse(fs.readFileSync('./tests/test.json', 'utf8')).version

  await bumpVersion('./tests/test.json')

  const newVersion = JSON.parse(fs.readFileSync('./tests/test.json', 'utf8')).version

  expect(+oldVersion.split('.')[2]).toBe(+newVersion.split('.')[2] - 1)
})

test('Minors properly', async () => {
  const oldVersion = JSON.parse(fs.readFileSync('./tests/test.json', 'utf8')).version

  await bumpVersion('./tests/test.json', { minor: true })

  const newVersion = JSON.parse(fs.readFileSync('./tests/test.json', 'utf8')).version

  expect(+oldVersion.split('.')[1]).toBe(+newVersion.split('.')[1] - 1)
})

test('Majors properly', async () => {
  const oldVersion = JSON.parse(fs.readFileSync('./tests/test.json', 'utf8')).version

  await bumpVersion('./tests/test.json', { major: true })

  const newVersion = JSON.parse(fs.readFileSync('./tests/test.json', 'utf8')).version

  expect(+oldVersion.split('.')[0]).toBe(+newVersion.split('.')[0] - 1)
})

test('Prereleases properly', async () => {
  const oldVersion = JSON.parse(fs.readFileSync('./tests/test.json', 'utf8')).version

  await bumpVersion('./tests/test.json', { pre: 'hello' })

  const newVersion = JSON.parse(fs.readFileSync('./tests/test.json', 'utf8')).version

  expect(`${oldVersion}-hello`).toBe(newVersion)
})
