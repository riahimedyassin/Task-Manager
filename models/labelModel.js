const mongoose = require("mongoose")


const labelSchema = new mongoose.Schema({
    name: {
        type: String , 
        required : true,
        maxlength: [10,"Label Name should not exceed 10 caracters"]
    }
})


module.exports=mongoose.model("Label",labelSchema)