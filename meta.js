const path = require('path')

const {
  sortDependencies,
  installDependencies,
  runLintFix,
  runAuditFix,
  printMessage,
} = require('./utils')
const pkg = require('./package.json')

module.exports = {
  helpers: {
    template_version() {
      return pkg.version
    },
  },
  prompts: {
    name: {
      type: 'string',
      required: true,
      message: 'Project name',
    },
    description: {
      type: 'string',
      required: false,
      message: 'Project description',
      default: 'A Mithril.js project',
    },
    author: {
      type: 'string',
      message: 'Author',
    },
    autoInstall: {
      type: 'list',
      default: 'npm',
      message:
        'Should we install dependencies for you after the project has been created? (recommended)',
      choices: [
        {
          name: 'Yes, use NPM',
          value: 'npm',
          short: 'npm',
        },
        {
          name: 'Yes, use Yarn',
          value: 'yarn',
          short: 'yarn',
        },
        {
          name: 'No, I will handle that myself',
          value: false,
          short: 'no',
        },
      ],
    },
  },
  filters: {
  },
  complete: function(data, { chalk }) {
    const green = chalk.green

    sortDependencies(data, green)

    const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName)

    if (data.autoInstall) {
      installDependencies(cwd, data, green)
        .then(() => runLintFix(cwd, data, green))
        .then(() => runAuditFix(cwd, data, green))
        .then(() => {
          printMessage(data, green)
        })
        .catch(e => {
          console.log(chalk.red('Error:'), e)
        })
    } else {
      printMessage(data, chalk)
    }
  },
}