/* global $ */

let games = []

function fetchTeamData(path) {
  fetch(path)
    .then(res => res.json())
    .then(data => {
      games = data
      sortData(games, 'experienceRating')
      renderTable()
      renderTableData(games)
    })
    .catch(err => {
      console.log('ERROR', err)
    })
}

function addFavorite(game) {
  fetch('/favorites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(game)
  })
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      console.log('ERROR', err)
    })
}

function toSlicedArray(number) {
  const stringArray = []
  const stringNumber = number.toString()
  stringArray.push(stringNumber)
  const slicedArray = stringArray[0].slice(0, 5)
  return slicedArray
}

function toUtcStringSliced(dateObj) {
  const utcDate = (dateObj).toString()
  const date = new Date(utcDate)
  const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const newerDate = newDate.toUTCString()
  const newestDate = newerDate.split(' ').slice(0, 4).join(' ')
  const twelveDate = formatTime(date)
  const utcStringSliced = newestDate + '; ' + twelveDate
  return utcStringSliced
}

function createATagButton(url) {
  const aTag = document.createElement('a')
  aTag.setAttribute('class', 'ui positive button')
  aTag.href = url
  aTag.textContent = 'Buy Tickets'
  return aTag
}

function formatTime(dateObj) {
  var hour = dateObj.getHours()
  var minute = dateObj.getMinutes()
  var amPM = (hour > 11) ? 'pm' : 'am'
  if (hour > 12) {
    hour -= 12
  }
  else if (hour === 0) {
    hour = '12'
  }
  if (minute < 10) {
    minute = '0' + minute
  }
  return hour + ':' + minute + amPM
}

function sortData(object, key, isAscending) {
  object.sort((a, b) => {
    if (isAscending) {
      return parseFloat(a[key]) - parseFloat(b[key])
    }
    return parseFloat(b[key]) - parseFloat(a[key])
  })
}

function sortDate(object, isAscending) {
  object.sort((a, b) => {
    if (isAscending) {
      return new Date(a.date) - new Date(b.date)
    }
    return new Date(b.date) - new Date(a.date)
  })
}

function renderTableData(games) {
  const tableBody = document.querySelector('tbody')
  tableBody.innerHTML = ''
  games.forEach(object => {
    const tableRow = document.createElement('tr')
    const tableCol = document.createElement('td')
    const checkDiv = document.createElement('div')
    const inputDiv = document.createElement('input')
    const label = document.createElement('label')

    tableCol.setAttribute('class', 'collapsing')
    checkDiv.setAttribute('class', 'ui toggle checkbox')
    inputDiv.setAttribute('type', 'checkbox')
    inputDiv.setAttribute('name', 'public')

    tableCol.appendChild(checkDiv)
    checkDiv.appendChild(inputDiv)
    checkDiv.appendChild(label)
    tableRow.appendChild(tableCol)

    for (let key in object) {
      const tableData = document.createElement('td')
      if (key === 'url') {
        const aTag = createATagButton(object.url)
        tableData.appendChild(aTag)
      }
      else if (key === 'experienceRating') {
        const rating = (object[key] * 100)
        const slicedArray = toSlicedArray(rating)
        tableData.textContent = slicedArray
      }
      else if (key === 'date') {
        const newestDate = toUtcStringSliced(object.date)
        tableData.textContent = newestDate
      }
      else {
        tableData.textContent = object[key]
      }
      tableRow.appendChild(tableData)
    }
    tableBody.appendChild(tableRow)
  })
  const dataId = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  let number = 0
  const checkDiv = document.querySelectorAll('input[type="checkbox"]')
  checkDiv.forEach(item => {
    item.setAttribute('data-id', dataId[number])
    number += 1
  })
  table.appendChild(tableBody)

  const tbody = document.querySelector('tbody')
  tbody.addEventListener('click', (event) => {
    const $targetDiv = event.target
    console.log($targetDiv)
    const id = $targetDiv.getAttribute('data-id')
    if (id) {
      const game =
        {
          matchup: games[id].matchup,
          date: games[id].date,
          experienceRating: games[id].experienceRating,
          lowestTicketPrice: games[id].lowestTicketPrice,
          averageTicketPrice: games[id].averageTicketPrice,
          linkToBuyTickets: games[id].url
        }
      console.log(game)
      addFavorite(game)
    }
  })
}

const mlbTeams = ['Arizona Diamondbacks', 'Atlanta Braves', 'Baltimore Orioles', 'Boston Red Sox', 'Chicago Cubs', 'Chicago White Sox', 'Cincinnati Reds', 'Cleveland Indians', 'Colorado Rockies', 'Detroit Tigers', 'Miami Marlins', 'Houston Astros', 'Kansas City Royals', 'Los Angeles Angels of Anaheim', 'Los Angeles Dodgers', 'Milwaukee Brewers', 'Minnesota Twins', 'New York Mets', 'New York Yankees', 'Oakland Athletics', 'Philadelphia Phillies', 'Pittsburgh Pirates', 'St. Louis Cardinals', 'San Diego Padres', 'San Francisco Giants', 'Seattle Mariners', 'Tampa Bay Rays', 'Texas Rangers', 'Toronto Blue Jays', 'Washington Nationals']

const mlbTeamId = [30, 2, 25, 21, 11, 23, 26, 6, 7, 12, 29, 20, 5, 28, 1, 15, 19, 3, 8, 14, 18, 10, 27, 24, 22, 13, 4, 16, 17, 9]

function renderMain() {
  const mainDiv = document.querySelector('#main')
  const h1 = document.createElement('h1')
  const h3 = document.createElement('h3')

  h1.setAttribute('class', 'ui header')
  h3.setAttribute('class', 'ui header')

  h1.textContent = '7th Inning Stretch'
  h3.textContent = 'A website for MLB game attendees to find the most optimal game experiences. Just pick a team from the dropdown menu, and your results will be sorted based on "Experience Rating!"'

  mainDiv.appendChild(h1)
  mainDiv.appendChild(h3)

  const dropdownDiv = document.createElement('div')
  const input = document.createElement('input')
  const icon = document.createElement('i')
  const defaultDiv = document.createElement('div')
  const menuDiv = document.createElement('div')

  dropdownDiv.setAttribute('class', 'ui fluid search selection dropdown')
  dropdownDiv.setAttribute('id', 'dropdown-new')
  input.setAttribute('type', 'hidden')
  input.setAttribute('name', 'team')
  icon.setAttribute('class', 'dropdown icon')
  defaultDiv.setAttribute('class', 'default text')
  menuDiv.setAttribute('class', 'menu')

  defaultDiv.textContent = 'Select Team'

  dropdownDiv.appendChild(input)
  dropdownDiv.appendChild(icon)
  dropdownDiv.appendChild(defaultDiv)
  dropdownDiv.appendChild(menuDiv)
  mainDiv.appendChild(dropdownDiv)

  mlbTeams.forEach(item => {
    const teamDiv = document.createElement('div')
    for (let n = 0; n < 31; n++) {
      teamDiv.setAttribute('class', 'item')
      menuDiv.appendChild(teamDiv)
    }
    teamDiv.textContent = item
  })
  const itemDiv = document.querySelectorAll('.item')
  let number = 0
  itemDiv.forEach(item => {
    item.setAttribute('data-id', mlbTeamId[number])
    number += 1
  })
  $('#dropdown-new').dropdown()
}

const table = document.createElement('table')
const headerName = ['Save', 'Matchup', 'Time of First Pitch', 'Experience Rating', 'Lowest Ticket Price ($)', 'Average Ticket Price ($)', 'Link to Buy Tickets']

function renderTable() {
  const tableBody = document.createElement('tbody')
  const tableDiv = document.querySelector('#table')
  const head = document.createElement('thead')
  const tableRow = document.createElement('tr')
  headerName.forEach(item => {
    const header = document.createElement('th')
    header.textContent = ''
    for (let i = 0; i < 7; i++) {
      tableRow.appendChild(header)
    }
    header.textContent = item
    if (header.textContent === 'Time of First Pitch') {
      header.setAttribute('id', 'date')
      header.setAttribute('data-key', 'date')
    }
    else if (header.textContent === 'Lowest Ticket Price ($)') {
      header.setAttribute('id', 'lowestTicketPrice')
      header.setAttribute('data-key', 'lowestTicketPrice')
    }
    else if (header.textContent === 'Average Ticket Price ($)') {
      header.setAttribute('id', 'averageTicketPrice')
      header.setAttribute('data-key', 'averageTicketPrice')
    }
    else if (header.textContent === 'Experience Rating') {
      header.setAttribute('id', 'experienceRating')
      header.setAttribute('data-key', 'experienceRating')
    }
    else if (header.textContent === 'Starred') {
      header.setAttribute('id', 'checked')
    }
  })

  table.setAttribute('class', 'ui celled table')

  table.innerHTML = ''

  tableDiv.appendChild(table)
  table.appendChild(head)
  table.appendChild(tableBody)
  head.appendChild(tableRow)

  const keysArray = ['date', 'experienceRating', 'lowestTicketPrice', 'averageTicketPrice']
  head.addEventListener('click', (event) => {
    const $targetDiv = event.target
    const dataAttr = $targetDiv.getAttribute('data-key')
    const isAscending = $targetDiv.classList.contains('ascending')
    $targetDiv.classList.toggle('ascending')
    keysArray.forEach(key => {
      if (dataAttr === key) {
        sortData(games, key, isAscending)
      }
      else if (dataAttr === 'date') {
        sortDate(games, isAscending)
      }
    })
    renderTableData(games)
  })
}

renderMain()

const dropdown = document.querySelector('#dropdown-new')

dropdown.addEventListener('click', (event) => {
  const $targetDiv = event.target
  const id = $targetDiv.getAttribute('data-id')
  if (id) {
    fetchTeamData('/events/' + id)
  }
})
