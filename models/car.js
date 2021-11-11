const mongoose = require("mongoose")
const carSchema = mongoose.Schema({
    car_type: String,
    quantity: Number,
    cost: Number
})
module.exports = mongoose.model("car",
    carSchema)