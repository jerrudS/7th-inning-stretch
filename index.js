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

function filterTeamData(team) {
  const revisedEvents = team.map(item => {
    return {
      matchup: item.title,
      date: item.datetime_local,
      experienceRating: item.score,
      lowestTicketPrice: item.stats.lowest_price,
      averageTicketPrice: item.stats.average_price,
      url: item.url
    }
  })
  return revisedEvents
}

app.get('/events/:team', (req, res) => {
  request('https://api.seatgeek.com/2/events?performers.slug=new-york-mets' + '&client_id=' + username + '&client_secret=' + password, (error, response, body) => {
    console.log('error:', error)
    console.log('statusCode:', response && response.statusCode)
    res.send(filterTeamData(JSON.parse(body).events))
  })
})

app.listen(3004, () => {
  console.log('Listening on port 3004')
})
