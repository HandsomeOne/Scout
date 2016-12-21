const Settings = require('./Settings')

module.exports = () => Settings.findOne().then(doc => doc || new Settings().save())
