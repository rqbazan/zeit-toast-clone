const pkg = require('./package.json')

require('dts-generator').default({
  project: process.cwd(),
  out: pkg.types
})
