const { Router } = require('express');

const UserController = require('../controllers/user.controller.js');

const router = Router();

router.get('/users', UserController.list);
router.post('/users', UserController.create);
router.post('/users/:_id/exercises', UserController.addExercise);
router.get('/users/:_id/logs', UserController.logs);

module.exports = router;
