const authentication = require('./authentication')
const request = require('request')

const username = authentication.client_id
const password = authentication.client_secret

function requestGeek(url) {
  request
    .get(url)
    .on('response', response => {
      console.log(response.statusCode)
      console.log(response.headers['content-type'])
    })
  return request
}
requestGeek('https://api.seatgeek.com/2/events?performers.slug=new-york-mets' + '&client_id=' + username + '&client_secret=' + password)
