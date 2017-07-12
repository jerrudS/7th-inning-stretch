function expressData(path) {
  fetch(path)
    .then(res => res.json())
    .then(data => console.log(data))
}
expressData('/events/new-york-mets')

function renderTable() {
  const tableDiv = document.querySelector('#table')
  const table = document.createElement('table')
  const head = document.createElement('thead')
  const tableRow = document.createElement('tr')
  for (let i = 0; i < 7; i++) {
    const header = document.createElement('th')
    tableRow.appendChild(header)
    header.textContent = 'Header'
  }
  table.setAttribute('class', 'ui celled table')

  tableDiv.appendChild(table)
  table.appendChild(head)
  head.appendChild(tableRow)

  const tableBody = document.createElement('tbody')
  table.appendChild(tableBody)

  function createRow() {
    const tableRow2 = document.createElement('tr')
    for (let j = 0; j < 7; j++) {
      const tableData = document.createElement('td')
      tableData.textContent = 'Cell'
      tableRow2.appendChild(tableData)
    }
    tableBody.appendChild(tableRow2)
  }
  for (let x = 0; x < 15; x++) {
    createRow()
  }
}
renderTable()

const dropdown = document.querySelector('#dropdown')

dropdown.addEventListener('change', () => {
  console.log('changing')
})
