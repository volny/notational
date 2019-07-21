#!/usr/bin/env node

;((program, app) => {
  program
    .option('-e, --editor [command]', 'choose editor')
    .version('0.1.0')
    .arguments('[title]')

  program.on('--help', () => {
    console.info('')
    console.info('Examples:')
    console.info('  $ notational "My Note Title"')
    console.info('  $ notational --editor code "My Note Title"')
  })

  program.parse(process.argv)

  const [ title ] = program.args
  const { editor } = program

  return app(title, editor)

})(require('commander'), require('./app'))
