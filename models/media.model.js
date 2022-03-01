const mongoose = require('mongoose'); 
  
const imageSchema = new mongoose.Schema({  
    image: String, 
}); 
  
module.exports = new mongoose.model('Image', imageSchema);