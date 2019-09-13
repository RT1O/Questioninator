# The server

### Project setup

```
npm install
```

### Create databse configuration files

First you need to create the required database configuration file.

Also, you need a working database for the server to connect to.

```
// ./src/sequelize/config.js
// The database config file.

module.exports = {
  development: {
    host: '',
    dialect: '',
    username: '',
    password: '',
    database: ''
  },
  production: {
    host: '',
    dialect: '',
    username: '',
    password: '',
    database: ''
  }
}
```

### Watches and reloads for development

```
npm run dev
```

### Runs for production

```
npm run start
```
