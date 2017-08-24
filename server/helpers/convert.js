convert = function (data,cb) {
  var diary = {}
  var total_fat = 0;
  var total_cholesterol=0;
  var total_carbohydrate=0;
  var total_calories=0;
  var total_protein=0;
  var consumed_at = '';
  var num = 0
  var foods = []
  data.foods.forEach((x)=>{
    total_fat += x.nf_total_fat;
    total_cholesterol += x.nf_cholesterol;
    total_carbohydrate += x.nf_total_carbohydrate;
    total_calories += x.nf_calories;
    total_protein += x.nf_protein;
    consumed_at = x.consumed_at;
    foods.push(x)
    num++
    if (num === data.foods.length) {
      diary.diary_note = '1 milk dan 1 pizza';
      diary.consumed_at = consumed_at;
      diary.total_fat = Math.round(total_fat);;
      diary.total_cholesterol = Math.round(total_cholesterol);
      diary.total_carbohydrate = Math.round(total_carbohydrate);
      diary.total_calories = Math.round(total_calories);
      diary.total_protein = Math.round(total_protein);
      diary.foods = foods
      cb(diary)
    }
  })
}

module.exports = convert
