var express = require('express');
var router = express.Router();

var Article = require("../models").Article;







//- GET articles listing.
router.get('/', function(req, res, next) {
  Article.findAll({order: [["createdAt", "DESC"]]}).then(function(articles){
    res.render('articles/index', {articles: articles, title: 'My Awesome Blog' });
  }).catch(function(err){
    res.send(500);
  });
});

//- POST create article.

router.post('/', function(req, res, next) {
  Article.create(req.body).then(function(article) {
    res.redirect("/articles/" + article.id);
  }).catch(function(err){
    if(err.name === "SequelizeValidationError"){
      res.render('articles/new-book', {article: Article.build(req.body),
         title: 'New Article',
         errors:err.errors
        
        });
  }else{
    throw err;
  }
  }).catch(function(err){
    res.send(500);
  });
});


//-Create a new article form.
router.get('/new-book', function(req, res, next) {
  res.render('articles/new-book', {article: Article.build(), title: 'New Article'});
});
//- Edit article form.
router.get('/:id/update-book', function(req, res, next){
  Article.findByPk(req.params.id).then(function(article) {
    if(article){
    res.render('articles/update-book', {article: article, title: 'Edit Article'});
    }else {
      res.send(404);
    }
  
  }).catch(function(err){
    res.send(500);
  });
});


//- Delete article form. 
router.get('/:id/delete', function(req, res, next){
  Article.findByPk(req.params.id).then(function(article) {
    if(article){
    res.render('articles/delete', {article: article, title: 'Delete Article'});
  }else {
    res.send(404);
  }
  }).catch(function(err){
    res.send(500);
  });
});


//-GET individual article. 
router.get("/:id", function(req, res, next){
  Article.findByPk(req.params.id).then(function(article){
    if(article){
    res.render("articles/show", {article: article, title: article.title, genre: article.genre,year: article.year });
  }else {
    res.send(404);
  }
 }).catch(function(err){
    res.send(500);
  });
});

//- PUT update article.
router.put('/:id', function(req, res, next){
  Article.findByPk(req.params.id).then(function(article) {
    
    if(article){
    return article.update(req.body);
  }else {
    res.send(404);
  }
  }).then(function(article){
    res.redirect("/articles/" + article.id);    
  }).catch(function(err){
    if(err.name === "SequelizeValidationError"){
      var article = Article.build(req.body);
      article.id = req.params.id;

      res.render('articles/update-book', {
        article: article,
        title: 'Edit Article',
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

//- DELETE individual article. 
router.delete('/:id', function(req, res, next){
  Article.findByPk(req.params.id).then(function(article) {
    if(article){
   
    return article.destroy();
  }else {
    res.send(404);
  }
  }).then(function(){
    res.redirect("/articles");
  }).catch(function(err){
    res.send(500);
  });
});

module.exports = router;