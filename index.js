const authentication = require('./authentication')
const request = require('request')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const { insertGame, selectGames, deleteFavorite } = require('./database')

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

function filterFavorites(game) {
  const revisedGame = game.map(item => {
    return {
      matchup: item.matchup,
      date: item.time_of_first_pitch,
      experienceRating: item.experience_rating,
      lowestTicketPrice: item.lowest_ticket_price,
      averageTicketPrice: item.average_ticket_price,
      url: item.link_to_buy_tickets
    }
  })
  return revisedGame
}

app.get('/events/:id', (req, res) => {
  const id = req.params.id
  request('https://api.seatgeek.com/2/events?performers[home_team]' + '.id=' + id + '&client_id=' + username + '&client_secret=' + password, (error, response, body) => {
    console.log('error:', error)
    console.log('statusCode:', response && response.statusCode)
    res.send(filterTeamData(JSON.parse(body).events))
  })
})

app.post('/favorites', (req, res) => {
  const game = req.body

  insertGame(game)
    .then((data) => {
      res.status(201).json(data)
    })
})

app.get('/favorites', (req, res) => {
  selectGames()
    .then((data) => {
      res.send(filterFavorites(data))
    })
})

app.delete('/favorites/:id', (req, res) => {
  const itemId = parseInt(req.params.id, 10)

  deleteFavorite(itemId)
    .then(res.sendStatus(204))
})

app.listen(3004, () => {
  console.log('Listening on port 3004')
})
