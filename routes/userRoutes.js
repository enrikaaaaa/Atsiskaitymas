const express = require('express');
require('dotenv').config();
const { MongoClient } = require('mongodb');

const router = express.Router();
const URI = process.env.MONGO_URL;
const client = new MongoClient(URI);

router.get('/users/:order', async (req, res) => {
  try {
    await client.connect();
    const data = await client
      .db('galutinis')
      .collection('users')
      .find()
      .toArray();
    await client.close();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

router.post('/users', async (req, res) => {
  try {
    await client.connect();
    const data = await client
      .db('galutinis')
      .collection('users')
      .insertOne(req.body);
    await client.close();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

module.exports = router;
