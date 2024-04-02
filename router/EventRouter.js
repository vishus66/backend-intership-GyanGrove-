// Import the Router class in the Express js  
const router = require("express").Router()
// function is import and distructure  form the EventController module 
const{createRecorde,getRecord,findevent} = require("../controller/EventController")
//Each router tell the functionality that to get ,post....
router.get("/",getRecord)
router.post("/",createRecorde)
router.get("/find",findevent)

// Export the file 
module.exports = router
