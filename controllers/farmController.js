const Farm = require('../models/Farm');
const { logActivity } = require('../utils/activityLogger');
const { sendNotification } = require('../utils/notifications');
const { formatError, formatSuccess } = require('../utils/response');

async function createFarm(req, res) {
    const { farmerId, farmName, farmSize, farmType, address, city, region, country, gpsCoordinates, soilType, waterSource, irrigationType, certification, description } = req.body;

    if (!farmerId) {
        return res.status(400).json(formatError('Farmer ID is required.'));
    }

    try {
        const farmId = await Farm.createFarm({
            farmerId, farmName, farmSize, farmType, address, city, region, country,
            gpsCoordinates, soilType, waterSource, irrigationType, certification, description
        });

        await logActivity({
            userId: farmerId,
            activityType: 'create',
            entityId: farmId,
            entityType: 'farm',
            description: `Created farm: ${farmName}`
        });

        await sendNotification(`Your farm '${farmName}' has been successfully created.`, farmerId);

        res.status(201).json(formatSuccess('Farm created successfully!', { farmId }));
    } catch (error) {
        console.error('Error creating farm:', error);
        res.status(500).json(formatError('Failed to create farm.'));
    }
}


async function getFarms(req, res) {
    const userId = req.user.id;
    const role = req.user.role;
    const { page = 1, limit = 10, location, farmType, certification } = req.query;

    try {
        const farms = await Farm.getFarms({ location, farmType, certification }, role, userId, limit, (page - 1) * limit);
        res.status(200).json(formatSuccess('Farms retrieved successfully!', { farms }));
    } catch (error) {
        console.error('Error retrieving farms:', error);
        res.status(500).json(formatError('Failed to retrieve farms.'));
    }
}


async function updateFarm(req, res) {
    const bodyData = req.body;

    if (!bodyData || !bodyData.farmId) {
        return res.status(400).json({ error: 'Farm ID is required for update.' });
    }

    try {
        const updatedFarmId = await Farm.updateFarm(bodyData);

        await logActivity({
            userId: req.user.id,
            activityType: 'update',
            entityId: updatedFarmId,
            entityType: 'farm',
            description: `Updated farm: ${bodyData.farmName}`
        });

        await sendNotification(`Your farm '${bodyData.farmName}' has been updated.`, req.user.id);

        res.status(200).json({ success: true, message: 'Farm updated successfully!' });
    } catch (error) {
        console.error('Error updating farm:', error);
        res.status(500).json({ error: 'Failed to update farm.' });
    }
}


async function deleteFarm(req, res) {
  const { farmId, farmerId } = req.body;

  if (!farmId || !farmerId) {
    return res.status(400).json({ error: 'Farm ID and Farmer ID are required' });
  }

  try {
    await Farm.deleteFarm(farmId, farmerId);

    await logActivity({
      userId: req.user.id,
      activityType: 'delete',
      entityId: farmId,
      entityType: 'farm',
      description: `Deleted farm with ID: ${farmId}`
    });

    res.status(200).json({ success: true, message: 'Farm deleted successfully!' });
  } catch (error) {
    console.error('Error deleting farm:', error);
    res.status(500).json({ error: 'Failed to delete farm.' });
  }
}


module.exports = { createFarm, getFarms, updateFarm, deleteFarm };