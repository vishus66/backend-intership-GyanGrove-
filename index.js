const express = require("express")
const app = express()
const router = require("./router/MainRouter")
require("./dbconnect")

app.use(express.json())
app.use("/api",router)

app.listen(8000,()=>console.log("Server is running at http://localhost:8000"))