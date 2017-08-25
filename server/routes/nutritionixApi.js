var express = require('express');
var router = express.Router();
var nutritionixApi = require('../controllers/nutritionixApi')
var login = require('../helper/helper')
//
// router.use(login.user)

router.post('/',nutritionixApi.getData);
router.post('/save',nutritionixApi.save );
router.get('/diary-user',nutritionixApi.findById);
router.get('/diary-detail-user',nutritionixApi.findByIdDetail);
router.get('/',nutritionixApi.contohData);

module.exports = router
