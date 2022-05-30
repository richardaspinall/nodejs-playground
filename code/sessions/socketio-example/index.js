import path from 'path';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import session from 'express-session';

const app = express();
const httpServer = createServer(app);

const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const sessionMiddleware = session({
  secret: 'changeit',
  resave: false,
  saveUninitialized: false,
});

app.use(sessionMiddleware);

app.post('/login', (req, res) => {
  const login = JSON.parse(JSON.stringify(req.body));
  console.log('--- LOGIN DETAILS ---');
  console.log(login);
  req.session.authenticated = true;
  res.redirect('/');
});

httpServer.listen(3000);

const io = new Server(httpServer);

// convert a connect middleware to a Socket.IO middleware
const wrap = (middleware) => (socket, next) => middleware(socket.request, {}, next);

io.use(wrap(sessionMiddleware));

// only allow authenticated users
io.use((socket, next) => {
  const session = socket.request.session;
  if (session && session.authenticated) {
    next();
  } else {
    next(new Error('unauthorized'));
    console.log('Unauthorized session');
  }
});

io.on('connection', (socket) => {
  console.log('Authorized session, socket created!');
  console.log(socket.request.session);
});
