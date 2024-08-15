const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Assuming your user model is properly defined
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var jwtsecret = "hahahahbro its secert :) shhhhhh"

//create a user
router.post('/createuser', [
  body('username', 'Enter a valid name').isLength({ min: 3 }),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  // If there are errors, return Bad request and the errors
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success,errors: errors.array() });
  }
  try {
    // Check whether the user with this email exists already
    let user = await User.findOne({ username: req.body.username });
    if (user) {
        success = false
      return res.status(400).json({ success,error: "Sorry a user with this username already exists" })

    }

    // Create a new user
    user = await User.create({
      username: req.body.username,
      password: req.body.password,
      restaurant_id : req.body.restaurant_id
    });
  
    success = true;
    res.json((user))

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

//Login a user 
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: "User not found" });

        }
        
       

        if (password!==user.password) {
            return res.status(401).json({ error: "Invalid password" });
        }

        res.status(200).json( user );
    } catch (error) {
        console.error(error); // Log the error to the console for debugging purposes
        res.status(500).json({ error: "Internal server error" });
    }
});

//get user my api localhost:5000
router.get('/getuser/:userid', async (req, res) => {
    try {
      const { userid } = req.params;

       const user = await User.findById(userid).select( "-restaurant_id")
       res.send(user)

    } catch (error) {
        console.error(error); // Log the error to the console for debugging purposes
        res.status(500).json({ error: "Internal server error" });
    }
});

//Get Restaurant Info Associated with That user 

router.get('/getuserinfo/:restaurant_id', async (req, res) => {
  const { restaurant_id } = req.params;

  try {
      // Find all users with the given restaurant_id and populate only the name of the restaurant
      const users = await User.find({ restaurant_id }).populate('restaurant_id', 'name');

      if (!users || users.length === 0) {
          return res.status(404).json({ message: 'No users found for the given restaurant_id' });
      }

      // Format the response to include restaurant name alongside user details
      const response = users.map(user => ({
          _id: user._id,
          username: user.username,
          restaurant: {
              _id: user.restaurant_id._id,
              name: user.restaurant_id.name
          }
      }));

      res.json(response);
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
  }
});

//updateuser
router.put('/updateuser/:id', [
  body('username', 'Enter a valid name').optional().isLength({ min: 3 }),
  body('password', 'Password must be at least 5 characters').optional().isLength({ min: 5 }),
  body('restaurant_id', 'Enter a valid restaurant ID').optional(),
  body('restaurant_name', 'Enter a valid restaurant ID').optional()
], async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }

  const { username, password, restaurant_id,restaurant_name } = req.body;
  const userUpdates = {};
  if (username) userUpdates.username = username;
  if (password) userUpdates.password = password;
  if (restaurant_id) userUpdates.restaurant_id = restaurant_id;
  if (restaurant_name) userUpdates.restaurant_name = restaurant_name;

  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user = await User.findByIdAndUpdate(req.params.id, { $set: userUpdates }, { new: true });
    success = true;
    res.json({ success, user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
module.exports = router;
