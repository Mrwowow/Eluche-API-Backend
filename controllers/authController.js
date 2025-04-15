const pool = require('../config/db');
const { generateToken } = require('../utils/jwt'); // JWT utility
const { hashPassword } = require('../utils/bcrypt'); // Password hashing utility
const { formatError, formatSuccess } = require('../utils/response'); // Response formatter

// Single Registration Endpoint
async function register(req, res) {
  const { email, password, firstName, lastName, role, profileDetails } = req.body;

  try {
    // 1. Validate Role
    const roleQuery = 'SELECT id FROM roles WHERE name = ?';
    const [roleRows] = await pool.query(roleQuery, [role]);
    if (roleRows.length === 0) {
      return res.status(400).json(formatError('Invalid role.'));
    }

    // 2. Check if User Already Exists
    const userQuery = 'SELECT id FROM users WHERE email = ?';
    const [userRows] = await pool.query(userQuery, [email]);
    if (userRows.length > 0) {
      return res.status(400).json(formatError('User already exists.'));
    }

    // 3. Hash Password and Create User
    const passwordHash = await hashPassword(password);
    const insertUserQuery = `
      INSERT INTO users (email, password_hash, first_name, last_name, stakeholder_type)
      VALUES (?, ?, ?, ?, ?)`;
    const [insertResult] = await pool.query(insertUserQuery, [
      email,
      passwordHash,
      firstName,
      lastName,
      role, // Store role in the `stakeholder_type` column
    ]);

    const userId = insertResult.insertId;

    // 4. Insert Role-Specific Profile
    if (role === 'farmer') {
      const { farmName, farmSize, farmType, farmAddress, city, region, country } = profileDetails;
      const farmerProfileQuery = `
        INSERT INTO farmer_profiles (user_id, farm_name, farm_size, farm_type, farm_address, city, region, country)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      await pool.query(farmerProfileQuery, [
        userId, farmName, farmSize, farmType, farmAddress, city, region, country,
      ]);
    } else if (role === 'processor') {
      const { facilityName, processingType, processingCapacity, facilityAddress, city, region, country } = profileDetails;
      const processorProfileQuery = `
        INSERT INTO processor_profiles (user_id, facility_name, processing_type, processing_capacity, facility_address, city, region, country)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      await pool.query(processorProfileQuery, [
        userId, facilityName, processingType, processingCapacity, facilityAddress, city, region, country,
      ]);
    } else if (role === 'distributor') {
      const { companyName, distributionType, productsDistributed, marketRegions, businessAddress, city, region, country, fleetSize, warehouseCount, warehouseCapacity, seekingProducers, businessLicense, foundedYear } = profileDetails;
      const distributorProfileQuery = `
        INSERT INTO distributor_profiles (user_id, company_name, distribution_type, products_distributed, market_regions, business_address, city, region, country, fleet_size, warehouse_count, warehouse_capacity, seeking_producers, business_license, founded_year)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      await pool.query(distributorProfileQuery, [
        userId, companyName, distributionType, productsDistributed, marketRegions, businessAddress, city, region, country, fleetSize, warehouseCount, warehouseCapacity, seekingProducers, businessLicense, foundedYear,
      ]);
    }

    // 5. Generate JWT Token
    const token = generateToken({
      id: userId,
      email,
      role,
    });

    res.status(201).json(formatSuccess('Registration and profile completion successful!', { token }));
  } catch (error) {
    console.error(error);
    res.status(500).json(formatError('Failed to process registration and profile completion.'));
  }
}

module.exports = { register };