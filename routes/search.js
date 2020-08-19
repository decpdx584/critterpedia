const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');


// render search results
router.get('/', (req, res) => {
    let search = req.query.q;
    console.log('😎', search)
    axios.get(`https://acnhapi.com/v1/fish/${search}`)
      .then((response) => {
        console.log('line13', response)
        let fish = response.data;
        console.log(fish);
        res.render('results');
      })
      .catch(err => {
        console.log('Error', err);
      })
});
module.exports = router;