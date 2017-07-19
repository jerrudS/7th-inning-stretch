const authentication = require('./authentication')
const request = require('request')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const knex = require('knex')({
  dialect: 'pg',
  connection: 'postgres://localhost:5432/stretch'
})

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

app.get('/events/:id', (req, res) => {
  const id = req.params.id
  request('https://api.seatgeek.com/2/events?performers[home_team]' + '.id=' + id + '&client_id=' + username + '&client_secret=' + password, (error, response, body) => {
    console.log('error:', error)
    console.log('statusCode:', response && response.statusCode)
    res.send(filterTeamData(JSON.parse(body).events))
  })
})

app.post('/events/:id', (req, res) => {
  const id = req.params.id
  request('https://api.seatgeek.com/2/events?performers[home_team]' + '.id=' + id + '&client_id=' + username + '&client_secret=' + password, (error, response, body) => {
    console.log('error:', error)
    console.log('statusCode:', response && response.statusCode)
    const newBody = filterTeamData(JSON.parse(body).events)
    console.log(newBody[0].matchup)

    newBody.forEach(game => {
      const query = knex
        .insert({
          matchup: game.matchup,
          time_of_first_pitch: game.date,
          experience_rating: game.experienceRating,
          lowest_ticket_price: game.lowestTicketPrice,
          average_ticket_price: game.averageTicketPrice,
          link_to_buy_tickets: game.url
        })
        .into('games')
        .returning('*')

      console.log(query.toString())

      query
        .then(() => {
          console.log('done!')
        })
    })
  })
})

app.listen(3004, () => {
  console.log('Listening on port 3004')
})
