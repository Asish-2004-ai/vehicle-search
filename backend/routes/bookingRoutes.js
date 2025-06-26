const express = require('express');
const router = express.Router();
const { createBooking, deleteBooking, getAllBookings } = require('../controllers/bookingController');

router.post('/', createBooking);
router.delete('/:id', deleteBooking);
router.get('/', getAllBookings);



module.exports = router;
