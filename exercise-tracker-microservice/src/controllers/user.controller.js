const mongoose = require('mongoose');
const User = require('../models/user.model.js');

class UserController {
  async list(_, response) {
    try {
      const users = await User.find({}, { username: 1 });

      response.json(users);
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }

  async create(request, response) {
    try {
      const { username } = request.body;
      const candidate = await User.findOne({ username });

      if (candidate) {
        response.status(400).json({ error: 'User already exist' });
      } else {
        const user = await User.create({ username });

        response.json({
          _id: user._id,
          username: user.username
        });
      }
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }

  async addExercise(request, response) {
    try {
      const { _id } = request.params;
      const { description, duration } = request.body;

      if (!description || !duration) {
        response.status(400).json({ error: 'Empty input' });

        return;
      }

      const date = request.body.date ? new Date(request.body.date) : new Date();

      if (date.toString() === 'Invalid Date') {
        response.status(400).json({ error: 'Invalid Date' });

        return;
      }

      const user = await User.findById(_id);

      if (!user) {
        response.status(404).json({ error: 'User is not found' });

        return;
      }

      const exercise = {
        date,
        duration: parseInt(duration),
        description,
      };

      await User.updateOne(
        { _id: user._id },
        { $push: { exercises: exercise } },
      );

      response.json({
        _id: user._id,
        username: user.username,
        date: date.toDateString(),
        duration: parseInt(duration),
        description,
      });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }

  async logs(request, response) {
    try {
      const { _id } = request.params;
      const { from, to, limit } = request.query;

      const user = await User.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(_id),
            $and: [
              {
                'exercises.date': {
                  $gte: new Date(from || null)
                }
              }, {
                'exercises.date': {
                  $lte: new Date(to || 8640000000000)
                }
              }
            ]
          }
        }
      ]).then(documents => documents[0]);

      if (!user) {
        response.status(400).json({ error: 'User is not found' });

        return;
      }

      response.json({
        _id,
        username: user.username,
        count: user.exercises.length,
        log: user.exercises
          .map(exercise =>
            ({ ...exercise, date: exercise.date.toDateString() }))
          .slice(0, limit ?? user.exercises.length),
      });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
