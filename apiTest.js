const express = require('express')
const app = express();
const axios = require('axios');
const db = require('./models');

// SEED FISH

// axios.get('https://acnhapi.com/v1a/fish')
// .then(response => {
//     let fish = response.data
//     fish.forEach(f => {
//         db.critter.findOrCreate({
//             where: {
//                 type: 'fish',
//                 name: f['file-name']
//             }
//         }).catch(err => {
//             console.log('Error', err)
//         });
//     });
// }).catch(err => {
//     console.log('Error', err)
// });

// SEED BUGS

// axios.get('https://acnhapi.com/v1a/bugs')
// .then(response => {
//     let bugs = response.data
//     bugs.forEach(b => {
//         db.critter.findOrCreate({
//             where: {
//                 type: 'bugs',
//                 name: b['file-name']
//             }
//         }).catch(err => {
//             console.log('Error', err)
//         });
//     });
// }).catch(err => {
//     console.log('Error', err)
// });

// SEED SEA CREATURES

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

    
app.listen(3000);


// axios.get('https://acnhapi.com/v1a/fish')
//     .then(response => {
//         let fish = response.data;
//         db.critter.findOrCreate({
//             where: {
//                 type: 'fish',
//                 apiId: fish.Id
//             }
//         });
// });


//     .then(([response, found]) => {
//         console.log(found);
        
// })