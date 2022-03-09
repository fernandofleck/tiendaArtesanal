var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require("method-override");

//Requerimos las rutas
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var adminRouter = require('./routes/admin');

// Requerimos middlewares
var maintenance = require('./middlewares/maintenance');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //URL encode - Para que nos pueda llegar la información desde el formulario al req.body
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "..", "public")));
app.use(methodOverride("_method"));

//Implementamos las rutas
app.use(indexRouter);
app.use(usersRouter);
app.use(productsRouter);
app.use(adminRouter);

// Implementamos Middlewares
app.use(maintenance);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Definimos puerto del servidor
app.listen(3300, "localhost", ()=> console.log("Puerto del servidor: 3300"));

module.exports = app;