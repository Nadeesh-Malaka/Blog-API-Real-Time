const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const User = require('./models/User');
const Post = require('./models/Post');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

const app = express();
const server = http.createServer(app);

// Configure CORS for Socket.IO
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Enable CORS for Express
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Serve static files from the public folder
app.use(express.static('public'));

app.use('/auth', authRoutes);
app.use('/posts', (req, res, next) => {req.io = io;next();}, postRoutes);


app.get('/', (req, res) => res.send('API is running...'));

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => console.log('User disconnected'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

sequelize.sync()
  .then(() => {
    console.log('✅ Database & tables synced!');
    server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.error('❌ Startup failed:', err));