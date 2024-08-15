const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Create a new category
router.post('/createcategory', async (req, res) => {
  try {
    // Check if category with the same name already exists
    const existingCategory = await Category.findOne({ name: req.body.name });
    if (existingCategory) {
      return res.status(400).send({ error: 'Category with this name already exists' });
    }

    // Create and save the new category
    const category = new Category(req.body);
    await category.save();
    res.status(201).send(category);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all categories
router.get('/getcategories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single category by ID
router.get('/getcategor/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate('menu');
    if (!category) {
      return res.status(404).send({ message: 'Category not found' });
    }
    res.status(200).send(category);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a category by ID
router.put('/updatecategor/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!category) {
      return res.status(404).send({ message: 'Category not found' });
    }
    res.status(200).send(category);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a category by ID
router.delete('/deletecategor/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).send({ message: 'Category not found' });
    }
    res.status(200).send({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
