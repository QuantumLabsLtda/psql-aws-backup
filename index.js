#!/usr/bin/env node
/**
 * Quantum psql-aws-backup
 * Copyright(c) 2020s Quantum Labs Ltda.
 * BSD 3-Clause Licensed
 */
const fs = require('fs')
const chalk = require('chalk')
const inquirer = require('inquirer')
const program = require('commander')
const log = console.log
const env = require('./config/env.json')
const Backup = require('./src/Backup')

// Init program Commands
program
  .command('config')
  .description('config default S3 credentials')
  .action(async () => {
    // Config credentials
    const { KEY, SECRET } = await Backup.config()

    log(chalk.green('S3 credentials configured.'))
    log(
      chalk.yellow('KEY:'), chalk.green(KEY)
    )
    log(
      chalk.yellow('SECRET:'), chalk.green(SECRET)
    )

    // Exit program
    process.exit(0)
  })

program
  .version('1.0.0')
  .command('backup <DATABASE_URL> <BUCKET> <FOLDER>')
  .description('backup a postgreSQL database and upload the backup to S3 bucket')
  .option('--create-copy', 'create a copy of the backup in the current directory')
  .option('--verbose', 'verbose mode')
  .action(function (DATABASE_URL, BUCKET, FOLDER, optionObj) {
    const createCopy = optionObj.createCopy
    const verbose = optionObj.verbose

    if (!env.s3.KEY || !env.s3.SECRET) {
      log(chalk.yellow('You need to config the S3 keys.'))
      log(chalk.yellow('Use psql-aws-backup config <KEY> <SECRET>'))
      process.exit(1)
    } else {
      // Check if DATABASE_URL was provided
      if (typeof DATABASE_URL === 'undefined') {
        console.error(chalk.yellow('No Database URL provided.'))
        process.exit(1)
      }

      // Check if BUCKET was provided
      if (typeof BUCKET === 'undefined') {
        console.error(chalk.yellow('No BUCKET provided.'))
        process.exit(1)
      }

      Backup.backup(DATABASE_URL, BUCKET, FOLDER, createCopy, verbose)
    }
  })

// Parse arguments
program.parse(process.argv)
