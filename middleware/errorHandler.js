const constants= require("../constants.js")

const errorHandler = (err,req,res,next) => {
    const status = err.status || 500;
    switch(status) {
        case constants.NOT_FOUND : {
            return res.status(404).render("notFound.ejs")
        };
        case constants.FORBIDDEN : {
            return res.status(constants.FORBIDDEN).json({title:"FORBIDDEN",message:err,stackTrace : status})
        
        }
        case constants.UNAUTHORIZED : {
            return res.status(constants.UNAUTHORIZED).json({title:"UNAUTHORIZED",message:err,stackTrace : status})
        
        }
        case constants.VALIDATION_ERROR : {
            return res.status(constants.VALIDATION_ERROR).json({title:"VALIDATION_ERROR",message:err,stackTrace : status})
     
        }
        case constants.SERVER : {
            return res.status(constants.SERVER).json({title:"SERVER",message:err,stackTrace : status})
       
        };
        default : return res.status(200).json({title:"OK!",message:err,stackTrace : status})
    }
 
}
module.exports=errorHandler