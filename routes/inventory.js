const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');

// add critter to inventory
router.post('/', (req, res) => {
    // console.log('🧩You hit the button!', req.body)
    // console.log(req.user)
    db.belongTos.findOrCreate({
        where: {
        userId: req.user.dataValues.id,
        critterId: req.body.id
        }
    }).then((response) => {
        // console.log('🏵', response)
        res.redirect('inventory');
    })
    .catch(error => {
    console.log('Error', error);
    })
});

// render user's inventory
router.get('/', (req, res) => {
    db.belongTos.findAll({
        where: {
            userId: req.user.id
        }
    })
    .then(belongTos => {
        // console.log(belongTos[0]);
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
router.put('/:id', (req, res) => {
    db.belongTos.findOne({
        where: {
            userId: req.user.id,
            critterId: req.params.id
        },
    })
    .then(crit => {
        crit.nickname= req.body.nickname;
        crit.save();
        // console.log('🤡', req.body.nickname)
        res.redirect('/inventory');
    })
    .catch(err => {
        console.log('Error', err);
    })
});

// remove critter from inventory
router.delete('/:idx', (req,res) => {
    db.belongTos.findOne({
        where: {
            userId: req.user.id,
            critterId: req.params.idx
        }
    })
    .then(async critter => {
        await critter.destroy();
        res.redirect('/inventory');
    })
    .catch(err => {
        console.log('Error', err);
    })
});

module.exports = router;