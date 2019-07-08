const express = require('express');
const app = express();
const connectDB = require('./config/db');
const PORT = process.env.PORT || 2000;
connectDB();

app.use(express.json({ extended: false }));

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT} ...`);
});

app.use('/api/words', require('./routes/api/words'));
