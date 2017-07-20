const knex = require('knex')({
  dialect: 'pg',
  connection: 'postgres://localhost:5432/stretch'
})

function insertGame(game) {
  return knex
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
}

module.exports = {
  insertGame: insertGame
}
