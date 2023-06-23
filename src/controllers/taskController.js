// External imports
const createError = require('http-errors');


// Internal imports
const Task = require('../models/task');



// Create task controller
const createNewTask = async (req, res, next) => {

    try {
        // query
        const email = req.body.email;

        // new task object with email
        const newTask = await new Task({
            ...req.body,
            email: email
        });

        // save the task in db
        const result = await newTask.save();

        // response after task was saved
        if (result._id && typeof result === 'object') {
            res.status(200).json({
                status: "success", data: result
            })
        } else {
            res.status(400).json({
                status: "failed", data: "Invalid email"
            })
        }

    } catch (err) {
        next(createError(400, err.message));
    }
};



// Delete task controller
const deleteTask = async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: id };

        const result = await Task.findByIdAndDelete(query);

        res.status(200).json({
            status: "success", data: result
        });

    } catch (err) {
        next(createError(400, err.message));
    }
}




// Module exports
module.exports = { createNewTask, deleteTask };