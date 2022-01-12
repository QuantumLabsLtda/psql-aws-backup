# psql-aws-backup

<p align="center">
<img src="https://i.imgur.com/5r7nMGo.png" alt="psql-aws-backups" title="Cerberus" align="center"/>
</p>

> Easily backups PostgreSQL databases into Amazon S3 Bucket 🤠

[![npm version](https://badge.fury.io/js/%40quantumlabs%2Fpsql-aws-backup.svg)](https://badge.fury.io/js/%40quantumlabs%2Fpsql-aws-backup)

### Table of Contents

- [Setup](#setup)
- [Installing](#installing)
- [Commands](#commands)
  - [Config](#config)
  - [Backup](#backup)  

## Setup
*Prerequisites:* you should have a PostgreSQL installation in your computer, because the package uses `pg_dump` command for backup creation

## Installing
Install package globally using npm.
```shell
  npm i @quantumlabs/psql-aws-backup -g
```

## Commands

#### Config

```shell
  Usage:
    psql-aws-backup config [options]

  config default S3 credentials

  Options:
    -h, --help  output usage information
```

This command is used to create the package basic config. When used, it prompts two questions in your terminal: S3 Key, and S3 Secret.

#### Backup

```shell
  Usage:
    psql-aws-backup backup [options] <DATABASE_URL> <BUCKET> <FOLDER>

  backup a postgreSQL database and upload the backup to S3 bucket

  Options:
    --create-copy  create a copy of the backup in the current directory
    --verbose      verbose mode
    -h, --help     output usage information
```

This command is used to backup a database. You need to provide the `DATABASE_URL`, `BUCKET` and `FOLDER`. The `FOLDER` argument, is the path **INSIDE** your bucket.
When you use `--create-copy` you also creates a local copy of the `.sql` file which was uploaded to S3 bucket.

## Todo

- [ ] Backup presets

## Credits
Created with ♥ by QuantumLabs.
