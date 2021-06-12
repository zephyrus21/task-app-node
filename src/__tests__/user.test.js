const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const User = require('../models/user');
const mongoose = require('mongoose');

const userDemoId = new mongoose.Types.ObjectId();
const userDemo = {
  _id: userDemoId,
  name: 'Test One',
  email: 'testOne@test.com',
  password: 'Pass021',
  tokens: [
    {
      token: jwt.sign(
        {
          _id: userDemoId,
        },
        process.env.JWT_SECRET
      ),
    },
  ],
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userDemo).save();
});

test('should signup as a user', async () => {
  const response = await request(app)
    .post('/users')
    .send({
      name: 'Test',
      email: 'test@test.com',
      password: 'Pass021',
    })
    .expect(201);

  //* Checks if the database was changed
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  //* Checks the response
  expect(response.body).toMatchObject({
    user: {
      name: 'Test',
      email: 'test@test.com',
    },
    token: user.tokens[0].token,
  });
  expect(user.password).not.toBe('Pass021');
});

test('should login as a user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: userDemo.email,
      password: userDemo.password,
    })
    .expect(200);
});

test('should get user profile', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userDemo.tokens[0].token}`)
    .send()
    .expect(200);
});

test('should delete a user profile', async () => {
  await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userDemo.tokens[0].token}`)
    .send()
    .expect(200);
});
