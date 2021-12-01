var car = require("../models/car");

// List of all cars
exports.car_list = async function (req, res) {
  try {
    thecars = await car.find();
    res.send(thecars);
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};

// for a specific car.
exports.car_detail = async function (req, res) {
  console.log("detail"  + req.params.id) 
    try { 
        result = await car.findById( req.params.id) 
        res.send(result) 
    } catch (error) { 
        res.status(500) 
        res.send(`{"error": document for id ${req.params.id} not found`); 
    } 
};


// Handle car create on POST.
exports.car_create_post = async function (req, res) {
  let document = new car();
  // We are looking for a body, since POST does not have query parameters.
  // Even though bodies can be in many different formats, we will be picky
  // and require that it be a json object
  document.car_brand = req.body.car_brand;
  document.size = req.body.size;
  document.price = req.body.price;
  console.log(req.body);
  try {
    if(document.price < 2 || document.price>999){
      throw new TypeError("Please add price in between 0 and 9999")
    }
    else if(document.car_brand.length<=0){
      throw new TypeError("Brand name is Empty")
    }
    else{
      let result = await document.save();
      res.send(result);
    }
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};

// Handle car delete form on DELETE.
exports.car_delete =async function (req, res) {
  console.log("delete "  + req.params.id) 
    try { 
        result = await car.findByIdAndDelete( req.params.id) 
        console.log("Removed " + result) 
        res.send(result) 
    } catch (err) { 
        res.status(500) 
        res.send(`{"error": Error deleting ${err}}`); 
    } 
};

// Handle car update form on PUT.
exports.car_update_put =async function (req, res) {
  console.log(`update on id ${req.params.id} with body 
${JSON.stringify(req.body)}`) 
    try { 
        let toUpdate = await car.findById( req.params.id) 
        // Do updates of properties 
        if(req.body.costume_type)  
               toUpdate.car_brand = req.body.car_brand; 
        if(req.body.size) toUpdate.size = req.body.size; 
        if(req.body.price) toUpdate.price = req.body.price; 
        let result = await toUpdate.save(); 
        console.log("Sucess " + result) 
        res.send(result) 
    } catch (err) { 
        res.status(500) 
        res.send(`{"error": ${err}: Update for id ${req.params.id} 
failed`); 
    } 
};

// VIEWS
// Handle a show all view
exports.car_view_all_Page = async function(req, res) { 
  try{ 
      thecars = await car.find(); 
      res.render('car', { title: 'car Search Results', results: thecars }); 
  } 
  catch(err){ 
      res.status(500); 
      res.send(`{"error": ${err}}`); 
  }   
}; 

// Handle a show one view with id specified by query
exports.costume_view_one_Page = async function(req, res) {
console.log("single view for id " + req.query.id)
try{
result = await car.findById( req.query.id)
res.render('car',
{ title: 'car Detail', toShow: result });
}
catch(err){
res.status(500)
res.send(`{'error': '${err}'}`);
}
};

// Handle building the view for creating a costume.
// No body, no in path parameter, no query.
// Does not need to be async
exports.car_create_Page = function(req, res) {
console.log("create view")
try{
res.render('carcreate', { title: 'car Create'});
}
catch(err){
res.status(500)
res.send(`{'error': '${err}'}`);
}
};

// Handle a delete one view with id from query
exports.costume_delete_Page = async function(req, res) {
console.log("Delete view for id " + req.query.id)
try{
result = await Costume.findById(req.query.id)
res.render('cardelete', { title: 'car Delete', toShow:
result });
}
catch(err){
res.status(500)
res.send(`{'error': '${err}'}`);
}
};

// Handle building the view for updating a costume.
// query provides the id
exports.costume_update_Page = async function(req, res) {
console.log("update view for item "+req.query.id)
try{
let result = await Costume.findById(req.query.id)
res.render('carupdate', { title: 'car Update', toShow: result });
}
catch(err){
res.status(500)
res.send(`{'error': '${err}'}`);
}
};

exports.car_view_one_Page = async function(req, res) { 
  console.log("single view for id "  + req.query.id) 
  try{ 
      result = await car.findById( req.query.id) 
      res.render('cardetail',  
{ title: 'car Detail', toShow: result }); 
  } 
  catch(err){ 
      res.status(500) 
      res.send(`{'error': '${err}'}`); 
  } 
}; 

// Handle building the view for creating a costume. 
// No body, no in path parameter, no query. 
// Does not need to be async 
exports.car_create_Page =  function(req, res) { 
    console.log("create view") 
    try{ 
        res.render('carcreate', { title: 'car Create'}); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 

// Handle building the view for updating a costume. 
// query provides the id 
exports.car_update_Page =  async function(req, res) { 
    console.log("update view for item "+req.query.id) 
    try{ 
        let result = await car.findById(req.query.id) 
        res.render('carupdate', { title: 'car Update', toShow: result }); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 

// Handle a delete one view with id from query 
exports.car_delete_Page = async function(req, res) { 
  console.log("Delete view for id "  + req.query.id) 
  try{ 
      result = await car.findById(req.query.id) 
      res.render('cardelete', { title: 'car Delete', toShow: 
result }); 
  } 
  catch(err){ 
      res.status(500) 
      res.send(`{'error': '${err}'}`); 
  } 
}; 

const { body } = require('express-validator/check')

exports.validate = (method) => {
  switch (method) {
    case 'carupdate': {
     return [ 
        body('carbrand', 'Username is mandatory').isUppercase(),
        body('carprice').optional().isInt()
       ]   
    }
  }
};

const { validationResult } = require('express-validator/check');

exports.carupdate = async (req, res, next) => {
   try {
      const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }

      const { carbrand,carprice } = req.body
      
      const user = await User.car_update_Page({

        carbrand,

        carprice

          
      })

      res.json(user)
   } catch(err) {
     return next(err)
   }
}