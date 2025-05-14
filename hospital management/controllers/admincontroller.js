const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const Message = require('../models/Message');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getAllAppointments = async (req, res) => {
  const appointments = await Appointment.find().populate('userId doctorId');
  res.json(appointments);
};

exports.updateAppointmentStatus = async (req, res) => {
  await Appointment.findByIdAndUpdate(req.params.id, { status: req.body.status });
  res.json({ msg: 'Status updated' });
};

exports.addDoctor = async (req, res) => {
  const { name, specialty, availableSlots, contactInfo } = req.body;
  const doctor = new Doctor({ name, specialty, availableSlots, contactInfo });
  await doctor.save();
  res.status(201).json({ msg: 'Doctor added' });
};

exports.getAllDoctors = async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
};

exports.getAllMessages = async (req, res) => {
  const messages = await Message.find().populate('userId');
  res.json(messages);
};

exports.addAdmin = async (req, res) => {
  const { username, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const admin = new User({ username, email, password: hashed, role: 'admin' });
  await admin.save();
  res.status(201).json({ msg: 'Admin added' });
};