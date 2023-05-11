'use strict'

//require library installs
require('dotenv').config(); // initializes our environment variables
const express = require('express'); //create an object for the express library
const cors = require('cors'); //create an object for the cors library
const fs = require('fs');
const serverless = require("serverless-http");

// const bodyParser = require('body-parser')
const { response } = require('express');

const data = require('./data.json');

//initialize app
const app = express();
// Create a router to handle routes
const router = express.Router();

app.use(cors());
// For parsing application/json
app.use(express.json());
 
// app.use(bodyParser.json()) // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//configure routes
router.get('/', (request, response) => {
    //query parameters
    //http://localhost:3001/?id=...
    let id = request.query.id ? request.query.id : '';
    let age = request.query.age;
    

fs.writeFile("test", JSON.stringify(data), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 

// // Or
// fs.writeFileSync('test', 'Hey there!');
    response.send(`Hello ${id + ' ' + age}, Welcome to the Horned Beasts Gallery`);
});
// http://localhost/area/controller/method
// http://localhost/shop/customer/orders

// http://localhost:3001/beasts?horns=...
router.get('/beasts', (request, response) => {
    let horns = request.query.horns;
    if (!horns) {
        horns = 0;
    }
    response.send(data.filter((element) => {
        if (horns == element.horns || horns == 0) {
            return true;
        } else {
            return false;
        }
    }));    
});

//http://localhost:3001/beasts

//?title=yay&description=something
//&keyword=that&horns=2
router.post('/beasts', (request, response) => {
    console.log(request.body);
    console.log(response.data);
    let newBeast = {"_id": data.length + 1,
    "image_url": "https://ae01.alicdn.com/kf/HTB18GwSQVXXXXaZaXXXq6xXFXXXh/Animal-Cosplay-Costume-Narwhal-Onesie-Mens-Womens-Cartoon-Whale-Pajamas.jpg",
    "title": request.body.title,
    "description": request.body.description,
    "keyword": request.body.keyword,
    "horns": request.body.horns,
    "favorites": 0}
    let updatedData = data;
    updatedData.push(newBeast);

    fs.writeFile("test", JSON.stringify(updatedData), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
    response.send('Success');
});

// http://localhost:3001/beasts/1
router.get('/beasts/:id', (request, response) => {
    console.log(request.params.id);
    console.log(data.length);
    let id = request.params.id >= data.length ? 
        data.length - 1 : request.params.id;
    // if (request.params.id > data.length) {

    // }
    response.send(data[id]);
})

//configure 404
router.get('*', (request, response) => {
    response.status(404).send('not found');
  });
  
app.use(`/.netlify/functions/api`, router);

// error handling middleware must be the last app.use()
app.use((error, request, response, next) => {
    console.error(error);
    response.status(500).send(error.message);
});
  
//start app
app.listen(3001, () => console.log(`listening on 3001`));

// Export the app and the serverless function
module.exports = app;
module.exports.handler = serverless(app);