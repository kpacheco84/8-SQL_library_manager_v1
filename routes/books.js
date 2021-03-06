var express = require('express');
var router = express.Router();

var book = require("../models").book;






//- GET books listing.
router.get('/', function(req, res, next) {
  book.findAll({order: [["createdAt", "DESC"]]}).then(function(book){
    res.render('books/index', {books: book, title: 'Books' });
  }).catch(function(err){
    res.render("books/error");
  });
});

//- POST create book.

router.post('/', function(req, res, next) {
  book.create(req.body).then(function(book) {
   res.redirect("/books");
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
    res.render('books/update-book', {book: book, title: 'Edit Book'});
    }else {
      res.render("books/page-not-found");
    }
  
  }).catch(function(err){
    res.render("books/error");
  });
});



/* GET individual book */

router.get("/:id", function(req, res, next){
  book.findByPk(req.params.id).then(function(book){
    if(book){
      res.render('books/update-book', {book: book, title: 'Edit Book'});
} else {
    res.render("books/page-not-found");
  }
}).catch(function(error){
  res.render("books/error");
  });
});


//- PUT update book.
router.put('/:id', function(req, res, next){
  book.findByPk(req.params.id).then(function(book) {
    
    if(book){
    return book.update(req.body);
  }else {
    res.render("books/page-not-found");
  }
  }).then(function(book){
    res.redirect("/books");
  }).catch(function(err){
   
      if(err.name === "SequelizeValidationError"){
        res.render('books/update-book', {book: book.build(req.body),
           title: 'Edit Book',
           errors:err.errors
          
          });
  }else{
    throw err;
  }
  })
   .catch(function(err){
    res.render("books/error");
  });
});

//- DELETE individual book. 
router.delete('/:id', function(req, res, next){
  book.findByPk(req.params.id).then(function(book) {
    if(book){
   
    return book.destroy();
  }else {
    res.render("books/page-not-found");
  }
  }).then(function(){
    res.redirect("/books");
  }).catch(function(err){
    res.render("books/error");
  });
});

module.exports = router;