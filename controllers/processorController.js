const { userExists, createUser } = require('../models/User');
const { processorProfileExists, createProcessorProfile } = require('../models/Processor');
const { formatError } = require('../utils/response');

async function registerProcessor(req, res) {
  const { email, password, firstName, lastName, facilityName, processingType, processingCapacity, facilityAddress, city, region, country } = req.body;

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
      stakeholderType: 'processor',
    });


    if (await processorProfileExists(userId)) {
      return res.status(400).json(formatError('Processor profile already exists.'));
    }


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
