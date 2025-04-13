const bcrypt = require('bcrypt');
const { createUser } = require('../models/User');
const { createProcessorProfile } = require('../models/Processor');
const { formatError } = require('../utils/response');


async function registerProcessor(req, res) {
  const { email, password, firstName, lastName, facilityName, processingType, processingCapacity, facilityAddress, city, region, country } = req.body;

  try {
    
    const passwordHash = await bcrypt.hash(password, 10);

    
    const userId = await createUser({
      email,
      passwordHash,
      firstName,
      lastName,
      stakeholderType: 'processor',
    });

    
    await createProcessorProfile({
      userId,
      facilityName,
      processingType,
      processingCapacity,
      facilityAddress,
      city,
      region,
      country,
    });

    res.status(201).json({ success: true, message: 'Processor registered successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json(formatError('Failed to register processor.'));
  }
}

module.exports = { registerProcessor };