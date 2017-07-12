function expressData(path) {
  fetch(path)
    .then(res => res.json())
    .then(data => console.log(data))
}
expressData('/events/new-york-mets')

const dropdown = document.querySelector('#dropdown')

dropdown.addEventListener('change', function () {
  console.log('changing')
})
