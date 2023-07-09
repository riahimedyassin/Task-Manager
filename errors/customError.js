
class customError extends Error {
    constructor(message,statusCode) {
        super(message)
        this.status=statusCode 
    }
}
const createCustomError=(messsage,statusCode) => new customError(messsage,statusCode)




module.exports = {customError,createCustomError}