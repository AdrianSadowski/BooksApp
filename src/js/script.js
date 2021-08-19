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

  render();
 

}
