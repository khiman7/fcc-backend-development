const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const multer = require('multer');

dotenv.config();

const port = process.env.PORT || 8080;

const app = express();
const upload = multer({ dest: 'uploads' });

app.use(cors());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/api/fileanalyse', upload.single('upfile'), (request, response) => {
  const { file } = request;
  
  if (!file) {
    response.status(400).json({ error: 'File not provided' });
  } else {
    const { originalname: name, mimetype: type, size } = file;

    response.json({ name, type, size });
  } 
});

app.listen(port, () => {
  console.log(`App is listening on port: ${port}`)
});
