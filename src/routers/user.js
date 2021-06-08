const express = require('express');
const User = require('../models/user');
const auth = require('../middlewares/auth');
const router = express.Router();

//! To create new User
router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    //! This will produce a session token
    const token = await user.generateToken();

    res.status(201).send({ user, token });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

//! Logging In a User
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    //! This will produce a session token
    const token = await user.generateToken();
    res.send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/users/logout', auth, async (req, res) => {
  try {
    //! This will remove the current session token
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );

    await req.user.save();
    res.send();
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    //! This will remove the all sessions token
    req.user.tokens = [];

    await req.user.save();
    res.send();
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/users/me', auth, async (req, res) => {
  res.send(req.user);
});

// router.get('/users/:id', async (req, res) => {
//   const _id = req.params.id;

//   try {
//     const user = await User.findById(_id);

//     if (!user) return res.status(404).send();
//     res.send(user);
//   } catch (err) {
//     res.status(500).send();
//   }
// });

//! Update the User fields
router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation)
    return res.status(400).send({ error: 'Invalid operation' });

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));

    await req.user.save();
    res.send(req.user);
  } catch (err) {
    res.status(500).send(err);
  }
});

//! Delete the User
router.delete('/users/me', auth, async (req, res) => {
  try {
    //! 1st way
    // const user = await User.findByIdAndDelete(req.user._id);

    // if (!user) return res.status(404).send();
    // res.send(user);

    //! 2nd way
    await req.user.remove();
    res.send(req.user);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
