const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const STATIC_PASSWORD = "SEWUKIRU";
const users = {}; // Store connected users and their colors

// Login page
app.get('/', (req, res) => {
  res.render('login');
});

// Chat page
app.post('/chat', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (password === STATIC_PASSWORD) {
    res.render('chat', { username });
  } else {
    res.redirect('/?error=Invalid password');
  }
});

// WebSocket logic
io.on('connection', (socket) => {
  socket.on('user joined', (data) => {
    users[socket.id] = { username: data.username, color: data.color };
    socket.broadcast.emit('user joined', data);
  });

  socket.on('chat message', (data) => {
    io.emit('chat message', data);
  });

  socket.on('disconnect', () => {
    const user = users[socket.id];
    if (user) {
      socket.broadcast.emit('user left', { username: user.username });
      delete users[socket.id];
    }
  });
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
