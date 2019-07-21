#!/usr/bin/env node

const program = require('commander')
const fs = require('fs')
const { spawn } = require('child_process')
const kebabCase = require('lodash.kebabcase')

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

const [title] = program.args

const makeFileName = title => {
  if (typeof title === 'string') {
    return `${+new Date()}-${kebabCase(title)}.md`
  }
  return `${+new Date()}.md`
}

const fileName = makeFileName(title)

const onCreateSuccess = () => {
  // open in editor
  const editor = program.editor || process.env.EDITOR

  // focus end of file if vim
  const extraArgs = ['vim', 'nvim'].includes(editor)
    ? `-c $`
    : ''

  const child = spawn(editor, [extraArgs, `./${fileName}`], {
    // https://stackoverflow.com/questions/9122282/how-do-i-open-a-terminal-application-from-node-js
    stdio: 'inherit',
  })

  child.on('exit', function(e, code) {
    process.exit()
  })

}

const template = `---
title: ${title || ''}
date: ${new Date()}
---


`

fs.writeFile(`./${fileName}`, template, err => {
  if (err) {
    return console.log(err)
  }

  onCreateSuccess()
})
