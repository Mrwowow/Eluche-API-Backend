const pool = require('../config/db');


async function distributorProfileExists(userId) {
  const sql = `SELECT id FROM distributor_profiles WHERE user_id = ?`;
  const [rows] = await pool.query(sql, [userId]);
  return rows.length > 0; 
}


async function createDistributorProfile(profile) {
  const sql = `INSERT INTO distributor_profiles 
               (user_id, company_name, distribution_type, products_distributed, market_regions, business_address, city, region, country, fleet_size, warehouse_count, warehouse_capacity, seeking_producers, business_license, founded_year) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const [result] = await pool.query(sql, [
    profile.userId,
    profile.companyName,
    profile.distributionType,
    profile.productsDistributed,
    profile.marketRegions,
    profile.businessAddress,
    profile.city,
    profile.region,
    profile.country,
    profile.fleetSize,
    profile.warehouseCount,
    profile.warehouseCapacity,
    profile.seekingProducers,
    profile.businessLicense,
    profile.foundedYear,
  ]);
  return result.insertId; 
}

module.exports = { distributorProfileExists, createDistributorProfile };