// server/utils/sendNotification.js

const nodemailer = require('nodemailer');

// Set up your email transport service (you can use Gmail, SendGrid, etc.)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // Replace with your email
    pass: 'your-email-password',   // Replace with your email password or app-specific password
  },
});

// Function to send email notifications
const sendNotification = async (to, subject, message) => {
  const mailOptions = {
    from: 'your-email@gmail.com', // Replace with your email
    to: to,                       // Recipient's email
    subject: subject,             // Email subject
    text: message,                // Email message content
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Notification sent successfully!');
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

module.exports = sendNotification;
