const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');

// SEED FISH
router.get('/ed/fi/sh', (req,res) => {
    axios.get('https://acnhapi.com/v1a/fish')
    .then(response => {
        let fish = response.data
        fish.forEach(f => {
            db.critter.findOrCreate({
                where: {
                    type: 'fish',
                    name: f['file-name']
                }
            }).catch(err => {
                console.log('Error', err)
            });
        });
    }).catch(err => {
        console.log('Error', err)
    });
  });
  
  
// SEED BUGS
router.get('/ed/bu/gs', (req,res) => {
    axios.get('https://acnhapi.com/v1a/bugs')
    .then(response => {
        let bugs = response.data
        bugs.forEach(b => {
            db.critter.findOrCreate({
                where: {
                    type: 'bugs',
                    name: b['file-name']
                }
            }).catch(err => {
                console.log('Error', err)
            });
        });
    }).catch(err => {
        console.log('Error', err)
    });
});
  
  
// SEED SEA CREATURES
router.get('/ed/se/cr', (req,res) => {
    axios.get('https://acnhapi.com/v1a/sea')
    .then(response => {
        let sea = response.data
        sea.forEach(s => {
            db.critter.findOrCreate({
                where: {
                    type: 'sea',
                    name: s['file-name']
                }
            }).catch(err => {
                console.log('Error', err)
            });
        });
    }).catch(err => {
        console.log('Error', err)
    });
});


module.exports = router;