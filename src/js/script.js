/* eslint-disable indent */
{
  'use strict';

  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
      form: '.filters',
    },
    book: {
      image: 'book__image',
      favorite: '.books-list .favorite',
    },
  };

  const classNames = {
    favoriteBook: 'favorite',
    hidden: 'hidden',
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };

  class BookList{

    constructor (){
      const thisBook = this;

      thisBook.initData();
      thisBook.getElements();
      thisBook.render();
      thisBook.initActions();

      
      
    }

    initData() {
      const thisBook = this;

      thisBook.data = dataSource.books;
    }

    getElements() {
      const thisBook = this;

      thisBook.menuContainer = document.querySelector(select.containerOf.booksList);
      thisBook.formHtmlFiltered = document.querySelector(select.containerOf.form);
      
      thisBook.favoriteBooks = [];
      thisBook.filters = [];



    }
    render() {
      const thisBook = this;

      for (let eachBook of dataSource.books){
        const generatedHTML = templates.bookTemplate(eachBook);
        
        // element dom from html
        const element = utils.createDOMFromHTML(generatedHTML);
        //console.log ('element:', element);

        // genedated DOM add to list .books-list as new child
        //const bookListContainer = document.querySelector(select.containerOf.booksList);
        //console.log('bookListContainer:', bookListContainer);

        thisBook.menuContainer.appendChild(element);
      }
    }

    filterBooks(){
      const thisBook = this;

      for (let eachBook of thisBook.data) {
        let shoultBeHidden = false;

        for(let filter of thisBook.filters){
          if(!eachBook.details[filter]){
            shoultBeHidden = true;
            break;
          }
        }
        if (shoultBeHidden) {
          const book = document.querySelector('.book__image[data-id="' + eachBook.id + '"]');
          book.classList.add(classNames.hidden);
        } else {
          const book = document.querySelector('.book__image[data-id="' + eachBook.id + '"]');
          book.classList.remove(classNames.hidden);
        }

      }
    }

    initActions() {
      const thisBook = this;
  

      thisBook.menuContainer.addEventListener('dblclick', function (event) {
        event.preventDefault();

        const elem = event.target.offsetParent;
        //console.log(elem);
        if (elem.classList.contains(select.book.image)) {
          // console.log(select.book.image);
          const id = elem.getAttribute('data-id');

          if (thisBook.favoriteBooks.includes(id)) {
            const indexOfBookID = thisBook.favoriteBooks.indexOf(id);
            elem.classList.remove(classNames.favoriteBook);
            thisBook.favoriteBooks.splice(indexOfBookID, 1);
          }
          else {
            elem.classList.add(classNames.favoriteBook);
            thisBook.favoriteBooks.push(id);
          }
        }
      });

      thisBook.formHtmlFiltered.addEventListener('change', function (event) {
        event.preventDefault();
        const elem = event.target;
        if (elem.type === 'chechbox') {
          if (elem.checked){
            thisBook.filters.push(elem.value);
            //console.log('thisBook.filters', thisBook.filters);
          } else {
            const indexOfFilter = thisBook.filters.indexOf(elem.value);
            thisBook.filters.splice(indexOfFilter, 1);
          }
        }
        thisBook.filterBooks();
        
      });
      
      //console.log('favoriteBooks', thisBook.favoriteBooks);
    }
 
  }

// eslint-disable-next-line no-unused-vars
const app = new BookList();


}
