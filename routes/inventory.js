const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');

// require authorization middleware at the top of the page
// const isLoggedIn = require('./middleware/isLoggedIn');

// // render user's inventory
// router.get('/inventory', (req, res) => {
//     console.log('Its your inventory!');
// });



module.exports = router;