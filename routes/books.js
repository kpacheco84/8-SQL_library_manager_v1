var express = require('express');
var router = express.Router();

var book = require("../models").book;







//- GET books listing.
router.get('/', function(req, res, next) {
  book.findAll({order: [["createdAt", "DESC"]]}).then(function(book){
    res.render('books/index', {books: book, title: 'Books' });
  }).catch(function(err){
    res.send(500);
  });
});

//- POST create book.

router.post('/', function(req, res, next) {
  book.create(req.body).then(function(book) {
    res.redirect("/books/" + book.id);
  }).catch(function(err){
    if(err.name === "SequelizeValidationError"){
      res.render('books/new-book', {book: book.build(req.body),
         title: 'New book',
         errors:err.errors
        
        });
  }else{
    throw err;
  }
  }).catch(function(err){
    res.send(500);
  });
});


//-Create a new book form.
router.get('/new-book', function(req, res, next) {
  res.render('books/new-book', {book: book.build(), title: 'New book'});
});
//- Edit book form.
router.get('/:id/update-book', function(req, res, next){
  book.findByPk(req.params.id).then(function(book) {
    if(book){
    res.render('books/update-book', {book: book, title: 'Edit book'});
    }else {
      res.send(404);
    }
  
  }).catch(function(err){
    res.send(500);
  });
});


//- Delete book form. 
router.get('/:id/delete', function(req, res, next){
  book.findByPk(req.params.id).then(function(book) {
    if(book){
    res.render('books/delete', {book: book, title: 'Delete book'});
  }else {
    res.send(404);
  }
  }).catch(function(err){
    res.send(500);
  });
});


//-GET individual book. 
router.get("/:id", function(req, res, next){
  book.findByPk(req.params.id).then(function(book){
    if(book){
    res.render("books/show", {book: book, title: book.title, genre: book.genre,year: book.year });
  }else {
    res.send(404);
  }
 }).catch(function(err){
    res.send(500);
  });
});

//- PUT update book.
router.put('/:id', function(req, res, next){
  book.findByPk(req.params.id).then(function(book) {
    
    if(book){
    return book.update(req.body);
  }else {
    res.send(404);
  }
  }).then(function(book){
    res.redirect("/books/" + book.id);    
  }).catch(function(err){
    if(err.name === "SequelizeValidationError"){
      var book = book.build(req.body);
      book.id = req.params.id;

      res.render('books/update-book', {
        book: book,
        title: 'Edit book',
        errors:err.errors
      });
  }else{
    throw err;
  }
  })
   .catch(function(err){
    res.send(500);
  });
});

//- DELETE individual book. 
router.delete('/:id', function(req, res, next){
  book.findByPk(req.params.id).then(function(book) {
    if(book){
   
    return book.destroy();
  }else {
    res.send(404);
  }
  }).then(function(){
    res.redirect("/books");
  }).catch(function(err){
    res.send(500);
  });
});

module.exports = router;