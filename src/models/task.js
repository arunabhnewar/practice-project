// External imports
const mongoose = require('mongoose');


const taskSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
    }
}, { timestamps: true, versionKey: false });


const Task = mongoose.model('Task', taskSchema)


// module exports
module.exports = Task;