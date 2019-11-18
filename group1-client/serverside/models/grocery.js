const mongoose =require('mongoose');

const grocerySchema=new mongoose.Schema({ 
    userId: {type: String, required: true},   
    ingredient: {type:String,required:true},
    quantity: {type:String,required:true}, 
    unit: {type:String,required:true}  
});

module.exports=mongoose.model('Grocery',grocerySchema,'Groceries');

