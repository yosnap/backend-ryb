const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const Menu = require('../models/Menu');
const AddCategory = require('../models/AddCategory');
const Dish = require('../models/Dish');

// Function to populate restaurant data with sorting
async function populateRestaurantData(restaurant) {
  const menus = await Menu.find({ restaurant: restaurant._id }).sort({ orden: 1 });
  const populatedMenus = await Promise.all(
    menus.map(async (menu) => {
      const categories = await AddCategory.find({ menu: menu._id }).sort({ orden: 1 });
      const populatedCategories = await Promise.all(
        categories.map(async (category) => {
          const dishes = await Dish.find({ category: category._id }).sort({ order: 1 });
          return {
            nombre: category.name,
            term_id: category._id,
            orden: category.orden,
            platos: dishes.map(dish => ({
              dish_id: dish._id,
              dishName: dish.dishName,
              order: dish.order,
              allergens: dish.allergens,
            })).sort((a, b) => a.order - b.order) // Sort dishes by order
          };
        })
      );
      return {
        nombre: menu.name,
        term_id: menu._id,
        orden: menu.orden,
        precio: menu.precio,
        menu_activo: menu.menu_activo,
        categoria: populatedCategories.sort((a, b) => a.orden - b.orden) // Sort categories by orden
      };
    })
  );
  return {
    restaurant: {
      nombre: restaurant.name,
      restaurant_id: restaurant._id,
      'logo-dark': restaurant.logo_dark
    },
    menu: populatedMenus.sort((a, b) => a.orden - b.orden) // Sort menus by orden
  };
}

// Get full data for all restaurants
router.get('/full-data', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    const fullData = await Promise.all(
      restaurants.map(async (restaurant) => {
        return await populateRestaurantData(restaurant);
      })
    );
    res.status(200).send(fullData);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get data for a specific restaurant by ID
router.get('/getrestaurant/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).send({ error: 'Restaurant not found' });
    }
    const restaurantData = await populateRestaurantData(restaurant);
    res.status(200).send([restaurantData]);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
