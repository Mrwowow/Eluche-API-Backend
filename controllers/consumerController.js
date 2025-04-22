const pool = require('../config/db');
const { formatError, formatSuccess } = require('../utils/response');
const { logActivity } = require('../utils/activityLogger');
const ConsumerProfile = require('../models/ConsumerProfile');


async function createConsumerProfile(req, res) {
  const userId = req.user.id;
  const { purchaseFrequency, preferredProducts, organicPreference, deliveryAddress, city, region, country, specialConsiderations } = req.body;

  try {
  
    const profileExists = await ConsumerProfile.profileExists(userId);
    if (profileExists) {
      return res.status(400).json(formatError('Consumer profile already exists.'));
    }


    const profileId = await ConsumerProfile.createProfile({
      userId, purchaseFrequency, preferredProducts, organicPreference, deliveryAddress, city, region, country, specialConsiderations,
    });

    await logActivity({ userId, activityType: 'create', entityId: profileId, entityType: 'consumer_profile', description: 'Created consumer profile.' });

    res.status(201).json(formatSuccess('Consumer profile created successfully!', { profileId }));
  } catch (error) {
    console.error(error);
    res.status(500).json(formatError('Failed to create consumer profile.'));
  }
}


async function queryConsumerProfiles(req, res) {
  const role = req.user.role;
  const userId = req.user.id;
  const { page = 1, limit = 10, city, region, country, purchaseFrequency } = req.query;

  try {
    const profiles = await ConsumerProfile.getProfiles({ city, region, country, purchaseFrequency }, role, userId, limit, (page - 1) * limit);
    res.status(200).json(formatSuccess('Consumer profiles retrieved successfully!', { profiles }));
  } catch (error) {
    console.error(error);
    res.status(500).json(formatError('Failed to retrieve consumer profiles.'));
  }
}


async function updateConsumerProfile(req, res) {
  const userId = req.user.id;
  const { profileId, purchaseFrequency, preferredProducts, organicPreference, deliveryAddress, city, region, country, specialConsiderations } = req.body;

  try {
    await ConsumerProfile.updateProfile({ profileId, userId, purchaseFrequency, preferredProducts, organicPreference, deliveryAddress, city, region, country, specialConsiderations });

    await logActivity({ userId, activityType: 'update', entityId: profileId, entityType: 'consumer_profile', description: `Updated profile ID: ${profileId}` });

    res.status(200).json(formatSuccess('Profile updated successfully!'));
  } catch (error) {
    console.error(error);
    res.status(500).json(formatError('Failed to update consumer profile.'));
  }
}


async function deleteConsumerProfile(req, res) {
    const profileId = req.body.profileId; 
    const userId = req.user?.id; 
  
    console.log('Deleting profile:', { profileId, userId }); 
  
    if (!profileId || !userId) {
      return res.status(400).json({ error: 'Profile ID and User ID are required' });
    }
  
    try {
      await ConsumerProfile.deleteProfile(profileId, userId);
      res.status(200).json({ success: true, message: 'Profile deleted successfully' });
    } catch (error) {
      console.error('Error deleting profile:', error);
      res.status(500).json({ error: 'Failed to delete profile' });
    }
  }

module.exports = {
  createConsumerProfile,
  queryConsumerProfiles,
  updateConsumerProfile,
  deleteConsumerProfile,
};