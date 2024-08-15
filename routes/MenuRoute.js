const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');

// Create a new menu
router.post('/createmenu', async (req, res) => {
  try {
    // Check if menu with the same name already exists
    const existingMenu = await Menu.findOne({ name: req.body.name });
    if (existingMenu) {
      return res.status(400).send({ error: 'Menu with this name already exists' });
    }

    // Create and save the new menu
    const menu = new Menu(req.body);
    await menu.save();
    res.status(201).send(menu);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all menus
router.get('/getmenus', async (req, res) => {
  try {
    const menus = await Menu.find().populate('restaurant', '_id');
    res.status(200).send(menus);
  } catch (error) {
    res.status(500).send(error);
  }
});


// Get a single menu by ID
router.get('/getmenu/:id', async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id).populate('restaurant');
    if (!menu) {
      return res.status(404).send({ message: 'Menu not found' });
    }
    res.status(200).send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a menu by ID
router.put('/updatemenu/:id', async (req, res) => {
  try {
    const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!menu) {
      return res.status(404).send({ message: 'Menu not found' });
    }
    res.status(200).send(menu);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a menu by ID
router.delete('/deletemenu/:id', async (req, res) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);
    if (!menu) {
      return res.status(404).send({ message: 'Menu not found' });
    }
    res.status(200).send({ message: 'Menu deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
