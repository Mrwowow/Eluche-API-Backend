const pool = require('../config/db');


async function profileExists(userId) {
  const query = 'SELECT id FROM consumer_profiles WHERE user_id = ?';
  const [rows] = await pool.query(query, [userId]);
  return rows.length > 0 ? rows[0].id : null;
}

async function createProfile(data) {
  const query = `
    INSERT INTO consumer_profiles 
    (user_id, purchase_frequency, preferred_products, organic_preference, delivery_address, city, region, country, special_considerations) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  try {
    const [result] = await pool.query(query, [
      data.userId,
      data.purchaseFrequency,
      data.preferredProducts,
      data.organicPreference,
      data.deliveryAddress,
      data.city,
      data.region,
      data.country,
      data.specialConsiderations,
    ]);
    return result.insertId;
  } catch (error) {
    console.error('Error creating profile:', error);
    throw new Error('Failed to create profile');
  }
}


async function getProfiles(filters = {}, role, userId, limit = 10, offset = 0) {
  let query = role === 'admin'
    ? 'SELECT * FROM consumer_profiles WHERE deleted = 0'
    : 'SELECT * FROM consumer_profiles WHERE user_id = ? AND deleted = 0';
  let values = role === 'admin' ? [] : [userId];

  if (filters.city) {
    query += ' AND city = ?';
    values.push(filters.city);
  }
  if (filters.region) {
    query += ' AND region = ?';
    values.push(filters.region);
  }
  if (filters.country) {
    query += ' AND country = ?';
    values.push(filters.country);
  }
  if (filters.purchase_frequency) {
    query += ' AND purchase_frequency = ?';
    values.push(filters.purchase_frequency);
  }

  query += ' LIMIT ? OFFSET ?';
  values.push(Number(limit), Number(offset));

  try {
    console.log('Query:', query);
    console.log('Values:', values);

    const [rows] = await pool.query(query, values);
    return rows;
  } catch (error) {
    console.error('Error retrieving profiles:', error);
    throw new Error('Failed to retrieve profiles');
  }
}


async function updateProfile(data) {
    const query = `
      UPDATE consumer_profiles 
      SET purchase_frequency = ?, preferred_products = ?, organic_preference = ?, delivery_address = ?, city = ?, region = ?, country = ?, special_considerations = ? 
      WHERE id = ? AND user_id = ?`;
    
    try {
      const [result] = await pool.query(query, [
        data.purchaseFrequency, data.preferredProducts, data.organicPreference,
        data.deliveryAddress, data.city, data.region, data.country,
        data.specialConsiderations, data.profileId, data.userId,
      ]);
  
      if (result.affectedRows === 0) {
        throw new Error('No profile found or unauthorized update.');
      }
  
      return data.profileId;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw new Error('Failed to update profile');
    }
  }


async function deleteProfile(profileId, userId) {
    const query = `UPDATE consumer_profiles SET deleted = 1 WHERE id = ? AND user_id = ?`;
    
    try {
      const [result] = await pool.query(query, [profileId, userId]);
      if (result.affectedRows === 0) {
        throw new Error('Profile not found or unauthorized deletion.');
      }
    } catch (error) {
      console.error('Error deleting profile:', error);
      throw new Error('Failed to delete profile');
    }
  }

module.exports = {
  profileExists,
  createProfile,
  getProfiles,
  updateProfile,
  deleteProfile,
};