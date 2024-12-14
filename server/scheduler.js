const cron = require('node-cron');
const Notification = require('../database/model/Notification'); // Adjust the path to your Notification model
const { sendNotification } = require('./sendNotification'); // Adjust path to your notification utility

// Scheduler to send notifications a day before the deadline
cron.schedule('0 0 * * *', async () => {
  console.log('Running daily notification scheduler...');

  try {
    // Calculate the date for the next day
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextDay = tomorrow.toISOString().split('T')[0]; // Format as YYYY-MM-DD

    // Fetch notifications that are due tomorrow
    const dueNotifications = await Notification.find({
      deadline: nextDay, // Replace "deadline" with the correct field name if different
    });

    // Iterate through notifications and send them
    for (const notification of dueNotifications) {
      await sendNotification(notification); // Call your notification utility
      console.log(`Notification sent for: ${notification.title}`);
    }

    console.log('Daily notification scheduler completed.');
  } catch (error) {
    console.error('Error in notification scheduler:', error);
  }
});

module.exports = {}; // Exporting an empty object in case you want to extend it later
