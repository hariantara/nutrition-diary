var express = require('express');
var router = express.Router();
var nutritionixApi = require('../controllers/nutritionixApi')

router.post('/',nutritionixApi.getData)

module.exports = router
