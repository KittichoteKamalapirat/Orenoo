const express = require('express');
const app = express();
const connectDB = require('./config/db');
const PORT = process.env.PORT || 2000;
connectDB();
// for auto reload
const http = require('http');
const reload = require('reload');
// -----------------------

app.use(express.json({ extended: false }));

//Define Routes
// Pertain the /api/users to the / in routes/api/users
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/words', require('./routes/api/words'));

// for auto reload
const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
reload(app);

// before auto reload
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
