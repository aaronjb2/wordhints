const express = require('express');
require('dotenv').config();
const massive = require('massive');
const socket = require('socket.io');

const app = express();

app.use(express.json());
const {SERVER_PORT, MASSIVE_CONNECTION} = process.env;

app.use( express.static( `${__dirname}/../build` ) );

const io = socket(
    app.listen(SERVER_PORT, () => {
        console.log(`On the ${SERVER_PORT}th day of Christmas my true love gave to me..... nothing because I'm single`);
    })
)

massive(MASSIVE_CONNECTION).then(db=> {
    app.set('db', db);
    console.log('db is connected');
})