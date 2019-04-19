const path = require('path')

exports.keys = 'jasonandjay'

exports.log = (con) => {
  console.log('----------------------')
  console.log(con)
  console.log('----------------------')
}

exports.security = {
  csrf: {
    enable: false
  }
}

exports.mysql = {
  client: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'sign'
  }
}
exports.static = {
  prefix: '/public/'
}
exports.multipart = {
  mode: 'file'
}
