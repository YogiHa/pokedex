const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const fs = require('fs');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const whiteList = ['http://localhost:3000'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('NOT ALLOWED'));
    }
  },
};

let pokemonList = require('./data/pokemonList.json');
const handleFetchList = (req, res) => {
  const { currLength } = req.body;
  try {
    res.json(pokemonList.slice(currLength, currLength + 10));
  } catch {
    res.status(400).json('fetchList error');
  }
};

const handleFetchPokemon = (req, res) => {
  try {
    res.json(require(`./data/pokemons/${req.body.name}.json`));
  } catch {
    res.status(400).json('fetchPokemon error');
  }
};

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
// app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(compression());

io.on('connection', (socket) => {
  fs.watchFile('./data/pokemonList.json', () => {
    let changed = [];
    let newList = JSON.parse(fs.readFileSync('./data/pokemonList.json'));
    for (let i = 0; i < newList.length; i++) {
      if (JSON.stringify(pokemonList[i]) != JSON.stringify(newList[i]))
        changed.push({ i, data: newList[i] });
    }
    io.sockets.emit('updateLIst', changed);
    pokemonList = newList;
  });

  fs.readdir(
    './data/pokemons',
    (err, files) =>
      !err &&
      files.map((fileName) =>
        fs.watchFile(`./data/pokemons/${fileName}`, () => {
          io.sockets.emit(
            'pokemonInfo',
            JSON.parse(fs.readFileSync(`./data/pokemons/${fileName}`))
          );
        })
      )
  );
});

app.post('/fetchlist', (req, res) => handleFetchList(req, res));
app.post('/fetchPokemon', (req, res) => handleFetchPokemon(req, res));

server.listen(3001, () => console.log(`app is running on port 3001`));
