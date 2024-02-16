const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret.id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = { Todo };
