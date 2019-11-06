const mongoose =require('mongoose');

const grocerySchema=new mongoose.Schema({    
    ingredient: {type:String,required:true},
    quantity: {type:String,required:true}   
});

module.exports=mongoose.model('Grocery',grocerySchema,'Groceries');

