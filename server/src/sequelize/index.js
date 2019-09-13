const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

const env = process.env.NODE_ENV || 'development'
const config = require('./config')[env]

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)
const modelPath = config.modelPath || path.join(__dirname, 'models')

const database = {}

fs.readdirSync(modelPath)
  .filter((file) => file.endsWith('.js') && !file.startsWith('__'))
  .forEach((file) => {
    const model = sequelize.import(path.join(modelPath, file))
    database[model.name] = model
  })

Object.keys(database).forEach((modelName) => {
  if (database[modelName].associate) {
    database[modelName].associate(database)
  }
})

database.sequelize = sequelize
database.Sequelize = Sequelize

module.exports = database
