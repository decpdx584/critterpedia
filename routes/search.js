const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');
const { response } = require('express');


// render search results
router.get('/', (req, res) => {
  let search = req.query.q.replace(/ /g, "_");
  db.critter.findOne({
      where: { name: search }
    })
    .then(critter1 => {
      axios.get(`https://acnhapi.com/v1a/${critter1.type}/${search}`)
      .then((response) => {
        let results = response.data;
        res.render('detail', { results, critter1 });
      })
      .catch(err => {
        console.log('Error', err);
      })
    })
    .catch(err => {
      console.log('Error', err);
    })
});

// render all fish from dropdown
// router.get('/', (req,res) => {
//   let fish = req.body.fish;
//   db.critter.findAll({
//       where: { type: fish }
//     })
//     .then(fishies => {
//       axios.get('https://acnhapi.com/v1a/fish')
//       .then((response) => {
//         let catch = response.data;
//         res.render('category', { catch, fishies });
//       })
//       .catch(err => {
//         console.log('Error', err);
//       })
//     })
//     .catch(err => {
//       console.log('Error', err);
//     })
// });



// render all bugs from dropdown




// render all sea creatures from dropdown




module.exports = router;