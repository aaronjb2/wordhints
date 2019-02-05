const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());
const {SERVER_PORT, MASSIVE_CONNECTION} = process.env;

app.use( express.static( `${__dirname}/../build` ) );

app.listen(SERVER_PORT,()=>{
    console.log(`On the ${SERVER_PORT}th day of Christmas my true love gave to me..... nothing because I'm single.`);
})