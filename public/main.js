/* global $ */

function fetchTeamData(path) {
  fetch(path)
    .then(res => res.json())
    .then(data => {
      sortDataRating(data)
      renderTable()
      // renderTableData(data)

      const tableBody = document.createElement('tbody')

      data.forEach(object => {
        const tableRow = document.createElement('tr')
        const date = utcToString(object.date)
        object.date = date
        for (let key in object) {
          const tableData = document.createElement('td')
          if (key === 'url') {
            const aTag = document.createElement('a')
            aTag.href = object.url
            aTag.textContent = object.url
            tableData.appendChild(aTag)
          }
          else {
            tableData.textContent = object[key]
          }
          tableRow.appendChild(tableData)
        }
        tableBody.appendChild(tableRow)
      })
      table.appendChild(tableBody)
    })
    .catch(err => {
      console.log('ERROR', err)
    })
}

function utcToString(utc) {
  const utcDate = utc.toString()
  const date = new Date(utcDate)
  const newDate = new Date(utcDate).toUTCString()
  const newerDate = newDate.split(' ').slice(0, 4).join(' ')
  const twelveDate = formatTime(date)
  return newerDate + ', ' + twelveDate
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

function sortDataRating(object) {
  object.sort((a, b) => {
    return parseFloat(b.experienceRating) - parseFloat(a.experienceRating)
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
const headerName = ['Matchup', 'First Pitch', 'Experience Rating', 'Lowest Ticket Price ($)', 'Average Ticket Price ($)', 'Link to Buy Tickets']

function renderTable() {
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
  })

  table.setAttribute('class', 'ui celled table')

  table.innerHTML = ''
  tableDiv.appendChild(table)
  table.appendChild(head)
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
