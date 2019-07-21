#!/usr/bin/env node

const program = require('commander')

program
  .version('0.1.0')
  .option('-e, --editor', 'choose editor')
  .arguments('[title]')

program.on('--help', () => {
  console.log('')
  console.log('Examples:')
  console.log('  $ notational my-note-title')
  console.log('  $ notational --editor nvim my-note-title')
})

program.parse(process.argv)

const [title] = program.args

function createWithoutTitle() {
  const fileName = `${+new Date()}.md`
  console.info(`File Name: ${fileName}`)

}

function createWithTitle() {
  const fileName = `${+new Date()}-${title}.md`
  console.info(`File Name: ${fileName}`)
}

if (program.args.length) {
  createWithTitle()
} else {
  createWithoutTitle()
}
