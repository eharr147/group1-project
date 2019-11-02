const mongoose =require('mongoose');
//define a schema /blueprint Note : id is not a part of the schema

const feedbackSchema=new mongoose.Schema({
    userId: {type:String,required:true},
    recipeTitle: {type:String,required:false},
    firstname: {type:String,required:true},
    Lastname: {type:String,required:true},
    Recipeno: {type:String,required:true},
    comments :{type:String,required:true}
});

module.exports=mongoose.model('feedbackhistory',feedbackSchema,'feedbackhistory');