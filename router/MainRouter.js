const router = require("express").Router()
// import teh EventRouter File.
// This file basically make If you have multiple routering 

const events = require("./EventRouter")

router.use("/event",events)

module.exports = router
