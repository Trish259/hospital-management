const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { bookAppointment, sendMessage } = require('../controllers/userController');

router.post('/appointment', auth, bookAppointment);
router.post('/message', auth, sendMessage);

module.exports = router;