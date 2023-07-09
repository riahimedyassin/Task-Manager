const fs = require("fs/promises")
const express=require("express")
const app = express()
const notFound=async (req,res,next) =>  {
    res.status(404).render("notFound.ejs")
}

module.exports=notFound