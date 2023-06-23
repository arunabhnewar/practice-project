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
        const { title, description, status } = req.body;

        // update a task
        const result = await Task.updateOne(query, { $set: { title: title, description: description, status: status } }, { upsert: true, new: true });

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
const taskListUpdate = async (req, res, next) => {
    try {

    } catch (err) {

    }
}


// Module exports
module.exports = { createNewTask, deleteTask, updateTask, taskListUpdate };