var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var fileUpload = require('express-fileupload')
const session = require('express-session');
require('dotenv/config');
var cors = require('cors')
var bodyParser = require("body-parser");


const connectDB = async ()=>{
  try {
    // await mongoose.connect('mongodb://restricted:*****@103.72.96.42:27017/?authSource=WebBDS')
    await mongoose.connect('mongodb://127.0.0.1:27017/WebBDS')
    console.log("MongoDB connected")
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

connectDB()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var employeeRouter = require('./routes/employees')
var employmentStatusRouter = require('./routes/employmentStatus')
var investorsRouter = require('./routes/investors')
var axisRouter = require('./routes/axis')
var balconyDirectionRouter =require('./routes/balconyDirection')
var propertyRouter = require('./routes/property')
var statusRouter = require('./routes/status')
var ownerRouter = require('./routes/owner')
var projectRouter = require('./routes/project')
var buildingRouter = require('./routes/building')
var apartmentRouter =require('./routes/aprtment')
var imageRouter = require('./routes/image')
var loginRouter = require('./routes/login')
var furnishedRouter = require('./routes/furnished')

const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};


var app = express();
app.use(express.json())
// app.use(cors(corsOpts))
app.use(cors())

app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
  // cookie: { maxAge: 300000 }
}))

app.use('/furnished', furnishedRouter)
app.use('/furnished/create', furnishedRouter)
app.use('/furnished/delete', furnishedRouter)
app.use('/furnished/edit', furnishedRouter)
app.use('/furnished/detail', furnishedRouter)

app.use('/', indexRouter);
app.use('/khoretal', indexRouter);
app.use('/request', indexRouter);
app.use('/create', indexRouter);
app.use('/delete', indexRouter)
app.use('/edit', indexRouter)
app.use('/request-data', indexRouter)
app.use('/approve-data', indexRouter)


app.use('/login', loginRouter)
app.use('/login/token', loginRouter)

app.use('/user', usersRouter);
app.use('/user/register', usersRouter);
app.use('/user/delete', usersRouter)
app.use('/user/edit', usersRouter)
app.use('/user/detail', usersRouter)

app.use('/employee',employeeRouter)
app.use('/employee/create',employeeRouter)
app.use('/employee/edit',employeeRouter)
app.use('/employee/delete',employeeRouter)
app.use('/employee/detail',employeeRouter)

app.use('/employmentStatus',employmentStatusRouter)
app.use('/employmentStatus/create',employmentStatusRouter)
app.use('/employmentStatus/delete',employmentStatusRouter)
app.use('/employmentStatus/edit',employmentStatusRouter) 

app.use('/investor', investorsRouter)
app.use('/investor/create', investorsRouter)
app.use('/investor/edit', investorsRouter)
app.use('/investor/delete', investorsRouter)

app.use('/axis',axisRouter)
app.use('/axis/create',axisRouter)
app.use('/axis/edit',axisRouter)
app.use('/axis/delete',axisRouter)
app.use('/axis/detail',axisRouter)

app.use('/balconyDirection',balconyDirectionRouter)
app.use('/balconyDirection/create',balconyDirectionRouter)
app.use('/balconyDirection/edit',balconyDirectionRouter)
app.use('/balconyDirection/delete',balconyDirectionRouter)
app.use('/balconyDirection/detail',balconyDirectionRouter)

app.use('/property',propertyRouter)
app.use('/property/create',propertyRouter)
app.use('/property/edit',propertyRouter)
app.use('/property/delete',propertyRouter)
app.use('/property/detail',propertyRouter)

app.use('/owner',ownerRouter)
app.use('/owner/create',ownerRouter)
app.use('/owner/edit',ownerRouter)
app.use('/owner/delete',ownerRouter)

app.use('/status',statusRouter)
app.use('/status/create',statusRouter)
app.use('/status/edit',statusRouter)
app.use('/status/delete',statusRouter)
app.use('/status/detail',statusRouter)

app.use('/project', projectRouter)
app.use('/project/create',projectRouter)
app.use('/project/edit',projectRouter)
app.use('/project/delete',projectRouter)
app.use('/project/detail',projectRouter)

app.use('/building', buildingRouter)
app.use('/building/create',buildingRouter)
app.use('/building/edit',buildingRouter)
app.use('/building/delete',buildingRouter)
app.use('/building/detail',buildingRouter)

app.use('/apartment', apartmentRouter)
app.use('/apartment/create',apartmentRouter)
app.use('/apartment/edit',apartmentRouter)
app.use('/apartment/delete',apartmentRouter)
app.use('/apartment/detail', apartmentRouter)
app.use('/apartment/upload', apartmentRouter)
app.use('/apartment/delete-image', apartmentRouter)
app.use('/apartment/search', apartmentRouter)
app.use('/apartment/khosale', apartmentRouter);
app.use('/apartment/approve', apartmentRouter);
app.use('/apartment/request-data', apartmentRouter);
app.use('/apartment/approve-data', apartmentRouter);


app.use('/image', imageRouter)
app.use('/image/create',imageRouter)
app.use('/image/edit',imageRouter)
app.use('/image/delete',imageRouter)
app.use('/image/deleteImage',imageRouter)
app.use('/image/addImage',imageRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
var user = req.session.user
  // render the error page
  res.status(err.status || 500);
  res.render('error', {user: user});
});

module.exports = app;
