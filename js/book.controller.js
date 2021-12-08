'use strict';

function onInit() {
  renderBooks();
}

function renderBooks() {
  const books = getBooks();
  const strHtmls = books.map((book) => {
    return `
        <tr>
        <td>${book.id}</td>
        <td>${book.title}</td>
        <td>${formatCurrency(convertToIls(book.price))}</td>
        <td>
        <table class="actions">
        <tr>
        <td><button data-trans="read-btn" class="btn read-btn" onclick="onReadBook('${book.id}')">Read</button></td>
        <td><button data-trans="update-btn" class="btn update-btn" onclick="onUpdateBook('${book.id}')">Update</button></td>
        <td><button data-trans="del-btn" class="btn del-btn" onclick="onDeleteBook('${book.id}')">Delete</button></td>
        </tr>
        </table>
        </td>
        </tr>
        `;
  });

  document.querySelector('.books-container').innerHTML = strHtmls.join('');
  doTrans();
}

function renderBookRate(book) {
    document.querySelector('.modal div').innerHTML = `<button onclick="decrementBookRate('${book.id}')">-</button><span>${book.rate}</span><button onclick="incrementBookRate('${book.id}')">+</button>`;
}

function onDeleteBook(bookId) {
    deleteBook(bookId);
    renderBooks();
}

function onCreateNewBook() {
    document.querySelector('.form').style.display = 'flex';
}

function onSubmitCreateNewBook(ev) {
    ev.preventDefault();
    const NEW_TITLE = document.querySelector('.newTitle');
    const NEW_PRICE = document.querySelector('.newPrice');

    if (!NEW_TITLE.value || !NEW_PRICE.value) return;
    const book = addBook(NEW_TITLE.value, NEW_PRICE.value);
        renderBooks();
        document.querySelector('.form').style.display = 'none'
        NEW_TITLE.value = '';
        NEW_PRICE.value = '';

}

function onCancelCreateNewBook(ev) {
    ev.preventDefault();
    document.querySelector('.newTitle').value = '';
    document.querySelector('.newPrice').value = '';
    document.querySelector('.form').style.display = 'none';
}

function onSetSortBy(sortBy) {
    setBookSort(sortBy);
    renderBooks();
}

function onUpdateBook(bookId) {
    const newPrice = +prompt(getTrans('update-price-modal'));
    if (newPrice) {
        const book = updateBook(bookId, newPrice);
        renderBooks();
    }
}

function onReadBook(bookId) {
    const book = getBookById(bookId);
    const elModal = document.querySelector('.modal');
    elModal.querySelector('h3').innerText = book.title;
    elModal.querySelector('h4 span').innerText = formatCurrency(convertToIls(book.price));
    elModal.querySelector('div').innerHTML = `<button onclick="decrementBookRate('${book.id}')">-</button><span>${book.rate}</span><button onclick="incrementBookRate('${book.id}')">+</button>`;
    elModal.querySelector('p').innerText = book.desc;
    document.querySelector('.modal').classList.add('open');
}

function onCloseModal() {
    document.querySelector('.modal').classList.remove('open');
}

function onNextPage() {
    nextPage();
    renderBooks();
}

function onPrevPage() {
    prevPage();
    renderBooks();
}

function onSetLang(lang) {
    setLang(lang);

    if (lang === 'he') {
        document.body.classList.add('rtl');
    } else {
        document.body.classList.remove('rtl')
    }

    doTrans();
    renderBooks();
}