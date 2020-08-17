const express = require('express')
const app = express();
const axios = require('axios');

// app.get('/', (req,res) => {
app.get('https://acnhapi.com/v1/bugs')
    .then(response => {
        console.log(response.data.get());
});
// });

app.listen(3000);