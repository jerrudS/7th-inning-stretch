const request = require('request')
// const app = requre('express')
// const fs = require('fs')

request
  .get('https://api.seatgeek.com/2/events?client_id=Nzg1MDAxMnwxNDk5NTM3NDE4LjI&client_secret=a97cb08ed89da0d571c2d0be476d11d1899c39ee779f71f8539907d277d7b532&performers[home_team].id=8')
  .on('response', function (response) {
    console.log(response.statusCode)
    console.log(response.headers['content-type'])
    const data = JSON.parse(response)
    console.log(data)
  })
