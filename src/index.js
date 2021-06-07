const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log('Server up bitch!!!', port);
});

// const jwt = require('jsonwebtoken');

// const func = async () => {
//   const token = jwt.sign({ _id: 'abc123' }, 'helloboss');
//   console.log(token);

//   const data = jwt.verify(token, 'helloboss');
//   console.log(data);
// };

// func();
