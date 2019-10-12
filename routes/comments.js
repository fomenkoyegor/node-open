const express = require('express');
const {commentsController} = require('../controllers');
const passport = require('passport');
const router = express.Router();

router.get('/', commentsController.get);
router.get('/:id', commentsController.getById);
router.post('/', passport.authenticate('jwt', {session: false}), commentsController.create);
router.delete('/:id', passport.authenticate('jwt', {session: false}), commentsController.removeById);
router.patch('/:id', passport.authenticate('jwt', {session: false}), commentsController.updateById);


module.exports = router;
