const bump = require('json-bumper')

export const bumpVersion = async (fileName: string, options?: object) => {
  await bump(fileName, options)
  if (fileName === 'package.json') {
    try {
      await bump('package-lock.json', options)
    } catch (error) {
      console.log(error)
    }
  }
}
