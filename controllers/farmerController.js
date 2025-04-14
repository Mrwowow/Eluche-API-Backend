const { userExists, createUser } = require('../models/User');
const { farmerProfileExists, createFarmerProfile } = require('../models/Farmer');
const { formatError } = require('../utils/response');
const bcrypt = require('bcrypt');

async function registerFarmer(req, res) {
  const { email, password, firstName, lastName, farmName, farmSize, farmType, farmAddress, city, region, country } = req.body;

  try {

    if (await userExists(email)) {
      return res.status(400).json(formatError('User already exists.'));
    }

    const passwordHash = await bcrypt.hash(password, 10);


    const userId = await createUser({
      email,
      passwordHash,
      firstName,
      lastName,
      stakeholderType: 'farmer',
    });


    if (await farmerProfileExists(userId)) {
      return res.status(400).json(formatError('Farmer profile already exists.'));
    }


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
