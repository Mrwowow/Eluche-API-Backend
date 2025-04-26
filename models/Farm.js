const pool = require('../config/db');

async function createFarm(data) {
  const query = `
    INSERT INTO farms (farmer_id, farm_name, farm_size, farm_type, address, city, region, country, gps_coordinates, soil_type, water_source, irrigation_type, certification, description) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const [result] = await pool.query(query, [
    data.farmerId, data.farmName, data.farmSize, data.farmType,
    data.address, data.city, data.region, data.country,
    data.gpsCoordinates, data.soilType, data.waterSource,
    data.irrigationType, data.certification, data.description
  ]);
  return result.insertId;
}

async function getFarms(filters, role, farmerId, limit, offset) {
    let query = role === 'admin'
        ? 'SELECT * FROM farms WHERE deleted = 0'
        : 'SELECT * FROM farms WHERE farmer_id = ? AND deleted = 0';
    let values = role === 'admin' ? [] : [farmerId];

    Object.keys(filters).forEach((key) => {
        if (filters[key] !== null && filters[key] !== undefined) {
            query += ` AND ${key} = ?`;
            values.push(filters[key]);
        }
    });

    query += ' LIMIT ? OFFSET ?';
    values.push(Number(limit), Number(offset));

    const [rows] = await pool.query(query, values);
    return rows;
}


async function updateFarm(data) {
    const query = `
        UPDATE farms 
        SET farm_name = ?, farm_size = ?, farm_type = ?, address = ?, city = ?, region = ?, country = ?, gps_coordinates = ?, soil_type = ?, water_source = ?, irrigation_type = ?, certification = ?, description = ? 
        WHERE id = ? AND farmer_id = ?`;

    const [result] = await pool.query(query, [
        data.farmName, data.farmSize, data.farmType,
        data.address, data.city, data.region, data.country,
        data.gpsCoordinates, data.soilType, data.waterSource,
        data.irrigationType, data.certification, data.description,
        data.farmId, data.farmerId
    ]);

    if (result.affectedRows === 0) {
        throw new Error('No farm found or unauthorized update.');
    }

    return data.farmId;
}



async function deleteFarm(farmId, farmerId) {
  console.log('Deleting farm with:', { farmId, farmerId }); 

  const query = `UPDATE farms SET deleted = 1 WHERE id = ? AND farmer_id = ?`;
  console.log('Executing Query:', query);
  console.log('Values:', farmId, farmerId);

  const [result] = await pool.query(query, [farmId, farmerId]);

  console.log('Query Result:', result);
  if (result.affectedRows === 0) {
    throw new Error('Farm not found or unauthorized deletion.');
  }
}

module.exports = { createFarm, getFarms, updateFarm, deleteFarm };