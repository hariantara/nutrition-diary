var express = require('express');
var router = express.Router();
var nutritionixApi = require('../controllers/nutritionixApi')
var login = require('../helper/helper')
//
// router.use(login.user)

router.post('/',nutritionixApi.getData);
router.get('/',nutritionixApi.contohData);

module.exports = router
