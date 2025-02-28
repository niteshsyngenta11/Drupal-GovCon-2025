# Drupal Sales Demo

## Setup

1. Clone project.
2. Run `ddev init`.

This will clone the project from Git, spin up the DDEV environment and setup the site.

## Development

### Starting new bodies of work

1. Run `git checkout main && git pull`.
2. Checkout a new branch `git checkout -b <branch-name>`.
3. Re-run `ddev init`.

### Configuring Project for Apple M1

##### 1. Update `.ddev/docker-compose.local.yaml`
Create the file if it doesn't already exist. Update it so that the `web` service has property `platform: linux/x86_64`.

```yaml
services:
  web:
    platform: linux/x86_64
```

## DDev Commands

### init
Use `ddev init` command to setup your local from scratch

### frontend
* `frontend dev` - Build both storybook and theme for development environment
* `frontend prod` - Build both storybook and theme for production environment
* `frontend watch:storybook` - Watch asset changes with storybook
* `frontend watch:theme` - Watch asset changes with theme

## Storybook

Storybook is accessible at URL - https://drupal-govcon.ddev.site:6006
