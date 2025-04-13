const pool = require('../config/db');

async function createProcessorProfile(profile) {
  const sql = `INSERT INTO processor_profiles 
               (user_id, facility_name, processing_type, processing_capacity, facility_address, city, region, country) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const [result] = await pool.query(sql, [
    profile.userId,
    profile.facilityName,
    profile.processingType,
    profile.processingCapacity,
    profile.facilityAddress,
    profile.city,
    profile.region,
    profile.country,
  ]);
  return result.insertId; 
}

module.exports = { createProcessorProfile };