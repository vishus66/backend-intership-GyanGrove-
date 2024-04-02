const router = require("express").Router()

const events = require("./EventRouter")

router.use("/event",events)

module.exports = router
