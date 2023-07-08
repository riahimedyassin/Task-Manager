
const Task = require("../models/taskModel")



const addTask= async(req,res) => {
    const {name,done} = req.body;
    if(!name || !typeof(done)==="Boolean" ) {
        res.status(500)
        throw new Error("Server Error")
    }
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task)
    } catch (error) {
        res.status(500)
        throw new Error("Server Error")
    }
    
    //OR WE CAN USE THE TRY CATCH APPROACH : 
    //try {
        // const task = await Task.create(req.body);
        // res.status(201).json(task)
    //}
    //catch(err) => res.status(500).json({error : err})

}

const getAllTasks=async (req,res) => {
    try {
        await Task.find({}).then(data=> {
            res.status(200).json(data)
        })
    }
    catch(err) {
        res.status(500)
        throw new Error("Server Error")
    }
    
}
const getSingleTask= async(req,res) => {
    const id = req.params.id
    try {
        const task = await Task.findOne({_id:id})
        if(task) {
            res.status(200).json(task)
        }
        else {
            res.status(404)
        }
    } catch (error) {
        res.status(500)
    }
}
const deleteTask= async(req,res) => {
    const {id} = req.params;
    try {
        const task = await Task.findOneAndDelete({_id:id})
        if(task) {
            res.status(201).json({message:"Deleted Succesfully"})
        }
        else {
            res.status(404)
            return;
        }
        
    } catch (error) {
        res.status(500)
    }
}
const modifyTask= async(req,res) => {
    const {name,done} = req.body;
    const {id} = req.params;
    if(!name && !done ) {
        return res.status(200).json({message:"No modification"})
    }
    else {
        try {
            const task = await Task.findOneAndUpdate({_id:id},{name, done},{new:true,runValidators:true})
            if(task) {
                return res.status(201).json({message:"Updated"})
            }
            else {
                return res.status(404)
            }
        
        } catch (error) {
            res.status(500)
        }
    }
}

module.exports= {
    addTask,
    getAllTasks,
    getSingleTask,
    deleteTask,
    modifyTask 
}
