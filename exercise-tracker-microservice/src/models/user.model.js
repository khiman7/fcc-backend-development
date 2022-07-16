const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  username: { type: String, unique: true, required: true },
  exercises: [
    {
      date: Date,
      duration: Number,
      description: String,
    },
  ],
}, {
  versionKey: false,
});

module.exports = mongoose.model('User', schema);
