import Settings from './Settings'

export default () => Settings.findOne().then(doc => doc || new Settings().save())
