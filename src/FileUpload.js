/**
 * Quantum psql-aws-backup
 * Copyright(c) 2020s Quantum Labs Ltda.
 * BSD 3-Clause Licensed
 */
/* eslint-disable space-before-function-paren */
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const AWS = require('aws-sdk')

class FileUpload {
  constructor(KEY, SECRET) {
    this.KEY = KEY
    this.SECRET = SECRET
  }

  uploadToS3 (filePath, fileName, BUCKET, FOLDER) {
    // Init S3
    const s3 = new AWS.S3({
      accessKeyId: this.KEY,
      secretAccessKey: this.SECRET
    })

    // Read content from the file
    const fileContent = fs.readFileSync(filePath)

    // Setting up S3 upload parameters
    const params = {
      Bucket: BUCKET,
      Key: `${FOLDER}/${fileName}`, // File name you want to save as in S3
      Body: fileContent
    }

    // Uploading files to the bucket
    s3.upload(params, function (err, data) {
      if (err) {
        throw err
      }
      console.log(chalk.green(`File uploaded successfully. ${data.Location}`))
      process.exit(0)
    })
  }
}

module.exports = FileUpload
