const constants= require("../constants.js")

const errorHandler = (err,req,res,next) => {
    const status = res.statusCode || 500;
    switch(status) {
        case constants.NOT_FOUND : {
            res.json({title:"NOT_FOUND",message:err.message,stackTrace : status})
            break;
        };
        case constants.FORBIDDEN : {
            res.json({title:"FORBIDDEN",message:err.message,stackTrace : status})
            break;
        }
        case constants.UNAUTHORIZED : {
            res.json({title:"UNAUTHORIZED",message:err.message,stackTrace : status})
            break;
        }
        case constants.VALIDATION_ERROR : {
            res.json({title:"VALIDATION_ERROR",message:err.message,stackTrace : status})
            break;
        }
        case constants.SERVER : {
            res.json({title:"SERVER",message:err.message,stackTrace : status})
            break;
        };
    }
}
module.exports=errorHandler