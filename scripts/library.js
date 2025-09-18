/**
 * library.js
 * ----------
 * Purpose:
 *   Creates book objects, adds them to a library array object and then saves the
 *   library array object to local storage.
 */

function Library(...books) {
  // Library object

  // Accepts multiple books as a parameter
  this.collection = [];
  this.collection.push(...books);
}

Library.prototype.addBook = function (book) {
  this.collection.push(book);
};

Library.prototype.saveLibrary = function () {
  // Save collection to local storage
  localStorage.setItem("myBooks", JSON.stringify(this.collection));
};

Library.prototype.getLibrary = function () {
  // Retrieve collection from local storage
  return JSON.parse(localStorage.getItem("myBooks"));
};

Library.prototype.clear = function () {
  // Clear everything from local storage
  // localStorage.clear();

  // Clear collection from local storage
  localStorage.removeItem("myBooks");
};

function Book(title, author, pages, readStatus) {
  // Book object

  this.id = crypto.randomUUID(); // generate a unique ID for each book
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

Book.prototype.changeReadStatus = function () {
  this.readStatus = !this.readStatus;
};

Book.prototype.info = function () {
  // console.log(
  //   `ID: ${this.id}, Title: ${this.title}, Author: ${this.author}, Pages: ${this.pages}, Read: ${this.readStatus}`
  // );
  return `ID: ${this.id}, Title: ${this.title}, Author: ${this.author}, Pages: ${this.pages}, Read: ${this.readStatus}`;
};

// Creating Book objects
const drizzt_1 = new Book("Homeland", "R.A. Salvatore", 384, true);
const hobbit = new Book("The Hobbit", "J.R.R. Tolkien", 310, true);
const cradle_1 = new Book("Unsouled", "Will Wight", 384, true);
const Katabasis = new Book("Katabasis", "R.F.KuangR.", 567, false);

// Adding Book objects to a Library object and saving the Library object to
// local storage.
const myLibrary = new Library(drizzt_1, hobbit, cradle_1, Katabasis);
myLibrary.saveLibrary();


// Render Library ----------------------------------------------------------

