const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');

// render inventory
// router.get('/', (req, res) => {
//     // console.log('🎯', req.user.dataValues.id)
//     res.render('inventory');
// });

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


module.exports = router;