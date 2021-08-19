{
  'use strict';

  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
    },
    booksImages: {
      images: '.books-list .book__image',
    }
  };
  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };


  function render() {
    const thisBook = this;

    for (let eachBook of dataSource.books){
      const generatedHTML = templates.bookTemplate(eachBook);
      
      // element dom na podstawie kodu HTML
      const element = utils.createDOMFromHTML(generatedHTML);
      //console.log ('element:', element);

      // wygenerowany element dołącz jako nowe dziecko do list .books-list
      const bookListContainer = document.querySelector(select.containerOf.booksList);
      //console.log('bookListContainer:', bookListContainer);

      bookListContainer.appendChild(element);
    }
  }

  /*function initActions() {
    const thisBook = this;
    const favoriteBooks = []

    const booksImages = document.querySelectorAll(select.booksImages.images);
    for(let image of booksImages){
      //console.log('image', image);
      image.addEventListener('dbclick', function(event){
        event.preventDefault();
        image.classList.add('favorite');
        const idBook = image.getAttribute('data-id');
        favoriteBooks.push(idBook);
      })
    }
    console.log('favoriteBooks', favoriteBooks);
  }
  // wywołanie funkcji
  */
  render();
  //initActions();

}
