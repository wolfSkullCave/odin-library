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


addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("1984", "George Orwell", 328, false);
console.log(myLibrary);
