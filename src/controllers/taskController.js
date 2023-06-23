// External imports
const createError = require('http-errors');


// Internal imports
const Task = require('../models/task');



// Create task controller
const createNewTask = async (req, res, next) => {

    try {
        // new task object with email
        const newTask = await new Task({
            ...req.body,
            email: req.email
        });

        // save the task in db
        const result = await newTask.save();

        // response after task was saved
        if (result?._id && typeof result === 'object') {
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
const deleteTask = async (req, res, next) => {
    try {
        // query
        const id = req.params.id;
        const query = { _id: id };

        const result = await Task.findByIdAndDelete(query);

        // response after task was deleted
        res.status(200).json({
            status: "success", data: result
        });

    } catch (err) {
        next(createError(400, err.message));
    }
};


// update task controller
const updateTask = async (req, res, next) => {
    try {
        // query
        const id = req?.params.id;
        const query = { _id: id };
        const { status } = req.body;

        // update a task
        const result = await Task.updateOne(query, { $set: { status: status } }, { upsert: true, new: true });

        // response after task was updated
        if (!result) {
            res.status(400).json({
                status: "failed", data: "Task update failed!!"
            });
        } else {
            res.status(200).json({ status: "success", data: result });
        }

    } catch (err) {
        next(createError(404, err.message));
    }
}


// update task by list controller
const taskListSearch = async (req, res, next) => {

    try {
        // query
        const status = { status: req?.query?.status };

        // task list find 
        const taskList = await Task.find(status);

        // response after searched task list
        if (taskList.length > 0 && typeof taskList === 'object') {
            res.status(200).json({
                status: 'success',
                data: taskList
            })
        } else {
            res.status(200).json({
                status: 'failed',
                data: "No task found on your request"
            })
        }

    } catch (err) {
        next(createError(404, err.message));
    }
}


// Module exports
module.exports = { createNewTask, deleteTask, updateTask, taskListSearch };