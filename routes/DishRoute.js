const express = require('express');
const router = express.Router();
const Dish = require('../models/Dish');

// Create a new dish
router.post('/adddish', async (req, res) => {
  try {
    const { dishName, category } = req.body;

    // Check if a dish with the same name already exists in the specified category
    const existingDish = await Dish.findOne({ dishName, category });

    if (existingDish) {
      return res.status(400).send({ message: 'Dish with the same name already exists in this category' });
    }

    const dish = new Dish(req.body);
    await dish.save();
    res.status(201).send(dish);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all dishes
router.get('/getdishes', async (req, res) => {
  try {
    const dishes = await Dish.find().populate('category');
    res.status(200).send(dishes);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single dish by ID
router.get('/getdish/:id', async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id).populate('category');
    if (!dish) {
      return res.status(404).send({ message: 'Dish not found' });
    }
    res.status(200).send(dish);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a dish by ID
router.put('/updatedish/:id', async (req, res) => {
  try {
    // Find the dish being updated
    const dish = await Dish.findById(req.params.id);
    if (!dish) {
      return res.status(404).send({ message: 'Dish not found' });
    }

    // Get the old dish name
    const oldDishName = dish.dishName;

    // Update all dishes with the old dish name
    await Dish.updateMany(
      { dishName: oldDishName },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    // Update and return the original dish
    const updatedDish = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    res.status(200).send(updatedDish);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a dish by ID
router.delete('/deletedish/:id', async (req, res) => {
  try {
    const dish = await Dish.findByIdAndDelete(req.params.id);
    if (!dish) {
      return res.status(404).send({ message: 'Dish not found' });
    }
    res.status(200).send({ message: 'Dish deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
