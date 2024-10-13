const express = require('express');
const User = require('../models/User'); // Assuming you have a User schema
const router = express.Router();

module.exports = (upload) => {
  // POST route to handle form data and file upload
  router.post('/', upload.single('faceImage'), async (req, res) => {
    try {
      const {
        passportDetails,
        visaDetails,
        employer,
        sector,
        phone,
        address,
        emergencyContact,
        homelandAddress,
      } = req.body;

      // Create a new user instance
      const newUser = new User({
        passportDetails,
        visaDetails,
        employer,
        sector,
        phone,
        address,
        emergencyContact,
        homelandAddress,
        faceImage: req.file ? req.file.path : '', // Store the image path if uploaded
      });

      // Save user to the database
      const savedUser = await newUser.save();
      res.status(201).json({ message: 'User added', user: savedUser });
    } catch (error) {
      console.error('Error adding user:', error);
      res.status(500).json({ error: 'Failed to add user' });
    }
  });

  return router;
};
