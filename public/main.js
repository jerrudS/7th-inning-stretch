/* global $ */

let teamData = []
function fetchTeamData(path) {
  fetch(path)
    .then(res => res.json())
    .then(data => {
      teamData = data
      sortExpRating(teamData)
      renderTable()
      toggleData(teamData, 'lowestTicketPrice')
      toggleData(teamData, 'date')
      toggleData(teamData, 'averageTicketPrice')
      toggleData(teamData, 'experienceRating')
      // utcToString(teamData)
      renderTableData(teamData)
    })
    .catch(err => {
      console.log('ERROR', err)
    })
}

function renderTableData(obj) {
  const tableBody = document.querySelector('tbody')
  tableBody.innerHTML = ''
  obj.forEach(object => {
    const tableRow = document.createElement('tr')
    for (let key in object) {
      const tableData = document.createElement('td')
      if (key === 'url') {
        const aTag = document.createElement('a')
        aTag.setAttribute('class', 'ui positive button')
        aTag.href = object.url
        aTag.textContent = 'Buy Tickets'
        tableData.appendChild(aTag)
      }
      else if (key === 'experienceRating') {
        const rating = (object[key] * 100)
        const ratingArray = []
        const stringRating = rating.toString()
        ratingArray.push(stringRating)
        const slicedArray = ratingArray[0].slice(0, 5)
        tableData.textContent = slicedArray
      }
      else if (key === 'date') {
        const utcDate = (object.date).toString()
        const date = new Date(utcDate)
        const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
        const newerDate = newDate.toUTCString()
        const newestDate = newerDate.split(' ').slice(0, 4).join(' ')
        const twelveDate = formatTime(date)
        tableData.textContent = newestDate + '; ' + twelveDate
      }
      else {
        tableData.textContent = object[key]
      }
      tableRow.appendChild(tableData)
    }
    tableBody.appendChild(tableRow)
  })
  table.appendChild(tableBody)
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

function sortExpRating(object) {
  object.sort((a, b) => {
    return parseFloat(b.experienceRating) - parseFloat(a.experienceRating)
  })
}

function sortDataDescending(object, key) {
  object.sort((a, b) => {
    return parseFloat(b[key]) - parseFloat(a[key])
  })
}

function sortDataAscending(object, key) {
  object.sort((a, b) => {
    return parseFloat(a[key]) - parseFloat(b[key])
  })
}

function sortDateAscending(object) {
  object.sort((a, b) => {
    return new Date(a.date) - new Date(b.date)
  })
}

function sortDateDescending(object) {
  object.sort((a, b) => {
    return new Date(b.date) - new Date(a.date)
  })
}

function toggleData(object, key) {
  const header = document.querySelector('thead')
  let clickCount = 0
  header.addEventListener('click', (event) => {
    const $targetDiv = event.target
    const dataAttr = $targetDiv.getAttribute('data-key')
    if (dataAttr === key & clickCount % 2 === 0) {
      sortDataAscending(object, key)
      renderTableData(teamData)
      clickCount += 1
    }
    else if (dataAttr === key & clickCount % 2 !== 0) {
      sortDataDescending(object, key)
      renderTableData(teamData)
      clickCount += 1
    }
    else if (dataAttr === 'date' & clickCount % 2 === 0) {
      sortDateAscending(object)
      renderTableData(teamData)
      clickCount += 1
    }
    else if (dataAttr === 'date' & clickCount % 2 !== 0) {
      sortDateDescending(object)
      renderTableData(teamData)
      clickCount += 1
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
  h3.textContent = 'A website for MLB game attendees to find the most optimal game experiences. Just pick a team from the dropdown menu, and your results will be sorted based on the popularity of the game!'

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
const headerName = ['Matchup', 'Date; Time of First Pitch', 'Experience Rating', 'Lowest Ticket Price ($)', 'Average Ticket Price ($)', 'Link to Buy Tickets']

function renderTable() {
  const tableBody = document.createElement('tbody')
  const tableDiv = document.querySelector('#table')
  const head = document.createElement('thead')
  const tableRow = document.createElement('tr')
  headerName.forEach(item => {
    const header = document.createElement('th')
    header.textContent = ''
    for (let i = 0; i < 6; i++) {
      tableRow.appendChild(header)
    }
    header.textContent = item
    if (header.textContent === 'Date; Time of First Pitch') {
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
  })

  table.setAttribute('class', 'ui celled table')

  table.innerHTML = ''

  tableDiv.appendChild(table)
  table.appendChild(head)
  table.appendChild(tableBody)
  head.appendChild(tableRow)
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
