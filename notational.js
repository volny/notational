#!/usr/bin/env node

// TODO
// allow for string as title - uppercase to title, `-`-case in fileName (just use lodash)
// format date in template
// upload to homebrew to @volny namespace - to be executed with `notational`
// read an env var `$NOTATIONAL_EDITOR` to permanently set yours

const program = require('commander')
const fs = require('fs')
const { spawn } = require('child_process')

program
  .option('-e, --editor [command]', 'choose editor')
  .version('0.1.0')
  .arguments('[title]')

program.on('--help', () => {
  console.info('')
  console.info('Examples:')
  console.info('  $ notational my-note-title')
  console.info('  $ notational --editor code my-note-title')
})

program.parse(process.argv)

const [title] = program.args

const makeFileName = title => {
  if (typeof title === 'string') {
    return `${+new Date()}-${title}.md`
  }
  return `${+new Date()}.md`
}

const fileName = makeFileName(title)

const onCreateSuccess = () => {
  // open in editor
  const editor = program.editor || process.env.EDITOR
  // focus end of file if vim
  const editorCommand = ['vim', 'nvim'].includes(editor)
    ? `${editor} -c "$"`
    : editor

  console.log({ editorCommand })

  const child = spawn(editorCommand, [`./${fileName}`], {
    // https://stackoverflow.com/questions/9122282/how-do-i-open-a-terminal-application-from-node-js
    stdio: 'inherit',
  })

  child.on('exit', function(e, code) {
    process.exit()
  })
}

const template = `---
title: ${title}
date: ${new Date()}
---


`

fs.writeFile(`./${fileName}`, template, err => {
  if (err) {
    return console.log(err)
  }

  onCreateSuccess()
})
