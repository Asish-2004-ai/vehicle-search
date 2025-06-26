const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');
const getEstimatedRideDurationHours = require('../utils/rideDuration');

exports.addVehicle = async (req, res) => {
  try {
    const { name, capacityKg, tyres } = req.body;
    if (!name || !capacityKg || !tyres) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const vehicle = new Vehicle({ name, capacityKg, tyres });
    await vehicle.save();

    res.status(201).json(vehicle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAvailableVehicles = async (req, res) => {
  try {
    const { capacityRequired, fromPincode, toPincode, startTime } = req.query;

    if (!capacityRequired || !fromPincode || !toPincode || !startTime) {
      return res.status(400).json({ message: 'Missing query parameters' });
    }

    const start = new Date(startTime);
    const duration = getEstimatedRideDurationHours(fromPincode, toPincode);
    const end = new Date(start.getTime() + duration * 60 * 60 * 1000);

    const candidates = await Vehicle.find({ capacityKg: { $gte: parseInt(capacityRequired) } });

    const availableVehicles = [];

    for (const vehicle of candidates) {
      const conflict = await Booking.findOne({
        vehicleId: vehicle._id,
        startTime: { $lt: end },
        endTime: { $gt: start },
      });

      if (!conflict) {
        availableVehicles.push({
          ...vehicle.toObject(),
          estimatedRideDurationHours: duration
        });
      }
    }

    res.status(200).json(availableVehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
