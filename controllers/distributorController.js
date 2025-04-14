const { userExists, createUser } = require('../models/User');
const { distributorProfileExists, createDistributorProfile } = require('../models/Distributor');
const { formatError } = require('../utils/response');
const bcrypt = require('bcrypt');

async function registerDistributor(req, res) {
  const { email, password, firstName, lastName, companyName, distributionType, productsDistributed, marketRegions, businessAddress, city, region, country, fleetSize, warehouseCount, warehouseCapacity, seekingProducers, businessLicense, foundedYear } = req.body;

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
      stakeholderType: 'distributor',
    });


    if (await distributorProfileExists(userId)) {
      return res.status(400).json(formatError('Distributor profile already exists.'));
    }


    await createDistributorProfile({
      userId,
      companyName,
      distributionType,
      productsDistributed,
      marketRegions,
      businessAddress,
      city,
      region,
      country,
      fleetSize,
      warehouseCount,
      warehouseCapacity,
      seekingProducers,
      businessLicense,
      foundedYear,
    });

    res.status(201).json({ success: true, message: 'Distributor registered successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json(formatError('Failed to register distributor.'));
  }
}

module.exports = { registerDistributor };