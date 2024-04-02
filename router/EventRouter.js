const router = require("express").Router()
const{createRecorde,getRecord,findevent} = require("../controller/EventController")

router.get("/",getRecord)
router.post("/",createRecorde)
router.get("/find",findevent)


module.exports = router