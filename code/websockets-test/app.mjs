import createError from 'http-errors';
import express from 'express';
import path from 'path';
import { approotdir } from './approotdir.mjs';
const __dirname = approotdir;

import { normalizePort, onError, onListening } from './bin/www.mjs';

import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { router as indexRouter, init } from './routes/index.mjs';

export const app = express();

import { createServer } from 'http';
import { Server } from 'socket.io';

export const server = createServer(app);
export const io = new Server(server, {
  /* options */
});
init();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
