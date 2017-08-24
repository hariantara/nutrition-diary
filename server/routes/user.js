var express = require('express');
var router = express.Router();
var controller = require('../controller/userController')

router.post('/signup', controller.createUser)
router.post('/signin', controller.signinUser)

module.exports = router;
