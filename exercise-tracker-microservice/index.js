const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = require('./src/app.js');

dotenv.config();

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;

const start = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to the MongoDB Atlas');

    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (error) {
    console.log(`An error ocurred while starting the server: ${error}`);
  }
};

start();