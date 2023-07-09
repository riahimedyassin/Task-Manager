const express = require("express");
const app = express()
const pageRoutes=require("./routes/pageRoutes")
//ENV GETTER
require('dotenv').config();
const port = process.env.PORT
const connectDB= require("./config/connects");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFoundHandler");

app.use(express.static("./public"))
app.use(express.json())


//ROUTE
app.use("/api/tasks/v1",pageRoutes);
app.use(notFound)
app.use(errorHandler)
const start =async () => {
    try {
        await connectDB(process.env.connectionString);
        app.listen(port,()=> console.log(`Server is running on port ${port}`))
    }
    catch(err) {
        console.log(err)
    }
}
start()






