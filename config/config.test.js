module.exports =
{ port                  : process.env.PORT                 || 3000
, database              :
  { mongo               : process.env.MONGODB_URI          || 'localhost/test' }
, slack                 :
  { webhook             : process.env.SLACK_WEBHOOK
  , channel             : process.env.SLACK_CHANNEL
  , icon_url            : process.env.SLACK_ICON_URL
  }
, login                 :
  { organization        : ''
  , world               : '/documentation'
  , bye                 : 'https://example.com'
  , clientId            : process.env.GITHUB_CLIENT_ID     || '00000000000000000000'
  , clientSecret        : process.env.GITHUB_CLIENT_SECRET || '0000000000000000000000000000000000000000'
  , ironKey             : process.env.IRON_KEYPASS
  , isSecure            : process.env.GITHUB_FORCE_HTTPS   || false
  }
}
