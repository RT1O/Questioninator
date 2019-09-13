const fs = require('fs')
const path = require('path')
const cors = require('cors')
const chalk = require('chalk')
const express = require('express')
const bodyParser = require('body-parser')

// Import the database
const { sequelize } = require('./sequelize/index.js')

// Import the config
const env = process.env.NODE_ENV || 'development'
const config = require('./config')[env]

// Create the express app
const app = express()

// Apply middleware
app.use(cors())
app.use(bodyParser.json())

// Define the route folder path
const routePath = config.routePath || path.join(__dirname, 'routes')

// Load all routes inside the route folder
fs.readdirSync(routePath)
  .filter((file) => file.endsWith('.js') && !file.startsWith('__'))
  .forEach((file) => {
    const routeName = file.replace('.js', '')
    const route = require(path.join(routePath, file))

    // Use the route in express
    app.use(`/${routeName}`, route)
  })

// Sync sequelize and run the express app
sequelize.sync({ force: env === 'development' }).then(() => {
  app.listen(config.port, () => {
    console.log(
      `${chalk.black.bgGreenBright(
        ' INFO '
      )} Currently running on: ${chalk.blue('http://localhost:' + config.port)}`
    )
  })
})
