
const Task = require("../models/taskModel")
const asyncWrapper = require("../middleware/asyncWrapper")
const {customError,createCustomError}= require("../errors/customError")

const addTask = asyncWrapper(async (req, res) => {
    const { name} = req.body
    console.log(req.body)
    if (!name ) {
        const err = new Error("Cannot Create Task")
        err.status = 500
        throw err
    }
    const task = await Task.create(req.body);
    res.status(201).json(task)

})

const getAllTasks = asyncWrapper(async (req, res,next) => {
    const task = await Task.find({}).then(data => {
        res.status(200).json(data)
    })
})
const getSingleTask = asyncWrapper(async (req, res,next) => {
    const id = req.params.id
    const task = await Task.findOne({ _id: id })
    if (task) {
        res.status(200).json(task)
    }
    else {
        return next(createCustomError("NOT_FOUND",404))
    }
})
const deleteTask = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id })
    if (task) {
        res.status(201).json({ message: "Deleted Succesfully" })
    }
    else {
        res.status(404)
        const err = new Error("Cannot find the task")
        err.status = 404
        throw err
    }

})
const modifyTask = asyncWrapper(async (req, res) => {
    const { name, done } = req.body;
    console.log(req.body)
    const { id } = req.params;
    if (!name && !done) {
        return res.status(200).json({ message: "No modification" })
    }
    else {
        const task = await Task.findOneAndUpdate({ _id: id }, { name, done }, { new: true, runValidators: true })
        if (task) {
            return res.status(201).json({ message: "Updated" })
        }
        else {
            res.status(404)
            const err = new Error("Cannot find the task")
            err.status = 404
            throw err
        }
    }
})

module.exports = {
    addTask,
    getAllTasks,
    getSingleTask,
    deleteTask,
    modifyTask
}
