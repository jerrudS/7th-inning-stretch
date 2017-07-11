const authentication = require('./authentication')
const request = require('request')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()

const username = authentication.client_id
const password = authentication.client_secret

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())

// function requestGeek(url) {
//   request
//     .get(url)
//     .on('response', response => {
//       console.log(response.statusCode)
//       console.log(response.headers['content-type'])
//     })
//   return request
// }
// requestGeek('https://api.seatgeek.com/2/events?performers.slug=new-york-mets' + '&client_id=' + username + '&client_secret=' + password)
function mapEvent(team) {
  const revisedEvent = team.map(item => {
    return {
      Rating: item.score,
      Matchup: item.title,
      Date: item.datetime_local,
      Lowest_Ticket_Price: item.stats.lowest_price,
      Average_Ticket_Price: item.stats.average_price
    }
  })
  return revisedEvent
}

app.get('/events/new-york-mets', (req, res) => {
  request('https://api.seatgeek.com/2/events?performers.slug=new-york-mets' + '&client_id=' + username + '&client_secret=' + password, (error, response, body) => {
    console.log('error:', error)
    console.log('statusCode:', response && response.statusCode)
    mapEvent(JSON.parse(body).events)
    res.send(mapEvent(JSON.parse(body).events))
  })
})

app.listen(3004, () => {
  console.log('Listening on port 3004')
})
