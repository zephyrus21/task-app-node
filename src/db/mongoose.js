const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error('Invalid email');
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) throw new Error('Age must be +ve');
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
    trim: true,
    validate(value) {
      if (value < 6) throw new Error('Password must not be "password"');
    },
  },
});

const Task = mongoose.model('Task', {
  description: {
    type: String,
  },
  completedFields: {
    type: Boolean,
  },
});

const me = new User({
  name: 'John',
  email: 'mike@test.com',
});

const task = new Task({
  description: 'Hello Bitch',
  completedFields: true,
});

// me.save()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
