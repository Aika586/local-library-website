import createError from 'http-errors';
import express  from'express';
import path  from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

import indexRouter from './routes/index.js';
import  usersRouter from './routes/users.js';

var app = express();
const mongoDB='mongodb+srv://admin:aikokul89@cluster0.bsqmans.mongodb.net/library?retryWrites=true&w=majority&appName=Cluster0'
mongoose.set("strictQuery", false)
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users/cool', usersRouter);

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

export default app
