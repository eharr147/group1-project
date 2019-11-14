// app.js (API)
const express = require('express');
const app = express();
const bodyParser  = require('body-parser');

const mongoose = require('mongoose');
//specify where to find the schema
const Schedule = require('./models/schedule')
const Catalog = require('./models/recipe')
const feedbacks=require('./models/feedbackhistory');
const Recipe = require('./models/recipe')
const Grocery = require('././models/grocery');
const users=require('./models/Users');


const request = require('request'); // need this for 3rd party API call

// connect and display the status 
//mongoose.connect('mongodb://localhost:27017/dbIT6203', { useNewUrlParser: true })
//mongoose.connect('mongodb+srv://IT6203User:IT6203KSU@cluster0-chkhb.azure.mongodb.net/dbIT6203?retryWrites=true&w=majority', { useNewUrlParser: true })
mongoose.connect('mongodb+srv://egladsto:IT6203project@group1-project-hshbd.mongodb.net/dbIT6203?retryWrites=true&w=majority', { useNewUrlParser: true })

  .then(() => { console.log("connected"); })
  .catch(() => { console.log("error connecting"); });




// use the following code on any request that matches the specified mount path
app.use((req, res, next) => {

 //  res.setHeader('Access-Control-Allow-Origin', '*'); //can connect from any host
 //  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS'); //allowable methods
 //  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');

   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

   // Fix HTTP header issues when using authentication
   // https://stackoverflow.com/questions/32500073/request-header-field-access-control-allow-headers-is-not-allowed-by-itself-in-pr
   
   next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


/****************************************
 *    SCHEDULE  
 *     
 ***************************************/


/* Requests for schedule module*/
/* Find all schedules in database */
app.get('/schedules', (req, res, next) => {
    //call mongoose method find 
   Schedule.find().sort('mealDate') 
   //if data is returned, send data as a response 
   .then(data => res.status(200).json(data))
   //if error, send internal server error
   .catch(err => {
   console.log('Error: ${err}');
   res.status(500).json(err);
 });
     console.log('This is the response from schedules');
  
  });
 

 /* Find  schedules by user */
 app.get('/schedule/user/:id', (req, res, next) => {
   let id = req.params.id;
   //call mongoose method find (MongoDB db.Students.find())
  Schedule.find({ userId: id}).sort('mealDate') 
  //if data is returned, send data as a response 
  .then(data => res.status(200).json(data))
  //if error, send internal server error
  .catch(err => {
  console.log('Error: ${err}');
  res.status(500).json(err);
 });
    console.log('This is the response from schedule/user');
 
 });
 
 
 
  app.get('/schedule/edit/:id', (req, res, next) => {
   //call mongoose method find
   let id = req.params.id;
   console.log('schedule/edit id is ' + id)
  Schedule.findById(id) 
  //if data is returned, send data as a response 
  .then(data => res.status(200).json(data))
 
  //if error, send internal server error
  .catch(err => {
  console.log('Error: ${err}');
  res.status(500).json(err);
 });
    console.log('This is the response from schedule/edit');
 
 });
 
 
   app.post('/schedule/add', (req, res, next) => {
  // create a new schedule variable and save request’s fields 
  
  const schedulef = req.body;
    //sent an acknowledgment back to caller 
    console.log('Schedules post form:')
    console.log(schedulef)
  
  const schedule = new Schedule({
    userId: req.body.userId,
    mealDate: req.body.mealDate,
    mealTime: req.body.mealTime,
    mealDishes: req.body.mealDishes,
    mealNotes: req.body.mealNotes
  });
  
  console.log('schedules object - Mongoose:')
  console.log(schedule)
 
  //send the document to the database 
  schedule.save()
    //in case of success
    .then(() => { 
      console.log('Success');
      res.status(201).json({'schedule': 'schedule added successfully'});    
     })
    //if error
    .catch(err => {
      console.log('Error:' + err);
      res.status(400).send("unable to save to database")
     });
 
    //sent an acknowledgment back to caller 
    //res.status(201).json('Post successful');
  });
 
  /* schedule update */
  app.put('/schedule/update/:id', (req, res, next) => {
    console.log("/schedule/update id = " + req.params.id)
   
   // create a new schedule variable and save request’s fields 
     const schedulef = req.body;
     //sent an acknowledgment back to caller 
     console.log('Schedules post form:')
     console.log(schedulef)
   
   if (mongoose.Types.ObjectId.isValid(req.params.id)) {
   //find a document and set updated field values
   Schedule.findOneAndUpdate({_id: req.params.id},
       {$set:
         {
           mealDate: req.body.mealDate,
           mealTime: req.body.mealTime,
           mealDishes: req.body.mealDishes,
           mealNotes: req.body.mealNotes
         }},{new:true}) 
    .then((results) => {
       if (results) { //what was updated
         console.log('schedule update results')
         console.log(results);
         res.status(200).json("Updated!");
       } else {
         console.log("no data exist for this id");
       }
    })
   .catch((err) => {
     console.log('schedule update error')
     console.log(err);
    });
 } else {
  console.log("please provide correct id");
 }
 
   });
  
 
/* delete schedule */
//:id is a dynamic parameter that will be extracted from the URL
app.delete("/schedules/:id", (req, res, next) => {
  console.log('app.js deleteSchedule - id = ' + req.params.id)
  Schedule.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json("Deleted!");
  });
});
 
   
  /*  End of requests to schedules */ 

  /*******************************
   *      CATALOG
   * 
   ********************************/
  
 /* Requests to Recipes via Catalog module */
 app.get('/catalog', (req, res, next) => {
 
   //call mongoose method find 
  Catalog.find().sort('name')  
  //if data is returned, send data as a response 
  .then(data => res.status(200).json(data))
  //if error, send internal server error
  .catch(err => {
  console.log('Error: ${err}');
  res.status(500).json(err);
 });
 
 
    console.log('This is the response from Catalog get all');
 
 });
 
 
 app.get('/catalog/:id', (req, res, next) => {
   //call mongoose method find
   let id = req.params.id;
   console.log('schedule/edit id is ' + id)
  Catalog.findById(id) 
  //if data is returned, send data as a response 
  .then(data => res.status(200).json(data))
 
  //if error, send internal server error
  .catch(err => {
  console.log('Error: ${err}');
  res.status(500).json(err);
 });
    console.log('This is the response from catalog/id');
 
 });
 
 
 /* End of requests to Catalog */ 
 
 /****************************************
  * GROCERIES
  * **************************************/

/* Requests for Grocery module */
app.get('/groceries',(req, res, next) => {
  Grocery.find()
    //if data is returned, send data as a response 
    .then(data => res.status(200).json(data))
    //if error, send internal server error
    .catch(err => {
    console.log('Error: ${err}');
    res.status(500).json(err);
  });
});


app.post('/groceries', (req, res, next) => 
{const grocery = new Grocery({
  ingredient: req.body.ingredient,
  quantity: req.body.quantity  
});
 
//send the document to the database 
grocery.save()
  //success
  .then(() => { 
    console.log('Success');
    console.log(grocery.ingredient + " " + grocery.quantity);
    res.status(201).json('Post successful');        
   })
  //if error
  .catch(err => {
    console.log('Error:' + err);
    res.status(400).json('Post not successful');    
   });
/*  const grocery = req.body;
  console.log(grocery.ingredient + " " + grocery.quantity);
//sent an acknowledgment back to caller 
  res.status(201).json('Post successful');*/
  
})

app.delete('/groceries/:id', (req, res, next) => {
 Grocery.deleteOne({ _id: req.params.id }).then(result => {
   console.log(result);
   res.status(200).json("Deleted!");
 });
});

/*  End of requests to Grocery module */ 
/************************************
 * FEEDBACK
 * 
 ************************************/
  /* Feedback History*/
  app.get('/feedbackhistory', (req, res, next) => {
    /* Serve mock data in JSON file */
     //let jsonObj= require('./mock_feedbackhistory.json')
     //res.json(jsonObj)
     feedbacks.find().then(data=>res.status(200).json(data))
     .catch(err=>{
       console.log('Error: ${err}');
       res.status(500).json(err);
   
   });
     console.log('This is the response from feedbacks');
  
  });

/* Find  feedback by user */
app.get('/feedback/user/:userId', (req, res, next) => {
  console.log('feedback/user called' + req.params.userId)
  let id = req.params.userId;
  //call mongoose method find 
 feedbacks.find({ userId: id}).sort('recipeTitle') 
 //if data is returned, send data as a response 
 .then(data => res.status(200).json(data))
 //if error, send internal server error
 .catch(err => {
 console.log('Error: ${err}');
 res.status(500).json(err);
});
   console.log('This is the response from feedback/user');

});


  //Get Feedback by RecipeID
 app.get("/feedback/find/:Recipeno",(req,res,next)=>{
   console.log('feedback/find/recipeNo')
   console.log(req.params.Recipeno)
   feedbacks.find({Recipeno:req.params.Recipeno},
    {'userId': true, 'recipeTitle': true, 'firstname':true,'Lastname':true,'comments':true}).then(result=>{
     console.log(result);
     res.status(200).json(result);
   });
 });
 
 app.get("/feedback/edit/:id",(req,res,next)=>{
   feedbacks.find({id:req.params._id},
    {'userId': true, 'recipeTitle': true,'firstname':true,'Lastname':true,'Recipeno':true,'comments':true}).then(result=>{
     console.log(result);
     res.status(200).json(result);
   });
 });
 
 
  app.post('/feedback/add', (req, res, next) => {
   // const feedback = req.body;
   const feedback=new feedbacks({
     userId: req.body.userId,
     recipeTitle: req.body.recipeTitle,
     firstname:req.body.firstname,
     Lastname:req.body.Lastname,
     Recipeno:req.body.Recipeno,
     comments:req.body.comments
   });
   console.log('feedback/add called')
   console.log(feedback)
   feedback.save()
   .then(()=>{console.log('Success');})
   .catch(err=>{console.log('Error:'+err);});
    //sent an acknowledgment back to caller 
    console.log('feedback post form:')
    console.log(feedback)
 
    res.status(201).json('Post successful');
  });
 
 app.put("/feedback/update/:_id",(req,res,next)=>{
   console.log("_id:"+req.params._id)
   if(mongoose.Types.ObjectId.isValid(req.params._id)){
     feedbacks.findOneAndUpdate({
       _id:req.params._id},
       {$set:{comments:req.body.comments,
        // Updte comment field only. All other fields are keys or derived from keys
       // Recipeno:req.body.Recipeno,firstname:req.body.firstname,Lastname:req.body.Lastname
      }},{new:true})
       .then((feedbacks)=>{
         if(feedbacks) {
           console.log(feedbacks);
         }
         else{
           console.log("no data for this id");
         }
       }).catch((err)=>{
         console.log(err);
       });
     }else{
       console.log('please provide correct id');
     }
 })
 
  app.delete("/feedback/delete/:id",(req,res,next)=>{
    feedbacks.deleteOne({_id:req.params.id}).then(result=>{
      console.log(result);
      res.status(200).json("Deleted!");
    });
  });
 /* end requests Feedback History */
 
 /************************************
  *    USER LOGIN AND REGISTRATION
  * 
  ***********************************/
  /* User Login and Registration*/

  app.get("/users/authenticate/:username/:password", (req, res, next) => {
  
    users.find({username:req.params.username,password:req.params.password})
    .then(result=>{
      const user = {
      
        username: result[0].username,
        firstName: result[0].Firstname,
        lastName: result[0].Lastname
        
    }
    console.log(user);
    res.status(200).json(user);

  })
  .catch(err => {
    console.log('Authentication Error: ${err}');
    userFriendlyMsg='Cannot authenticate userid/password.'
    console.log(userFriendlyMsg)
    res.status(500).json(userFriendlyMsg);
  });
 
  
 });

  app.get("/users",(req,res,next)=>{
   
   users.find().then(data=>res.status(200).json(data))
   .catch(err=>{
     console.log('Error: ${err}');
     res.status(500).json(err);
  });
 });

  app.post('/Users/register', (req, res, next) => {
   // const feedback = req.body;
   const userrecord=new users({
     Firstname:req.body.firstname,
     Lastname:req.body.lastName,
     username:req.body.username,
     password:req.body.password
   });

   console.log('users/register')
   console.log(userrecord)
  userrecord.save()
   .then(()=>{console.log('Success');})
   .catch(err=>{console.log('Error:'+err);});
    //sent an acknowledgment back to caller 
    console.log('user post form:')
    console.log(userrecord)
 
    res.status(201).json('Post successful');
  });

  /* end requests User/authentication */

/********************************************
 * RECIPES
 * 
 ********************************************/

/* Requests to Recipes module */
app.get('/recipes', (req, res, next) => {
  //call mongoose method find (MongoDB db.Students.find())
  console.log ("/recipes called"); 
 Recipe.find() 
   //if data is returned, send data as a response 
   .then(data => res.status(200).json(data))
   //if error, send internal server error
   .catch(err => {
   console.log('Error: ${err}');
   res.status(500).json(err);
 });
});

/* Find  schedules by user */
app.get('/recipes/user/:id', (req, res, next) => {
  let id = req.params.id;
  console.log('/recipes/user/:id = ' + id)

 Recipe.find({contributor: id}).sort('name') 
 //if data is returned, send data as a response 
 .then(data => {res.status(200).json(data)
        //console.log(data)
})
 //if error, send internal server error
 .catch(err => {
 console.log('Error: ${err}');
 res.status(500).json(err);
});

});


//:id is a dynamic parameter that will be extracted from the URL
app.delete("/recipes/:id", (req, res, next) => {
   console.log ("delete /recipes called");
   Recipe.deleteOne({ _id: req.params.id }).then(result => {
     console.log(result);
     res.status(200).json("Deleted!");
   });
 });

 app.post('/recipe/add', (req, res, next) => {
   // create a new student variable and save request’s fields 
console.log('recipe/add called')
console.log(req.body)
const recipe = new Recipe({
name: req.body.name,
description: req.body.description,
cuisine: req.body.cuisine,
usage: req.body.usage,
effort_lvl: req.body.effort_lvl,
contributor: req.body.contributor,
servings: req.body.servings,
calories: req.body.calories,
ingredients: req.body.ingredients,
steps: req.body.steps 
});
//send the document to the database 
recipe.save()
//in case of success
.then(() => { console.log('Success');
res.status(201).json({'recipe': 'recipe added successfully'});  
})
//if error
.catch(err => {console.log('Error:' + err);
res.status(400).send("recipe/add - unable to save to database")
});
 });

// serve incoming put requests to /students
app.put('/recipes/:id', (req, res, next) => {
 console.log('put /recipes/:id called')
 console.log("id: " + req.params.id)
 console.log(req.body)
 // check that the parameter id is valid 
 if (mongoose.Types.ObjectId.isValid(req.params.id)) {
   //find a document and set new first and last names
   Recipe.findOneAndUpdate({_id: req.params.id},
     {$set:{name : req.body.name,
       description : req.body.description,
       cuisine: req.body.cuisine,
       usage: req.body.usage,
       effort_lvl: req.body.effort_lvl,
       contributor: req.body.contributor,
       servings: req.body.servings,
       calories: req.body.calories,
       ingredients: req.body.ingredients,
       steps: req.body.steps   

     }},{new:true}) 
    .then((recipe) => {
       if (recipe) { 
         console.log(recipe);
         res.status(200).json("Updated!");
       } else {
         console.log("no data exist for this id");
       }
    })
   .catch((err) => {
     console.log(err);
    });
} else {
  console.log("please provide correct id");
}
 
});  

/* End requests to Recipes module */

/*******************************************************************************************
 * Call USDA Food Data API 
 * Express Middleware acts as a proxy to eliminate CORS policy issues in the browser 
 *******************************************************************************************/
/* API proxy for POST calls */
app.post('/nutrition/search', (req, res, next) => {
 
  console.log('/nutrition/search called')
  console.log(req)
  const _API_KEY = "TqHOqkgP5xrgx7VjuS01TCr2RQDXawq4uMCMOvFk"
  const URL = "https://api.nal.usda.gov/fdc/v1/search?api_key=" + _API_KEY

  request.post(
    { url: URL,
      json: req.body
     },
    (error, response, body) => {
      if (error) {
        return res.status(500).json({ type: 'error', message: error.message });
      }
     //console.log(body)
     //res.status(201).json({'API call': 'processed'}); 
     res.status(200).json(body)
   
    }
  )
 });

 app.get('/nutrition/detail/:_id', (req, res, next) => {
 
  let food_id = req.params._id;
  console.log('/nutrition/detail/ ' + food_id)

  const _API_KEY = "TqHOqkgP5xrgx7VjuS01TCr2RQDXawq4uMCMOvFk"
  var URL = "https://api.nal.usda.gov/fdc/v1/" + food_id + "?api_key="+ _API_KEY
  console.log('/nutrition/detail/ composed URL' + URL)

  request.get(
    { url: URL
     },
    (error, response, body) => {
      if (error) {
        return res.status(500).json({ type: 'error', message: error.message });
      }
     //console.log(body)
     //res.status(201).json({'API call': 'processed'}); 
     res.status(200).json(JSON.parse(body)); // use JSON.parse to return as usable JSON object!
   
    }
  )
});




//to use this middleware in other parts of the application
module.exports=app;
