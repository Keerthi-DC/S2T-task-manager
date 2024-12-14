const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  recipientEmail: {
    type: String, // If sending email, you would need this
    required: true,
  },
});

module.exports = mongoose.model('Notification', NotificationSchema);
