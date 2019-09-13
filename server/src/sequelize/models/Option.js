module.exports = (sequelize, Types) => {
  const Option = sequelize.define('Option', {
    name: {
      type: Types.STRING,
      allowNull: false
    },
    answers: {
      type: Types.INTEGER,
      defaultValue: 0
    }
  })

  Option.associate = (models) => {
    Option.belongsTo(models.Poll)
  }

  Option.generate = (PollId, name) => {
    return Option.create({ PollId, name })
  }

  Option.prototype.increment = function() {
    this.update({
      answers: this.answers + 1
    })
  }

  return Option
}
