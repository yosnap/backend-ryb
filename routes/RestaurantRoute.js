const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');

// Create a new restaurant
router.post('/createrestaurant', async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.status(201).send(restaurant);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all restaurants
router.get('/getrestaurant', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).send(restaurants);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
