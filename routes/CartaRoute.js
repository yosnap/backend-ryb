const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Carta = require('../models/Carta'); // Assuming your carta model is properly defined

// Create a Carta
router.post('/createcarta', [
  body('name', 'Name must be at least 1 character').isLength({ min: 1 }),
  body('description', 'Description is required').isLength({ min: 1 }),
  body('price', 'Price must be a number').isFloat({ min: 0 }),
  body('hasVideo', 'Has Video must be a boolean').isBoolean(),
  body('hasSound', 'Has Sound must be a boolean').isBoolean(),
  body('videoUrl', 'Video URL must be a valid URL').optional().isURL(),
  body('image', 'Image must be a valid URL').optional().isURL(),
  body('dishType', 'Dish Type is required').isLength({ min: 1 }),
  body('allergies', 'Allergies must be an array').isArray(),
  body('restaurant_id', 'Restaurant ID must be a valid Mongo ID').isMongoId(),
], async (req, res) => {
  // If there are validation errors, return Bad Request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Create a new Carta
    const carta = new Carta(req.body);
    await carta.save();

    res.json(carta);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Get all Cartas
router.get('/getcartas', async (req, res) => {
  try {
    const cartas = await Carta.find().populate('restaurant_id', 'name'); // Assuming you want to populate restaurant name
    res.json(cartas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
