const bcrypt = require('bcrypt');
const { createUser } = require('../models/User');
const { createFarmerProfile } = require('../models/Farmer');
const { formatError } = require('../utils/response');


async function registerFarmer(req, res) {
  const { email, password, firstName, lastName, farmName, farmSize, farmType, farmAddress, city, region, country } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);


    const userId = await createUser({
      email,
      passwordHash,
      firstName,
      lastName,
      stakeholderType: 'farmer',
    });

    // Create the farmer profile
    await createFarmerProfile({
      userId,
      farmName,
      farmSize,
      farmType,
      farmAddress,
      city,
      region,
      country,
    });

    res.status(201).json({ success: true, message: 'Farmer registered successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json(formatError('Failed to register farmer.'));
  }
}

module.exports = { registerFarmer };