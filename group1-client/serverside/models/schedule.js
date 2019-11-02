//schedule.js
const mongoose = require('mongoose');


module.exports= 
mongoose.model('Schedule', {
    userId: {type: String, required: true},
    mealDate:  { type: Date, required: true},
    mealTime:  { type: String, required: true},

    mealDishes: [{
        dishType:   { type: String},
        recipeId:   { type: String},
        recipeTitle: { type: String},
        recipeDesc:  { type: String}
    }
    ],
    mealNotes: [{ type: String, required: true}]
  }, 'Schedules');
  
 // job: {
 //   title: String;
 //   position: String;
//  },
//  car: { type: Schema.Types.ObjectId, ref: 'Car' }
//});
// 
//  mongoose.model('Car', {
//    model: string,
//  });

//export interface ISchedule {
//    mealDate:   Date;
//    mealTime:   string;
//    mealDishes: IMealDish[];
//    mealNotes?:  string[];
//}

//export interface IMealDish {
//    dishType:    string;
//    recipeId:    string;
//    recipeTitle: string;
//    recipeDesc:  string;
//}
