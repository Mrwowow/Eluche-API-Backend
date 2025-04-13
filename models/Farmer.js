const pool = require('../config/db');

async function createFarmerProfile(profile) {
  const sql = `INSERT INTO farmer_profiles (user_id, farm_name, farm_size, farm_type, farm_address, city, region, country) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const [result] = await pool.query(sql, [
    profile.userId,
    profile.farmName,
    profile.farmSize,
    profile.farmType,
    profile.farmAddress,
    profile.city,
    profile.region,
    profile.country,
  ]);
  return result.insertId; 
}

module.exports = { createFarmerProfile };