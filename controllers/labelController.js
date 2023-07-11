const asyncWrapper = require("../middleware/asyncWrapper")
const Label=require("../models/labelModel")
const customError=require("../errors/customError")

const addLabel = asyncWrapper(async(req,res,next) => {
    const {name} = req.body 
    if(!name) {
        return next(createCustomError("ALL FIELDS ARE MANADATORY",400))
    }
    let exist = []
    exist.push(await Label.findOne({name}))
    if(exist[0]!==null) {
        return res.status(200).json({message:"Label Already Exists"})
    }
    const label = await Label.create({name})
    if(!label) {
        return next(createCustomError("SERVER ERROR",500))
    }
    return res.status(200).json(label)
})
const getLabels=asyncWrapper(async(req,res,next) => {
    const labels = await Label.find({})
    if(labels) {
        res.status(200).json(labels)
    }
    else {
        return next(customError("SERVER ERROR",500))
    }
})

const deleteLabel=asyncWrapper(async(req,res,next) => {
    const {name} = req.body
    const label = await Label.findOneAndDelete({name})
    console.log(label)
    if(label) {
        return res.status(204).json({message:"Done"})
    }
    else {
        return next(createCustomError('LABEL NOT FOUND', 404));
    }
})






module.exports={addLabel,getLabels,deleteLabel}