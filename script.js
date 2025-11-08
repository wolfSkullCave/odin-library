/*
  script.js

  Purpose
  - Implements a minimal in-browser Book/Library UI:
    * `Book` class: a simple data holder for a book record.
    * `Library` class: manages an array of `Book` instances and renders
      them into a target DOM container.
    * Wiring for user interactions: toggling read state, deleting books,
      refreshing the list, and adding new books via a form.

  Contract (inputs / outputs)
  - Inputs:
    * DOM elements expected by the script:
        - `.book-list` — container where book cards are rendered
        - `#refreshList` — button to force a re-render
        - `#newBookForm` — form with inputs `#title`, `#author`, `#pages`
          and a `name="read"` input to indicate read status
    * Programmatic inputs: `Book(title, author, pages, read)`

  - Outputs / side-effects:
    * Mutates DOM by creating/removing/updating book card elements.
    * Mutates in-memory array of books held inside the `Library` instance.

  Data shapes
  - Book instance fields:
    * id: string (UUID from `crypto.randomUUID()`)
    * title: string
    * author: string
    * pages: number (the constructor normalizes the form value to Number)
    * read: boolean (the constructor coerces the form value to boolean)

  Important notes / assumptions
  - Runs in a browser (uses `document`, `crypto.randomUUID()`).
  - This file directly mutates global state and the DOM — it's not an ES
    module and does not export functions.
  - There are some type/name inconsistencies between form values (strings)
    and code expectations (booleans/numbers). Normalizing (parseInt /
    Boolean conversion) at the point of form submission is recommended.
  - If you plan to combine with `scripts/book.js`, consider unifying the
    property names (for example: `pages` vs `noPages`, `read` vs `hasRead`).

  Quick follow-ups (recommended)
  - Convert `pages` to a Number when creating a `Book`.
  - Convert `read` (form value) to a boolean before passing it to `Book`.
  - Normalize property names across the project to avoid subtle bugs.
*/

class Book {
  constructor(title, author, pages, read) {
    this.id = crypto.randomUUID(); // generate a unique ID for each book
    this.title = title;
    this.author = author;
    this.pages = Number(pages);
    this.read = String(read).toLowerCase() === "true";
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
      if (book.read === true) {
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
        book.read = !book.read;
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

  add(book) {
    this.books.push(book);
    this.clear();
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

document.getElementById("newBookForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const pages = document.getElementById("pages").value.trim();
  const read = document.querySelector('input[name="read"]:checked').value;

  const newBook = new Book(title, author, pages, read);
  myLib.add(newBook);
});
