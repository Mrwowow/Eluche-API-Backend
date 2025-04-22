const express = require('express');
const farmerRoutes = require('./routes/farmerRoutes');
const authRoutes = require('./routes/authRoutes');
const consumerRoutes = require('./routes/consumerRoutes');

require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api', authRoutes); 
app.use('/api/consumers', consumerRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});