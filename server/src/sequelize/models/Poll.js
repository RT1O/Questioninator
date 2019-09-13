const crypto = require('crypto')

module.exports = (sequelize, Types) => {
  const Poll = sequelize.define('Poll', {
    id: {
      type: Types.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    question: {
      type: Types.STRING,
      allowNull: false
    },
    timeLimit: {
      type: Types.INTEGER,
      defaultValue: -1
    },
    createdAt: {
      type: Types.DATE,
      defaultValue: Types.NOW
    }
  })

  Poll.associate = (models) => {
    Poll.hasMany(models.Option)
  }

  Poll.generate = async function(body) {
    var { question, options, timeLimit } = body
    const id = crypto.randomBytes(6).toString('hex')

    if (!question || !options) throw Error('Missing question and/or answers!')
    if (!timeLimit) timeLimit = -1

    try {
      const poll = await Poll.create({
        id,
        question,
        timeLimit
      })

      if (!poll) {
        throw Error('Could not create the poll.')
      }

      for (option of options) {
        try {
          await sequelize.models.Option.generate(id, option)
        } catch (err) {
          await Poll.destroy({ where: { id } })
          throw Error('Something went wrong!')
        }
      }

      return poll
    } catch (err) {
      throw err
    }
  }

  return Poll
}
