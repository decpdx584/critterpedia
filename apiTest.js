const express = require('express')
const app = express();
const axios = require('axios');
const db = require('./models');


// axios.get('https://acnhapi.com/v1a/bugs')
//     .then(response => {
//             let bugs = response.data;
//             console.log(bugs)
//             // db.critter.findOrCreate({
//             //         where: {
//             //                 type: 'fish',
//             //                 apiId: fish.Id
//             //             }
//             //         });
// });


//     .then(([response, found]) => {
//         console.log(found);

// })
app.listen(3000);