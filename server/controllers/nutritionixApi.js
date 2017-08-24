'use strict'
const axios = require('axios');
var contohData = require('../contohdata.json');
var convert = require('../helpers/convert')

exports.getData = (req,res) => {
  var keyword = req.body.diary;
  var uri = encodeURI(keyword);
  axios({
    method: 'post',
    url: `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${process.env.KEY_YANDEX}&text=${uri}&lang=id-en`
  })
  .then(function (translate) {
    //res.send(translate.data.text[0])
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

exports.contohData = (req,res) => {
  convert(contohData,(diary)=>{
    res.send(diary)
  })

}
