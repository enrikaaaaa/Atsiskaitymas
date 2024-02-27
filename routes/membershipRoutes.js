const express = require('express');
require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();
const URI = process.env.MONGO_URL;
const client = new MongoClient(URI);

router.get('/memberships', verifyToken, async (req, res) => {
  try {
    await client.connect();
    const data = await client
      .db('galutinis')
      .collection('services')
      .aggregate([
        {
          $lookup: {
            from: 'users',
            localField: '_id',
            foreignField: 'service_id',
            as: 'user',
          },
        },
      ])
      .toArray();
    await client.close();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

router.post('/memberships', async (req, res) => {
  try {
    await client.connect();
    const data = await client
      .db('galutinis')
      .collection('services')
      .insertOne(req.body);
    await client.close();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

router.delete('/memberships/:id', async (req, res) => {
  try {
    await client.connect();
    const data = await client
      .db('galutinis')
      .collection('services')
      .deleteOne({ _id: new ObjectId(req.params.id) });
    await client.close();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

module.exports = router;
