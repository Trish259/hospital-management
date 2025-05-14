const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getAllAppointments, updateAppointmentStatus, addDoctor,
  getAllDoctors, getAllMessages, addAdmin
} = require('../controllers/adminController');

router.get('/appointments', auth, getAllAppointments);
router.patch('/appointments/:id', auth, updateAppointmentStatus);
router.post('/doctor', auth, addDoctor);
router.get('/doctors', auth, getAllDoctors);
router.get('/messages', auth, getAllMessages);
router.post('/add-admin', auth, addAdmin);

module.exports = router;