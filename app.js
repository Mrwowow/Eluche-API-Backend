const express = require('express');
const farmerRoutes = require('./routes/farmerRoutes');
const processorRoutes = require('./routes/processorRoutes');
const distributorRoutes = require('./routes/distributorRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api', authRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});