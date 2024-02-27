const express = require('express');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
const URI = process.env.MONGO_URL;
const client = new MongoClient(URI);

router.post('/auth/register', async (req, res) => {
  try {
    const newUser = req.body;
    const con = await client.connect();

    if (!newUser.email || !newUser.password) {
      return res
        .status(400)
        .send({ error: 'Email and password are required fields!' });
    }
    console.log('newUser', newUser);

    const userAlreadyExists = await con
      .db('galutinis')
      .collection('logins')
      .findOne({ email: newUser.email });

    if (userAlreadyExists) {
      return res.status(400).send({ error: 'User already exists' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);
    console.log('labas');
    const data = await con
      .db('galutinis')
      .collection('logins')
      .insertOne({ ...newUser, password: hashedPassword });

    await con.close();
    return res.send(data);
  } catch (error) {
    return res.status(500).send({ error });
  }
});

router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ error: 'Email and password are required fields' });
    }
    const con = await client.connect();
    const user = await con
      .db('galutinis')
      .collection('logins')
      .findOne({ email });
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).send({ error: 'Email or password is incorrect' });
    }

    const { _id } = user;
    const token = jwt.sign({ userId: _id }, 'privateKey');

    await con.close();
    delete user.password;
    return res.send({ token, user });
  } catch (err) {
    return res.status(500).send({ err });
  }
});

module.exports = router;
