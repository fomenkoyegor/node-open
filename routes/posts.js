const express = require('express');
const {postsController} = require('../controllers');
const passport = require('passport');
const router = express.Router();

router.get('/', postsController.get);
router.post('/', passport.authenticate('jwt', {session: false}), postsController.create);
router.delete('/:id', passport.authenticate('jwt', {session: false}), postsController.removeById);
router.patch('/:id', passport.authenticate('jwt', {session: false}), postsController.updateById);
router.get('/:id', postsController.getById);


module.exports = router;
