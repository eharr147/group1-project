const mongoose = require('mongoose');


module.exports= 
mongoose.model('Recipe', {
    name:  { type: String, required: true},
    description:  { type: String, required: true},
    cuisine:  { type: String, required: false},
    usage:  { type: String, required: true},
    effort_lvl:  { type: String, required: true},
    contributor:  { type: String, required: true},
    servings:  { type: Number, required: false},
    calories:  { type: Number, required: false},


    ingredients: [{
        quantity:   { type: Number},
        unit:   { type: String},
        name: { type: String}
    }
    ],
    steps: [{ type: String, required: true}]
  }, 'Recipes');
  
  /*  recipe.ts - Typescript interface for client application 
  export interface IRecipe {
    _id:              any;
    name:             string;
    description:      string;
    cuisine:          string;
    usage:            string;
    effort_lvl?:       string;
    contributor:      string;
    servings:         number;
    calories?:         number;
    ingredients:      IIngredient[];
    steps:            string[];
}

export interface IIngredient {
    quantity: number | string;
    unit:     string;
    name:     string;
}
*/
