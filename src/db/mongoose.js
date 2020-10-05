const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const User = mongoose.model('User', {
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid');
            }
        },
    },
    age: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error('Invalid age');
            }
        },
    },
});

const me = new User({
    name: 'Piyush',
    email: 'piyush.com',
});

me.save()
    .then(() => {
        console.log(me);
    })
    .catch((err) => {
        console.log('Error', err);
    });
