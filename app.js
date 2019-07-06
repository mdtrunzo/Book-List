// Book Constructor

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor

function UI() {

}

UI.prototype.addBookToList = function (book) {
  const list = document.getElementById('book-list')
  // Create element
  const row = document.createElement('tr')
  // Insert col
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</td>
  `
  list.appendChild(row)
}
// Show alert

UI.prototype.showAlert = function (message, className) {
  // Create div
  const div = document.createElement('div')
  // Add classname
  div.className = `alert ${className}`
  // Add text
  div.appendChild(document.createTextNode(message))
  // Get parent
  const container = document.querySelector('.container')
  const form = document.querySelector('#book-form')
  // Insert alert
  container.insertBefore(div, form)
  // Timeout after 3 seconds
  setTimeout(function () {
    document.querySelector('.alert').remove()
  }, 3000)
}
// Delete book
UI.prototype.deleteBook = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove()
  }
}

// Clear fields

UI.prototype.clearFields = function () {
  document.getElementById('title').value = ''
  document.getElementById('author').value = ''
  document.getElementById('isbn').value = ''
}

// Event listeners
document.getElementById('book-form').addEventListener('submit', function (e) {

  const title = document.getElementById('title').value
  const author = document.getElementById('author').value
  const isbn = document.getElementById('isbn').value

  // Crear objeto book
  const book = new Book(title, author, isbn)

  // UI
  const ui = new UI()

  // Validete
  if (title === '' || author === '' || isbn === '') {
    // Error alert
    ui.showAlert('Please fill in all fields', 'error')
  } else {
    // Add book to list
    ui.addBookToList(book)
    // Show succes
    ui.showAlert('Book added !', 'success')
    // Clear fields
    ui.clearFields()
  }

  e.preventDefault()
})

// Event listener for delete
document.getElementById('book-list').addEventListener('click',
  function (e) {

    const ui = new UI()

    ui.deleteBook(e.target)

    // Show message

    ui.showAlert('Book Remove!', 'success')

    e.preventDefault()
  })


