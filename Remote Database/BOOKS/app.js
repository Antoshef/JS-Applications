
const htmlSelectors = {
    'loadBooks': () => document.getElementById('loadBooks'),
    'createButton': () => document.querySelector('#create-form > button'),
    'createTitle': () => document.getElementById('create-title'),
    'createAuthor': () => document.getElementById('create-author'),
    'createIsbn': () => document.getElementById('create-isbn'),
    'booksContainer': () => document.querySelector('table > tbody'),
    'errorContainer': () => document.getElementById('error-notification'),
    'createForm': document.getElementById('create-form'),
    'editForm': () => document.getElementById('edit-form'),
    'editButton': () => document.querySelector('#edit-form > button'),
    'editAuthor': () => document.getElementById('edit-author'),
    'editTitle': () => document.getElementById('edit-title'),
    'editIsbn': () => document.getElementById('edit-isbn'),
}

htmlSelectors['loadBooks']()
    .addEventListener('click', fetchAllBooks);
htmlSelectors['createButton']()
    .addEventListener('click', createBook);
htmlSelectors['editButton']()
    .addEventListener('click', editBook);

function fetchAllBooks() {
    fetch('https://books-exercise-ec332-default-rtdb.europe-west1.firebasedatabase.app/Books/.json')
        .then(res => res.json())
        .then(renderBooks)
        .catch(handleError)
}

function renderBooks(booksData) {
    const booksContainer = htmlSelectors['booksContainer']();

    if (booksContainer.innerHTML != '') {
        booksContainer.innerHTML = '';
    }

    Object
        .keys(booksData)
        .forEach(bookId => {
            const { title, author, isbn } = booksData[bookId];

            const tableRow = createDOMElement('tr', '', {}, {},
                createDOMElement('td', title, {}, {}),
                createDOMElement('td', author, {}, {}),
                createDOMElement('td', isbn, {}, {}),
                createDOMElement('td', '', {}, {}, 
                    createDOMElement('button', 'Edit', { 'data-key': bookId }, { click: loadBookById }),
                    createDOMElement('button', 'Delete', { 'data-key': bookId }, { click: deleteBook })))

            booksContainer.appendChild(tableRow);
        })
}

function deleteBook() {
    const id = this.getAttribute('data-key');

    const initObj = {
        method: 'DELETE'
    }

    fetch(`https://books-exercise-ec332-default-rtdb.europe-west1.firebasedatabase.app/Books/${id}/.json`, initObj)
        .then(loadBookById)
        .catch(handleError);
}

function loadBookById() {
    const id = this.getAttribute('data-key');

    fetch(`https://books-exercise-ec332-default-rtdb.europe-west1.firebasedatabase.app/Books/${id}.json`)
        .then(res => res.json())
        .then(({ title, author, isbn }) => {
            htmlSelectors['editTitle']().value = title;
            htmlSelectors['editAuthor']().value = author;
            htmlSelectors['editIsbn']().value = isbn;
            htmlSelectors['editForm']().style.display = 'block';
            htmlSelectors['editButton']().setAttribute('data-key', id);
        })
        .catch(handleError);
}

function editBook(e) {
    e.preventDefault();

    const titleInput = htmlSelectors['editTitle']();
    const authorInput = htmlSelectors['editAuthor']();
    const isbnInput = htmlSelectors['editIsbn']();

    if (titleInput.value !== '' && authorInput.value !== '' && isbnInput.value !== '') {
        const id = this.getAttribute('data-key');
        const initObj = {    
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: titleInput.value, author: authorInput.value, isbn: isbnInput.value })
        }
        fetch(`https://books-exercise-ec332-default-rtdb.europe-west1.firebasedatabase.app/Books/${id}/.json`, initObj)
            .then(fetchAllBooks)
            .catch(handleError)

    htmlSelectors['editForm']().style.display = 'none';

    } else {
        const error = { message: '' };

        if (titleInput.value === '') {
            error.message += 'Title input can\'t be empty!';
        } 
        
        if (authorInput.value === '') {
            error.message += 'Author input must not be empty!';
        } 

        if (isbnInput.value === '') {
            error.message += 'Isbn can\'t be empty!';
        }

        handleError(error);
    }

    
}

function handleError(err) {
    const errorContainer = htmlSelectors['errorContainer']();
    errorContainer.textContent = err.message;
    errorContainer.style.display = 'block';
    setTimeout(() => {
        errorContainer.style.display = 'none';
    },30000);
}

function createBook(e) {
    e.preventDefault();

    const titleInput = htmlSelectors['createTitle']();
    const authorInput = htmlSelectors['createAuthor']();
    const isbnInput = htmlSelectors['createIsbn']();

    if (titleInput.value !== '' && authorInput.value !== '' && isbnInput.value !== '') {
        const initObject = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ title: titleInput.value, author: authorInput.value, isbn: isbnInput.value })
        } 

        fetch('https://books-exercise-ec332-default-rtdb.europe-west1.firebasedatabase.app/Books/.json', initObject)
            .then(renderBooks)
            .catch(handleError);

            titleInput.value = '';
            authorInput.value = '';
            isbnInput.value = '';
    } else {
        const error = { message: '' };

        if (titleInput.value === '') {
            error.message += 'Title input can\'t be empty!';
        } 
        
        if (authorInput.value === '') {
            error.message += 'Author input must not be empty!';
        } 

        if (isbnInput.value === '') {
            error.message += 'Isbn can\'t be empty!';
        }

        handleError(error);
    }
}

function createDOMElement(type, text, attributes, events, ...children) {
    const domElement = document.createElement(type);

    if (text !== '') {
        domElement.textContent = text;
    }

    Object.entries(attributes)
        .forEach(([attrKey, attrValue]) => {
            domElement.setAttribute(attrKey, attrValue);
        });

    Object.entries(events)
        .forEach(([eventName, eventHandler]) => {
            domElement.addEventListener(eventName, eventHandler);
        });

    children
        .forEach(child => {
            domElement.appendChild(child);
        });

    return domElement;
}