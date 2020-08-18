const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');

// render search results
router.get('/results', (req, res) => {
    let search = req.body.q;
    axios.get(`https://acnhapi.com/v1a/fish/`)
      .then((response) => {
        let fish = response.data;
        console.log(fish);
        res.render('/results', { data: fish });
      })
      .catch(err => {
        console.log('Error', err);
      });
  });

module.exports = router;