const shell = require('shelljs')
const chalk = require('chalk')
const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')
const FileUpload = require('./FileUpload')
const { DateTime } = require('luxon')
const env = require('../config/env.json')
const rootPath = path.dirname(require.main.filename || process.mainModule.filename)

class Backup {
  static backup (DATABASE_URL, BUCKET, FOLDER, createCopy, verbose) {
    const today = DateTime.local().toISO()
    const fileName = `backup${today}.sql`
    const filePath = path.resolve(`${rootPath}/tmp/${fileName}`)

    if (shell.exec(`pg_dump ${DATABASE_URL} -f ${filePath} ${(verbose ? '--verbose' : '')}`).code !== 0) {
      console.log(chalk.red('Error backuping database.'))
      shell.exit(1)
    } else {
      if (createCopy) fs.copyFileSync(filePath, `${process.cwd()}/${fileName}`)
      const fileUpload = new FileUpload(env.s3.KEY, env.s3.SECRET)

      fileUpload.uploadToS3(filePath, fileName, BUCKET, FOLDER)
    }
  }

  static async config () {
    await inquirer
      .prompt([
        {
          type: 'input',
          name: 'KEY',
          message: 'KEY'
        },
        {
          type: 'input',
          name: 'SECRET',
          message: 'SECRET'
        }
      ])
      .then(async answers => {
        env.s3.KEY = answers.KEY
        env.s3.SECRET = answers.SECRET

        await fs.writeFileSync(path.resolve(`${rootPath}/config/env.json`), JSON.stringify(env))
      })

    return { KEY: env.s3.KEY, SECRET: env.s3.SECRET }
  }
}

module.exports = Backup
