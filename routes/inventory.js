const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');

// add critter to inventory
router.post('/', (req, res) => {
    // console.log('🧩You hit the button!', req.body)
    // console.log(req.user)
    db.belongTos.create({
        userId: req.user.dataValues.id,
        critterId: req.body.id
    }).then((response) => {
        console.log('🏵', response)
    })
    .catch(error => {
    console.log('Error', error);
    })
    res.redirect('inventory')
  });

// render user's inventory
router.get('/', (req, res) => {
    db.belongTos.findAll({
        where: {
            userId: req.user.id
        }
    })
    .then(belongTos => {
        console.log(belongTos[0]);
        db.user.findOne({
            where: {
                id: req.user.id
            },
            include: [db.critter]
        }).then(user => {
            res.render('inventory', { belongTos, user, critters: user.critters });
        })
        .catch(err => {
            console.log('Error', err);
        })
    })
    .catch(err => {
        console.log('Error', err);
    })
});

// add nickname to inventory critter


module.exports = router;