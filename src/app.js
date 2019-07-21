const fs = require('fs')
const { spawn } = require('child_process')

const kebabCase = require('lodash.kebabcase')

const makeTemplate = require('./template')

const app = (title, editor) => {
  const makeFileName = title => {
    if (typeof title === 'string') {
      return `${+new Date()}-${kebabCase(title)}.md`
    }
    return `${+new Date()}.md`
  }

  const fileName = makeFileName(title)

  const onCreateSuccess = () => {
    // open in editor
    const command = editor || process.env.EDITOR

    // focus end of file if vim
    const extraArgs = ['vim', 'nvim'].includes(command) ? `-c $` : ''

    const child = spawn(command, [extraArgs, `./${fileName}`], {
      // https://stackoverflow.com/questions/9122282/how-do-i-open-a-terminal-application-from-node-js
      stdio: 'inherit',
    })

    child.on('exit', (e, code) => {
      console.info(`Created ${fileName}`)
      process.exit(code)
    })
  }

  fs.writeFile(`./${fileName}`, makeTemplate(title), err => {
    if (err) {
      return console.log(err)
    }

    onCreateSuccess()
  })
}

module.exports = app
