// app.js (API)
const express = require('express');
const app = express();
const bodyParser  = require('body-parser');

// use the following code on any request that matches the specified mount path
app.use((req, res, next) => {
   console.log('This line is always called');
 //  res.setHeader('Access-Control-Allow-Origin', '*'); //can connect from any host
 //  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS'); //allowable methods
 //  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');

   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

   // Fix HTTP header issues when using authentication
   // https://stackoverflow.com/questions/32500073/request-header-field-access-control-allow-headers-is-not-allowed-by-itself-in-pr
   
   next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


/* Requests for schedule module*/
app.get('/schedules', (req, res, next) => {
   /* Serve mock data in JSON file */
    let jsonObj= require('./mock_schedules.json')
    res.json(jsonObj)
    console.log('This is the response from schedules');
 
 });
 

  app.post('/schedule/add', (req, res, next) => {
   const schedule = req.body;
   //sent an acknowledgment back to caller 
   console.log('Schedules post form:')
   console.log(schedule)

   res.status(201).json('Post successful');
 });


 // Defined edit route -- not working - wait until LAB 10
app.get('/schedule/edit/:id'),(function (req, res, next) {
   let id = req.params.id;
   console.log('schedule/edit got id = ' + id)
   let jsonObj= require('./mock_schedules.json')
   var toSelect = (this.jsonObj.findIndex(c => c._id == id));

   res.json(jsonObj[toSelect]);
 
 });
 
  
 /*  End of requests to Schedule Module */ 
 
/* Requests for Grocery module */
app.get('/groceries',(req, res, next) => {
   const groceries=[{"ingredient":"Lettuce","quantity":"1"},
                    {"ingredient":"Tomato","quantity":"2"}];
 res.json(groceries);
});

app.post('/groceries', (req, res, next) => {
   const grocery = req.body;
   console.log(grocery.ingredient + " " + grocery.quantity);
 //sent an acknowledgment back to caller 
   res.status(201).json('Post successful');
 })

/*  End of requests to Grocery module */ 


//to use this middleware in other parts of the application
module.exports=app;
