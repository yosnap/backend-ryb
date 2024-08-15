const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');
const AddCategory = require('../models/AddCategory');
const Dish = require('../models/Dish');

// Function to update order numbers recursively
async function updateOrder(menuData) {
  for (const menu of menuData) {
    // Update Menu order
    const updatedMenu = await Menu.findByIdAndUpdate(
      menu.term_id,
      { orden: menu.orden },
      { new: true, useFindAndModify: false }
    );
    if (!updatedMenu) {
      throw new Error(`Menu with ID ${menu.term_id} not found.`);
    }

    for (const category of menu.categoria) {
      // Update Category order
      const updatedCategory = await AddCategory.findByIdAndUpdate(
        category.term_id,
        { orden: category.orden },
        { new: true, useFindAndModify: false }
      );
      if (!updatedCategory) {
        throw new Error(`Category with ID ${category.term_id} not found.`);
      }

      for (const plate of category.platos) {
        // Update Dish order
        const updatedDish = await Dish.findByIdAndUpdate(
          plate.dish_id,
          { order: plate.order },
          { new: true, useFindAndModify: false }
        );
        if (!updatedDish) {
          throw new Error(`Dish with ID ${plate.dish_id} not found.`);
        }
      }
    }
  }
}

// Update order route
router.put('/update-order', async (req, res) => {
  try {
    const orderData = req.body;
    await updateOrder(orderData);
    res.status(200).send({ message: 'Order numbers updated successfully.' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
