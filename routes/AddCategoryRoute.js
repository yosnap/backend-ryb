const express = require('express');
const router = express.Router();
const AddCategory = require('../models/AddCategory');

// Create a new category
router.post('/addcreatecategory', async (req, res) => {
  try {
    // Create and save the new category
    const category = new AddCategory(req.body);
    await category.save();
    res.status(201).send(category);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all categories
router.get('/getaddcategories', async (req, res) => {
  try {
    const categories = await AddCategory.find();
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single category by ID
router.get('/getcategory/:id', async (req, res) => {
  try {
    const category = await AddCategory.findById(req.params.id).populate('menu');
    if (!category) {
      return res.status(404).send({ message: 'Category not found' });
    }
    res.status(200).send(category);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a category by ID
router.put('/updatecategory/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Find the category being updated
    const categoryToUpdate = await AddCategory.findById(id);

    if (!categoryToUpdate) {
      return res.status(404).send({ message: 'Category not found' });
    }

    // Update all categories with the same name as the old name of the category
    const oldName = categoryToUpdate.name;

    // Update all matching categories
    const updateResult = await AddCategory.updateMany(
      { name: oldName },
      { $set: { name } },
      { new: true, runValidators: true }
    );

    // Also update the original category
    const updatedCategory = await AddCategory.findByIdAndUpdate(id, { name }, { new: true, runValidators: true });

    // Fetch all updated categories
    const allUpdatedCategories = await AddCategory.find({ name });

    res.status(200).send(allUpdatedCategories);
  } catch (error) {
    res.status(400).send(error);
  }
});


// Delete a category by ID
router.delete('/deletecategory/:id', async (req, res) => {
  try {
    // Find the category to delete
    const categoryToDelete = await AddCategory.findById(req.params.id);

    if (!categoryToDelete) {
      return res.status(404).send({ message: 'Category not found' });
    }

    // Get the name of the category to delete
    const nameToDelete = categoryToDelete.name;

    // Delete all categories with the same name
    const deleteResult = await AddCategory.deleteMany({ name: nameToDelete });

    // Respond with a success message and the count of deleted categories
    res.status(200).send({
      message: 'Categories deleted successfully',
      deletedCount: deleteResult.deletedCount
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
