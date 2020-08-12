const bump = require('json-bump')

const bumpVersion = async (fileName, options) => {
  await bump(fileName, options)
  if (fileName === 'package.json') {
    try {
      await bump('package-lock.json', options)
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = bumpVersion
