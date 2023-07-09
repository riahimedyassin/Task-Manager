const mongoose = require("mongoose");


const TaskSchema = new mongoose.Schema({
    name:{type:String,required:[true,"Please enter a task name"],trim:true,maxlength:[20,"Max value is 30 caracter"]},
    done:{type:Boolean,default:false,}
})

module.exports= mongoose.model("Task",TaskSchema)