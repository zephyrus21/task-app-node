const mongoose = require('mongoose');

const Task = mongoose.model('Task', {
  description: {
    type: String,
    trim: true,
    required: true,
  },
  completedFields: {
    type: Boolean,
    default: false,
  },
});

module.exports = Task;
