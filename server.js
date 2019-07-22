const express = require('express');
const app = express();
const connectDB = require('./config/db');
const PORT = process.env.PORT || 2000;
const bodyParser = require('body-parser');
connectDB();
// for auto reload
const http = require('http');
const reload = require('reload');
// -----------------------
// I don't understand this !

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.json({ extended: false }));

//Define Routes
// Pertain the /api/users to the / in routes/api/users
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/words', require('./routes/api/words'));
app.use('/', require('./routes/api/mail'));

// for auto reload
const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
reload(app);

// before auto reload
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
