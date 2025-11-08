/* script.js
Purpose:
- Defines a simple Book and Library class.
  - Renders books into the DOM, handles toggling read status and deleting
    books, and wires the "Add new book" form to push new Book instances
    into the `library` and re-render the list.
Book
- Stores properties for a book objects
Library
- Constructor:
  - Accepts an array of books and a div to display them in.
- Render method: 
  - Creates and displays DOM elements
  - Adds event listeners to the buttons
- Clear
  - Clears the bookListDiv and re-renders the books array to DOM
  
*/

class Book {
  constructor(title, author, pages, readStatus) {
    this.id = crypto.randomUUID(); // generate a unique ID for each book
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
  }
}

// Render Library -------------------------------------------------------

class Library {
  constructor(books, bookListDiv) {
    this.books = books;
    this.bookListDiv = bookListDiv;
  }

  render() {
    this.books.map((book) => {
      // Create HTML elements
      const bookCard = document.createElement("div");
      const cardTitle = document.createElement("h3");
      const cardAuthor = document.createElement("p");
      const cardPages = document.createElement("p");
      const cardStatus = document.createElement("span");
      const cardBtnRead = document.createElement("button");
      const cardBtnDel = document.createElement("button");

      // Add HTML elements to DOM
      this.bookListDiv.appendChild(bookCard);
      bookCard.appendChild(cardTitle);
      bookCard.appendChild(cardAuthor);
      bookCard.appendChild(cardPages);
      bookCard.appendChild(cardBtnRead);
      bookCard.appendChild(cardBtnDel);

      // Adding text to elements
      cardTitle.textContent = book.title;
      cardAuthor.textContent = "by " + book.author;
      cardPages.textContent = book.pages + " pages";
      cardBtnDel.textContent = "Delete Book";
      if (book.readStatus === true) {
        cardBtnRead.textContent = "Read";
        cardBtnRead.classList.add("bookRead");
      } else {
        cardBtnRead.textContent = "Unread";
        cardBtnRead.classList.add("bookUnread");
      }

      // Adding classes to elements
      bookCard.classList.add("book-card");
      cardBtnRead.classList.add("btn-togRead");
      cardBtnDel.classList.add("btn-ghost");
      cardBtnDel.classList.add("btn-delBook");
      cardAuthor.classList.add("author");

      // Adding types to button elements
      cardBtnRead.type = "button";
      cardBtnDel.type = "button";

      // Adding an Identifier to each book in the DOM
      bookCard.id = book.id;
      cardBtnRead.dataset.id = book.id;
      cardBtnDel.dataset.id = book.id;

      // Event listeners
      cardBtnRead.addEventListener("click", (e) => {
        const book = this.books.find((book) => book.id === e.target.dataset.id);
        book.readStatus = !book.readStatus;
        this.clear();
      });

      cardBtnDel.addEventListener("click", (e) => {
        this.books = this.books.filter((obj) => obj.id !== e.target.dataset.id);
        this.clear();
      });
    });
  }

  clear() {
    this.bookListDiv.innerHTML = "";
    this.render();
  }

  listTitles() {
    return this.books.map((book) => book.title);
  }
}

// Creating Book objects
const drizzt_1 = new Book("Homeland", "R.A. Salvatore", 384, true);
const hobbit = new Book("The Hobbit", "J.R.R. Tolkien", 310, true);
const cradle_1 = new Book("Unsouled", "Will Wight", 384, true);
const Katabasis = new Book("Katabasis", "R.F.Kuang R.", 567, false);
const bookListDiv = document.querySelector(".book-list");

const myLib = new Library([drizzt_1, hobbit, cradle_1, Katabasis], bookListDiv);
myLib.render();

// Button Functions ---------------------------------------------------------

document.querySelector("#refreshList").addEventListener("click", function () {
  myLib.clear();
  // console.log('book list div refreshed')
});
