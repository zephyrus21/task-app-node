const request = require('supertest');
const app = require('../app');
const User = require('../models/user');

const userDemo = {
  name: 'Test One',
  email: 'testOne@test.com',
  password: 'Pass021',
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userDemo).save();
});

test('should signup as a user', async () => {
  await request(app)
    .post('/users')
    .send({
      name: 'Test',
      email: 'test@test.com',
      password: 'Pass021',
    })
    .expect(201);
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
