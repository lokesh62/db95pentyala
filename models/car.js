const mongoose = require("mongoose") 
const carSchema = mongoose.Schema({ 
 car_brand: String, 
 size: String, 
 price: Number 
}) 
 
module.exports = mongoose.model("car", 
carSchema)