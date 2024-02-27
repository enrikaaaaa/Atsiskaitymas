const express = require('express');
const cors = require('cors');
const membershipRoutes = require('./routes/membershipRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 8081;

app.use(membershipRoutes);
app.use(userRoutes);
app.use(authRoutes);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT} port.`);
});
