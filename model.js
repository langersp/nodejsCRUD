const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

//add double support for mongoose
var SchemaTypes = mongoose.Schema.Types;
//define car schema
var carSchema = mongoose.Schema({
    "manufacturer": {
        "type": String,
        "required": [true, 'manufacturer required']
    },
    "model": { 
    	"type": String, 
    	"required": [true, 'model required'] 
    },
    "price": { 
    	"type": SchemaTypes.Double,
    	"required": [true, 'price required']
    },
    "acceleration": {
    	"type": SchemaTypes.Double,
    	"required": [true, 'acceleration required']
    },
    "topSpeed": {
    	"type": Number,
    	"required": [true, 'manufacturer required']
    },
    "isSold": {
    	"type": Boolean,
    	"required": [true, 'manufacturer required']
    },
    "createdAt": { 
    	"type": Date, 
    	"default": Date.now 
    }
});

// on every save, add the date
carSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // if created_at doesn't exist, add
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});


var Car = mongoose.model('Car', carSchema);

module.exports = Car;