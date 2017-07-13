/* global $ */

function expressData(path) {
  fetch(path)
    .then(res => res.json())
    .then(data => {
      console.log(data)

      const tableBody = document.createElement('tbody')

      data.forEach(object => {
        const tableRow = document.createElement('tr')
        for (let key in object) {
          const tableData = document.createElement('td')
          tableData.textContent = object[key]
          tableRow.appendChild(tableData)
        }
        tableBody.appendChild(tableRow)
      })
      console.log(tableBody)
      table.appendChild(tableBody)
    })
}
expressData('/events/new-york-mets')

const mlbTeams = ['Arizona Diamondbacks', 'Atlanta Braves', 'Baltimore Orioles', 'Boston Red Sox', 'Chicago Cubs', 'Chicago White Sox', 'Cincinnati Reds', 'Cleveland Indians', 'Colorado Rockies', 'Detroit Tigers', 'Miami Marlins', 'Houston Astros', 'Kansas City Royals', 'Los Angeles Angels of Anaheim', 'Los Angeles Dodgers', 'Milwaukee Brewers', 'Minnesota Twins', 'New York Mets', 'New York Yankees', 'Oakland Athletics', 'Philadelphia Phillies', 'Pittsburgh Pirates', 'St. Louis Cardinals', 'San Diego Padres', 'San Francisco Giants', 'Seattle Mariners', 'Tampa Bay Rays', 'Texas Rangers', 'Toronto Blue Jays', 'Washington Nationals']

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
  $('#dropdown-new').dropdown()
}
renderMain()

const headerName = ['Matchup', 'Date', 'Experience Rating', 'Lowest Ticket Price', 'Average Ticket Price', 'Link to Buy Tickets']
const table = document.createElement('table')

function renderTable() {
  const tableDiv = document.querySelector('#table')
  const head = document.createElement('thead')
  const tableRow = document.createElement('tr')

  headerName.forEach(item => {
    const header = document.createElement('th')
    for (let i = 0; i < 6; i++) {
      tableRow.appendChild(header)
    }
    header.textContent = item
  })

  table.setAttribute('class', 'ui celled table')

  tableDiv.appendChild(table)
  table.appendChild(head)
  head.appendChild(tableRow)
}

const dropdown = document.querySelector('#dropdown-new')
dropdown.addEventListener('change', () => {
  renderTable()
})
