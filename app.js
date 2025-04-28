const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes'); 
const consumerRoutes = require('./routes/consumerRoutes'); 
const farmRoutes = require('./routes/farmRoutes'); 
const cookieParser = require('cookie-parser');
const app = express();

dotenv.config();
app.use(express.json());
app.use(cookieParser());
 
app.use('/api', authRoutes);
app.use('/api/consumers', consumerRoutes);
app.use('/api/farms', farmRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


