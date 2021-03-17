const express = require('express');
const cors = require('cors');
const app = express();

// settings
app.set('port', process.env.PORT || 4000)


// middlewars
app.use(cors());
app.use(express.json());


// routes
app.use('/api/users', require('./routes/users_routes'));
app.use('/api/notes', require('./routes/notes_routes'));

module.exports = app;