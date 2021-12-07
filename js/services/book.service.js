'use strict';
const STORAGE_KEY = 'bookDB';
const PAGE_SIZE = 5;

var gTitles = [
  'Learning Laravel',
  'Beginning with Laravel',
  'Java for developers',
];
var gBooks;
var gSortBy = {title: '', price: 0};
var gPageIdx = 0;

_createBooks();

function getBooks() {
  const startIdx = gPageIdx * PAGE_SIZE;
  const books = gBooks.slice(startIdx, startIdx + PAGE_SIZE);

  return books;
}

function addBook(title, price) {
  const book = _createBook(title, price);
  gBooks.unshift(book);
  _saveBooksToStorage();
}

function updateBook(bookId, newPrice) {
  const book = gBooks.find((book) => {
    return book.id === bookId;
  });

  book.price = newPrice;
  _saveBooksToStorage();
  return book;
}

function deleteBook(bookId) {
  const bookIdx = gBooks.findIndex((book) => {
    return bookId === book.id;
  });

  gBooks.splice(bookIdx, 1);
  _saveBooksToStorage();
}

function getBookById(bookId) {
  const book = gBooks.find((book) => {
    return bookId === book.id;
  });

  return book;
}

function setBookSort(sortBy) {
    if (sortBy === 'price') gBooks.sort((b1, b2) => (b2.price - b1.price));
    if (sortBy === 'title') gBooks.sort((b1, b2) => b1.title.localeCompare(b2.title));
}

function decrementBookRate(bookId) {
  const book = getBookById(bookId);
  if (book.rate === 0) return;
  book.rate--;
  renderBookRate(book);
}
function incrementBookRate(bookId) {
  const book = getBookById(bookId);
  if (book.rate === 10) return;
  book.rate++;
  renderBookRate(book);
}

function nextPage() {
    if ((gPageIdx + 1) * PAGE_SIZE >= gBooks.length) return;
    gPageIdx++;
}

function prevPage() {
    if (!gPageIdx) return;
    gPageIdx--;
}

function _createBook(title, price) {
  return {
    id: makeId(),
    title,
    price,
    desc: makeLorem(),
    rate: 0,
  };
}

function _createBooks() {
  var books = loadFromStorage(STORAGE_KEY);
  if (!books || !books.length) {
    books = [];

    for (let i = 0; i < gTitles.length; i++) {
      var title = gTitles[i];
      var price = getRandomIntInclusive(12, 50);
      books.push(_createBook(title, price));
    }
  }

  gBooks = books;
  _saveBooksToStorage();
}

function _saveBooksToStorage() {
  saveToStorage(STORAGE_KEY, gBooks);
}
