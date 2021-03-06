var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//-var connect = require('connect')
var methodOverride = require('method-override')

var routes = require('./routes/index');
var books = require('./routes/books');

var app = express();

//- view engine setup
app.set('views', path.join(__dirname, 'views'));
 //-app.set('view engine', 'jade');
 app.set('view engine', 'pug');

app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/books', books);

//- for pug
app.get('/',(req, res)=>{
  res.render('index')
}
);

//- catch 404 and forward to error handler
app.use(function(req, res, next) {

  res.render("books/error");

});



//- error handlers

//- development error handler
//- will print stacktrace
if (app.get('env') === 'development') {
 app.use(function(err, req, res, next) {
    res.status(err.status || 500);
  res.render('error', {
     message: err.message,
    error: err
  });
 });
} 

//- production error handler

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
   error: {}
 });
});


module.exports = app;
