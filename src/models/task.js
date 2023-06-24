// External imports
const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
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
        trim: true,
        required: true,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    }
}, { timestamps: true, versionKey: false });


const Task = mongoose.model('Task', taskSchema)


// module exports
module.exports = Task;