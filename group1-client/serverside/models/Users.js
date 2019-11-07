const mongoose =require('mongoose');
//define a schema /blueprint Note : id is not a part of the schema

const userSchema=new mongoose.Schema({
    Firstname: {type:String,required:true},
    Lastname: {type:String,required:true},
    Email: {type:String,required:false},
    username :{type:String,required:true},
    password:{type:String,required:true}
});

module.exports=mongoose.model('Users',userSchema,'Users');