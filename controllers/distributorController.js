const bcrypt = require('bcrypt');
const { createUser } = require('../models/User');
const { createDistributorProfile } = require('../models/Distributor');
const { formatError } = require('../utils/response');

// Distributor registration controller
async function registerDistributor(req, res) {
  const { email, password, firstName, lastName, companyName, distributionType, productsDistributed, marketRegions, businessAddress, city, region, country, fleetSize, warehouseCount, warehouseCapacity, seekingProducers, businessLicense, foundedYear } = req.body;

  try {
    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create the user record
    const userId = await createUser({
      email,
      passwordHash,
      firstName,
      lastName,
      stakeholderType: 'distributor',
    });

    // Create the distributor profile
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