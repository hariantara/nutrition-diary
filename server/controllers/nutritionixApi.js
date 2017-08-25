'use strict'
const axios = require('axios');
var modelDiary = require('../models/diary');
var jwt = require('jsonwebtoken');
var contohData = require('../contohdata.json');
var convert = require('../helper/convert')

exports.getData = (req,res) => {
  var keyword = req.body.diary;
  var uri = encodeURI(keyword);
  axios({
    method: 'post',
    url: `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${process.env.KEY_YANDEX}&text=${uri}&lang=id-en`
  })
  .then(function (translate) {
    axios({
      method: 'post',
      url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
      data: {query: `${translate.data.text[0]}`},
      headers: {'x-app-id':`${process.env.APP_ID_NUTRITIONIX}`, 'x-app-key':`${process.env.APP_KEY_NUTRITIONIX}`, 'x-remote-user-id':`${process.env.REMOTE_USER_ID_NUTRITIONIX}`}
      })
      .then(function (response) {
        convert(response.data,(diary)=>{
          diary.diary_note = `${req.body.diary}`;
          res.send(diary)
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  })
  .catch(function (error) {
    console.log(error);
  });
}

exports.save = (req,res) => {

  var diaryJSON = JSON.parse(req.body.diary)
  //console.log(JSON.parse(req.body.diary));
  //console.log(diary.diary_note);
  var decoded = jwt.verify(req.body.token, process.env.SECRETKEY);
  //console.log(decoded._id);
  //console.log(modelDiary);

  modelDiary.create({
    user_id: decoded._id,
    diary_note : diaryJSON.diary_note,
    total_fat : diaryJSON.total_fat,
    total_cholesterol : diaryJSON.total_cholesterol,
    total_carbohydrate : diaryJSON.total_carbohydrate,
    total_calories : diaryJSON.total_calories,
    total_protein : diaryJSON.total_protein,
    consumed_at : diaryJSON.consumed_at,
    foods : diaryJSON.foods
  })
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    res.send(err)
  })
}

exports.contohData = (req,res) => {
  convert(contohData,(diary)=>{
    res.send(diary)
  })

}
