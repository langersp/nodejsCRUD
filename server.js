const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const Car = require('./model');

const app = express();

app.set('view engine', 'ejs');

//use db connection to handle requests from browser
let db;

// enable static file serving
app.use(express.static(__dirname))
//use body parser middleware to read form data
app.use(bodyParser.urlencoded({
    extended: true
}));

//1. GET all cars - set up API endpoint to retrieve all cars and return HTML via ejs template
app.get('/api/cars', (req, res) => {
    Car.find({}, function(err, cars) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.render('index.ejs', {cars : cars});
      } 
    });
});

//2. GET car by id
app.get('/api/cars/:id', (req, res) => {

    let id = req.params.id;
    Car.findOne({_id:id}, function(err, car){
        if (err){
           res.status(500).send(err);
        } else{
            res.json(car);
        }
    });

});

//3. POST new car
app.use(bodyParser.json());
app.post('/api/cars', (req, res) => {
    let newCar = new Car(req.body);

    newCar.save((err, car) => {
        if (err) {
          res.status(500).send(err);
        } else {
           console.log('Car created!')
           res.status(200).send(car);
        }
    });
});

//4. UPDATE new car by id
app.put('/api/cars/:id', (req, res, next) => {

    let id = req.params.id,
    body = req.body;

    Car.findByIdAndUpdate(id, body, {new: true}, (err, car) => {
       if (err) {
          res.status(500).send(err);
       } else {
           res.status(200).send(car);
       }
    });

});

//5. DELETE 
app.delete('/api/cars/:id', (req, res, next) => {

    let id = req.params.id;

    Car.findByIdAndRemove(id, (err, car) => {  
        res.status(200).send(car._id);
    });

});

//mongodb://langersp:****@ds159344.mlab.com:59344/candyspace-cars
// connect to mongo db stored on Mongo Labs mlab.com
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/cars', { useMongoClient: true }, (err, dbConnection) => {
    if (err) return console.log(err);

    db = dbConnection;
    // ... start the server
    let server = app.listen(3000, () => {
        let port = server.address().port;
        console.log("Started server at port", port);
    });
});