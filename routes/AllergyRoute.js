const express = require('express');
const router = express.Router();
const Allergy = require('../models/Allergy');

// Create a new allergy
router.post('/addallergy', async (req, res) => {
  try {
    const allergy = new Allergy(req.body);
    await allergy.save();
    res.status(201).send(allergy);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all allergies
router.get('/getallergy', async (req, res) => {
  try {
    const allergies = await Allergy.find();
    res.status(200).send(allergies);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update an allergy by ID
router.put('/updateallergy/:id', async (req, res) => {
  try {
    const allergy = await Allergy.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!allergy) {
      return res.status(404).send();
    }
    res.status(200).send(allergy);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete an allergy by ID
router.delete('/deleteallergy/:id', async (req, res) => {
  try {
    const allergy = await Allergy.findByIdAndDelete(req.params.id);
    if (!allergy) {
      return res.status(404).send();
    }
    res.status(200).send(allergy);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
