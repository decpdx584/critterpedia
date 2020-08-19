const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');


// render search results
router.get('/', (req, res) => {
    let search = req.query.q;
    db.critter.findOne({
      where: { name: search }})
      .then(critter1 => {
        axios.get(`https://acnhapi.com/v1a/${critter1.type}/${search}`)
        .then((response) => {
          let results = response.data;
          res.render('results', { results });
        })
        .catch(err => {
          console.log('Error', err);
        })
      })

});
module.exports = router;