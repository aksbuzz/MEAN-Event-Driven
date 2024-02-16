const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: true,
  },
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = { Todo };
