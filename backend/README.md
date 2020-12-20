# Simple Focus Craft Starter


## Requirements

#### [Laravel Envoy](https://laravel.com/docs/5.7/envoy)

```
composer global require laravel/envoy
```

#### [Serfix](https://github.com/astockwell/serfix)

```sh
# Install Go (if not installed)
brew install go

# Install Serfix
go get github.com/astockwell/serfix

# Make sure your Go folder is located at `~/go`
# https://github.com/golang/go/wiki/SettingGOPATH
```


## Setup

#### Clone the repo as the project name (SLUG)

```sh
git clone git@github.com:simplefocus/sf-craft-starter.git SLUG
```

#### Setup a local database

Name the new databse `craft_SLUG`

#### Update `SLUG` in the following files

- `.env.example`

#### Create your `.env` file

```sh
cp .env.example .env
```

#### Prepare staging and production

Update the necessary values in `.env.staging` and `.env.production`.

#### Install Composer packages

> Note: You might get an error about `@php craft migrate/all`, this can be ignored.

```sh
composer install
```

#### Generate keys

```sh
# This will set APP_ID for your local `.env`
./craft setup/app-id

# This will set SECURITY_KEY for your local `.env`
./craft setup/security-key
```

#### Install Craft

Specific answers
- Username: simplefocus
- Email: sites+SLUG@simplefocus.com
- Site URL: $SITE_URL

```sh
./craft install
```


## Deployment

Our deployment setup leverages the power of [Laravel Envoy](https://laravel.com/docs/5.7/envoy).

### Overview

```sh
# Staging (development branch)
envoy run <command> --staging
git
# Production (main branch)
envoy run <command> --production
```

### Commands

- `init` - Setup remote server and deploy code
- `setup` - Setup files on remote server
- `reset` - Remove all files from remote server __(USE WITH CAUTION)__
- `deploy` - Deploy code from Git repo
- `rollback` - Roll the website back to the previous version
- `db:pull` - Pull remote database to your local database
- `db:push` - Push your local database to remote database
- `db:backup` - Backup remote database
- `uploads:sync` - Sync uploads with remote server
- `uploads:pull` - Pull uploads from remote server
- `uploads:push` - Push uploads to remote server
- `config:pull` - Pull project config files from remote server
- `healthcheck` - Check the status of remote server
