var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const cookieSession = require("cookie-session");

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var fileRouter = require('./routes/file')

// DB
const db = require("./app/models");
const Role = db.role;
const User = db.user;
const bcrypt = require("bcryptjs");

// In development, init database (drop existing tables and re-sync database)
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
// });

// For production
db.sequelize.sync();

// insert table
function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}


var app = express()
// fixing "413 Request Entity Too Large" errors
app.use(express.json({limit: "10mb", extended: true}))
app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));

// db state
// app.use(function(req, res, next) {
//   req.con = connection;
//   next();
// });

app.use(
  cookieSession({
    name: "bezkoder-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);

app.get("/home", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.use('/api', indexRouter)
app.use('/api/users', usersRouter)
app.use('/api/file', fileRouter)
// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
var history = require('connect-history-api-fallback')
app.use(express.static(path.join(__dirname, '../dist')))
app.use(history())

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

// module.exports = app;
var debug = require('debug')('my-application')
app.set('port', process.env.PORT || 3000)

// ??????????????????
const cors = require('cors')
app.use(cors({
  origin: ['http://localhost:8080'],
  methods: ['GET', 'POST']
}))
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  next()
})

// ????????????
var server = app.listen(app.get('port'), function () {
  debug('Express server listening on port ' + server.address().port)
})
