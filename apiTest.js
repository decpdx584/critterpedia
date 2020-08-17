const express = require('express')
const app = express();
const axios = require('axios');

// app.get('/', (req,res) => {
axios.get('https://acnhapi.com/v1/sea')
    .then(response => {
        console.log(response.data);
});
// });

app.listen(3000);