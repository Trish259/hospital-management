const Appointment = require('../models/Appointment');
const Message = require('../models/Message');

exports.bookAppointment = async (req, res) => {
  const { doctorId, appointmentDate, description } = req.body;
  const appointment = new Appointment({
    userId: req.user.id,
    doctorId,
    appointmentDate,
    description
  });
  await appointment.save();
  res.status(201).json({ msg: 'Appointment booked' });
};

exports.sendMessage = async (req, res) => {
  const { messageText } = req.body;
  const message = new Message({ userId: req.user.id, messageText });
  await message.save();
  res.status(201).json({ msg: 'Message sent' });
};
