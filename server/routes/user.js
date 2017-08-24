var express = require('express');
var router = express.Router();
var controller = require('../controller/userController')
var helper = require('../helper/helper')


router.post('/signup', controller.createUser)
router.post('/signin', controller.signinUser)
router.get('/read', helper.user,controller.readUser)

module.exports = router;
