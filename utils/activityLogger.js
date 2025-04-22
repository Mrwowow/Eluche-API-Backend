const pool = require('../config/db');

/**
 * Log Activity
 * @param {object} activity - Details of the activity to log.
 * @param {number} activity.userId - ID of the user performing the action.
 * @param {string} activity.activityType - Type of activity (e.g., create, update, delete).
 * @param {number} activity.entityId - ID of the entity involved in the activity.
 * @param {string} activity.entityType - Type of entity (e.g., farm, consumer_profile, etc.).
 * @param {string} activity.description - Description of the activity performed.
 * @param {string} activity.ipAddress - IP address of the user.
 * @param {string} activity.userAgent - User agent string of the request.
 */
async function logActivity(activity) {
  const query = `
    INSERT INTO activity_logs (user_id, activity_type, entity_id, entity_type, description, ip_address, user_agent)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    activity.userId,
    activity.activityType,
    activity.entityId,
    activity.entityType,
    activity.description,
    activity.ipAddress,
    activity.userAgent,
  ];

  try {
    await pool.query(query, values);
    console.log('Activity logged successfully:', activity);
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
}

module.exports = { logActivity };