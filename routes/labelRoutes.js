const express = require("express")
const router = express.Router()
const {addLabel,getLabels,deleteLabel} = require("../controllers/labelController")



router.post("/",addLabel)
router.get("/",getLabels)
router.delete("/",deleteLabel)


module.exports=router