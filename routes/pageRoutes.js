const express = require("express");
const router = express.Router()
const {
    addTask,
    getAllTasks,
    getSingleTask,
    deleteTask,
    modifyTask
}= require("../controllers/tasksController")


//GET ALL TASKS
router.get("/",getAllTasks)
//CREATE NEW TASK
router.post("/",addTask)
//GET TASK WITH THE GIVEN ID
router.get("/:id",getSingleTask)
//DELETE TASK WITH THE GIVEN ID
router.delete("/:id",deleteTask)
//MODIFY TASK WITH THE GIVEN ID
router.patch("/:id",modifyTask)

module.exports=router