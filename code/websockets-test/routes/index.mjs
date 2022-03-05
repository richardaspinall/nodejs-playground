import express from 'express';
export const router = express.Router();
import { io } from '../app.mjs';

/* GET home page. */

const games = [
  { id: 'game1', players: [], turn: undefined },
  { id: 'game2', players: [], turn: undefined },
];
export function init() {
  io.on('connection', (socket) => {
    // ...
    console.log(`connected ${socket.id}`);
    console.log(typeof games[0].players[0]);
    if (games[0].players.length <= 2) {
      socket.join(games[0].id);
      games[0].players.push(socket.id);

      if (games[0].players.length == 2) {
        games[0].turn = setTimeout(() => {
          console.log(`${socket.id} auto-folds`);
          io.to(games[0].id).emit('auto-fold', { user: socket.id, game: games[0].id });
        }, 5000);
      }
    } else {
      socket.join(games[1].id);
      games[1].players.push(socket.id);
    }
    socket.on('disconnect', function () {
      console.log(`${socket.id} disconnects`);
      const userid = socket.id;
      io.to(games[0].id).emit('auto-fold', { user: userid, game: games[0].id });
      const index = games[0].players.indexOf(socket.id);
      console.log(index);
      if (index > -1) {
        games[0].players.splice(index, 1);
      }
      clearTimeout(games[0].turn);
    });
    socket.on('fold', (event) => {
      clearTimeout(games[0].turn);
      console.log(`${socket.id} folded`);
      for (let i = 0; i < games.length; i++) {
        for (let j = 0; j < games[i].players.length; j++) {
          if (games[i].players[j] == socket.id) {
            io.to(games[i].id).emit('user-folds', { user: socket.id, game: games[i].id });
          }
        }
      }
    });
  });
}

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Poker' });
});
