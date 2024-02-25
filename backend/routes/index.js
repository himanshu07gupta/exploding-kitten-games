const express = require("express");
const {userrouter} = require("./user")
const mainrouter = express.Router();

mainrouter.use("/user",userrouter)


module.exports={
    mainrouter
}