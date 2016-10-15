var Slack = require('node-slack')
var underscore = require('underscore')

var DB = require('./database')

var profile = process.env.NODE_ENV || 'development'
var config = require('../config/config.' + profile + '.js')

underscore.keys(config).forEach((key) => {
  var m = config[key]
  if (typeof m === 'undefined') return

  underscore.keys(m).forEach((k) => {
    if (typeof m[k] === 'undefined') throw new Error('config.' + key + '.' + k + ': undefined')

    if ((typeof m[k] !== 'number') && (typeof m[k] !== 'boolean') && (!m[k])) {
      throw new Error('config.' + key + '.' + k + ': empty')
    }
  })
})

var runtime = {
  config: config,
  db: new DB(config),
  login: config.login
}
if (runtime.config.slack && runtime.config.slack.webhook) runtime.slack = new Slack(runtime.config.slack.webhook)

runtime.notify = (debug, payload) => {
  var params = runtime.config.slack

  if (!runtime.slack) return debug('notify', 'slack webhook not configured')
  underscore.defaults(payload, { channel: params.channel,
                                 username: params.username || 'webhookbot',
                                 icon_emoji: params.icon_emoji || ':ghost:',
                                 icon_url: params.icon_url || ':ghost:',
                                 text: 'ping.' })
  runtime.slack.send(payload, (res, err, body) => {
    if (err) debug('notify', err)
  })
}

module.exports = runtime
