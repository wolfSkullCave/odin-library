const myLibrary = [];

function Book(title, author, noPages, hasRead) {
  // the constructor...
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.noPages = noPages;
  this.hasRead = hasRead;
}

Book.prototype.toggleRead = function () {
  this.hasRead = !this.hasRead;
};

function addBookToLibrary(title, author, noPages, hasRead) {
  // take params, create a book then store it in the array
  const newBook = new Book(title, author, noPages, hasRead);
  myLibrary.push(newBook);
}
// Help text for addBookToLibrary
addBookToLibrary.info =
  "addBookToLibrary(title, author, noPages, hasRead): Adds a new book to the library.\nParameters:\n- title (string): The book's title\n- author (string): The book's author\n- noPages (number): Number of pages\n- hasRead (boolean): Read status";

addBookToLibrary.prototype.info = function () {
  return "Title, author, number of pages, read status";
};

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("1984", "George Orwell", 328, false);
console.log(myLibrary);

// building/filling out the table with data from myLibrary array

const tbody = document.querySelector("#bookDetails");

myLibrary.forEach((book) => {
  // create a row element
  const row = document.createElement("tr");
  tbody.appendChild(row);

  // loop over book object getting keys and values
  for (const [key, value] of Object.entries(book)) {
    if (key != "id") {
      // create <td> element
      const td = document.createElement("td");
      row.appendChild(td);

      // create a text node for the <td> element
      const txtVal = document.createTextNode(value);
      td.appendChild(txtVal);
    }
  }
});
