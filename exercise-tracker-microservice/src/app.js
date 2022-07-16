const path = require('path');
const express = require('express');
const cors = require('cors');

const routes = require('./routes/api.routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', routes);

app.get('/', (_, response) => {
  response.sendFile(path.join(__dirname, 'views', 'index.html'));
});

module.exports = app;
