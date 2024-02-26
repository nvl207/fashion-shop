var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');  // phục vụ cho web
var logger = require('morgan'); // gói ghi lại nhật ký

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoriesRouter = require('./routes/categories');
var ordersRouter = require('./routes/orders');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());  // yêu cầu express bật chế độ json
app.use(express.urlencoded({ extended: false }));  // mã hóa url 1 cách an toàn
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));  //lấy thư mục public chứa các file tĩnh như hình ảnh,...



app.use('/', indexRouter);   // khi gõ http://localhost:3000/ thì sẽ vào indexRouter để thực hiện
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/orders', ordersRouter);

// ở đây không thấy đường dẫn nào nữa sẽ báo lỗi k tìm thấy 404
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404)); // lỗi 404 là do client
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

module.exports = app;
